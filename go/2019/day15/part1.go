package day15

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/logrusorgru/aurora"
)

func NewRobot(program *lib.Program) *Robot {
	go program.Run()

	robot := &Robot{Prog: program}
	return robot
}

type Direction int8

func GetEmptyNeighbours(positions []Point, shipMap map[Point]Tile) []Point {
	var result []Point
	for _, p := range positions {
		if shipMap[p.NorthPosition()] == Empty {
			result = append(result, p.NorthPosition())
		}
		if shipMap[p.SouthPosition()] == Empty {
			result = append(result, p.SouthPosition())
		}
		if shipMap[p.EastPosition()] == Empty {
			result = append(result, p.EastPosition())
		}
		if shipMap[p.WestPosition()] == Empty {
			result = append(result, p.WestPosition())
		}
	}

	return result
}

func PrintAt(x int, y int, str string) {
	fmt.Printf("\033[%d;%dH%s", y+22, x+22, str)
	fmt.Print("\033[0;0H")
}

func ClearScreen() {
	fmt.Print("\033[2J")
	fmt.Print("\033[0;0H")
}

func DisplayMap(m map[Point]Tile) {
	minX := 0
	minY := 0
	maxX := 0
	maxY := 0

	for p, _ := range m {
		if p.X > maxX {
			maxX = p.X
		}
		if p.X < minX {
			minX = p.X
		}
		if p.Y > maxY {
			maxY = p.Y
		}
		if p.Y < minY {
			minY = p.Y
		}
	}

	fmt.Printf("map corners: (%d,%d), (%d,%d)\n", minX, minY, maxX, maxY)
	ClearScreen()

	for y := minY; y <= maxY; y++ {
		for x := minX; x <= maxX; x++ {
			t := m[Point{x, y}]

			if x == 0 && y == 0 {
				fmt.Print(aurora.BgRed(" "))
				continue
			}

			switch t {
			case Wall:
				fmt.Print(aurora.BgBlack(" "))
			case Empty:
				fmt.Print(aurora.BgWhite(" "))
			case OxygenTank:
				fmt.Print(aurora.BgGreen(" "))
			case Unknown:
				fmt.Print(aurora.BgYellow(" "))
			}
		}
		fmt.Println()
	}
}

const (
	North Direction = 1
	South Direction = 2
	West  Direction = 3
	East  Direction = 4
)

type Robot struct {
	Prog     *lib.Program
	Position Point
}

func (r *Robot) MoveEast() (Tile, func()) {
	tile := r.move(East)

	r.Position = r.Position.EastPosition()

	if tile != Wall {
		return tile, func() { r.MoveWest() }
	}

	return tile, func() { r.Position = r.Position.WestPosition() }
}

func (r *Robot) MoveWest() (Tile, func()) {
	tile := r.move(West)

	r.Position = r.Position.WestPosition()

	if tile != Wall {
		return tile, func() { r.MoveEast() }
	}

	return tile, func() { r.Position = r.Position.EastPosition() }
}

func (r *Robot) MoveNorth() (Tile, func()) {
	tile := r.move(North)

	r.Position = r.Position.NorthPosition()

	if tile != Wall {
		return tile, func() { r.MoveSouth() }
	}

	return tile, func() { r.Position = r.Position.SouthPosition() }
}

func (r *Robot) MoveSouth() (Tile, func()) {
	tile := r.move(South)

	r.Position = r.Position.SouthPosition()

	if tile != Wall {
		return tile, func() { r.MoveNorth() }
	}

	return tile, func() { r.Position = r.Position.NorthPosition() }
}

func (r *Robot) move(d Direction) Tile {
	r.Prog.Input <- int64(d)
	result := <-r.Prog.Output

	switch result {
	case 0:
		return Wall
	case 1:
		return Empty
	case 2:
		return OxygenTank
	default:
		panic(fmt.Errorf("unexpected result"))
	}
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

type Point struct {
	X, Y int
}

func Explore(m map[Point]Tile, robot *Robot, tileFound func(position Point, t Tile, moves int)) {
	explore(m, robot, 0, tileFound)
}

func explore(m map[Point]Tile, robot *Robot, moves int, tileFound func(position Point, t Tile, moves int)) {
	if tileFound != nil {
		tileFound(robot.Position, m[robot.Position], moves)
	}

	if m[robot.Position] == Wall {
		return
	}

	nextPosition := robot.Position.EastPosition()
	if m[nextPosition] == Unknown {
		tile, undo := robot.MoveEast()
		m[nextPosition] = tile
		explore(m, robot, moves+1, tileFound)
		undo()
	}

	nextPosition = robot.Position.NorthPosition()
	if m[nextPosition] == Unknown {
		tile, undo := robot.MoveNorth()
		m[nextPosition] = tile
		explore(m, robot, moves+1, tileFound)
		undo()
	}

	nextPosition = robot.Position.WestPosition()
	if m[nextPosition] == Unknown {
		tile, undo := robot.MoveWest()
		m[nextPosition] = tile
		explore(m, robot, moves+1, tileFound)
		undo()
	}

	nextPosition = robot.Position.SouthPosition()
	if m[nextPosition] == Unknown {
		tile, undo := robot.MoveSouth()
		m[nextPosition] = tile
		explore(m, robot, moves+1, tileFound)
		undo()
	}
}

type Tile int8

const (
	Unknown Tile = iota
	Empty
	Wall
	OxygenTank
	Oxygened
)
