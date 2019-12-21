package day21

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

func GetHullDamages(memory []int64, instructions []string) int64 {
	programMemory := lib.NewMapMemory(memory)
	program := lib.NewProgram("SpringBot", programMemory)

	go program.Run()

	result := make(chan int64)

	go func() {
		loop := true
		for loop {
			select {
			case c := <-program.Output:
				{
					if c > 255 {
						result <- c
						break
					}
					fmt.Printf("%c", c)
				}
			case <-program.Exited:
				loop = false
			}
		}
	}()

	sendSpringCode(instructions, program)

	return <-result
}

func sendSpringCode(instructions []string, program *lib.Program) {
	for _, instr := range instructions {
		for _, c := range instr {
			program.Input <- int64(c)
			fmt.Printf("%c", c)
		}
		fmt.Println()
		program.Input <- 10
	}
}
