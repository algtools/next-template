import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "./TodoApp";

describe("TodoApp", () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	afterEach(() => {
		cleanup();
	});

	it("adds a todo", async () => {
		const user = userEvent.setup();
		render(<TodoApp storageKey="test:todos" />);

		await user.type(screen.getByLabelText("New task"), "Buy milk");
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("Buy milk")).toBeInTheDocument();
	});

	it("does not add empty/whitespace-only todos", async () => {
		const user = userEvent.setup();
		render(<TodoApp storageKey="test:todos:empty" />);

		await user.type(screen.getByLabelText("New task"), "   ");
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("No tasks yet.")).toBeInTheDocument();
	});

	it("toggles a todo completed", async () => {
		const user = userEvent.setup();
		render(<TodoApp storageKey="test:todos:toggle" />);

		await user.type(screen.getByLabelText("New task"), "Write tests");
		await user.click(screen.getByRole("button", { name: "Add" }));

		const checkbox = screen.getByRole("checkbox", {
			name: 'Mark "Write tests" as completed',
		});
		expect(checkbox).not.toBeChecked();

		await user.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	it("clears completed todos", async () => {
		const user = userEvent.setup();
		render(<TodoApp storageKey="test:todos:clear" />);

		await user.type(screen.getByLabelText("New task"), "A");
		await user.click(screen.getByRole("button", { name: "Add" }));
		await user.type(screen.getByLabelText("New task"), "B");
		await user.click(screen.getByRole("button", { name: "Add" }));

		await user.click(
			screen.getByRole("checkbox", { name: 'Mark "A" as completed' }),
		);

		await user.click(screen.getByRole("button", { name: "Clear completed" }));

		expect(screen.queryByText("A")).not.toBeInTheDocument();
		expect(screen.getByText("B")).toBeInTheDocument();
	});

	it("deletes a todo", async () => {
		const user = userEvent.setup();
		render(<TodoApp storageKey="test:todos:delete" />);

		await user.type(screen.getByLabelText("New task"), "Throw trash");
		await user.click(screen.getByRole("button", { name: "Add" }));

		await user.click(
			screen.getByRole("button", { name: 'Delete "Throw trash"' }),
		);
		expect(screen.queryByText("Throw trash")).not.toBeInTheDocument();
	});

	it("hydrates from localStorage and ignores invalid stored JSON", async () => {
		const user = userEvent.setup();

		window.localStorage.setItem(
			"test:todos:hydrate",
			JSON.stringify([
				{ id: "1", text: "Persisted", completed: false, createdAt: 1 },
				{ id: "bad", text: 123, completed: false, createdAt: 1 },
			]),
		);
		window.localStorage.setItem("test:todos:badjson", "{not json");

		render(
			<>
				<TodoApp storageKey="test:todos:hydrate" />
				<TodoApp storageKey="test:todos:badjson" />
			</>,
		);

		expect(await screen.findByText("Persisted")).toBeInTheDocument();
		expect(screen.getAllByText("No tasks yet.").length).toBeGreaterThan(0);

		// ensure persistence path executes (write-back)
		await user.click(
			screen.getByRole("checkbox", { name: 'Mark "Persisted" as completed' }),
		);
		expect(window.localStorage.getItem("test:todos:hydrate")).toContain(
			"Persisted",
		);
	});

	it("falls back to non-crypto ids when crypto.randomUUID is unavailable", async () => {
		const user = userEvent.setup();
		const originalCrypto = window.crypto;

		// Make crypto exist but without randomUUID to hit the fallback branch
		Object.defineProperty(window, "crypto", {
			value: {},
			configurable: true,
		});

		render(<TodoApp storageKey="test:todos:idfallback" />);
		await user.type(screen.getByLabelText("New task"), "ID fallback");
		await user.click(screen.getByRole("button", { name: "Add" }));
		expect(screen.getByText("ID fallback")).toBeInTheDocument();

		// restore
		Object.defineProperty(window, "crypto", {
			value: originalCrypto,
			configurable: true,
		});
	});
});
