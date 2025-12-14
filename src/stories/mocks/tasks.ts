import type { Task } from "@/lib/api/tasks";

const DAY_MS = 24 * 60 * 60 * 1000;
const seededNow = Date.now();

function dueDate(daysFromNow: number) {
	return new Date(seededNow + daysFromNow * DAY_MS).toISOString();
}

function createTask({
	id,
	name,
	slug,
	completed = false,
	description = "",
	dueInDays = 7,
}: {
	id: number;
	name: string;
	slug: string;
	completed?: boolean;
	description?: string;
	dueInDays?: number;
}): Task {
	return {
		id,
		name,
		slug,
		description,
		completed,
		due_date: dueDate(dueInDays),
	};
}

export const todoAppDefaultTasks: Task[] = [
	createTask({
		id: 1,
		name: "Plan launch checklist",
		slug: "plan-launch-checklist",
		dueInDays: 2,
	}),
	createTask({
		id: 2,
		name: "Connect Workers routes",
		slug: "connect-workers-routes",
		dueInDays: 4,
	}),
	createTask({
		id: 3,
		name: "Record Loom demo",
		slug: "record-loom-demo",
		dueInDays: 5,
	}),
];

export const todoAppMixedCompletionTasks: Task[] = [
	createTask({
		id: 11,
		name: "Re-run E2E smoke tests",
		slug: "re-run-e2e-smoke-tests",
	}),
	createTask({
		id: 12,
		name: "Upload Chromatic snapshots",
		slug: "upload-chromatic-snapshots",
		completed: true,
		dueInDays: 1,
	}),
	createTask({
		id: 13,
		name: "Share release notes draft",
		slug: "share-release-notes-draft",
	}),
];

export const todoAppLongListTasks: Task[] = [
	...todoAppDefaultTasks,
	...[
		"Enable analytics dashboard",
		"Roll Worker to production",
		"Capture DX metrics",
		"Draft blog announcement",
		"Close tracking issue",
	].map((name, idx) =>
		createTask({
			id: 20 + idx,
			name,
			slug: name.toLowerCase().replace(/\s+/g, "-"),
			dueInDays: 3 + idx,
		}),
	),
];

export const todoAppEmptyTasks: Task[] = [];
