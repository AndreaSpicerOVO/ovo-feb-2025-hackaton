import fs from "node:fs";

// 3 states
// pending - waiting around for async operation to finish IOU/slip
// fulfilled/resolved  - got what we wanted
// error/reject - something went wrong (didn't return, some error)



function promiseReadFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

promiseReadFile("./user.json")
  .then((userData) => {
    const user = JSON.parse(userData);
    return promiseReadFile("./regions.json").then((regionsData) => ({
      user,
      regionsData,
    }));
  })
  .then(({ user, regionsData }) => {
    const regions = JSON.parse(regionsData);
    const userRegionNewsIDs = regions[user.region];
    return promiseReadFile("./news.json").then((newsData) => ({
      userRegionNewsIDs,
      newsData,
    }));
  })
  .then(({ userRegionNewsIDs, newsData }) => {
    const allNews = JSON.parse(newsData);
    const userNews = allNews.filter((article) =>
      userRegionNewsIDs.includes(article.id)
    );

    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("-----");
    });
  })
  .catch((error) => console.log(error));

// **Exercise: Refactoring File Operations with Promises**

// In the previous exercise, you used callbacks with the `fs` module to handle file operations. Asynchronous operations with callbacks can lead to nested structures, commonly referred to as "Callback Hell". To streamline your code, Node.js offers Promise-based file operations which can make your code more readable and easy to handle.

// **Objective:**
// Refactor the previous exercise's solution to use Promises with the `fs/promises` module.

// **Instructions:**

// 1. Update your import at the top of your file to:
//    ```javascript
//    import fs from "node:fs/promises";
//    ```

// 2. Rewrite your file writing and reading logic using the Promise-based methods provided by `fs/promises`.

// 3. With `fs.promises.writeFile()`, you can directly use the `.then()` method to handle the successful write operation or `.catch()` to handle any errors.

// 4. After writing, use `fs.promises.readFile()` to read and display the content of the file. Remember, the content read will be in Buffer format. Convert it to a string for display.

// 5. Handle any potential errors gracefully.

// **Hints:**

// - The Promise-based `writeFile` doesn't need a callback. Instead, it returns a Promise that resolves once the file writing is complete.
// - When using `readFile`, remember to specify the encoding (e.g., 'utf8') if you want the returned data to be in string format.
// - Chain your promises with `.then()` to ensure operations occur in the right order.

// ---------

// Promise.all();
// Explain that Promise.all() allows multiple promises to be processed in parallel.
// This can lead to performance gains, especially when I/O operations don't depend
// on each other.

const userPromise = promiseReadFile("./user.json").then(
  (data) => JSON.parse(data)
);
const regionsPromise = promiseReadFile("./regions.json").then(
  (data) => JSON.parse(data)
);
const newsPromise = promiseReadFile("./news.json").then((data) =>
  JSON.parse(data)
);

Promise.all([userPromise, regionsPromise, newsPromise])
  .then(([user, regions, allNews]) => {
    const userNews = allNews.filter((article) =>
      regions[user.region].includes(article.id)
    );
    userNews.forEach((news) => {
      console.log(news.headline);
      console.log(news.content);
      console.log("-----");
    });
  })
  .catch((error) => console.log(error));

// Promise.allSettled()
// Promise.all() rejects if any of the promises reject, Promise.allSettled()
// ensures that all promises are settled (either resolved or rejected). This
// is useful when we need results from multiple promises, but don't want a
// single failure to reject the entire batch.
//...
Promise.allSettled([userPromise, regionsPromise, newsPromise]).then(
  (results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log("Fulfilled with:", result.value);
      } else {
        console.error("Rejected with:", result.reason);
      }
    });
  }
);

// Promise.race

// Promise.race() will settle as soon as one of the promises settles (be it
// resolved or rejected). It's like a race between multiple promises.

// Maybe simulate a race between reading two files, where one is intentionally delayed
//...
const fastPromise = promiseReadFile("./fastFile.json");
const slowPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(promiseReadFile("./slowFile.json"));
  }, 2000);
});

Promise.race([fastPromise, slowPromise])
  .then((data) => console.log("First to finish:", data))
  .catch((error) => console.log(error));
