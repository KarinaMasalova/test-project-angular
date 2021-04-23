export interface Filters {
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  age: string;
  role: string;
}

export const initialFilters: Filters = {
  firstname: '',
  lastname: '',
  country: '',
  city: '',
  age: '',
  role: '',
};
