try {
  const error = new Error("Something went wrong");
  throw error;
} catch (error: unknown) {
  // console.error((error as Array<string>).push("Hello"))
  if (error instanceof Error) {
    error;
  }

  // CALL THE ON CALL TEAM BECAUSE THIS SHOULDN'T HAPPEN
  throw error;
}

// [] === []

class OvoError extends Error {}
