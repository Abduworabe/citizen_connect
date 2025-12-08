import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { mockRequests } from "@/lib/mock-data";
import { RequestCard } from "@/components/request-card";
import generatedImage from '@assets/generated_images/clean_isometric_city_illustration_for_municipality_portal.png';

export default function Home() {
  const recentRequests = mockRequests.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Municipal Updates
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Report Issues.<br />
            <span className="text-primary">Improve Our City.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            The easiest way to submit service requests, track their progress, and help maintain our community standards.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/submit">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20">
                Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative order-first lg:order-last">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl opacity-30 transform translate-y-4"></div>
          <img 
            src={generatedImage} 
            alt="City Illustration" 
            className="relative z-10 w-full rounded-2xl shadow-2xl border border-border/40 bg-white"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { label: "Issues Resolved", value: "1,248", icon: CheckCircle2, color: "text-green-500" },
          { label: "Active Reports", value: "142", icon: AlertCircle, color: "text-yellow-500" },
          { label: "Community Members", value: "5.2k", icon: Users, color: "text-blue-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-xl border border-border/50 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-background border border-border/50 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Recent Community Reports</h2>
          <Link href="/dashboard">
            <Button variant="link" className="text-primary">View all requests</Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {recentRequests.map(req => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
