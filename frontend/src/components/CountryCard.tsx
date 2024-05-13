import React from "react";

export default function CountryCard({
  name,

  flag,
}: {
  name: string;

  flag: string;
}) {
  return (
    <div className="card">
      <div className="flag">{flag}</div>
      <div className="name">{name}</div>
    </div>
  );
}
