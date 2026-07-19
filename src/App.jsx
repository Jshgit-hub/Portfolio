import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { inject } from "@vercel/analytics";

inject();

// One page, one scroll. Routing bought nothing here and cost a bundle.
export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}
