import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";

// Pages
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import MatchesPage from "@/pages/matches";
import ChatPage from "@/pages/chat";
import ForumPage from "@/pages/forum";
import StudyGroupsPage from "@/pages/study-groups";
import LeaderboardPage from "@/pages/leaderboard";
import NotFound from "@/pages/not-found";

// Newly added pages
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import LandingPage from "@/pages/LandingPage"; // 👈 import your landing page

function Router() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <div className="md:pl-64">
        <main className="pb-16 md:pb-0">
          <Switch>
            {/* Public routes */}
            <Route path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/auth" component={AuthPage} />

            {/* Main app routes */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/matches" component={MatchesPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/forum" component={ForumPage} />
            <Route path="/groups" component={StudyGroupsPage} />
            <Route path="/leaderboard" component={LeaderboardPage} />

            {/* Fallback */}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="peerlearn-ui-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
