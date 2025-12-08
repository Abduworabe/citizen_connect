import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";
import { DataProvider } from "@/context/data-context";

import NotFound from "@/pages/not-found";
import RoleSelect from "@/pages/role-select";
import Dashboard from "@/pages/dashboard";
import SubmitRequest from "@/pages/submit-request";
import RequestDetails from "@/pages/request-details";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminRequests from "@/pages/admin-requests";
import AdminUsers from "@/pages/admin-users";
import EmployeeDashboard from "@/pages/employee-dashboard";
import EmployeeRequests from "@/pages/employee-requests";
import CitizenRequests from "@/pages/citizen-requests";

function Router() {
  return (
    <Switch>
      <Route path="/" component={RoleSelect} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/submit" component={SubmitRequest} />
      <Route path="/request/:id" component={RequestDetails} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/requests" component={AdminRequests} />
      <Route path="/admin/users" component={AdminUsers} />

      {/* Employee Routes */}
      <Route path="/employee" component={EmployeeDashboard} />
      <Route path="/employee/requests" component={EmployeeRequests} />

      {/* Citizen Routes */}
      <Route path="/requests" component={CitizenRequests} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
