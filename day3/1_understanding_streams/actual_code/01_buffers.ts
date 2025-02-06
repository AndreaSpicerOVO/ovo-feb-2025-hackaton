import { StringDecoder } from "node:string_decoder";
const buf1 = Buffer.from([0xe2, 0x82]);
const buf2 = Buffer.from([0xac]);

const buf3 = Buffer.from([0xe2, 0x82, 0xac]);

const decoder = new StringDecoder("utf8");
const part1 = decoder.write(buf1);
const part2 = decoder.write(buf2);

console.log(buf1.toString());
console.log(buf2.toString());
console.log(buf3.toString());
console.log(part1 + part2);
