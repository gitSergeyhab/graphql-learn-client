import { gql } from "@apollo/client";

export const GET_WRITERS = gql`
  query GET_WRITERS($country: String) {
    writers(country: $country) {
      id
      firstName
      lastName
      birthYear
    }
  }
`;

export const GET_WRITERS_ID_NAME = gql`
  query GET_WRITERS {
    writers {
      id
      firstName
      lastName
    }
  }
`;

export const GET_WRITER = gql`
  query GET_WRITER($id: ID!) {
    writer(id: $id) {
      id
      firstName
      lastName
      birthYear
      deathYear
      country
      city
    }
  }
`;

export const ADD_WRITER = gql`
  mutation ADD_WRITER(
    $firstName: String!
    $lastName: String!
    $birthYear: Int!
    $deathYear: Int
    $country: String!
    $city: String
  ) {
    addWriter(
      firstName: $firstName
      lastName: $lastName
      birthYear: $birthYear
      deathYear: $deathYear
      country: $country
      city: $city
    ) {
      id
      firstName
      lastName
      birthYear
      deathYear
      country
      city
    }
  }
`;

export const UPDATE_WRITER = gql`
  mutation UPDATE_WRITER(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $birthYear: Int!
    $deathYear: Int
    $country: String!
    $city: String
  ) {
    updateWriter(
      id: $id
      firstName: $firstName
      lastName: $lastName
      birthYear: $birthYear
      deathYear: $deathYear
      country: $country
      city: $city
    ) {
      id
      firstName
      lastName
      birthYear
      deathYear
      country
      city
    }
  }
`;
