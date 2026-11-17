import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import "./styles.css";
import "./styles-missoes.css";
import "./styles-missoes-cinema.css";
import "./styles-missoes-pinturas.css";

const router = createRouter({ routeTree, scrollRestoration: true });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
