import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-200 text-center">
      <h1 className="text-gray-900 text-4xl font-semibold text-center">
        Checkpoint : frontend
      </h1>
      <Link href="/" className="text-gray-900 font-semibold">
        Countries
      </Link>
    </header>
  );
}
