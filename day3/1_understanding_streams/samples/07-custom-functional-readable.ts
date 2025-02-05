import { Readable } from "node:stream";

const CountDownReadable = (max) => {
  let count = max;
  return new Readable({
    read() {
      const interval = setInterval(() => {
        if (count === 0) {
          this.push(null) && clearInterval(interval); // End stream
        } else {
          this.push(`Countdown: ${count--}`); // Push countdown value
        }
      }, 1000);
    },
  });
};

const countDownReadable = CountDownReadable(5);
countDownReadable.on("data", (chunk) => console.log(chunk.toString()));
