import React from "react";

export default function CountryCard({
  name,
  code,
  flag,
}: {
  name: string;
  code: string;
  flag: string;
}) {
  return (
    <div>
      <a
        href={`/countries/${code}`}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <p>{flag}</p>
        </div>
      </a>
    </div>
  );
}
