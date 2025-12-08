export type RequestStatus = "pending" | "in_progress" | "resolved";

export interface ServiceRequest {
  id: string;
  type: "water" | "garbage" | "road" | "street_light" | "other";
  title: string;
  description: string;
  location: string;
  status: RequestStatus;
  createdAt: string;
  imageUrl?: string;
  updatedAt?: string;
}

export const mockRequests: ServiceRequest[] = [
  {
    id: "REQ-2025-001",
    type: "water",
    title: "Leaking Fire Hydrant",
    description: "The fire hydrant on the corner of Main St and 4th Ave has been leaking water for 2 days.",
    location: "Main St & 4th Ave",
    status: "in_progress",
    createdAt: "2025-12-05T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1583306346313-e9295d445582?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "REQ-2025-002",
    type: "road",
    title: "Large Pothole causing traffic",
    description: "Deep pothole in the right lane, potentially dangerous for cyclists.",
    location: "125 Oak Street",
    status: "pending",
    createdAt: "2025-12-07T08:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "REQ-2025-003",
    type: "garbage",
    title: "Missed Trash Collection",
    description: "Trash was not collected this Tuesday for the entire block.",
    location: "Maple Avenue Block 200",
    status: "resolved",
    createdAt: "2025-12-01T14:15:00Z",
    updatedAt: "2025-12-02T11:00:00Z",
  },
  {
    id: "REQ-2025-004",
    type: "street_light",
    title: "Street light flickering",
    description: "Light post #452 is flickering constantly at night.",
    location: "Sunset Blvd near Park Entrance",
    status: "pending",
    createdAt: "2025-12-08T09:00:00Z",
  },
];

export const mockUser = {
  name: "Alex Citizen",
  role: "citizen" as const, // Change to 'employee' or 'admin' to test other views
};
