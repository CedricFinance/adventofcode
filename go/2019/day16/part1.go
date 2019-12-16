package day16

import (
	"bytes"
	"fmt"
)

func RunFFT(input []int, times int) string {
	phase := 0
	for phase < times {
		newInput := make([]int, len(input))
		for i, _ := range input {
			repetitions := i + 1
			coeff := 1
			for j := i; j < len(input); j += repetitions {
				for r := 0; r < repetitions && j < len(input); r++ {
					newInput[i] += input[j] * coeff
					j++
				}
				coeff *= -1
			}
			newInput[i] = Abs(newInput[i]) % 10
		}

		input = newInput

		phase++
	}

	var buffer bytes.Buffer
	for _, v := range input[:8] {
		fmt.Fprintf(&buffer, "%d", v)
	}

	return buffer.String()
}

func Abs(i int) int {
	if i < 0 {
		return -i
	}

	return i
}

func toDigits(s string) []int {
	result := make([]int, len(s))

	for i, c := range s {
		result[i] = int(c - '0')
	}

	return result
}

func getCoeff(outputIndex int, index int) int {
	pattern := []int{0, 1, 0, -1}
	repetitionCount := outputIndex + 1

	ind := (index + 1) % (len(pattern) * repetitionCount)
	ind = ind / repetitionCount

	return pattern[ind]
}
