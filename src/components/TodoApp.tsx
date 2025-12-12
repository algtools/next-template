"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type Todo = {
	id: string;
	text: string;
	completed: boolean;
	createdAt: number;
};

function newId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeParseTodos(raw: string | null): Todo[] {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw) as unknown;
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((t): t is Todo => {
				return (
					typeof t === "object" &&
					t !== null &&
					"id" in t &&
					"text" in t &&
					"completed" in t &&
					"createdAt" in t &&
					typeof (t as { id: unknown }).id === "string" &&
					typeof (t as { text: unknown }).text === "string" &&
					typeof (t as { completed: unknown }).completed === "boolean" &&
					typeof (t as { createdAt: unknown }).createdAt === "number"
				);
			})
			.map((t) => ({
				id: t.id,
				text: t.text,
				completed: t.completed,
				createdAt: t.createdAt,
			}));
	} catch {
		return [];
	}
}

export function TodoApp({ storageKey = "todos:v1" }: { storageKey?: string }) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [text, setText] = useState("");
	const hydratedRef = useRef(false);

	useEffect(() => {
		setTodos(safeParseTodos(window.localStorage.getItem(storageKey)));
		hydratedRef.current = true;
	}, [storageKey]);

	useEffect(() => {
		if (!hydratedRef.current) return;
		window.localStorage.setItem(storageKey, JSON.stringify(todos));
	}, [storageKey, todos]);

	const remaining = useMemo(
		() => todos.filter((t) => !t.completed).length,
		[todos],
	);

	function addTodo() {
		const trimmed = text.trim();
		if (!trimmed) return;
		setTodos((prev) => [
			{ id: newId(), text: trimmed, completed: false, createdAt: Date.now() },
			...prev,
		]);
		setText("");
	}

	function toggleTodo(id: string) {
		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
		);
	}

	function removeTodo(id: string) {
		setTodos((prev) => prev.filter((t) => t.id !== id));
	}

	function clearCompleted() {
		setTodos((prev) => prev.filter((t) => !t.completed));
	}

	return (
		<Card aria-label="Todo list" className="shadow-sm">
			<CardHeader className="gap-3">
				<form
					className="flex items-center gap-2"
					onSubmit={(e) => {
						e.preventDefault();
						addTodo();
					}}
				>
					<label className="sr-only" htmlFor="new-task">
						New task
					</label>
					<Input
						id="new-task"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Add a task…"
					/>
					<Button type="submit">Add</Button>
				</form>

				<div className="flex items-center justify-between text-sm text-muted-foreground">
					<span>
						{todos.length === 0
							? "No tasks yet."
							: `${remaining} remaining • ${todos.length} total`}
					</span>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={clearCompleted}
						disabled={!todos.some((t) => t.completed)}
					>
						Clear completed
					</Button>
				</div>
			</CardHeader>

			<CardContent className="px-0">
				<ul className="divide-y">
					{todos.map((t) => (
						<li key={t.id} className="flex items-center gap-3 px-6 py-3">
							<Checkbox
								aria-label={`Mark "${t.text}" as completed`}
								checked={t.completed}
								onCheckedChange={() => toggleTodo(t.id)}
							/>
							<span
								className={`flex-1 text-sm ${
									t.completed ? "text-muted-foreground line-through" : ""
								}`}
							>
								{t.text}
							</span>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => removeTodo(t.id)}
								aria-label={`Delete "${t.text}"`}
							>
								Delete
							</Button>
						</li>
					))}
					{todos.length === 0 ? (
						<li className="px-6 py-4 text-sm text-muted-foreground">
							Add your first task above.
						</li>
					) : null}
				</ul>
			</CardContent>

			<CardFooter className="justify-end">
				<span className="text-xs text-muted-foreground">
					Saved locally in this browser.
				</span>
			</CardFooter>
		</Card>
	);
}
