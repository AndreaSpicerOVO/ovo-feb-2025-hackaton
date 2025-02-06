import { Readable } from "node:stream";
import { createWriteStream } from "node:fs";
class NumberStream extends Readable {
  current: number = 0;
  max: number;

  constructor(max: number, options = {}) {
    super(options);
    this.max = max;
  }

  _read() {
    const interval = setInterval(() => {
      if (this.current < this.max) {
        console.log(`Pusshing number: ${this.current}`);
        this.push(String(this.current));
        this.current += 1;
      } else {
        clearInterval(interval);
        this.push(null);
      }
    }, 1000);
  }
}

const numberStream = new NumberStream(5);
numberStream.pipe(createWriteStream("numbers.txt"));
numberStream.on("data", (chunk) => console.log(chunk));
numberStream.on("end", () => console.log("all done"));
numberStream.on("error", (err) => console.log(err));

// numberStream.once()

// .once
// .prependerListener
// numberStream.prependOnceListener
