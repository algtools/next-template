import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "./TodoApp";
import { SWRConfig } from "swr";
import type { Task } from "@/lib/api/tasks";

describe("TodoApp", () => {
	let tasks: Task[];
	let nextId: number;

	beforeEach(() => {
		tasks = [];
		nextId = 1;

		const jsonResponse = (body: unknown, status = 200) =>
			new Response(JSON.stringify(body), {
				status,
				headers: { "content-type": "application/json" },
			});

		// Minimal fetch mock that behaves like our `/api/tasks` proxy
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
				const url = typeof input === "string" ? input : input.toString();
				const method = (init?.method ?? "GET").toUpperCase();

				if (url.endsWith("/api/tasks") && method === "GET") {
					return jsonResponse({ success: true, result: tasks });
				}
				if (url.endsWith("/api/tasks") && method === "POST") {
					const body = JSON.parse(String(init?.body ?? "{}")) as Omit<
						Task,
						"id"
					>;
					const created: Task = { id: nextId++, ...body };
					tasks = [created, ...tasks];
					return jsonResponse({ success: true, result: created }, 201);
				}

				const m = url.match(/\/api\/tasks\/(\d+)$/);
				if (m) {
					const id = Number(m[1]);
					if (method === "PUT") {
						const body = JSON.parse(String(init?.body ?? "{}")) as Omit<
							Task,
							"id"
						>;
						const updated: Task = { id, ...body };
						tasks = tasks.map((t) => (t.id === id ? updated : t));
						return jsonResponse({ success: true, result: updated });
					}
					if (method === "DELETE") {
						const found = tasks.find((t) => t.id === id);
						tasks = tasks.filter((t) => t.id !== id);
						return jsonResponse({ success: true, result: found ?? null });
					}
				}

				return jsonResponse({ success: false, error: "not mocked" }, 500);
			}),
		);
	});

	afterEach(() => {
		cleanup();
	});

	function renderApp(opts?: { initialTasks?: Task[] }) {
		render(
			<SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
				<TodoApp initialTasks={opts?.initialTasks ?? []} />
			</SWRConfig>,
		);
	}

	it("adds a todo", async () => {
		const user = userEvent.setup();
		renderApp();

		await user.type(screen.getByLabelText("New task"), "Buy milk");
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(await screen.findByText("Buy milk")).toBeInTheDocument();
	});

	it("does not add empty/whitespace-only todos", async () => {
		const user = userEvent.setup();
		renderApp();

		await user.type(screen.getByLabelText("New task"), "   ");
		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("No tasks yet.")).toBeInTheDocument();
	});

	it("toggles a todo completed", async () => {
		const user = userEvent.setup();
		renderApp();

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
		renderApp();

		await user.type(screen.getByLabelText("New task"), "A");
		await user.click(screen.getByRole("button", { name: "Add" }));
		await user.type(screen.getByLabelText("New task"), "B");
		await user.click(screen.getByRole("button", { name: "Add" }));

		await user.click(
			screen.getByRole("checkbox", { name: 'Mark "A" as completed' }),
		);

		await user.click(screen.getByRole("button", { name: "Clear completed" }));

		expect(await screen.findByText("B")).toBeInTheDocument();
		expect(screen.queryByText("A")).not.toBeInTheDocument();
	});

	it("deletes a todo", async () => {
		const user = userEvent.setup();
		renderApp();

		await user.type(screen.getByLabelText("New task"), "Throw trash");
		await user.click(screen.getByRole("button", { name: "Add" }));

		await user.click(
			screen.getByRole("button", { name: 'Delete "Throw trash"' }),
		);
		expect(screen.queryByText("Throw trash")).not.toBeInTheDocument();
	});
});
