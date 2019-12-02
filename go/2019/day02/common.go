package day02

import (
	"io/ioutil"
	"strconv"
	"strings"
)

func readProgram() []int {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	programData := strings.Split(string(data), ",")
	decodedProgram := make([]int, len(programData))
	for i, str := range programData {
		num, _ := strconv.ParseInt(str, 10, 32)
		decodedProgram[i] = int(num)
	}
	return decodedProgram
}
