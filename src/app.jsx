import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./app.css";
import 'flickity/css/flickity.css';
import 'flickity-fade/flickity-fade.css';

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

const publicBaseUrl = import.meta.env.PUBLIC_BASE_URL || "/";
const routerBase = publicBaseUrl === "/" ? "/" : publicBaseUrl.replace(/\/+$/, "");

export default function App() {
  return (
    <Router
      base={routerBase}
      root={props => <Suspense>{props.children}</Suspense>}
    >
      <FileRoutes />
    </Router>
  );
}
