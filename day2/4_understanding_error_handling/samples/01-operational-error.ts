// Network request with retry strategy
const fetchWithRetry = (url, numRetries = 3) => {
  const attemptFetch = (retryCount) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network error.");
        return response.json();
      })
      .catch((error) => {
        if (retryCount > 0) {
          console.log(`Retrying... ${retryCount} left`);
          attemptFetch(retryCount - 1);
        } else {
          console.error("Operation failed:", error);
        }
      });
  };
  attemptFetch(numRetries);
};
fetchWithRetry("https://api.example.com/data");
