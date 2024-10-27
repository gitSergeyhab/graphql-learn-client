export interface WriterItem {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: number;
}

export interface WriterFull extends WriterItem {
  deathYear: number;
  country: string;
  city: string;
}

export interface WriterNameId {
  id: string;
  firstName: string;
  lastName: string;
}
