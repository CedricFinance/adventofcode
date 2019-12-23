package day23

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
)

type NetworkPacket struct {
	From string
	Dest int64
	X, Y int64
}

func GetFirstPacket(originalMemory []int64, address int) NetworkPacket {
	programs := make([]*lib.Program, 50)

	networkController := make(chan NetworkPacket)

	for i := range programs {
		mem := make([]int64, len(originalMemory))
		copy(mem, originalMemory)
		programMemory := lib.NewMapMemory(originalMemory)

		program := &lib.Program{
			Name:       fmt.Sprintf("Program %d", i),
			Data:       programMemory,
			Input:      make(chan int64, 100),
			Output:     make(chan int64),
			Exited:     make(chan bool),
			AsyncInput: true,
		}
		programs[i] = program

		program.Input <- int64(i)

		go func() {
			for {
				dest := <-program.Output
				x := <-program.Output
				y := <-program.Output
				networkController <- NetworkPacket{
					From: program.Name,
					Dest: dest,
					X:    x,
					Y:    y,
				}
			}
		}()
	}

	for _, program := range programs {
		go program.Run()
	}

	result := make(chan NetworkPacket)

	go func() {
	out:
		for {
			packet := <-networkController

			if packet.Dest == 255 {
				result <- packet
				break out
			}
			fmt.Printf("Received packet %+v\n", packet)
			programs[packet.Dest].Input <- packet.X
			programs[packet.Dest].Input <- packet.Y
		}
	}()

	return <-result
}
