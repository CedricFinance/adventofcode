package day03

import "math"

func FindStepsToIntersections(firstWire []Segment, secondWire []Segment) []int {
	firstWireSteps := 0
	var allSteps []int
	for _, firstSegment := range firstWire {
		secondWireSteps := 0
		for _, secondSegment := range secondWire {
			intersection := firstSegment.intersection(secondSegment)
			if intersection != nil && !(intersection.X == 0 && intersection.Y == 0) {
				steps := firstWireSteps + firstSegment.Start.ManhattanDistanceTo(*intersection)
				steps += secondWireSteps + secondSegment.Start.ManhattanDistanceTo(*intersection)
				allSteps = append(allSteps, steps)
			}
			secondWireSteps += secondSegment.Length()
		}
		firstWireSteps += firstSegment.Length()
	}

	return allSteps
}

func FindMinStepsToIntersections(firstWire, secondWire Wire) int {
	firstSegments := firstWire.toSegments()
	secondSegments := secondWire.toSegments()

	steps := FindStepsToIntersections(firstSegments, secondSegments)

	minSteps := math.MaxInt64
	for _, steps := range steps {
		if steps < minSteps {
			minSteps = steps
		}
	}
	return minSteps
}
