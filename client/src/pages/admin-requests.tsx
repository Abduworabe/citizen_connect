import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/data-context";
import { Eye, MoreHorizontal, Filter } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminRequests() {
  const { requests } = useData();
  const [search, setSearch] = useState("");

  const filteredRequests = requests.filter(req => 
    req.title.toLowerCase().includes(search.toLowerCase()) ||
    req.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Requests</h1>
          <p className="text-muted-foreground mt-1">View and assign all incoming service requests.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button>Export CSV</Button>
        </div>
      </div>

      <div className="bg-card rounded-md border border-border/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <Input 
            placeholder="Search requests..." 
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell className="font-medium">{request.title}</TableCell>
                <TableCell className="capitalize">{request.type}</TableCell>
                <TableCell className="text-muted-foreground">{request.location}</TableCell>
                <TableCell>
                  <Badge variant={request.priority === 'critical' || request.priority === 'high' ? 'destructive' : 'secondary'} className="capitalize">
                    {request.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`capitalize 
                    ${request.status === 'resolved' ? 'border-green-500 text-green-600 bg-green-50' : 
                      request.status === 'in_progress' ? 'border-blue-500 text-blue-600 bg-blue-50' : 
                      'border-yellow-500 text-yellow-600 bg-yellow-50'
                    }`}>
                    {request.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link href={`/request/${request.id}`} className="flex items-center w-full">
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Assign to Team</DropdownMenuItem>
                      <DropdownMenuItem>Change Priority</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
