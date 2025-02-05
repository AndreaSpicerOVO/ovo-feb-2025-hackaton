{
  class Country {
    name = "Unknown";
    code = "Unknown";
  }
  const nigeria = new Country();

  nigeria.name = "Nigeria";
  nigeria.code = "NG";

  console.log(nigeria);
}

{
  class Country {
    name;
    code;

    constructor(name: string = "Unknown", code: string = "Unknown") {
      this.name = name;
      this.code = code;
    }
  }

  const nigeria = new Country("Nigeria", "NG");
  console.log(nigeria);
}
{
  class Country {
    constructor(public name: string, public code: string) {}
  }

  const nigeria = new Country("Nigeria", "NG");
  console.log(nigeria);
}
export class Country {
  constructor(
    readonly name: string,
    readonly code: string,
    public languages: string[] = []
  ) {}

  addLanguage(language: string) {
    this.languages.push(language);
  }

  describeLanguages(): string {
    return `The languages spoken in ${this.name} include: ${this.languages.join(
      ", "
    )}`;
  }
}

const nigeria = new Country("Nigeria", "NG");
nigeria.addLanguage("Hausa");
nigeria.addLanguage("Igbo");
nigeria.addLanguage("Yoruba");
nigeria.addLanguage("English");
console.log(nigeria.describeLanguages());
