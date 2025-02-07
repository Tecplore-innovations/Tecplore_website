"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  FilterX,
  SlidersHorizontal
} from 'lucide-react';

interface Position {
  title: string;
  department: string;
  location: string;
  type: string;
  experienceRequired: number;
  salary: string;
  tags: string[];
  description: string;
}

interface FiltersContentProps {
  departments: string[];
  selectedDepartments: string[];
  experienceYears: number[];
  handleDepartmentChange: (department: string) => void;
  setExperienceYears: (value: number[]) => void;
  clearFilters: () => void;
}

const positions: Position[] = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    experienceRequired: 5,
    salary: "$120k - $160k",
    tags: ["React", "NextJS", "TypeScript"],
    description: "Join our engineering team to build innovative educational platforms"
  },
  {
    title: "Science Content Developer",
    department: "Education",
    location: "Remote",
    type: "Full-time",
    experienceRequired: 3,
    salary: "$80k - $100k",
    tags: ["Science", "Content Creation", "Education"],
    description: "Create engaging science content for our interactive platforms"
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    experienceRequired: 4,
    salary: "$90k - $130k",
    tags: ["Figma", "Design Systems", "User Research"],
    description: "Design intuitive interfaces for our educational products"
  },
  {
    title: "Educational Technology Specialist",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    experienceRequired: 2,
    salary: "$75k - $95k",
    tags: ["EdTech", "Product Strategy", "User Experience"],
    description: "Shape the future of our educational technology products"
  }
];

const departments: string[] = [
  "Engineering",
  "Education",
  "Design",
  "Product"
];

const FiltersContent: React.FC<FiltersContentProps> = ({
  departments,
  selectedDepartments,
  experienceYears,
  handleDepartmentChange,
  setExperienceYears,
  clearFilters
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Departments</h3>
      <div className="space-y-3">
        {departments.map((department) => (
          <div key={department} className="flex items-center space-x-2">
            <Checkbox
              id={department}
              checked={selectedDepartments.includes(department)}
              onCheckedChange={() => handleDepartmentChange(department)}
            />
            <label htmlFor={department} className="text-sm text-gray-600 cursor-pointer">
              {department}
            </label>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t pt-6">
      <h3 className="font-semibold text-gray-900 mb-4">Experience Level</h3>
      <div className="px-2">
        <Slider
          value={experienceYears}
          onValueChange={setExperienceYears}
          max={10}
          step={1}
          defaultValue={[10]}
          className="w-full"
        />
        <div className="mt-2 text-sm text-gray-600">
          {experienceYears[0]} {experienceYears[0] === 1 ? 'year' : 'years'} or less
        </div>
      </div>
    </div>

    <div className="pt-4">
      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="w-full"
      >
        <FilterX className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  </div>
);

const CareersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState<number[]>([10]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const filteredPositions = useMemo(() => {
    let filtered = positions;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(position =>
        position.title.toLowerCase().includes(query) ||
        position.department.toLowerCase().includes(query) ||
        position.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedDepartments.length > 0) {
      filtered = filtered.filter(position =>
        selectedDepartments.includes(position.department)
      );
    }

    return filtered.filter(position =>
      position.experienceRequired <= experienceYears[0]
    );
  }, [searchQuery, selectedDepartments, experienceYears]);

  const handleDepartmentChange = (department: string): void => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const clearFilters = (): void => {
    setSearchQuery('');
    setSelectedDepartments([]);
    setExperienceYears([0]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-gray-800 bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Tecplore
            </span>{" "}
            <span className="text-gray-300">
              Careers
            </span>
          </h1>
          <p className="mt-6 text-center text-gray-400 text-xl max-w-2xl mx-auto">
            Join us in revolutionizing science education through interactive experiences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search positions, departments, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button 
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Mobile */}
          {showMobileFilters && (
            <Card className="lg:hidden p-4">
              <FiltersContent
                departments={departments}
                selectedDepartments={selectedDepartments}
                experienceYears={experienceYears}
                handleDepartmentChange={handleDepartmentChange}
                setExperienceYears={setExperienceYears}
                clearFilters={clearFilters}
              />
            </Card>
          )}

          {/* Filters Sidebar - Desktop */}
          <Card className="hidden lg:block w-64 h-fit p-4 sticky top-8">
            <FiltersContent
              departments={departments}
              selectedDepartments={selectedDepartments}
              experienceYears={experienceYears}
              handleDepartmentChange={handleDepartmentChange}
              setExperienceYears={setExperienceYears}
              clearFilters={clearFilters}
            />
          </Card>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Open Positions {filteredPositions.length > 0 && `(${filteredPositions.length})`}
            </h2>
            
            {filteredPositions.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No positions match your search criteria</h3>
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredPositions.map((position, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold">{position.title}</h3>
                            <p className="text-gray-600 mt-1">{position.description}</p>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <span className="text-lg font-medium text-gray-900">
                              {position.salary}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{position.department}</Badge>
                          <Badge variant="outline">{position.location}</Badge>
                          <Badge>{position.type}</Badge>
                          <Badge variant="secondary">
                            {position.experienceRequired}+ years
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {position.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4">
                          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;