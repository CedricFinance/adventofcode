package main

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day15"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/logrusorgru/aurora"
	time2 "time"
)

func main() {
	program := lib.ReadProgramM("../input.txt", 10000)

	robot := day15.NewRobot(program)
	go program.Run()

	shipMap := make(map[day15.Point]day15.Tile)

	shipMap[robot.Position] = day15.Empty

	var tankPosition *day15.Point

	day15.Explore(shipMap, robot, func(position day15.Point, tile day15.Tile, moves int) {
		if tile == day15.OxygenTank {
			tankPosition = &position
		}
	})

	fmt.Printf("Exploration finished. Tank is at %+v\n", tankPosition)

	day15.DisplayMap(shipMap)

	time := day15.FillOxygen(*tankPosition, shipMap, func(filledPositions []day15.Point) {
		for _, p := range filledPositions {
			day15.PrintAt(p.X, p.Y, aurora.BgBlue(" ").String())
		}
		time2.Sleep(5 * time2.Millisecond)
	})

	day15.ClearScreen()

	fmt.Printf("Ship filled with oxygen in %d minutes\n", time)
}
