package day17

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/logrusorgru/aurora"
	"time"
)

func Run(program *lib.Program, display bool) int64 {
	go program.Run()

	cameraView := make(Map)

	areaWidth := 45
	areaHeight := 37

	if display {
		lib.ClearScreen()
	}

	robot, _ := ReadCameraData2(program, cameraView, areaWidth, areaHeight, display)

	fmt.Println()

	NotifyRobots(robot, cameraView, program)

	c := make(chan int64)

	go func() {
		for {
			newRobot, finalResult := ReadCameraData2(program, cameraView, areaWidth, areaHeight, false)

			if finalResult != 0 {
				c <- finalResult
				break
			}

			if display {
				lib.PrintAt(robot.Position.X, robot.Position.Y, aurora.BgBlack(" ").String())
				lib.PrintAt(newRobot.Position.X, newRobot.Position.Y, aurora.BgGreen(" ").String())
				time.Sleep(5 * time.Millisecond)
			}

			robot = newRobot
		}
	}()

	finalResult := <-c

	return finalResult
}

func ReadCameraData2(program *lib.Program, cameraView Map, areaWidth int, areaHeight int, display bool) (*Robot, int64) {
	currentX := 0
	currentY := 0

	robot := &Robot{}

	value := <-program.Output
out:
	for {

		for Tile(value) != Empty {
			if value > 255 {
				return nil, value
			} else {
				if display {
					fmt.Printf("%c", value)
				}
			}
			value = <-program.Output
		}

		currentX = 0
		currentY = 0

		for IsCameraData(int(value)) || value == 10 {
			if display {
				switch Tile(value) {
				case Empty:
					fmt.Printf("%s", aurora.BgWhite(" "))
				case Scaffold:
					fmt.Printf("%s", aurora.BgBlack(" "))
				default:
					fmt.Printf("%c", value)
				}
			}

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

	return robot, 0
}

func NotifyRobots(robot *Robot, m Map, program *lib.Program) {
	var moves []string
	steps := 0
	for {
		if m[robot.FrontPosition()] != Scaffold {
			if steps != 0 {
				moves = append(moves, fmt.Sprintf("%d", steps))
				steps = 0
			}
			if m[robot.HeadingTo.LeftPosition(robot.Position)] == Scaffold {
				moves = append(moves, "L")
				robot.HeadingTo = robot.HeadingTo.TurnLeft()
			} else if m[robot.HeadingTo.RightPosition(robot.Position)] == Scaffold {
				moves = append(moves, "R")
				robot.HeadingTo = robot.HeadingTo.TurnRight()
			} else {
				break
			}
		}
		steps++
		robot.Position = robot.FrontPosition()
	}

	go func() {
		first := "A,B,A,C,A,B,C,C,A,B"
		a := "R,8,L,10,R,8"
		b := "R,12,R,8,L,8,L,12"
		c := "L,12,L,10,L,8"

		sendInstructions(first, program)
		sendInstructions(a, program)
		sendInstructions(b, program)
		sendInstructions(c, program)

		program.Input <- int64('y')
		program.Input <- 10
	}()
}

func sendInstructions(instructions string, program *lib.Program) {
	for _, c := range instructions {
		program.Input <- int64(c)
	}
	program.Input <- 10
}
