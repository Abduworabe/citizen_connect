import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/data-context";
import { RequestCard } from "@/components/request-card";
import { Filter } from "lucide-react";

export default function EmployeeAllRequests() {
  const { requests } = useData();
  const allRequests = requests;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Service Requests</h1>
          <p className="text-muted-foreground mt-1">Browse all reported issues in the municipality.</p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter View
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRequests.map(req => (
          <RequestCard key={req.id} request={req} />
        ))}
      </div>
    </Layout>
  );
}
