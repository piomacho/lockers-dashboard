interface Locker {
  id: number;
  is_available: boolean;
}

export const fetchLockers = async () => {
  const res = await fetch(
    "https://piomacho999.pythonanywhere.com/api/lockers/"
  );
  const lockers: Locker[] = await res.json();
  return lockers;
};
