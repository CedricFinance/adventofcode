package main

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/day17"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

func main() {
	program := lib.ReadProgramM("../input.txt", 10000)
	program.Data.Write(0, 2)

	dustCollected := day17.Run(program, true)

	lib.ClearScreen()
	fmt.Printf("The total dust collected is %d\n", dustCollected)
}
