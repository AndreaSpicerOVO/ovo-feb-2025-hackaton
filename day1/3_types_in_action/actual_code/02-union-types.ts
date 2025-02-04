{
  type Language = string | null;
  let language: Language = null;
  language = "Mandarin";
}

{
  type CityName = "Berlin" | "Bristol" | "London" | "Belfast";

  let city: CityName = "Bristol";

  function welcomeToCity(city: CityName): string {
    return `Welcome to ${city}!`;
  }

  // function whichCity(): CityName {
  // 	if(CityName == "")
  // 	return "Belfast"
  // }
}
