{
  type City = {
    readonly name: string;
    population?: number;
    country: string;
  };

  let berlin: City = {
    name: "Berlin",
    country: "Germany",
  };

  berlin.name = "Paris";

  let tokyo: City = {
    name: "Tokyo",
    population: 13929286,
    country: "Japan",
  };
}

{
  interface City {
    name: string;
    population: number;
    country: string;
  }
}
