import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";

import NotFound from "@/pages/not-found";
import RoleSelect from "@/pages/role-select";
import Dashboard from "@/pages/dashboard";
import SubmitRequest from "@/pages/submit-request";
import RequestDetails from "@/pages/request-details";

// Placeholder pages for now - we will build these next
const AdminDashboard = () => <div className="p-10">Admin Dashboard (Coming Soon)</div>;
const EmployeeDashboard = () => <div className="p-10">Employee Dashboard (Coming Soon)</div>;

function Router() {
  return (
    <Switch>
      <Route path="/" component={RoleSelect} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/submit" component={SubmitRequest} />
      <Route path="/request/:id" component={RequestDetails} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/employee" component={EmployeeDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
