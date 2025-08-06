import type { Preview } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export const decorators = [
  (Story: any, context: any) => {
    const {
      globals: { locale },
    } = context;

    //Define it here, not outside this scope!
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
];

export default preview;
