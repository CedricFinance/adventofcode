package day10

import "github.com/CedricFinance/adventofcode/2019/lib"

func FindBestPosition(asteroidsPositions []lib.Point, asteroidsMap AsteroidMap) (int, lib.Point) {
	maxVisibleAsteroids := 0
	var maxPosition lib.Point

	for _, candidatePosition := range asteroidsPositions {
		visibleAsteroids := 0
		visibleAsteroids = CountVisibleAsteroids(asteroidsPositions, asteroidsMap, candidatePosition)

		if maxVisibleAsteroids < visibleAsteroids {
			maxVisibleAsteroids = visibleAsteroids
			maxPosition = candidatePosition
		}
	}
	return maxVisibleAsteroids, maxPosition
}

func CountVisibleAsteroids(asteroidsPositions []lib.Point, asteroidsMap AsteroidMap, candidatePosition lib.Point) int {
	visibleAsteroids := 0
	for _, asteroidPosition := range asteroidsPositions {
		if asteroidPosition.X == candidatePosition.X && asteroidPosition.Y == candidatePosition.Y {
			continue
		}
		if asteroidsMap.isVisibleFrom(candidatePosition, asteroidPosition) {
			visibleAsteroids++
		}
	}
	return visibleAsteroids
}

func Abs(v int) int {
	if v < 0 {
		return -v
	}
	return v
}

func gcd(x, y int) int {
	for y != 0 {
		x, y = y, x%y
	}
	return x
}

func sign(x int) int {
	if x > 0 {
		return 1
	}
	return -1
}

func (m AsteroidMap) isVisibleFrom(station lib.Point, asteroid lib.Point) bool {
	diffX := asteroid.X - station.X
	diffY := asteroid.Y - station.Y

	var stepX, stepY int
	if diffX == 0 {
		stepX = 0
		stepY = sign(diffY)
	} else if diffY == 0 {
		stepX = sign(diffX)
		stepY = 0
	} else {
		pgcd := gcd(Abs(diffX), Abs(diffY))
		stepX = diffX / pgcd
		stepY = diffY / pgcd
	}

	x := station.X + stepX
	y := station.Y + stepY
	for x != asteroid.X || y != asteroid.Y {
		if m[y][x] {
			return false
		}
		x += stepX
		y += stepY
	}

	return true
}
