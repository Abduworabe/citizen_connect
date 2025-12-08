import { Link, useLocation } from "wouter";
import { useState } from "react";
import { 
  Menu, 
  Home, 
  LayoutDashboard, 
  PlusCircle, 
  LogOut,
  MapPin,
  ShieldCheck,
  HardHat,
  ListTodo,
  BarChart3,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const getNavItems = () => {
    if (!user) return [
      { label: "Home", icon: Home, href: "/" },
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    ];

    switch (user.role) {
      case "admin":
        return [
          { label: "Admin Overview", icon: BarChart3, href: "/admin" },
          { label: "Manage Requests", icon: ListTodo, href: "/admin/requests" },
          { label: "Users & Staff", icon: ShieldCheck, href: "/admin/users" },
        ];
      case "employee":
        return [
          { label: "My Tasks", icon: HardHat, href: "/employee" },
          { label: "All Requests", icon: LayoutDashboard, href: "/employee/requests" },
        ];
      case "citizen":
      default:
        return [
          { label: "Home", icon: Home, href: "/dashboard" },
          { label: "My Requests", icon: ListTodo, href: "/requests" },
          { label: "New Request", icon: PlusCircle, href: "/submit" },
        ];
    }
  };

  const navItems = getNavItems();

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center gap-2 font-bold text-2xl text-primary tracking-tight">
          <MapPin className="h-6 w-6 fill-primary text-primary-foreground" />
          <span>CityFix</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Municipal Services Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40 space-y-4">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user.avatar} />
              <AvatarFallback><UserCircle className="h-6 w-6" /></AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate mt-1 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {user ? 'Sign Out' : 'Back to Role Select'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border/40 bg-card fixed h-full z-10">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/40 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <MapPin className="h-5 w-5 fill-primary text-primary-foreground" />
          <span>CityFix</span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 animate-in fade-in duration-500">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
