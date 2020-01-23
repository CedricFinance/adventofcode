package main

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day13"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

func main() {
	program := lib.ReadProgramM("input.txt", 10000)
	program.Data.Write(0, 2)

	go program.Run()

	score := day13.RunGame(program, false)

	lib.ClearScreen()
	fmt.Printf("The final score is %d\n", score)
}
