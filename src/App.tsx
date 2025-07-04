import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ChristLoadingScreen from "./components/ChristLoadingScreen";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Footer from "./components/Footer";
import Client from "./pages/ClientsPage";
import Event from "./pages/EventsPage";
import Team from "./pages/TeamsPage";
import Service from "./pages/ServicesPage";
import Lab from "./pages/LabsPage";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence>
          <ChristLoadingScreen cacheKey={`app-cache-${location.pathname}`}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<Client />} />
              <Route path="/events" element={<Event />} />
              <Route path="/teams" element={<Team />} />
              <Route path="/services" element={<Service />} />
              <Route path="/labs" element={<Lab />} />
            </Routes>
          </ChristLoadingScreen>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
