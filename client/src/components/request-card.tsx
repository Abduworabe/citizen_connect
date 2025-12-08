import { ServiceRequest } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  in_progress: "bg-blue-500/10 text-blue-600 border-blue-200",
  resolved: "bg-green-500/10 text-green-600 border-green-200",
  rejected: "bg-red-500/10 text-red-600 border-red-200",
};

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

export function RequestCard({ request }: { request: ServiceRequest }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-border/60">
      <div className="relative h-48 bg-muted overflow-hidden">
        {request.imageUrl ? (
          <img 
            src={request.imageUrl} 
            alt={request.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={`${statusColors[request.status]} backdrop-blur-sm shadow-sm`}>
            {statusLabels[request.status]}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {request.type.replace('_', ' ')}
        </div>
        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
          {request.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{request.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />
          <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/request/${request.id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground border-primary/20">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
