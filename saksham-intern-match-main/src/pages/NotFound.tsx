import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="card-elegant max-w-md w-full text-center">
        <CardContent className="pt-8 pb-8">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-gradient-primary p-4">
              <AlertCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button 
            onClick={() => navigate('/')}
            className="btn-hero w-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to SAKSHAM
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
