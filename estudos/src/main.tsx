import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { Cabecalho, Rodape } from "./components/layout";
import { ProvedorAudio } from "./components/mini-player";
import { Inicio } from "./pages/inicio";
import { PaginaTrilha } from "./pages/trilha";
import { PaginaAula } from "./pages/aula";
import { NaoEncontrada } from "./pages/nao-encontrada";
import { buscarTrilha } from "./catalogo";
import "./estudos.css";
import "./components/mini-player.css";
import "./components/pomodoro.css";

const raiz = createRootRoute({
  component: () => (
    <ProvedorAudio>
      <div className="casca">
        <Cabecalho />
        <Outlet />
        <Rodape />
      </div>
    </ProvedorAudio>
  ),
  notFoundComponent: NaoEncontrada,
});

const rotaInicio = createRoute({ getParentRoute: () => raiz, path: "/", component: Inicio });

const rotaTrilha = createRoute({
  getParentRoute: () => raiz,
  path: "$trilha",
  component: function Trilha() {
    const { trilha } = rotaTrilha.useParams();
    return <PaginaTrilha trilha={buscarTrilha(trilha)} />;
  },
});

const rotaAula = createRoute({
  getParentRoute: () => raiz,
  path: "$trilha/$aula",
  component: function Aula() {
    const { trilha, aula } = rotaAula.useParams();
    return <PaginaAula key={`${trilha}/${aula}`} trilha={buscarTrilha(trilha)} slug={aula} />;
  },
});

const router = createRouter({
  routeTree: raiz.addChildren([rotaInicio, rotaTrilha, rotaAula]),
  scrollRestoration: true,
  defaultNotFoundComponent: NaoEncontrada,
});

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
