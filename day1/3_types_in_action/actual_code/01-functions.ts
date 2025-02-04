{
  function greetInEnglish(name) {
    return `Hello, ${name}!`;
  }

  console.log(greetInEnglish("Anesu"));
  console.log(greetInEnglish(42));

  function greetInFrench(name: string) {
    return `Bonjour, ${name}`;
  }

  console.log(greetInFrench("Richard"));
  console.log(greetInFrench([]));
}
{
  greetInItalian("Francesco");
  function greetInItalian(name: string): string {
    if (name == "Owen") {
      return true;
    }
    return `Ciao, ${name}`;
  }

  type GreetingFunction = (name: string) => string;
  const greetInSpanish: GreetingFunction = (name) => {
    // do other work ehre
    return `Hola, ${name}`;
  };
}

{
  async function fetchTitle(url: string): Promise<string> {
    const response = await fetch(url);
    const data = await response.json();
    return data.title as string;
  }

  const name = "Mike";

  const nums = [1, 2, 3, 4];

  nums.push(5);
}
