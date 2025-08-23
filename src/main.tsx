import "./styles/index.css";
import { Toaster } from "sonner";
import { StrictMode } from "react";
import { router } from "./routes/Router.tsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./providers/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  </StrictMode>
);
