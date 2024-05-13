import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  CountryQueryVariables,
  CountryQuery,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";

const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export default function country() {
  const router = useRouter();
  const code = router.query.code as string;

  const { data, loading, error } = useQuery<
    CountryQuery,
    CountryQueryVariables
  >(GET_COUNTRY, { variables: { code } });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return "Erreur lors du chargement de la page : il semblerait que le pays demandé ne soit pas renseigné sur notre site.";
  }

  return (
    <div className="card">
      <div className="flag">{data?.country.emoji}</div>
      <div className="name">
        {data?.country.name} ({data?.country.code})
      </div>
      <div className="name">{data?.country.continent?.name}</div>
    </div>
  );
}
