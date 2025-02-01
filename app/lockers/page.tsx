// app/page.tsx (główny plik aplikacji)

import StyledLockers from "../components/Lockers";

// app/lockers/page.tsx (serwerowy komponent LockersPage)
// Funkcja asynchroniczna, która fetchuje dane o szafkach
export default async function LockersPage() {
  // const res = await fetch("https://piomacho999.pythonanywhere.com/api/lockers");
  // if (!res.ok) {
  //   throw new Error("Nie udało się pobrać szafek");
  // }

  // const lockers: LockerType[] = await res.json();

  return (
    <div>
      <StyledLockers />
    </div>
  );
}
