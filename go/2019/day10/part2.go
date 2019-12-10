package day10

import (
	"github.com/CedricFinance/adventofcode/2019/lib"
	"math"
)

func VisibleAsteroids(asteroidsPositions []lib.Point, asteroidsMap AsteroidMap, candidatePosition lib.Point) []lib.Point {
	var visibleAsteroids []lib.Point
	for _, asteroidPosition := range asteroidsPositions {
		if asteroidPosition.X == candidatePosition.X && asteroidPosition.Y == candidatePosition.Y {
			continue
		}
		if asteroidsMap.isVisibleFrom(candidatePosition, asteroidPosition) {
			visibleAsteroids = append(visibleAsteroids, asteroidPosition)
		}
	}
	return visibleAsteroids
}

type ByAngle struct {
	data    []lib.Point
	station lib.Point
}

func (b ByAngle) Len() int {
	return len(b.data)
}

func (b ByAngle) Less(i, j int) bool {
	firstAngle := b.getAngle(b.data[i])
	secondAngle := b.getAngle(b.data[j])
	return firstAngle < secondAngle
}

func (b ByAngle) Swap(i, j int) {
	b.data[i], b.data[j] = b.data[j], b.data[i]
}

func (b ByAngle) getAngle(p lib.Point) float64 {
	diffX := p.X - b.station.X
	diffY := p.Y - b.station.Y

	angle := math.Atan2(float64(diffY), float64(diffX))

	res := angle + math.Pi/2

	if res < 0 {
		return res + 2*math.Pi
	}
	return res
}
