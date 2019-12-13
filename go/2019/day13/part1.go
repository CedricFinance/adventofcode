package day13

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/logrusorgru/aurora"
)

type Tile int8

const (
	Empty Tile = iota
	Wall
	Block
	Paddle
	Ball
)

func PrintScreen(screen map[lib.Point]Tile) {
	fmt.Print("\033[2J")
	for i := 0; i < 25; i++ {
		for j := 0; j < 41; j++ {
			switch screen[lib.Point{j, i}] {
			case Empty:
				fmt.Print(aurora.BgWhite(" "))
			case Wall:
				fmt.Print(aurora.BgBlack(" "))
			case Ball:
				fmt.Print(aurora.BgBlue(" "))
			case Paddle:
				fmt.Print(aurora.BgGreen(" "))
			case Block:
				fmt.Print(aurora.BgYellow("#"))
			}
		}
		fmt.Println()
	}
}

func CountBlocks(program *lib.Program) int {
	go program.Run()

	screen := make(map[lib.Point]Tile)

	running := true
	for running {
		select {
		case x := <-program.Output:
			y := <-program.Output
			tile := <-program.Output

			screen[lib.Point{X: int(x), Y: int(y)}] = Tile(tile)
		case <-program.Exited:
			running = false
			break
		}
	}

	PrintScreen(screen)

	count := 0
	for _, tile := range screen {
		if tile == Block {
			count++
		}
	}
	return count
}
