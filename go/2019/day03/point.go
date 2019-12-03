package day03

type Point struct {
	X, Y int
}

func (p Point) ManhattanDistanceToOrigin() int {
	return Abs(p.X) + Abs(p.Y)
}
