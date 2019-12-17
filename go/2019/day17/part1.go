package day17

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"os"
)

func ComputeCalibrationValue(program *lib.Program) int {
	go program.Run()

	cameraView := make(Map)

	areaWidth := 45
	areaHeight := 37

	robot := &Robot{}

	ReadCameraData(program, robot, cameraView, areaWidth, areaHeight)

	fmt.Println()

	intersections := FindIntersections(areaHeight, areaWidth, cameraView)

	sum := 0
	for _, p := range intersections {
		sum += p.X * p.Y
	}

	return sum
}

func FindIntersections(areaHeight int, areaWidth int, cameraView Map) []Point {
	var intersections []Point
	for y := 1; y < areaHeight-1; y++ {
		for x := 1; x < areaWidth-1; x++ {
			p := Point{x, y}
			if cameraView.isIntersection(p) {
				intersections = append(intersections, p)
			}
		}
	}
	return intersections
}

func ReadCameraData(program *lib.Program, robot *Robot, cameraView Map, areaWidth int, areaHeight int) {
	currentX := 0
	currentY := 0

	value := <-program.Output

out:
	for {

		for Tile(value) != Empty {
			if value > 255 {
				fmt.Printf("%d\n", value)
				os.Exit(1)
			} else {
				fmt.Printf("%c", value)
			}
			value = <-program.Output
		}

		currentX = 0
		currentY = 0

		for IsCameraData(int(value)) || value == 10 {
			if value == 10 {
				currentY++
				currentX = 0
			} else {
				if IsRobot(int(value)) {
					robot.Position = Point{X: currentX, Y: currentY}
					switch value {
					case RobotFacingEast:
						robot.HeadingTo = East{}
					case RobotFacingWest:
						robot.HeadingTo = West{}
					case RobotFacingNorth:
						robot.HeadingTo = North{}
					case RobotFacingSouth:
						robot.HeadingTo = South{}
					}
				}
				cameraView[Point{currentX, currentY}] = Tile(value)
				currentX++
			}

			if currentX == areaWidth && currentY == areaHeight-1 {
				break out
			}

			value = <-program.Output
		}
	}
}

func IsCameraData(value int) bool {
	return Tile(value) == Empty || Tile(value) == Scaffold || IsRobot(value)
}

func IsRobot(i int) bool {
	return i == RobotFacingEast || i == RobotFacingWest || i == RobotFacingNorth || i == RobotFacingSouth
}

type Robot struct {
	Position  Point
	HeadingTo Heading
}

func (r Robot) FrontPosition() Point {
	return r.HeadingTo.Next(r.Position)
}

type Map map[Point]Tile

func (m Map) isIntersection(p Point) bool {
	return m[p] == Scaffold && m[p.EastPosition()] == Scaffold && m[p.WestPosition()] == Scaffold && m[p.SouthPosition()] == Scaffold && m[p.NorthPosition()] == Scaffold
}

type Point struct {
	X, Y int
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

type Heading interface {
	LeftPosition(p Point) Point
	RightPosition(p Point) Point
	Next(position Point) Point
	TurnLeft() Heading
	TurnRight() Heading
}

type North struct{}

func (n North) String() string {
	return "North"
}

func (North) LeftPosition(p Point) Point {
	return Point{
		X: p.X - 1,
		Y: p.Y,
	}
}
func (North) RightPosition(p Point) Point {
	return Point{
		X: p.X + 1,
		Y: p.Y,
	}
}
func (North) Next(p Point) Point {
	return p.NorthPosition()
}
func (North) TurnLeft() Heading {
	return West{}
}
func (North) TurnRight() Heading {
	return East{}
}

type South struct{}

func (n South) String() string {
	return "South"
}

func (South) LeftPosition(p Point) Point {
	return Point{
		X: p.X + 1,
		Y: p.Y,
	}
}
func (South) RightPosition(p Point) Point {
	return Point{
		X: p.X - 1,
		Y: p.Y,
	}
}
func (South) Next(p Point) Point {
	return p.SouthPosition()
}
func (South) TurnLeft() Heading {
	return East{}
}
func (South) TurnRight() Heading {
	return West{}
}

type East struct{}

func (n East) String() string {
	return "East"
}

func (East) LeftPosition(p Point) Point {
	return Point{
		X: p.X,
		Y: p.Y - 1,
	}
}
func (East) RightPosition(p Point) Point {
	return Point{
		X: p.X,
		Y: p.Y + 1,
	}
}
func (East) Next(p Point) Point {
	return p.EastPosition()
}
func (East) TurnLeft() Heading {
	return North{}
}
func (East) TurnRight() Heading {
	return South{}
}

type West struct{}

func (n West) String() string {
	return "West"
}

func (West) LeftPosition(p Point) Point {
	return Point{
		X: p.X,
		Y: p.Y + 1,
	}
}
func (West) RightPosition(p Point) Point {
	return Point{
		X: p.X,
		Y: p.Y - 1,
	}
}
func (West) Next(p Point) Point {
	return p.WestPosition()
}
func (West) TurnLeft() Heading {
	return South{}
}
func (West) TurnRight() Heading {
	return North{}
}

type Tile int8

const (
	Empty            Tile = '.'
	Scaffold              = '#'
	RobotFacingNorth      = '^'
	RobotFacingSouth      = 'v'
	RobotFacingEast       = '>'
	RobotFacingWest       = '<'
)
