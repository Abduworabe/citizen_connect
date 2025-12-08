import Layout from "@/components/layout";
import { useRoute } from "wouter";
import { mockRequests } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, User, ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

const statusSteps = [
  { id: "pending", label: "Request Received", description: "Your request has been logged." },
  { id: "in_progress", label: "In Progress", description: "A team has been assigned." },
  { id: "resolved", label: "Resolved", description: "The issue has been fixed." },
];

export default function RequestDetails() {
  const [, params] = useRoute("/request/:id");
  const request = mockRequests.find(r => r.id === params?.id);

  if (!request) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Request Not Found</h1>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const currentStepIndex = statusSteps.findIndex(s => s.id === request.status);

  return (
    <Layout>
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="text-muted-foreground">
                {request.id}
              </Badge>
              <Badge className={
                request.status === 'resolved' ? 'bg-green-500 hover:bg-green-600' :
                request.status === 'in_progress' ? 'bg-blue-500 hover:bg-blue-600' :
                'bg-yellow-500 hover:bg-yellow-600'
              }>
                {request.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{request.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {request.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {format(new Date(request.createdAt), "PPP")}
              </div>
            </div>
          </div>
          
          {request.status !== 'resolved' && (
            <Button variant="outline" className="shrink-0">
              Update Information
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-border/60 bg-muted aspect-video relative">
            {request.imageUrl ? (
              <img 
                src={request.imageUrl} 
                alt={request.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image Provided
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {request.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
                {statusSteps.map((step, i) => {
                  const isCompleted = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  
                  return (
                    <div key={step.id} className="relative flex items-start group">
                      <div className={`absolute left-0 top-1 ml-5 -translate-x-1/2 rounded-full border-2 border-background w-3 h-3 z-10 
                        ${isCompleted ? 'bg-primary' : 'bg-muted'}
                      `}></div>
                      <div className="ml-10 space-y-1">
                        <div className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        {isCurrent && (
                          <div className="text-xs text-primary font-medium mt-1">
                            Current Status
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Assigned Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  PW
                </div>
                <div>
                  <div className="font-medium">Public Works</div>
                  <div className="text-sm text-muted-foreground">Unit 4</div>
                </div>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Location Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted h-48 w-full flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  Map Integration Placeholder
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
