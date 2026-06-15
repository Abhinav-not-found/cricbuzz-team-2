import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { Toaster } from "sonner"
import SocketContextWrapper from "@/shared/context/socketContext"
import App from "./App.jsx"
import { store } from "./app/store"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SocketContextWrapper>
        <Toaster richColors />
        <App />
      </SocketContextWrapper>
    </QueryClientProvider>
  </Provider>,
)
