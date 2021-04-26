export interface Filters {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  age: string;
  role: string;
}

export const initialFilters: Filters = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  age: '',
  role: '',
};
