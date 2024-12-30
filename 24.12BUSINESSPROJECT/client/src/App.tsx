import "./App.css";
// TanStack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
//dark
import { ThemeProvider } from "./components/theme-provider";
//nav
import PageLayout from "./components/PageLayout/PageLayout";
//context
import { UserProvider } from "./context/UserContext";
//react router
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
//pages
import NotFound from "./pages/notfound/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BusinessList from "./pages/BusinessesList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BusinessPage from "./pages/BuisnessPage";
import UserPage from "./pages/UserPage";
import NewBusiness from "./pages/NewBusiness";
import SearchPage from "./pages/SearchPage/SearchPage";
// import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <UserProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <PageLayout>
            <Routes location={state?.backgroundLocation || location}>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/businesses" element={<BusinessList />} />
              <Route path="/create-business" element={<NewBusiness />} />
              {/* <Route path="/search" element={<SearchPage />} /> */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/user/:username" element={<UserPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* modal */}
            {state?.backgroundLocation && (
              <Routes>
                <Route path="/business/:id" element={<BusinessPage />} />
              </Routes>
            )}
          </PageLayout>
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
