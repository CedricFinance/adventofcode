package day03

import "fmt"

type Segment struct {
	Start, End Point
}

func (s Segment) intersection(other Segment) *Point {
	if s.isHorizontal() && other.isHorizontal() {
		if s.Start.X == other.Start.X {
			if Max(s.Start.Y, s.End.Y) < Min(other.Start.Y, other.End.Y) || Max(other.Start.Y, other.End.Y) < Min(s.Start.Y, s.End.Y) {
				return nil
			}
			if Max(s.Start.Y, s.End.Y) == Min(other.Start.Y, other.End.Y) {
				return &Point{
					X: s.Start.X,
					Y: Max(s.Start.Y, s.End.Y),
				}
			}
			if Min(s.Start.Y, s.End.Y) == Max(other.Start.Y, other.End.Y) {
				return &Point{
					X: s.Start.X,
					Y: Min(s.Start.Y, s.End.Y),
				}
			}
			panic(fmt.Errorf("intersection not implemented %+v %+v", s, other))
		} else {
			return nil
		}
	}

	if s.isVertical() && other.isVertical() {
		if s.Start.Y == other.Start.Y {
			if Max(s.Start.X, s.End.X) < Min(other.Start.X, other.End.X) || Max(other.Start.X, other.End.X) < Min(s.Start.X, s.End.X) {
				return nil
			}
			if Max(s.Start.X, s.End.X) == Min(other.Start.X, other.End.X) {
				return &Point{
					X: Max(s.Start.X, s.End.X),
					Y: s.Start.Y,
				}
			}
			if Min(s.Start.X, s.End.X) == Max(other.Start.X, other.End.X) {
				return &Point{
					X: Min(s.Start.X, s.End.X),
					Y: s.Start.Y,
				}
			}
			panic(fmt.Errorf("intersection not implemented %+v %+v", s, other))
		} else {
			return nil
		}
	}

	var horiz, vert Segment
	if s.isHorizontal() && other.isVertical() {
		horiz = s
		vert = other
	} else {
		horiz = other
		vert = s
	}

	if Min(vert.Start.Y, vert.End.Y) > horiz.Start.Y || Max(vert.Start.Y, vert.End.Y) < horiz.Start.Y {
		return nil
	}

	if Min(horiz.Start.X, horiz.End.X) > vert.Start.X || Max(horiz.Start.X, horiz.End.X) < vert.Start.X {
		return nil
	}

	return &Point{
		X: vert.Start.X,
		Y: horiz.Start.Y,
	}
}

func (s Segment) isHorizontal() bool {
	return s.Start.Y == s.End.Y
}

func (s Segment) isVertical() bool {
	return s.Start.X == s.End.X
}

func (s Segment) Length() int {
	return Abs(s.End.X-s.Start.X) + Abs(s.End.Y-s.Start.Y)
}
