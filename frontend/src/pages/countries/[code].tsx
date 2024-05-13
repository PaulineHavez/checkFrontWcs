import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  CountriesQueryVariables,
  CountryQuery,
} from "@/graphql/generated/schema";

const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      name
      emoji
      continent {
        name
      }
    }
  }
`;
let code: string = "FR";

export default function country() {
  const { data, loading, error } = useQuery<
    CountryQuery,
    CountriesQueryVariables
  >(GET_COUNTRY, { variables: { code } });

  console.log(data);

  return <div></div>;
}
