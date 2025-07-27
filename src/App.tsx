import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import ChristLoadingScreen from "./components/ChristLoadingScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

// Lazy load pages
const Home = lazy(() => import("./pages/HomePage"));
const Client = lazy(() => import("./pages/ClientsPage"));
const Event = lazy(() => import("./pages/EventsPage"));
const Team = lazy(() => import("./pages/TeamsPage"));
const Expertise = lazy(() => import("./pages/ExpertisePage"));
const Lab = lazy(() => import("./pages/LabsPage"));
const EventRecapPage = lazy(() => import("./pages/EventsRecapPage"));

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence>
          <ChristLoadingScreen cacheKey={`app-cache-${location.pathname}`}>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              }
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/events" element={<Event />} />
                <Route path="/events/:id" element={<EventRecapPage />} />
                <Route path="/teams" element={<Team />} />
                <Route path="/expertise" element={<Expertise />} />
                <Route path="/labs" element={<Lab />} />
              </Routes>
            </Suspense>
          </ChristLoadingScreen>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
