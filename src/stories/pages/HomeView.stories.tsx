import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { SWRConfig } from "swr";
import { HomeView } from "@/views/HomeView";
import {
	todoAppDefaultTasks,
	todoAppEmptyTasks,
	todoAppLongListTasks,
} from "@/stories/mocks/tasks";

const withSWR: Decorator = (Story, context) => (
	<SWRConfig value={{ revalidateOnMount: false, revalidateOnFocus: false }}>
		{Story(context.args)}
	</SWRConfig>
);

const meta: Meta<typeof HomeView> = {
	title: "Pages/HomeView",
	component: HomeView,
	decorators: [withSWR],
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj<typeof HomeView>;

export const Default: Story = {
	args: {
		initialTasks: todoAppDefaultTasks,
	},
};

export const EmptyList: Story = {
	args: {
		initialTasks: todoAppEmptyTasks,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Renders the onboarding copy that greets users before any tasks exist.",
			},
		},
	},
};

export const ReleaseReadyBacklog: Story = {
	args: {
		initialTasks: todoAppLongListTasks,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Useful to validate spacing, scrolling, and typography when the list is packed with upcoming milestones.",
			},
		},
	},
};
