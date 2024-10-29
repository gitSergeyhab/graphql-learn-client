import { BookFull, BookNoId } from "../types/book";
import { Country } from "../types/country";
import { BookMutationFormData, WriterMutationFormData } from "../types/forms";
import { Option } from "../types/ui";
import { WriterFull, WriterNameId } from "../types/writer";

export const adaptCountry = (country: Country): Option => ({
  label: country.name,
  value: country.name,
});

export const adaptCountries = (countries: Country[]): Option[] =>
  countries.map(adaptCountry);

export const adaptBookToBack = (
  book: BookMutationFormData
): Partial<BookNoId> => ({
  ...book,
  mainCharacters: book.mainCharacters.map(({ name }) => name),
});

export const adaptBookToForm = (book: BookFull): BookMutationFormData => ({
  ...book,
  mainCharacters: book.mainCharacters.map((name) => ({ name, id: name })),
});

export const adaptWriterIdName = (writer: WriterNameId): Option => ({
  label: writer.firstName + " " + writer.lastName,
  value: writer.id,
});

export const adaptWriterToForm = (
  writer: WriterFull
): WriterMutationFormData => ({
  ...writer,
  country: writer.country,
});
