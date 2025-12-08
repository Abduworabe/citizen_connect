import Layout from "@/components/layout";
import { useData } from "@/context/data-context";
import { RequestCard } from "@/components/request-card";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PlusCircle } from "lucide-react";

export default function CitizenRequests() {
  const { user } = useAuth();
  const { requests } = useData();
  
  // Filter for requests created by this citizen
  const myRequests = requests.filter(r => r.citizenId === user?.id || r.citizenId === 'user-citizen-1');

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
          <p className="text-muted-foreground mt-1">Track the history and status of your reports.</p>
        </div>
        <Link href="/submit">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Request
          </Button>
        </Link>
      </div>

      {myRequests.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRequests.map(req => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/60 rounded-xl bg-muted/10">
          <div className="bg-muted rounded-full p-4 mb-4">
            <PlusCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Requests Yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            You haven't submitted any service requests yet. Help improve our city by reporting an issue.
          </p>
          <Link href="/submit">
            <Button>Submit Your First Request</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
}
