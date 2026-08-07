import Home from "./pages/Home";
import { inject } from "@vercel/analytics";

inject();

// One page. Home renders the full web-slinger layout (top bar + 3D hero + sections).
export default function App() {
  return <Home />;
}
