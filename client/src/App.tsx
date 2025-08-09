import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Frame, Page, PageHeader } from "./components/layout";

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
          <PageHeader />
        </Page>
      </Frame>
    </QueryClientProvider>
  );
}

export default App;
