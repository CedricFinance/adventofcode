package day19

import "github.com/CedricFinance/adventofcode/2019/lib"

type Detector struct {
	Memory []int64
}

func (d *Detector) BeamAt(x int, y int) bool {
	programMemory := lib.NewMapMemory(d.Memory)

	program := lib.NewProgram("Program", programMemory)

	go program.Run()

	program.Input <- int64(x)
	program.Input <- int64(y)
	out := <-program.Output
	_ = <-program.Exited

	return out == 1
}

func (d *Detector) FindBeamStart(y int) int {
	x := y * 59111 / 100000

	found := d.BeamAt(x, y)

	if found {
		for found {
			x--
			found = d.BeamAt(x, y)
		}
		x++
	} else {
		for !found {
			x++
			found = d.BeamAt(x, y)
		}
	}
	return x
}
