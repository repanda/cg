
export enum Department {
  LOGISTIQUE = 'LOGISTIQUE',
  TCO = 'TCO'
}

// Helper function to convert enum values into an array of objects
export const enumToSelectOptions = (enumObject: Record<string, string>): { value: string; label: string }[] => {
  return Object.entries(enumObject).map(([key, label]) => ({
    value: key,
    label,
  }));
};

// Use the helper function to convert the enum into select options
export const departmentOptions = enumToSelectOptions(Department);
