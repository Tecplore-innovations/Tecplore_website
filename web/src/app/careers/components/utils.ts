import { Position } from './types';

export const getExperienceRange = (years: number): string => {
  if (years <= 2) return '0-2 years';
  if (years <= 4) return '2-4 years';
  if (years <= 6) return '4-6 years';
  return '6+ years';
};

export const generateFilterOptions = (positions: Position[]) => {
  const filterOptions: Record<string, Map<string, number>> = {
    Experience: new Map(),
    'Work site': new Map(),
    Profession: new Map(),
    Discipline: new Map(),
    'Role type': new Map(),
    'Employment type': new Map()
  };

  positions.forEach(position => {
    // Experience ranges
    const expRange = getExperienceRange(position.experienceRequired);
    filterOptions.Experience.set(expRange, (filterOptions.Experience.get(expRange) || 0) + 1);

    // Work site
    filterOptions['Work site'].set(position.workSite, (filterOptions['Work site'].get(position.workSite) || 0) + 1);

    // Profession (Department)
    filterOptions.Profession.set(position.department, (filterOptions.Profession.get(position.department) || 0) + 1);

    // Discipline
    filterOptions.Discipline.set(position.discipline, (filterOptions.Discipline.get(position.discipline) || 0) + 1);

    // Role type
    filterOptions['Role type'].set(position.roleType, (filterOptions['Role type'].get(position.roleType) || 0) + 1);

    // Employment type
    filterOptions['Employment type'].set(position.employmentType, (filterOptions['Employment type'].get(position.employmentType) || 0) + 1);
  });

  // Convert Maps to arrays of FilterOption objects and sort by count
  return Object.fromEntries(
    Object.entries(filterOptions).map(([category, countMap]) => [
      category,
      Array.from(countMap.entries())
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
    ])
  );
};

export const filterPositions = (
  positions: Position[], 
  searchQuery: string, 
  selectedFilters: Record<string, string[]>
) => {
  let filtered = positions;

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(position =>
      position.title.toLowerCase().includes(query) ||
      position.department.toLowerCase().includes(query) ||
      position.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply each filter category
  Object.entries(selectedFilters).forEach(([category, selectedValues]) => {
    if (selectedValues.length > 0) {
      filtered = filtered.filter(position => {
        switch (category) {
          case 'Experience': {
            const years = position.experienceRequired;
            return selectedValues.some((range: string) => {
              if (range.includes('+')) {
                const minYears = parseInt(range.replace(/\D/g, ''));
                return years >= minYears;
              }
              const [min, max] = range.split('-').map((n: string): number => parseInt(n));
              return years >= min && years <= max;
            });
          }
          case 'Work site':
            return selectedValues.some((site: string) => 
              position.workSite.toLowerCase().includes(site.toLowerCase())
            );
          case 'Profession':
            return selectedValues.includes(position.department);
          case 'Discipline':
            return selectedValues.includes(position.discipline);
          case 'Role type':
            return selectedValues.includes(position.roleType);
          case 'Employment type':
            return selectedValues.includes(position.employmentType);
          default:
            return true;
        }
      });
    }
  });

  return filtered;
};