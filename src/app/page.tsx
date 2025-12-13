import { TodoApp } from "@/components/TodoApp";
import { listTasks } from "@/lib/api/tasks";

export default async function Home() {
	const initialTasks = await listTasks({ page: 1, per_page: 20 })
		.then((r) => r.result)
		.catch(() => []);

	return (
		<div className="min-h-screen px-6 py-12 font-(family-name:--font-geist-sans)">
			<main className="mx-auto w-full max-w-2xl">
				<header className="mb-8">
					<h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						A tiny Tasks example: add tasks, mark them complete, and remove
						them. Data is synced with the backend API.
					</p>
				</header>

				{/* Client component */}
				<TodoApp initialTasks={initialTasks} />
			</main>
		</div>
	);
}
