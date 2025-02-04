"use strict";

function logValue(city: string) {
  console.log(city);
}

logValue("London");
logValue("Something else");
logValue(121);

function returnGenericValue<ValueType extends string | number>(
  value: ValueType
) {
  return value;
}

let val1 = returnGenericValue("Zoe said use extends");
const val2 = returnGenericValue(123);

const arrowGeneric = <ValueType>(x: ValueType) => {};

function multipleGenerics<ValueType1, ValueType2>(
  x: ValueType1,
  y: ValueType2
) {
  x;
  y;
}
