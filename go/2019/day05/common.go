package day05

import "github.com/CedricFinance/adventofcode/2019/lib"

func GetDiagnosticCode(program *lib.Program) int64 {
	output := int64(0)
	for output == 0 {
		output = <-program.Output
	}
	return output
}
