import { StringDecoder } from "node:string_decoder";

const decoder = new StringDecoder("utf8");

// Example buffers that split characters across byte boundaries
const buf1 = Buffer.from([0xe2, 0x82]);
const buf2 = Buffer.from([0xac]);

// Decode the buffers
const part1 = decoder.write(buf1);
const part2 = decoder.write(buf2);

// Combine the decoded parts
const result = part1 + part2;

console.log(result); // Output: €
