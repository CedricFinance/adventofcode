package day01

import (
	"io/ioutil"
	"strconv"
	"strings"
)

func readInput(file string) []int {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	masses := make([]int, len(lines))

	for i, line := range lines {
		mass, _ := strconv.ParseInt(line, 10, 32)
		masses[i] = int(mass)
	}

	return masses
}
