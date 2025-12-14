import type { Meta, StoryObj } from "@storybook/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
	title: "UI/Button",
	component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: "Primary",
		variant: "default",
	},
};

export const Secondary: Story = {
	args: {
		children: "Secondary",
		variant: "secondary",
	},
};

export const Destructive: Story = {
	args: {
		children: "Delete task",
		variant: "destructive",
	},
};

export const Outline: Story = {
	args: {
		children: "Outline",
		variant: "outline",
	},
};

export const Ghost: Story = {
	args: {
		children: "Ghost action",
		variant: "ghost",
	},
};

export const Link: Story = {
	args: {
		children: "Open docs",
		variant: "link",
	},
};

export const IconButton: Story = {
	render: () => (
		<Button size="icon" variant="outline" aria-label="Refresh list">
			<Loader2 aria-hidden="true" className="size-4" />
		</Button>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Single-icon control that matches how we trigger list refreshes.",
			},
		},
	},
};

export const LoadingState: Story = {
	render: () => (
		<Button disabled>
			<Loader2 className="size-4 animate-spin" aria-hidden="true" />
			Saving
		</Button>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates how icon spacing and disabled styles look when a button performs a background action.",
			},
		},
	},
};
