import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="relative">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="absolute inset-0 h-8 w-8 rounded-full loading-gradient opacity-30"></div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;