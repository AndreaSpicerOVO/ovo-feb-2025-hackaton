{
  type Country<Type> = {
    name: string;
    capital: Type;
  };

  const country: Country<string> = {
    name: "Spain",
    capital: "Madrid",
  };

  const numbers: Array<number> = [12, 3, true];
}
