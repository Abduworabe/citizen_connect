import { createContext, useContext, useState, ReactNode } from "react";
import { ServiceRequest, mockRequests as initialRequests, RequestStatus, RequestUpdate } from "@/lib/mock-data";
import { useAuth } from "./auth-context";
import { format } from "date-fns";

interface DataContextType {
  requests: ServiceRequest[];
  addRequest: (request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt" | "status" | "timeline" | "citizenId" | "priority">) => void;
  updateRequestStatus: (id: string, newStatus: RequestStatus) => void;
  addTimelineEntry: (requestId: string, message: string, type: RequestUpdate['type']) => void;
  assignRequest: (requestId: string, employeeId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
  const { user } = useAuth();

  const addRequest = (newRequestData: any) => {
    const newRequest: ServiceRequest = {
      ...newRequestData,
      id: `REQ-2025-${(requests.length + 1).toString().padStart(3, '0')}`,
      status: "pending",
      priority: "medium", // Default priority
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      citizenId: user?.id || "guest",
      timeline: [
        {
          id: `log-${Date.now()}`,
          requestId: `REQ-2025-${(requests.length + 1).toString().padStart(3, '0')}`,
          authorName: user?.name || "Guest",
          authorRole: user?.role || "citizen",
          timestamp: new Date().toISOString(),
          message: "Request created",
          type: "creation"
        }
      ]
    };
    setRequests([newRequest, ...requests]);
  };

  const updateRequestStatus = (id: string, newStatus: RequestStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        const update: RequestUpdate = {
          id: `log-${Date.now()}`,
          requestId: id,
          authorName: user?.name || "System",
          authorRole: user?.role || "admin",
          timestamp: new Date().toISOString(),
          message: `Changed status to ${newStatus.replace('_', ' ')}`,
          type: "status_change",
          newStatus
        };
        return { ...req, status: newStatus, updatedAt: new Date().toISOString(), timeline: [update, ...req.timeline] };
      }
      return req;
    }));
  };

  const addTimelineEntry = (requestId: string, message: string, type: RequestUpdate['type']) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const update: RequestUpdate = {
          id: `log-${Date.now()}`,
          requestId,
          authorName: user?.name || "System",
          authorRole: user?.role || "admin",
          timestamp: new Date().toISOString(),
          message,
          type
        };
        return { ...req, timeline: [update, ...req.timeline] };
      }
      return req;
    }));
  };

  const assignRequest = (requestId: string, employeeId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
         // In a real app we'd look up the employee name
        const update: RequestUpdate = {
          id: `log-${Date.now()}`,
          requestId,
          authorName: user?.name || "System",
          authorRole: user?.role || "admin",
          timestamp: new Date().toISOString(),
          message: `Assigned request to employee ID: ${employeeId}`,
          type: "assignment"
        };
        return { ...req, assignedTo: employeeId, timeline: [update, ...req.timeline] };
      }
      return req;
    }));
  };

  return (
    <DataContext.Provider value={{ requests, addRequest, updateRequestStatus, addTimelineEntry, assignRequest }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
