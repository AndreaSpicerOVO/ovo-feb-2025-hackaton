import { Duplex } from "node:stream";
import { createGzip, createGunzip } from "node:zlib";

class CompressionStream extends Duplex {
  constructor(options = {}) {
    super(options);
    this.gzip = createGzip(); // For compression
    this.gunzip = createGunzip(); // For decompression
    this.buffer = []; // Temporary storage for decompressed data
  }

  _write(chunk, encoding, callback) {
    this.gzip.write(chunk, encoding, (err) => {
      if (err) return callback(err);
      callback();
    });
  }

  _read(size) {
    const chunk = this.buffer.shift();
    if (chunk) {
      this.push(chunk);
    } else {
      this.gunzip.once("data", (data) => {
        this.buffer.push(data);
        this.push(this.buffer.shift());
      });
    }
  }

  _final(callback) {
    this.gzip.end(() => {
      this.gzip.pipe(this.gunzip);
      callback();
    });
  }
}

// Example Usage
const compressionStream = new CompressionStream();

// Writing data (compression)
compressionStream.write("Hello, World!");
compressionStream.write(" This is a duplex stream example.");
compressionStream.end();

// Reading data (decompression)
compressionStream.on("data", (chunk) => {
  console.log("Decompressed chunk:", chunk.toString());
});

compressionStream.on("end", () => {
  console.log("All data processed.");
});
