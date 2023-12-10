import { determinant, vect } from "./vect.js";

/**
 * @param {[x: number, y: number]} a
 * @param {[x: number, y: number]} b
 * @param {[x: number, y: number]} p
 */
function isLeft(a, b, p) {
  return determinant(vect(a, b), vect(a, p))
}

/**
* @param {[x: number, y: number]} point
* @param {[x: number, y: number][]} vs
*/
export function isPointInsidePolygon(point, vs) {
  const x = point[0], y = point[1];
  let wn = 0;

  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i][0], yi = vs[i][1];
    let xj = vs[j][0], yj = vs[j][1];

    if (yj <= y) {
      if (yi > y) {
        if (isLeft([xj, yj], [xi, yi], [x,y]) > 0) {
          wn++;
        }
      }
    } else {
      if (yi <= y) {
        if (isLeft([xj, yj], [xi, yi], [x, y]) < 0) {
          wn--;
        }
      }
    }
  }
  return wn != 0;
};
