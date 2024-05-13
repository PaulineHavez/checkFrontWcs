import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { CountriesQuery } from "@/graphql/generated/schema";
import CountryCard from "@/components/CountryCard";

/* src/index.css */

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      continent {
        name
      }
      emoji
      name
    }
  }
`;

export default function Home() {
  const { data } = useQuery<CountriesQuery>(GET_COUNTRIES);

  return (
    <div>
      {data?.countries.length > 0 ? (
        data.countries.map((country, id) => (
          <CountryCard
            key={id} // Utiliser un identifiant unique comme clé
            flag={country.emoji}
            name={country.name}
          />
        ))
      ) : (
        <p>Pas de pays à afficher</p>
      )}
    </div>
  );
}
