import { useQuery, gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  CountriesQuery,
  AddCountryMutation,
  AddCountryMutationVariables,
  NewCountryInput,
} from "@/graphql/generated/schema";
import CountryCard from "@/components/CountryCard";
import Loader from "@/components/Loader/Loader";

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      continent {
        name
      }
      emoji
      name
      code
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      name
      emoji
      code
    }
  }
`;

export default function Home() {
  const { data } = useQuery<CountriesQuery>(GET_COUNTRIES);
  const [formData, setFormData] = useState<NewCountryInput>({
    name: "",
    emoji: "",
    code: "",
  });
  const [countries, setCountries] = useState<any>([]);
  useEffect(() => {
    if (data) {
      if (data && data.countries) {
        setCountries(data.countries);
      }
    }
  }, [data]);

  const updateFormData = (partialFormData: Partial<NewCountryInput>) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createCoutryMutation] = useMutation<
    AddCountryMutation,
    AddCountryMutationVariables
  >(ADD_COUNTRY);

  const createCountry = async () => {
    const { data } = await createCoutryMutation({
      variables: {
        data: formData,
      },
    });
    console.log(data);
    setCountries([...countries, data?.addCountry]);
  };

  return (
    <div>
      <div className="form-container">
        <form
          id="myForm"
          onSubmit={(event) => {
            event.preventDefault();
            createCountry();
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(event) => {
                updateFormData({ name: event.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emoji">Emoji :</label>
            <input
              type="text"
              id="emoji"
              name="emoji"
              required
              onChange={(event) => {
                updateFormData({ emoji: event.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Code :</label>
            <input
              type="text"
              id="code"
              name="code"
              required
              onChange={(event) => {
                updateFormData({ code: event.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <button type="submit">Soumettre</button>
          </div>
        </form>
      </div>
      {countries.length > 0 ? (
        countries.map((country: any, id: number) => (
          <CountryCard key={id} flag={country.emoji} name={country.name} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
