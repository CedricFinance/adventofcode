package day19

import (
	"fmt"
)

func CountAffectedPoints(memory []int64) int {
	detector := Detector{
		Memory: memory,
	}

	count := 0
	for y := 0; y < 50; y++ {
		beamDetected := false
		for x := 0; x < 50; x++ {
			v := detector.BeamAt(x, y)

			if v {
				beamDetected = true
				fmt.Print("#")
				count++
			} else {
				fmt.Print(".")
				if beamDetected {
					break
				}
			}
		}
		fmt.Println()
	}
	return count
}
