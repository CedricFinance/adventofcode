/**
 * @param {string} str
 */
export function hash(str) {
  var value = 0
  for (let i = 0; i < str.length; i++) {
    const asciiCode = str.charCodeAt(i);
    value += asciiCode
    value = (value * 17) % 256
  }
  return value
}
