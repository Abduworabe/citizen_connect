import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRequests } from "@/lib/mock-data";
import { RequestCard } from "@/components/request-card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ArrowRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const pendingCount = mockRequests.filter(r => r.status === 'pending').length;
  const inProgressCount = mockRequests.filter(r => r.status === 'in_progress').length;
  const resolvedCount = mockRequests.filter(r => r.status === 'resolved').length;
  const highPriorityCount = mockRequests.filter(r => r.priority === 'high' || r.priority === 'critical').length;

  const statusData = [
    { name: 'Pending', value: pendingCount, color: '#eab308' },
    { name: 'In Progress', value: inProgressCount, color: '#3b82f6' },
    { name: 'Resolved', value: resolvedCount, color: '#22c55e' },
  ];

  const typeData = [
    { name: 'Water', value: mockRequests.filter(r => r.type === 'water').length },
    { name: 'Road', value: mockRequests.filter(r => r.type === 'road').length },
    { name: 'Sanitation', value: mockRequests.filter(r => r.type === 'sanitation').length },
    { name: 'Electric', value: mockRequests.filter(r => r.type === 'electrical').length },
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
                <div className="text-3xl font-bold text-blue-700 mt-2">{mockRequests.length}</div>
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
          {mockRequests.slice(0, 3).map(req => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
