let something = "";

typeof something === "";

export const city1 = {
  name: "Istanbul",
  country: "Turkey",
};

export type City = typeof city1;

export type CityWithPopulation = City & { population?: number };

let name = "";

export {};
