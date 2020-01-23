package lib

import "fmt"

type Point struct {
    X, Y int
}

func (p Point) String() string {
    return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

func (r Point) EastPosition() Point {
    return Point{
        X: r.X + 1,
        Y: r.Y,
    }
}

func (r Point) WestPosition() Point {
    return Point{
        X: r.X - 1,
        Y: r.Y,
    }
}

func (r Point) NorthPosition() Point {
    return Point{
        X: r.X,
        Y: r.Y - 1,
    }
}

func (r Point) SouthPosition() Point {
    return Point{
        X: r.X,
        Y: r.Y + 1,
    }
}
