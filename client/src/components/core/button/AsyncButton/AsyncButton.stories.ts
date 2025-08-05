import type { Meta, StoryObj } from '@storybook/react-vite';
import { AsyncButton } from "./AsyncButton";
import { fn } from 'storybook/test';

const meta = {
  title: 'Core/Button/AsyncButton',
  component: AsyncButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    isBusy: { control: 'boolean' },
    size: {
      control: 'select',
      options: [
        'default',
        'small',
        'large',
        'icon'
      ]
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'link',
        'ghost'
      ]
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof AsyncButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary'
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive'
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline'
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary'
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link'
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Link'
  },
};
