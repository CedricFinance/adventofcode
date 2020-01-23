package lib

import "fmt"

func PrintAt(x int, y int, str string) {
	fmt.Printf("\033[%d;%dH%s", y+1, x+1, str)
	fmt.Print("\033[0;0H")
}

func ClearScreen() {
	fmt.Print("\033[2J")
	fmt.Print("\033[0;0H")
}
