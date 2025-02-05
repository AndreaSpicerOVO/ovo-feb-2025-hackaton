import { Country } from "./01-vanilla-class.js";

type Currency = {
  name: string;
  code: string;
  symbol: string;
};

class CountryWithCurrency extends Country {
  currency: Currency;

  constructor(name: string, code: string, currency: Currency) {
    super(name, code);
    this.currency = currency;
  }
}

const currency: Currency = {
  name: "Columbian peso",
  code: "COP",
  symbol: "$",
};

const columbia = new CountryWithCurrency("Colombia", "CO", currency);

const argentia = new CountryWithCurrency();
console.log(columbia);
