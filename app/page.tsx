// app/page.tsx (główny plik aplikacji)

import Link from "next/link";
import LockersPage from "./lockers/page";

export default function HomePage() {
  return (
    <div>
      <LockersPage />
    </div>
  );
}
