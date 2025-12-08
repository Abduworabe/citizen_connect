import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/lib/mock-data";
import { User, HardHat, ShieldCheck, ArrowRight, Building2, MapPin } from "lucide-react";
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
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-50/50"
    },
    {
      id: "employee",
      title: "Municipality Employee",
      description: "View assigned tasks, update status, and log work progress.",
      icon: HardHat,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-50/50"
    },
    {
      id: "admin",
      title: "Administrator",
      description: "Manage users, assign requests, and view system analytics.",
      icon: ShieldCheck,
      color: "bg-gradient-to-br from-slate-700 to-slate-800",
      textColor: "text-slate-700",
      borderColor: "border-slate-200",
      hoverBg: "hover:bg-slate-50/50"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-6xl w-full space-y-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border shadow-sm text-foreground text-sm font-medium mb-4">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="opacity-60">|</span>
            <span>CityFix Municipal Portal v2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            How will you <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              experience the city?
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select a role below to enter the simulation. Each view offers a unique perspective on municipal service management.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 px-4">
          {roles.map((role, index) => (
            <div 
              key={role.id}
              className={`group relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleLogin(role.id as UserRole)}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
              
              <Card className={`h-full border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden ${role.borderColor} ${role.hoverBg}`}>
                <CardHeader className="space-y-6">
                  <div className={`w-16 h-16 rounded-2xl ${role.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <role.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className={`text-2xl font-bold ${role.textColor}`}>
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {role.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="pt-8 pb-8">
                  <div className="w-full flex items-center justify-between text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                    <span>Click to enter simulation</span>
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground pt-8 animate-in fade-in duration-1000 delay-500">
          <p className="flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <MapPin className="h-4 w-4" />
            Mockup Mode • No Authentication Required
          </p>
        </div>
      </div>
    </div>
  );
}
