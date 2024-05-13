import { useQuery, gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import {
  CountriesQuery,
  AddCountryMutation,
  AddCountryMutationVariables,
  NewCountryInput,
  Country,
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
    continent: null,
  });
  const [countries, setCountries] = useState<any>([]);
  const [emojiError, setEmojiError] = useState<string>("");
  const [codeExistsError, setCodeExistsError] = useState<string>("");

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

  const [createCountryMutation] = useMutation<
    AddCountryMutation,
    AddCountryMutationVariables
  >(ADD_COUNTRY);

  const createCountry = async () => {
    if (!validateEmoji()) {
      return;
    }
    if (codeExists()) {
      return;
    }
    const { data } = await createCountryMutation({
      variables: {
        data: formData,
      },
    });
    setCountries([...countries, data?.addCountry]);
    setFormData({
      name: "",
      emoji: "",
      code: "",
      continent: null,
    });

    setCountries([...countries, data?.addCountry]);
  };

  const validateEmoji = () => {
    const flagRegex = /^[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]$/;
    if (!flagRegex.test(formData.emoji)) {
      setEmojiError("Veuillez entrer un emoji de drapeau valide.");
      return false;
    }
    setEmojiError("");
    return true;
  };

  const codeExists = () => {
    const codeExists = countries.some(
      (country: Country) => country.code === formData.code
    );
    if (codeExists) {
      setCodeExistsError(
        "Le code de pays renseigné existe déjà pour un autre pays, veuillez choisir un autre code."
      );
      return true;
    }
    setCodeExistsError("");
    return false;
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
          className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mb-10 mt-10"
        >
          <h1 className="text-gray-900 font-semibold text-center text-2xl mb-4">
            Ajouter un nouveau pays
          </h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nom :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(event) => {
                updateFormData({ name: event.target.value });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="emoji"
              className="block text-gray-700 font-bold mb-2"
            >
              Emoji :
            </label>
            <input
              type="text"
              id="emoji"
              name="emoji"
              required
              value={formData.emoji}
              onChange={(event) => {
                updateFormData({ emoji: event.target.value });
              }}
              className={`w-full px-3 py-2 border ${
                emojiError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-indigo-500`}
            />
            {emojiError && <p className="text-red-500">{emojiError}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-gray-700 font-bold mb-2"
            >
              Code :
            </label>
            <input
              type="text"
              id="code"
              name="code"
              required
              value={formData.code}
              minLength={2}
              maxLength={3}
              onChange={(event) => {
                updateFormData({ code: event.target.value.toUpperCase() });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            />
            {codeExistsError && (
              <p className="text-red-500">{codeExistsError}</p>
            )}
          </div>
          <select
            id="continent"
            name="continent"
            required
            value={formData.continent?.id || ""}
            onChange={(event) => {
              updateFormData({
                continent: { id: parseInt(event.target.value) },
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="">Sélectionnez un continent</option>
            <option value="1">Europe</option>
            <option value="2">Asie</option>
            <option value="3">Océanie</option>
            <option value="4">Afrique</option>
            <option value="5">Amérique du Nord</option>
            <option value="6">Amérique du Sud</option>
          </select>
          <div className="mt-4">
            <button className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
              Ajouter
            </button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center ml-8">
        {countries.length > 0 ? (
          countries.map((country: any, id: number) => (
            <CountryCard
              key={id}
              flag={country.emoji}
              name={country.name}
              code={country.code}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
