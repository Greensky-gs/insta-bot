export const getDayName = (int: number) => {
  const days = {
    0: "lundi",
    1: "mardi",
    2: "mercredi",
    3: "jeudi",
    4: "vendredi",
    5: "samedi",
    6: "dimanche",
  };

  return days[int];
};
export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
