import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./app.css";
import 'flickity/css/flickity.css';
import 'flickity-fade/flickity-fade.css'


import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

export default function App() {
  return (
      <Router
        base={import.meta.env.BASE_URL}
        root={(props) => (
            <Suspense>{props.children}</Suspense>
        )}
      >
        <FileRoutes />
      </Router>
  );
}
