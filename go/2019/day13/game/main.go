package main

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day13"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

func main() {
	program := lib.ReadProgramM("input.txt", 10000)
	program.Data[0] = 2

	go program.Run()

	score := day13.RunGame(program, false)

	day13.ClearScreen()
	fmt.Printf("The final score is %d\n", score)
}
