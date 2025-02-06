/**
 * Promise
 *
 * - at some we might get
 * - pending
 * - settled
 * 		- resolve
 * 		- reject
 *
 */

import fs from "node:fs/promises";

let user;
let regions;
let allNews;

fs.readFile("./user.json", "utf-8")
  .then((data) => {
    user = JSON.parse(data);
    return fs.readFile("./regions.json", "utf-8");
  })
  .then((data) => {
    regions = JSON.parse(data);
    return fs.readFile("./news.json", "utf-8");
  })
  .then((data) => {
    const allNews = JSON.parse(data);

    console.log(user, regions, allNews);
  });

// Promise.all([
//   fs.readFile("./user.json", "utf-8"),
//   fs.readFile("./region.json", "utf-8"),
//   fs.readFile("./news.json", "utf-8"),
// ])
//   .then(([userString, regionsString, newsString]) => {
//     const user = JSON.parse(userString);
//     const region = JSON.parse(regionsString);
//     const news = JSON.parse(newsString);

//     console.log(user, region, news);
//   })
//   .catch((error) => console.log(error));
Promise.allSettled([
  fs.readFile("./user.json", "utf-8"),
  fs.readFile("./region.json", "utf-8"),
  fs.readFile("./news.json", "utf-8"),
])
  .then(([userString, regionsString, newsString]) => {
    console.log(userString);
    console.log(regionsString);
    // const user = JSON.parse();
    // const region = JSON.parse(regionsString);
    // const news = JSON.parse(newsString);

    // console.log(user, region, news);
  })
  .catch((error) => console.log(error));
