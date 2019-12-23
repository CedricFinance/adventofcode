package day23

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"math"
	"time"
)

func GetFirstDuplicatedNATPacket(originalMemory []int64) NetworkPacket {
	programs, networkController := StartComputers(originalMemory)

	result := make(chan NetworkPacket)

	go func() {
		var natPacket *NetworkPacket
		idleTimeout := time.After(700 * time.Millisecond)
		previouslySent := int64(math.MaxInt64)
	out:
		for {
			select {
			case packet := <-networkController:
				if packet.Dest == 255 {
					natPacket = &packet
					fmt.Printf("NAT packet received: %v\n", packet)
					_ = natPacket
					continue
				}
				fmt.Printf("Received packet %+v\n", packet)
				programs[packet.Dest].Input <- packet.X
				programs[packet.Dest].Input <- packet.Y
				idleTimeout = time.After(700 * time.Millisecond)
			case <-idleTimeout:
				if natPacket != nil {
					fmt.Printf("Sending NAT packet %+v\n", natPacket)
					programs[0].Input <- natPacket.X
					programs[0].Input <- natPacket.Y
					if natPacket.Y == previouslySent {
						result <- *natPacket
						break out
					} else {
						previouslySent = natPacket.Y
					}
					natPacket = nil
				} else {
					idleTimeout = time.After(700 * time.Millisecond)
				}
			}
		}
	}()

	return <-result
}

func StartComputers(originalMemory []int64) ([]*lib.Program, chan NetworkPacket) {
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
	return programs, networkController
}
