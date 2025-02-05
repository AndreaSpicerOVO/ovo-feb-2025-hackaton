async function getJson(url, signal) {
  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch. Status: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request Aborted");
      throw error; // You might want the caller to know that the request was aborted
    }

    console.error(`Error fetching data: ${error.message}`);
    throw error;
  }
}

async function run() {
  try {
    const data = await getJson("https://swapi.dev/api/people", signal);
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to run: ${error.message}`);
    } else {
      console.error(`Something has gone wrong: ${error}`);
    }
  }
}

const ac = new AbortController();
const { signal } = ac;

run();

setTimeout(() => {
  ac.abort(); // Delay the abort to demonstrate aborting in action
}, 1000);
