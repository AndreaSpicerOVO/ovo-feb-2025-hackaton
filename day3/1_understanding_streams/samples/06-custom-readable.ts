import { Readable } from "node:stream";

class NumberStream extends Readable {
  current;
  max;

  constructor(max, options) {
    super(options);
    this.current = 1;
    this.max = max;
  }

  _read() {
    const interval = setInterval(() => {
      if (this.current <= this.max) {
        console.log(`Pushing number: ${this.current}`);
        this.push(String(this.current)); // Push data
        this.current += 1;
      } else {
        clearInterval(interval);
        this.push(null); // No more data
      }
    }, 1000); // 1-second delay
  }
}

const numberStream = new NumberStream(5);
numberStream.on("data", (chunk) => console.log(chunk.toString()));
