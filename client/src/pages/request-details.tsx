import Layout from "@/components/layout";
import { useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, User, ArrowLeft, Send } from "lucide-react";
import { Link, useLocation } from "wouter";
import { format } from "date-fns";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RequestStatus } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const statusSteps = [
  { id: "pending", label: "Request Received", description: "Your request has been logged." },
  { id: "assigned", label: "Assigned", description: "A team has been assigned." },
  { id: "in_progress", label: "In Progress", description: "Work is currently underway." },
  { id: "completed", label: "Work Completed", description: "The team has finished the repairs." },
  { id: "closed", label: "Closed", description: "Verified and closed by citizen." },
];

export default function RequestDetails() {
  const [, params] = useRoute("/request/:id");
  const { requests, updateRequestStatus, addTimelineEntry } = useData();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [comment, setComment] = useState("");

  const request = requests.find(r => r.id === params?.id);

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

  // Handle mapped statuses for progress bar (simplified)
  const currentStepIndex = statusSteps.findIndex(s => s.id === request.status);
  
  const handleStatusChange = (newStatus: RequestStatus) => {
    updateRequestStatus(request.id, newStatus);
  };

  const handlePostComment = () => {
    if (!comment.trim()) return;
    addTimelineEntry(request.id, comment, "comment");
    setComment("");
  };

  const canEditStatus = user?.role === 'admin' || (user?.role === 'employee' && request.assignedTo === user.id);
  const canCloseRequest = user?.role === 'citizen' && request.citizenId === user.id && request.status === 'completed';

  return (
    <Layout>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => window.history.back()} className="pl-0 hover:bg-transparent hover:text-primary mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="text-muted-foreground">
                {request.id}
              </Badge>
              <Badge className={`capitalize 
                ${request.status === 'closed' ? 'bg-green-500 hover:bg-green-600' :
                request.status === 'completed' ? 'bg-teal-500 hover:bg-teal-600' :
                request.status === 'in_progress' ? 'bg-blue-500 hover:bg-blue-600' :
                request.status === 'assigned' ? 'bg-purple-500 hover:bg-purple-600' :
                request.status === 'rejected' ? 'bg-red-500 hover:bg-red-600' :
                'bg-yellow-500 hover:bg-yellow-600'
              }`}>
                {request.status.replace('_', ' ')}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                Priority: {request.priority}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{request.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {request.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {format(new Date(request.createdAt), "PPP p")}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {canEditStatus && (
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg border border-border/60 shadow-sm">
                <span className="text-sm font-medium pl-2">Update Status:</span>
                <Select value={request.status} onValueChange={(val) => handleStatusChange(val as RequestStatus)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Work Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {canCloseRequest && (
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white shadow-md animate-pulse"
                onClick={() => handleStatusChange('closed')}
              >
                Verify & Close Request
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-border/60 bg-muted aspect-video relative group">
            {request.imageUrl ? (
              <img 
                src={request.imageUrl} 
                alt={request.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/40 before:to-transparent">
                {request.timeline.map((log, i) => (
                  <div key={log.id} className="relative flex items-start group">
                    <div className="absolute left-0 top-1 ml-5 -translate-x-1/2 rounded-full border-2 border-background w-3 h-3 z-10 bg-primary"></div>
                    <div className="ml-10 w-full space-y-1 bg-muted/30 p-4 rounded-lg border border-border/40">
                      <div className="flex justify-between items-start">
                        <div className="font-semibold text-sm flex items-center gap-2">
                           {log.authorName}
                           <Badge variant="outline" className="text-[10px] h-5 px-1 py-0">{log.authorRole}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{format(new Date(log.timestamp), "MMM d, h:mm a")}</span>
                      </div>
                      <p className="text-sm text-foreground/80 mt-1">
                        {log.message}
                      </p>
                      {log.type === 'status_change' && log.newStatus && (
                         <div className="pt-2">
                            <Badge variant="secondary" className="text-xs">
                               Changed to: {log.newStatus.replace('_', ' ').toUpperCase()}
                            </Badge>
                         </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Add Comment Section */}
          <Card>
             <CardHeader>
                <CardTitle className="text-base">Add Update or Comment</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex gap-4">
                   <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                   </Avatar>
                   <div className="flex-1 space-y-4">
                      <Textarea 
                         placeholder="Type your update here..." 
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                         className="min-h-[100px]"
                      />
                      <Button onClick={handlePostComment} disabled={!comment.trim()}>
                         <Send className="mr-2 h-4 w-4" /> Post Update
                      </Button>
                   </div>
                </div>
             </CardContent>
          </Card>

        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-6 relative pl-4 border-l-2 border-muted">
                  {statusSteps.map((step, i) => {
                     const isCompleted = i <= currentStepIndex;
                     const isCurrent = i === currentStepIndex;
                     return (
                        <div key={step.id} className="relative">
                           <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-background ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
                           <div className={`text-sm font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</div>
                           {isCurrent && <div className="text-xs text-primary font-medium mt-1">Current Stage</div>}
                        </div>
                     )
                  })}
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Assigned Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              {request.assignedTo ? (
                 <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                     PW
                   </div>
                   <div>
                     <div className="font-medium">Public Works</div>
                     <div className="text-sm text-muted-foreground">Unit 4</div>
                   </div>
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center py-4 text-center">
                    <p className="text-sm text-muted-foreground mb-3">No team assigned yet</p>
                    {user?.role === 'admin' && (
                       <Button variant="outline" size="sm" className="w-full">Assign Team</Button>
                    )}
                 </div>
              )}
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Location Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted h-48 w-full flex items-center justify-center text-muted-foreground text-sm relative overflow-hidden rounded-b-lg group cursor-pointer">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="text-center z-10 group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <span className="font-medium text-foreground">View on Map</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
