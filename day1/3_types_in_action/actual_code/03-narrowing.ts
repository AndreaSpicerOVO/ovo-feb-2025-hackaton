{
  function formatPopulation(population: number | string) {
    if (typeof population === "string") {
      return parseInt(population);
    }
    population;
  }
}
{
  class City {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  interface CityName {
    name: string;
  }

  function outputLocaiton(location: City | string) {
    if (location instanceof City) {
      console.log(location.name);
    } else {
      console.log(location);
    }
  }

  function formatCity(city: "London" | "Paris" | "Tokyo") {
    city;
    if (city === "Paris") {
      return `The City of Light: ${city}`;
    }
    city;
    if (city === "Tokyo") {
      return `The City of the Future: ${city}`;
    }
    city;
    if (city === "London") {
      return `The City that Never Sleeps: ${city}`;
    }
    throw new Error("Unhandled city");
  }
}
