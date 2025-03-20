
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { LucideHome } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tighter">404</h1>
          <p className="text-xl text-muted-foreground">
            Page not found
          </p>
        </div>
        <p className="max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <a href="/">
            <LucideHome className="h-4 w-4 mr-2" />
            Return to Home
          </a>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
