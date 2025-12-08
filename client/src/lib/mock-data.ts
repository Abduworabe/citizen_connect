export type RequestStatus = "pending" | "assigned" | "in_progress" | "completed" | "closed" | "rejected";
export type RequestPriority = "low" | "medium" | "high" | "critical";
export type Department = "water" | "road" | "sanitation" | "electrical" | "support";
export type UserRole = "citizen" | "employee" | "admin";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department?: Department; // Only for employees
  email: string;
  avatar?: string;
}

export interface RequestUpdate {
  id: string;
  requestId: string;
  authorName: string;
  authorRole: UserRole;
  timestamp: string;
  message: string;
  type: "status_change" | "comment" | "assignment" | "creation";
  newStatus?: RequestStatus;
}

export interface ServiceRequest {
  id: string;
  type: Department;
  title: string;
  description: string;
  location: string;
  status: RequestStatus;
  priority: RequestPriority;
  department: Department;
  assignedTo?: string; // Employee ID
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  citizenId: string;
  timeline: RequestUpdate[];
}

export const mockUsers: User[] = [
  {
    id: "user-citizen-1",
    name: "Alex Citizen",
    role: "citizen",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: "user-employee-water",
    name: "Sarah Waterworks",
    role: "employee",
    department: "water",
    email: "sarah@city.gov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "user-employee-road",
    name: "Mike Constructor",
    role: "employee",
    department: "road",
    email: "mike@city.gov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
  },
  {
    id: "user-admin-1",
    name: "Admin Officer",
    role: "admin",
    email: "admin@city.gov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
  }
];

export const mockRequests: ServiceRequest[] = [
  {
    id: "REQ-2025-001",
    type: "water",
    department: "water",
    title: "Leaking Fire Hydrant",
    description: "The fire hydrant on the corner of Main St and 4th Ave has been leaking water for 2 days. Gallons are being wasted.",
    location: "Main St & 4th Ave",
    status: "in_progress",
    priority: "high",
    assignedTo: "user-employee-water",
    createdAt: "2025-12-05T10:00:00Z",
    updatedAt: "2025-12-06T14:00:00Z",
    citizenId: "user-citizen-1",
    imageUrl: "https://images.unsplash.com/photo-1583306346313-e9295d445582?auto=format&fit=crop&q=80&w=1000",
    timeline: [
      {
        id: "log-1",
        requestId: "REQ-2025-001",
        authorName: "Alex Citizen",
        authorRole: "citizen",
        timestamp: "2025-12-05T10:00:00Z",
        message: "Request created",
        type: "creation"
      },
      {
        id: "log-2",
        requestId: "REQ-2025-001",
        authorName: "Admin Officer",
        authorRole: "admin",
        timestamp: "2025-12-05T11:30:00Z",
        message: "Assigned to Water Department (Sarah Waterworks)",
        type: "assignment"
      },
      {
        id: "log-3",
        requestId: "REQ-2025-001",
        authorName: "Sarah Waterworks",
        authorRole: "employee",
        timestamp: "2025-12-06T09:00:00Z",
        message: "Changed status to In Progress. Crew dispatched.",
        type: "status_change",
        newStatus: "in_progress"
      }
    ]
  },
  {
    id: "REQ-2025-002",
    type: "road",
    department: "road",
    title: "Large Pothole causing traffic",
    description: "Deep pothole in the right lane, potentially dangerous for cyclists.",
    location: "125 Oak Street",
    status: "pending",
    priority: "medium",
    createdAt: "2025-12-07T08:30:00Z",
    updatedAt: "2025-12-07T08:30:00Z",
    citizenId: "user-citizen-1",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000",
    timeline: [
      {
        id: "log-4",
        requestId: "REQ-2025-002",
        authorName: "Alex Citizen",
        authorRole: "citizen",
        timestamp: "2025-12-07T08:30:00Z",
        message: "Request created",
        type: "creation"
      }
    ]
  },
  {
    id: "REQ-2025-003",
    type: "sanitation",
    department: "sanitation",
    title: "Missed Trash Collection",
    description: "Trash was not collected this Tuesday for the entire block.",
    location: "Maple Avenue Block 200",
    status: "resolved",
    priority: "low",
    assignedTo: "user-employee-sanitation",
    createdAt: "2025-12-01T14:15:00Z",
    updatedAt: "2025-12-02T11:00:00Z",
    citizenId: "user-citizen-2",
    timeline: [
      {
        id: "log-5",
        requestId: "REQ-2025-003",
        authorName: "John Doe",
        authorRole: "citizen",
        timestamp: "2025-12-01T14:15:00Z",
        message: "Request created",
        type: "creation"
      },
      {
        id: "log-6",
        requestId: "REQ-2025-003",
        authorName: "Admin Officer",
        authorRole: "admin",
        timestamp: "2025-12-02T11:00:00Z",
        message: "Marked as Resolved. Truck rerouted.",
        type: "status_change",
        newStatus: "resolved"
      }
    ]
  },
  {
    id: "REQ-2025-004",
    type: "electrical",
    department: "electrical",
    title: "Street light flickering",
    description: "Light post #452 is flickering constantly at night.",
    location: "Sunset Blvd near Park Entrance",
    status: "pending",
    priority: "low",
    createdAt: "2025-12-08T09:00:00Z",
    updatedAt: "2025-12-08T09:00:00Z",
    citizenId: "user-citizen-1",
    timeline: [
       {
        id: "log-7",
        requestId: "REQ-2025-004",
        authorName: "Alex Citizen",
        authorRole: "citizen",
        timestamp: "2025-12-08T09:00:00Z",
        message: "Request created",
        type: "creation"
      }
    ]
  },
];
