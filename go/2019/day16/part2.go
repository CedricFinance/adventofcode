package day16

import (
	"bytes"
	"fmt"
)

func RunFFTOptim(input []int, times int, offset int) string {
	input = input[offset:]

	phase := 0
	for phase < times {
		newInput := make([]int, len(input))

		sum := 0
		for _, v := range input {
			sum += v
		}
		newInput[0] = sum % 10

		for i := 1; i < len(input); i++ {
			sum -= input[i-1]
			newInput[i] = sum % 10

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
