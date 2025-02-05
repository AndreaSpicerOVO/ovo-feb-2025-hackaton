class Country<LanguageType> {
  readonly languages: LanguageType[] = [];

  constructor(readonly name: string, readonly code: string) {}

  addLanguage(language: LanguageType) {
    this.languages.push(language);
  }
}

type Language = { name: string; percentage: number };

const india = new Country<Language>("India", "IN");
india.addLanguage({ name: "Hindi", percentage: 57 });
india.addLanguage({ name: "Bengali", percentage: 9 });
