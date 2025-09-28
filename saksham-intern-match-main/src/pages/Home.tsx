import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search, BookOpen, MapPin, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  education: string;
  skills: string;
  location: string;
  language: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    education: '',
    skills: '',
    location: '',
    language: 'en'
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.education || !formData.skills || !formData.location) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to find the best internships for you.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/ans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          education: formData.education,
          skills: formData.skills,
          location: formData.location,
          language: formData.language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      
      // Navigate to results with the data
      navigate('/results', { state: { internships: data.internships, formData } });
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to the server. Please make sure the backend is running.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            SAKSHAM
          </h1>
          <p className="text-xl text-muted-foreground">
            Your Skills, Your Perfect Internship.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="card-elegant animate-slide-up">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
              <Search className="h-6 w-6 text-primary" />
              Find Your Internship
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Language Selector */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium flex items-center gap-2">
                  🌐 Preferred Language
                </Label>
                <Select 
                  value={formData.language} 
                  onValueChange={(value) => handleInputChange('language', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                    <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Education Field */}
              <div className="space-y-2">
                <Label htmlFor="education" className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Highest Education
                </Label>
                <Select 
                  value={formData.education} 
                  onValueChange={(value) => handleInputChange('education', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th Standard</SelectItem>
                    <SelectItem value="12th">12th Standard</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Skills Field */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  Skills
                </Label>
                <Input
                  id="skills"
                  type="text"
                  placeholder="e.g., python, sql, data analysis, excel"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your skills separated by commas
                </p>
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Preferred Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-hero h-12 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Finding Your Perfect Match...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Find Internships
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Powered by AI • Part of PM Internship Scheme
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;