import * as aoc from '../../2020/aoc.js'

import { init } from 'z3-solver'
import { parseHailstone } from './lib.js'

aoc.run(async function(input) {
  var lines = input.lines().map(parseHailstone)

  const { Context, em } = await init()
  const { Solver, Real } = Context('main')

  const [x, y, z, vx, vy, vz, t1, t2, t3] = Real.consts('x y z vx vy vz t1 t2 t3')
  const ts = [t1, t2, t3]

  const solver = new Solver()

  for (let i = 0; i < 3; i++) {
    const line = lines[i]
    // t_i * vr_x + pr_x == t_i * v0_x * p0_x
    solver.add(ts[i].mul(vx).add(x).eq( ts[i].mul(line.velocity[0]).add(line.position[0]) ))
    solver.add(ts[i].mul(vy).add(y).eq( ts[i].mul(line.velocity[1]).add(line.position[1]) ))
    solver.add(ts[i].mul(vz).add(z).eq( ts[i].mul(line.velocity[2]).add(line.position[2]) ))
  }

  await solver.check()
  const result = parseInt(solver.model().eval(x.add(y).add(z)).toString(), 10)

  em.PThread.terminateAllThreads();

  return result
})

// 931 193 307 668 256 : ok
/* https://cocalc.com/features/sage

x = var('x')
y = var('y')
z = var('z')
vx = var('vx')
vy = var('vy')
vz = var('vz')
t1 = var('t1')
t2 = var('t2')
t3 = var('t3')
solve([
144788461200241 + 227 * t1 == x + vx * t1,
266680201159206 + 37 * t2 == x + vx * t2,
343135145904814 - 88 * t3 == x + vx * t3,

195443318499267 + 158 * t1 == y + vy * t1,
319693757705834 - 56 * t2 == y + vy * t2,
302103279002870 + 41 * t3 == y + vy * t3,

285412990927879 + 5 * t1 == z + vz * t1,
207679493757440 + 138 * t2 == z + vz * t2,
240702357103107 + 9 * t3 == z + vz * t3,
], x, y, z, vx, vy, vz, t1, t2, t3)


var('x y z vx vy vz t1 t2 t3')
solutions = solve([
144788461200241 + 227 * t1 == x + vx * t1,
266680201159206 + 37 * t2 == x + vx * t2,
343135145904814 - 88 * t3 == x + vx * t3,

195443318499267 + 158 * t1 == y + vy * t1,
319693757705834 - 56 * t2 == y + vy * t2,
302103279002870 + 41 * t3 == y + vy * t3,

285412990927879 + 5 * t1 == z + vz * t1,
207679493757440 + 138 * t2 == z + vz * t2,
240702357103107 + 9 * t3 == z + vz * t3,
], x, y, z, vx, vy, vz, t1, t2, t3, solution_dict=True)

[s[x] + s[y] + s[z] for s in solutions]

*/