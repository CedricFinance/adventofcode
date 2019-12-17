package main

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day17"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

func main() {
	program := lib.ReadProgramM("../input.txt", 10000)
	program.Data[0] = 2

	dustCollected := day17.Run(program, true)

	day17.ClearScreen()
	fmt.Printf("The total dust collected is %d\n", dustCollected)
}
