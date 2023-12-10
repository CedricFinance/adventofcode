/**
 * @param {[x: number, y: number]} start
 * @param {[x: number, y: number]} end
 * @return {[x: number, y: number]}
 */
export function vect(start, end) {
  return [ end[0] - start[0], end[1] - start[1]]
}

/**
 * 
 * @param {[x: number, y: number]} vec1
 * @param {[x: number, y: number]} vec2
 */
export function determinant(vec1, vec2) {
  return vec1[0] * vec2[1] - vec1[1] * vec2[0];  
}