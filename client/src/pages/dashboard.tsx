import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockRequests } from "@/lib/mock-data";
import { RequestCard } from "@/components/request-card";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredRequests = mockRequests.filter(req => {
    const matchesFilter = filter === "all" || req.status === filter;
    const matchesSearch = req.title.toLowerCase().includes(search.toLowerCase()) || 
                          req.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Public Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track the status of community requests.</p>
        </div>
        <Button>Export Report</Button>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg border border-border/60 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title or location..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map(req => (
          <RequestCard key={req.id} request={req} />
        ))}
        {filteredRequests.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No requests found matching your criteria.
          </div>
        )}
      </div>
    </Layout>
  );
}
