package day13

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/logrusorgru/aurora"
	"time"
)

func PrintAt(x int, y int, str string) {
	fmt.Printf("\033[%d;%dH%s", y+1, x+1, str)
	fmt.Print("\033[0;0H")
}

func ClearScreen() {
	fmt.Print("\033[2J")
}

func PrintTileAt(x int, y int, tile Tile) {
	if x == -1 && y == 0 {
		return
	}

	var v aurora.Value
	switch tile {
	case Empty:
		v = aurora.White(" ")
	case Wall:
		v = aurora.BgBlack(" ")
	case Ball:
		v = aurora.BgBlue(" ")
	case Paddle:
		v = aurora.BgGreen(" ")
	case Block:
		v = aurora.BgYellow(" ")
	default:
		v = aurora.Red("E")
	}

	PrintAt(x, y, v.String())
}

func RunGame(program *lib.Program, headless bool) int {
	screen := make(map[lib.Point]Tile)

	ballX := -1
	paddleX := -1
	ballUpdated := false
	score := 0

	if !headless {
		ClearScreen()
	}

	running := true
	for running {
		select {
		case x := <-program.Output:
			y := <-program.Output
			value := <-program.Output

			if x == -1 && y == 0 {
				score = int(value)

				if !headless {
					PrintAt(42, 0, fmt.Sprintf("Score %d\n", score))
				}
			}

			tile := Tile(value)

			if tile == Paddle {
				paddleX = int(x)
			}
			if tile == Ball {
				ballX = int(x)
				ballUpdated = true
			}

			if !headless {
				PrintTileAt(int(x), int(y), tile)
			}

			if paddleX > 0 && ballX > 0 && ballUpdated {
				ballUpdated = false
				if paddleX > ballX {
					program.Input <- -1
				} else if paddleX < ballX {
					program.Input <- 1
				} else {
					program.Input <- 0
				}

				if !headless {
					time.Sleep(3 * time.Millisecond)
				}
			}

			screen[lib.Point{X: int(x), Y: int(y)}] = tile

		case <-program.Exited:
			running = false
		}

	}
	return score
}
