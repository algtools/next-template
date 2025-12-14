import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { SWRConfig } from "swr";
import { TodoApp } from "@/components/TodoApp";
import {
	todoAppDefaultTasks,
	todoAppEmptyTasks,
	todoAppLongListTasks,
	todoAppMixedCompletionTasks,
} from "@/stories/mocks/tasks";

const withSWR: Decorator = (Story, context) => (
	<SWRConfig value={{ revalidateOnMount: false, revalidateOnFocus: false }}>
		{Story(context.args)}
	</SWRConfig>
);

const meta: Meta<typeof TodoApp> = {
	title: "Components/TodoApp",
	component: TodoApp,
	decorators: [withSWR],
};

export default meta;

type Story = StoryObj<typeof TodoApp>;

export const Default: Story = {
	args: {
		initialTasks: todoAppDefaultTasks,
		apiBasePath: "/api",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Shows the signed-out experience with a few planning tasks already loaded from the API.",
			},
		},
	},
};

export const EmptyState: Story = {
	args: {
		initialTasks: todoAppEmptyTasks,
		apiBasePath: "/api",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates the onboarding copy and disabled clear button when no tasks exist yet.",
			},
		},
	},
};

export const WithCompletedTasks: Story = {
	args: {
		initialTasks: todoAppMixedCompletionTasks,
		apiBasePath: "/api",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Highlights the line-through styling and the enabled “Clear completed” control when at least one task is done.",
			},
		},
	},
};

export const WithLargerBacklog: Story = {
	args: {
		initialTasks: todoAppLongListTasks,
		apiBasePath: "/api",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Provides a scrollable backlog to exercise dividers, spacing, and keyboard nav across many items.",
			},
		},
	},
};
