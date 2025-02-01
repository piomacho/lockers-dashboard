export const getLockers = async () => {
  const url = new URL("http://piomacho999.pythonanywhere.com/api/lockers/");
  const res = await fetch(url);
  return await res.json();
};
