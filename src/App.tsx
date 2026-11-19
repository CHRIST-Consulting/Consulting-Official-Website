import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import ChristLoadingScreen from "./components/ChristLoadingScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Lazy load public pages
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

// Lazy load admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLoginPage"));
const ForgotPassword = lazy(() => import("./pages/admin/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPasswordPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboardPage"));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAdminRoute && <Navbar />}
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
                {/* Public Routes */}
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

                {/* Admin Auth Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin/reset-password" element={<ResetPassword />} />

                {/* Protected Admin Dashboard */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </ChristLoadingScreen>
        </AnimatePresence>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
    </div>
  );
}

export default App;
