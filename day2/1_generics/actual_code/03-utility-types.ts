{
  type City = {
    name?: string;
    country?: string;
  };

  // Partial/Required
  const city: Partial<City> = {};
  city.country = "Scotland";
  city.name = "Edinburgh";

  const readonlyCity: Readonly<City> = {
    name: "Belfast",
    country: "Northern Ireland",
  };

  readonlyCity.name = "Dublin";

  interface ProgrammingLanguage {
    readonly name: string;
    usage?: number;
    looksLike: string[];
  }

  type ProgrammingWithoutLookLike = Omit<
    ProgrammingLanguage,
    "looksLike" | "name"
  >;
  type ProgrammingWithJustLookLike = Pick<ProgrammingLanguage, "looksLike">;

  const key = {
    asd: 12,
    [Symbol("121")]: 121,
    [2313]: 1221,
  };

  function doSomething(name: string) {
    return name;
  }

  type Test = ReturnType<typeof doSomething>;
}
