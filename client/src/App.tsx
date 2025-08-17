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

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/" component={Dashboard} />
        <Route path="/matches" component={MatchesPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/forum" component={ForumPage} />
        <Route path="/groups" component={StudyGroupsPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="peerlearn-ui-theme">
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
