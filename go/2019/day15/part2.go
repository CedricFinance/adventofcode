package day15

func FillOxygen(position Point, shipMap map[Point]Tile, progressCallback func(filledPositions []Point)) int {
	time := 0

	var lastOxygened []Point
	lastOxygened = append(lastOxygened, position)
	shipMap[position] = Oxygened

	for {
		toFill := GetEmptyNeighbours(lastOxygened, shipMap)

		if len(toFill) == 0 {
			break
		}

		for _, p := range toFill {
			shipMap[p] = Oxygened
		}

		if progressCallback != nil {
			progressCallback(toFill)
		}

		lastOxygened = toFill
		time++
	}

	return time
}
