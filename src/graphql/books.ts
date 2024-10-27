import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GET_BOOKS($authorId: ID, $sortBy: String, $order: String) {
    books(authorId: $authorId, sortBy: $sortBy, order: $order) {
      id
      title
      year
      authorId
      author {
        firstName
        lastName
      }
    }
  }
`;

export const GET_BOOK = gql`
  query GET_BOOK($id: ID) {
    book(id: $id) {
      id
      title
      year
      genre
      mainCharacters
      authorId
      author {
        firstName
        lastName
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation ADD_BOOK(
    $title: String!
    $year: Int!
    $authorId: ID!
    $mainCharacters: [String]
    $genre: String
  ) {
    addBook(
      title: $title
      year: $year
      authorId: $authorId
      mainCharacters: $mainCharacters
      genre: $genre
    ) {
      id
      title
      year
      author {
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UPDATE_BOOK(
    $title: String!
    $year: Int!
    $authorId: ID!
    $mainCharacters: [String]
    $genre: String
    $id: ID!
  ) {
    updateBook(
      id: $id
      title: $title
      year: $year
      authorId: $authorId
      mainCharacters: $mainCharacters
      genre: $genre
    ) {
      id
      title
      year
      author {
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DELETE_BOOK($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;
