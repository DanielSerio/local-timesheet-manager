import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Frame, Page } from "./components/layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Frame headerHeight={48}>
        <Page>
          <p>Home</p>
        </Page>
      </Frame>
    </QueryClientProvider>
  );
}

export default App;
