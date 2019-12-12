package day12

type SpaceObject struct {
	Position int
	Velocity int
}

type System []SpaceObject

func (o SpaceObject) UpdatePosition(velocityDiff int) SpaceObject {
	return SpaceObject{
		Position: o.Position + o.Velocity + velocityDiff,
		Velocity: o.Velocity + velocityDiff,
	}
}

func (s System) Update() System {
	velocityDiffs := make([]int, len(s))
	for i := 0; i < len(s)-1; i++ {
		for j := i + 1; j < len(s); j++ {
			if s[i].Position > s[j].Position {
				velocityDiffs[i]--
				velocityDiffs[j]++
			} else if s[i].Position < s[j].Position {
				velocityDiffs[i]++
				velocityDiffs[j]--
			}
		}
	}

	newSystem := make(System, len(s))
	for i, obj := range s {
		newSystem[i] = obj.UpdatePosition(velocityDiffs[i])
	}

	return newSystem
}

func (s System) Equals(other System) bool {
	for i, obj := range s {
		if obj != other[i] {
			return false
		}
	}

	return true
}

func GCD(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}

	return a
}

func LCM(a, b int) int {
	gcd := GCD(a, b)
	return a / gcd * b
}

func LCM3(x int, y int, z int) int {
	lcm := LCM(x, y)
	return LCM(lcm, z)
}

func FloydCycleDetection(f func(s System) System, x0 System) (int, int) {
	tortoise := f(x0)
	hare := f(f(x0))

	for !tortoise.Equals(hare) {
		tortoise = f(tortoise)
		hare = f(f(hare))
	}

	mu := 0
	tortoise = x0
	for !tortoise.Equals(hare) {
		tortoise = f(tortoise)
		hare = f(hare)
		mu += 1
	}

	lam := 1
	hare = f(tortoise)
	for !tortoise.Equals(hare) {
		hare = f(hare)
		lam += 1
	}

	return lam, mu
}

func FindSystemPeriodicity(sX System, sY System, sZ System) (int, int, int, int) {
	lamX, _ := FloydCycleDetection(func(s System) System { return s.Update() }, sX)
	lamY, _ := FloydCycleDetection(func(s System) System { return s.Update() }, sY)
	lamZ, _ := FloydCycleDetection(func(s System) System { return s.Update() }, sZ)

	lcm := LCM3(lamX, lamY, lamZ)
	return lcm, lamX, lamY, lamZ
}
