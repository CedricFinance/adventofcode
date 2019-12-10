package day10

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"io/ioutil"
	"strings"
)

type AsteroidMap [][]bool

func read(file string) (AsteroidMap, []lib.Point) {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")

	result := make(AsteroidMap, len(lines))
	var positions []lib.Point

	for i, line := range lines {
		result[i] = make([]bool, len(line))
		for j, char := range line {
			result[i][j] = char == '#'
			if result[i][j] {
				positions = append(positions, lib.Point{X: j, Y: i})
			}
		}
	}

	return result, positions
}
