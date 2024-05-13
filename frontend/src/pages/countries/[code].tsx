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
    return (
      <div>
        <p className="text-red-500 text-center">
          Erreur lors du chargement de la page : il semblerait que le pays
          demandé ne soit pas renseigné sur notre site.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card">
        <div className="flex flex-col items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data?.country.name} ({data?.country.code})
          </h5>
          <p>{data?.country.emoji}</p>
          <p className=" text-gray-700 text-center">
            {data?.country.continent?.name || "Continent non renseigné"}
          </p>
        </div>
      </div>
    </div>
  );
}
