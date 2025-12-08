import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRequests } from "@/lib/mock-data";
import { RequestCard } from "@/components/request-card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ArrowRight, AlertTriangle, CheckCircle, Clock, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";
import { useData } from "@/context/data-context";

export default function AdminDashboard() {
  const { requests } = useData();
  
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in_progress' || r.status === 'assigned').length;
  const resolvedCount = requests.filter(r => r.status === 'completed' || r.status === 'closed').length;
  const highPriorityCount = requests.filter(r => r.priority === 'high' || r.priority === 'critical').length;

  const statusData = [
    { name: 'Pending', value: pendingCount, color: '#eab308' },
    { name: 'In Progress', value: inProgressCount, color: '#3b82f6' },
    { name: 'Completed', value: resolvedCount, color: '#22c55e' },
  ];

  const typeData = [
    { name: 'Water', value: requests.filter(r => r.type === 'water').length },
    { name: 'Road', value: requests.filter(r => r.type === 'road').length },
    { name: 'Sanitation', value: requests.filter(r => r.type === 'sanitation').length },
    { name: 'Electric', value: requests.filter(r => r.type === 'electrical').length },
  ];

  // Mock Employee Performance Data
  const employeePerformance = [
    { name: 'Sarah W.', department: 'Water', tasks: 12, rating: 4.8 },
    { name: 'Mike C.', department: 'Road', tasks: 8, rating: 4.5 },
    { name: 'John D.', department: 'Sanitation', tasks: 15, rating: 4.9 },
    { name: 'Lisa M.', department: 'Electrical', tasks: 10, rating: 4.7 },
  ];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
          <p className="text-muted-foreground mt-1">System-wide performance metrics and request management.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button>System Settings</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-500/5 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Requests</p>
                <div className="text-3xl font-bold text-blue-700 mt-2">{requests.length}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-500/5 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending Review</p>
                <div className="text-3xl font-bold text-yellow-700 mt-2">{pendingCount}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/5 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Resolved</p>
                <div className="text-3xl font-bold text-green-700 mt-2">{resolvedCount}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/5 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">High Priority</p>
                <div className="text-3xl font-bold text-red-700 mt-2">{highPriorityCount}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Employee Performance Section */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Employees</CardTitle>
            <CardDescription>Based on tasks completed and citizen feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeePerformance.map((emp, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {emp.name.split(' ')[0][0]}{emp.name.split(' ')[1][0]}
                      </div>
                      <div>
                        <div className="font-medium">{emp.name}</div>
                        <div className="text-xs text-muted-foreground">{emp.department} Dept</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{emp.tasks}</div>
                        <div className="text-xs text-muted-foreground">Tasks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{emp.rating} ★</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
              <CardTitle>Problem Heatmap</CardTitle>
              <CardDescription>High density issue areas</CardDescription>
           </CardHeader>
           <CardContent className="h-[300px] p-0 overflow-hidden relative">
              {/* Mock Heatmap Visual */}
              <div className="absolute inset-0 bg-muted/30">
                 <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-500/20 rounded-full blur-xl"></div>
                 <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
                 <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-yellow-500/20 rounded-full blur-xl"></div>
                 <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 font-medium">
                    Interactive Map Integration
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Requests by Status</CardTitle>
            <CardDescription>Current distribution of request lifecycles</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {statusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name} ({entry.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requests by Department</CardTitle>
            <CardDescription>Volume of requests across city services</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests Table (Reusing Grid for now) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Incoming Requests</h2>
          <Button variant="ghost" className="gap-2 text-primary">
            View All Requests <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.slice(0, 3).map(req => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
