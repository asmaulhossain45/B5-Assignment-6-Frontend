import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router";
import router from "./routes/Router.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  </StrictMode>
);
