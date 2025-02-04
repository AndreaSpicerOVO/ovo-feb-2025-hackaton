{
  type City = {
    name: string;
    country: string;
  };

  type Population = {
    population: number;
  };

  type CityWithPopulation = City & Population;

  const city: CityWithPopulation = {
    name: "Amsterdam",
    country: "Netherlands",
    population: 821752,
  };

  interface Currency {
    name: string | number;
    exchangeRate: number;
  }

  type CityWithCurrency = Currency & City;

  const testCity: CityWithCurrency = {
    name: 234,
  };

  interface CityWithElevation extends City {}
}
