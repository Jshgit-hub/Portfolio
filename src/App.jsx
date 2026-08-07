import Home from "./pages/Home";
import { inject } from "@vercel/analytics";

inject();

// One page, one scroll. Home renders the full brutalist layout (topbar + sections).
export default function App() {
  return <Home />;
}
