import { TodoApp } from "@/components/TodoApp";

export default function Home() {
	return (
		<div className="min-h-screen px-6 py-12 font-(family-name:--font-geist-sans)">
			<main className="mx-auto w-full max-w-2xl">
				<header className="mb-8">
					<h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						A tiny TODO list: add tasks, mark them complete, and remove them.
						Your list is saved in this browser.
					</p>
				</header>

				{/* Client component */}
				<TodoApp />
			</main>
		</div>
	);
}
