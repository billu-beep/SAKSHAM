import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Users, Clock, CheckCircle } from 'lucide-react';

interface Internship {
  title: string;
  location: string;
  skills: string[];
  company?: string;
  duration?: string;
  type?: string;
  description?: string;
}

interface LocationState {
  internships: Internship[];
  formData: {
    education: string;
    skills: string;
    location: string;
    language: string;
  };
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // If no data is passed, redirect to home
  useEffect(() => {
    if (!state || !state.internships) {
      navigate('/');
    }
  }, [state, navigate]);

  // Return loading or null if redirecting
  if (!state || !state.internships) {
    return null;
  }

  const { internships, formData } = state;

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient mb-2">
              Perfect Matches Found!
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your profile: {formData.education} • {formData.skills} • {formData.location}
            </p>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-center mb-8 animate-slide-up">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-full">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">
              {internships.length} Personalized Recommendation{internships.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Internship Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship, index) => (
            <Card 
              key={index} 
              className="card-elegant hover:scale-105 transition-all duration-300"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'slide-up 0.6s ease-out forwards'
              }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">
                  {internship.title}
                </CardTitle>
                {internship.company && (
                  <p className="text-sm text-muted-foreground font-medium">
                    {internship.company}
                  </p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{internship.location}</span>
                </div>

                {/* Duration and Type */}
                {(internship.duration || internship.type) && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {internship.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{internship.duration}</span>
                      </div>
                    )}
                    {internship.type && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{internship.type}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Skills */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary"
                        className="skill-pill text-xs px-2 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {internship.description && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Description:</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {internship.description}
                    </p>
                  </div>
                )}

                {/* Apply Button */}
                <Button className="w-full btn-hero">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {internships.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4">No matches found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any internships matching your criteria. Try adjusting your search parameters.
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="btn-hero"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Try Different Search
              </Button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Not satisfied with the results?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Refine Your Search
              </Button>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                View All Internships
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Our AI learns from your preferences to provide better recommendations over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;