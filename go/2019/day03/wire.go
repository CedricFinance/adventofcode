package day03

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

type Wire []Move

func (w *Wire) toSegments() []Segment {
	currentPoint := Point{0, 0}

	segments := make([]Segment, len(*w))

	for i, move := range *w {
		newPoint := move.apply(currentPoint)
		segments[i] = Segment{
			Start: currentPoint,
			End:   newPoint,
		}
		currentPoint = newPoint
	}
	return segments
}

func readWires(file string) []Wire {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")

	wires := make([]Wire, len(lines))

	for i, line := range lines {
		moves := strings.Split(line, ",")
		wires[i] = make(Wire, len(moves))
		for j, moveStr := range moves {
			length, err := strconv.ParseInt(moveStr[1:], 10, 16)
			if err != nil {
				panic(err)
			}

			var move Move
			switch moveStr[0] {
			case 'L':
				move = LeftMove(length)
			case 'R':
				move = RightMove(length)
			case 'U':
				move = UpMove(length)
			case 'D':
				move = DownMove(length)
			default:
				panic(fmt.Errorf("invalid direction %q", string(moveStr[0])))
			}

			wires[i][j] = move
		}
	}

	return wires
}
