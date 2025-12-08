import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/lib/mock-data";
import { User, HardHat, ShieldCheck, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import generatedImage from '@assets/generated_images/clean_isometric_city_illustration_for_municipality_portal.png';

export default function RoleSelect() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = (role: UserRole) => {
    login(role);
    if (role === 'admin') {
      setLocation("/admin");
    } else if (role === 'employee') {
      setLocation("/employee");
    } else {
      setLocation("/dashboard");
    }
  };

  const roles = [
    {
      id: "citizen",
      title: "Citizen",
      description: "Submit requests, track progress, and view community updates.",
      icon: User,
      color: "bg-blue-500",
      hoverColor: "hover:border-blue-500",
      buttonColor: "hover:bg-blue-600"
    },
    {
      id: "employee",
      title: "Municipality Employee",
      description: "View assigned tasks, update status, and log work progress.",
      icon: HardHat,
      color: "bg-orange-500",
      hoverColor: "hover:border-orange-500",
      buttonColor: "hover:bg-orange-600"
    },
    {
      id: "admin",
      title: "Administrator",
      description: "Manage users, assign requests, and view system analytics.",
      icon: ShieldCheck,
      color: "bg-slate-800",
      hoverColor: "hover:border-slate-800",
      buttonColor: "hover:bg-slate-900"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            CityFix Portal v2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Select Your Role</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the platform from different perspectives. 
            Select a user type below to simulate the workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-transparent ${role.hoverColor} group cursor-pointer`}
              onClick={() => handleLogin(role.id as UserRole)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${role.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
                <CardDescription className="text-base pt-2">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-8">
                <Button className="w-full justify-between group-hover:pl-6 transition-all">
                  Enter as {role.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground pt-8">
          <p>Mockup Mode • No Real Authentication Required</p>
        </div>
      </div>
    </div>
  );
}
