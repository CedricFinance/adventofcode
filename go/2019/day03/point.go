package day03

type Point struct {
	X, Y int
}

func (p Point) ManhattanDistanceToOrigin() int {
	return Abs(p.X) + Abs(p.Y)
}

func (p Point) ManhattanDistanceTo(other Point) int {
	return Abs(other.X-p.X) + Abs(other.Y-p.Y)
}
