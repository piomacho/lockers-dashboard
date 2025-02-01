// app/page.tsx (główny plik aplikacji)

import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Witaj w aplikacji do rezerwacji szafek!</h1>
      <p>Przejdź do strony z szafkami:</p>
      <Link href="/lockers">Zobacz szafki</Link>
    </div>
  );
}
