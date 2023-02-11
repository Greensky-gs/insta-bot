export const getDayName = (int: number) => {
  const days = {
    1: "lundi",
    2: "mardi",
    3: "mercredi",
    4: "jeudi",
    5: "vendredi",
    6: "samedi",
    7: "dimanche",
  };

  return days[int];
};
export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
