interface Country {
  readonly name: string;
  readonly code: string;
  population?: number;
}

const currencyExample = {
  name: "Lion's tears",
  exchange_rate: 1.2,
};

interface CountryWithCurrency extends Country {
  currency: typeof currencyExample;
  describe: () => string;
}

const country1: Country = {
  name: "Narnia",
  code: "NN",
  population: 256,
  currency: {
    name: "Lion's tears",
  },
};

class LukeError extends Error {}
