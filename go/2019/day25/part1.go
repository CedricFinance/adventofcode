package day25

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

func SendCommand(str string, program *lib.Program) {
	for _, c := range str {
		program.Input <- int64(c)
		fmt.Printf("%c", c)
	}
}
