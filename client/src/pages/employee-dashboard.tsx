import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRequests } from "@/lib/mock-data";
import { RequestCard } from "@/components/request-card";
import { useAuth } from "@/context/auth-context";
import { CheckSquare, Clock, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  
  // Filter requests for this specific employee
  // In a real app, this would filter by the logged-in user's ID
  // For this mock, we'll grab requests assigned to 'user-employee-water' if the user is in water dept, etc.
  const myTasks = mockRequests.filter(r => 
    r.assignedTo === user?.id || 
    (r.department === user?.department && r.status === 'pending')
  );

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground mt-1">
          {user?.department ? `${user.department.charAt(0).toUpperCase() + user.department.slice(1)} Department` : 'Employee'} Portal
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary font-medium">Assigned Tasks</CardDescription>
            <CardTitle className="text-4xl">{myTasks.filter(t => t.status === 'in_progress').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Active jobs requiring attention</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Review</CardDescription>
            <CardTitle className="text-4xl">{myTasks.filter(t => t.status === 'pending').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">New reports in your queue</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Today</CardDescription>
            <CardTitle className="text-4xl">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Great job! Keep it up.</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">My Active Tasks</h2>
        </div>

        {myTasks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTasks.map(req => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
            <p className="text-muted-foreground">No tasks currently assigned to you.</p>
            <Button variant="link" className="mt-2">Browse Unassigned Requests</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
