package day03

import "math"

func FindIntersections(firstWire []Segment, secondWire []Segment) []Point {
	var intersections []Point
	for _, firstSegment := range firstWire {
		for _, secondSegment := range secondWire {
			intersection := firstSegment.intersection(secondSegment)
			if intersection != nil && !(intersection.X == 0 && intersection.Y == 0) {
				intersections = append(intersections, *intersection)
			}
		}
	}
	return intersections
}

func FindClosestIntersection(firstWire, secondWire Wire) (*Point, int) {
	firstSegments := firstWire.toSegments()
	secondSegments := secondWire.toSegments()

	intersections := FindIntersections(firstSegments, secondSegments)

	var closestIntersection *Point
	minDistance := math.MaxInt64
	for _, intersection := range intersections {
		d := intersection.ManhattanDistanceToOrigin()
		if d < minDistance {
			minDistance = d
			closestIntersection = &intersection
		}
	}
	return closestIntersection, minDistance
}
