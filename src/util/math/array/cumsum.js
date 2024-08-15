import Decimal from "decimal.js";
export default function cumsum(values, valueof) {
  let fn = (v) => (sum += +valueof(v, index++, values) || 0);

  // if (valueof === undefined) fn = (v) => (sum += +v || 0);
  if (valueof === undefined)
    fn = (v) => (sum = Decimal.add(+v, sum).toNumber() || 0);

  var sum = 0,
    index = 0;

  return Float64Array.from(values, fn);
}

export const getFloatNumber = (number) => {
  let str = "";
  try {
    str = number.toString();
  } catch (error) {
    str = "";
  }
  if (str.includes(".")) {
    return str.substring(str.indexOf(".") + 1).length;
  }
  return 0;
};
