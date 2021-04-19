export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  lastLoggedIn: number;
  profileViews: number;
  age: number;
  country: string;
  city: string;
  address: string;
  phone: string;
  company: string;
  connections: string[];
}

export interface UserAge {
  label: string;
  maxAge: number;
}

export enum UserRoles {
  lawyer = 'lawyer',
  client = 'client',
}

export interface BriefUserInfo {
  id: string;
  firstName: string;
  lastName: string;
}
