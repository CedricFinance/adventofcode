package day03

import "fmt"

type Move interface {
	apply(p Point) Point
}

type LeftMove int

func (l LeftMove) String() string {
	return fmt.Sprintf("L%d", l)
}

func (l LeftMove) apply(p Point) Point {
	return Point{
		X: p.X - int(l),
		Y: p.Y,
	}
}

type RightMove int

func (l RightMove) String() string {
	return fmt.Sprintf("R%d", l)
}
func (l RightMove) apply(p Point) Point {
	return Point{
		X: p.X + int(l),
		Y: p.Y,
	}
}

type UpMove int

func (l UpMove) String() string {
	return fmt.Sprintf("U%d", l)
}

func (l UpMove) apply(p Point) Point {
	return Point{
		X: p.X,
		Y: p.Y - int(l),
	}
}

type DownMove int

func (l DownMove) String() string {
	return fmt.Sprintf("D%d", l)
}

func (l DownMove) apply(p Point) Point {
	return Point{
		X: p.X,
		Y: p.Y + int(l),
	}
}
