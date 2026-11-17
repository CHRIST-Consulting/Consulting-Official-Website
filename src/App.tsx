import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
const InternshipRegistration = lazy(() => import("./pages/InternshipRegistrationPage"));
const CampusDetails = lazy(() => import("./pages/CampusDetailsPage"));
const DepartmentDetails = lazy(() => import("./pages/DepartmentDetailsPage"));

// Admin pages (not linked from the public site)
const AdminLogin = lazy(() => import("./pages/AdminLoginPage"));
const AdminMessages = lazy(() => import("./pages/AdminMessagesPage"));

const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const location = useLocation();

  // The admin panel has its own layout: no public Navbar/Footer/loading screen.
  if (location.pathname === "/admin" || location.pathname.startsWith("/admin/")) {
    return (
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/*" element={<Navigate to="/admin/messages" replace />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence>
          <ChristLoadingScreen cacheKey={`app-cache-${location.pathname}`}>
            <Suspense fallback={<PageSpinner />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/events" element={<Event />} />
                <Route path="/events/:id" element={<EventRecapPage />} />
                <Route path="/teams" element={<Team />} />
                <Route path="/expertise" element={<Expertise />} />
                <Route path="/labs" element={<Lab />} />
                <Route path="/internship-registration" element={<InternshipRegistration />} />
                <Route path="/campus/:id" element={<CampusDetails />} />
                <Route path="/campus/:campusId/department/:deptId" element={<DepartmentDetails />} />
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
