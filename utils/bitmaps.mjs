/**
 * v2 ...00
 * v3 ...01
 * generic ...10
 */
export const typeBitmapping = async (bitmaps) => {
  let bitmap;
  for (let i = 0; i < bitmaps.length; i++) {
    let value = parseInt(bitmaps[i], 2); // Convert binary string to decimal
    value <<= 2 * i; // Left shift the value by 2 bits multiplied by the index
    bitmap |= value; // Bitwise OR to concatenate the left-shifted values
  }
  return bitmap;
};

export const zeroForOneBitmapping = async (bitmaps) => {
  let bitmap = 0;
  for (let i = bitmaps.length - 1; i >= 0; i--) {
    let value = parseInt(bitmaps[i], 2);
    bitmap += 2 ** i * value;
  }
  return bitmap;
};

export const toAddressBitmapping = async (bitmaps) => {
  return await typeBitmapping(bitmaps);
};

/**
 * 300 - 0100101100
 */
export const feeBitmapping = async (bitmaps) => {
  const fee = "0100101100";
  let value = fee.repeat(bitmaps.length);
  let bitmap = parseInt(value, 2);
  return bitmap;
};
