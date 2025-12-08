import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Upload, MapPin } from "lucide-react";
import { useData } from "@/context/data-context";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  type: z.string({ required_error: "Please select a service type" }),
  description: z.string().min(10, "Please provide more detail"),
  location: z.string().min(5, "Location is required"),
});

export default function SubmitRequest() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { addRequest } = useData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Add to context
    addRequest({
      title: values.title,
      type: values.type as any,
      description: values.description,
      location: values.location,
      department: values.type as any, // Simple mapping for now
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000", // Placeholder image for demo
    });

    toast({
      title: "Request Submitted Successfully",
      description: "Your report has been logged and assigned a reference number.",
    });
    
    // Simulate delay then redirect
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1000);
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Submit a New Request</h1>
          <p className="text-muted-foreground mt-1">
            Help us fix issues in your neighborhood. Please provide as much detail as possible.
          </p>
        </div>

        <div className="bg-card border border-border/60 rounded-xl shadow-sm p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of issue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="water">Water Leak / Pipeline</SelectItem>
                        <SelectItem value="garbage">Garbage Collection</SelectItem>
                        <SelectItem value="road">Road Repair / Pothole</SelectItem>
                        <SelectItem value="electrical">Street Light / Electrical</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Leaking hydrant on Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter address or landmark" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Specific addresses help us locate issues faster.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Photo Evidence</Label>
                  <div className="border-2 border-dashed border-border rounded-md p-4 flex flex-col items-center justify-center h-[100px] text-muted-foreground bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-6 w-6 mb-2" />
                    <span className="text-xs">Click to upload image</span>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the issue in detail..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex gap-4">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Submit Request
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => setLocation("/")}>
                  Cancel
                </Button>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
