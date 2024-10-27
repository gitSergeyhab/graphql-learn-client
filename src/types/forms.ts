export interface BookMutationFormData {
  title: string;
  year?: number;
  genre?: string;
  authorId?: string;
  mainCharacters: { name: string }[];
}

export interface WriterMutationFormData {
  firstName?: string;
  lastName?: string;
  birthYear?: number;
  deathYear?: number | null;
  country?: string;
  city?: string;
}
