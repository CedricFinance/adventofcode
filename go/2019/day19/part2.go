package day19

func Abs(value int) int {
	if value < 0 {
		return -value
	}
	return value
}

func FindSquare(detector *Detector, width int, startY int, endY int) (int, int) {
	closestPointX := 0

	for Abs(startY-endY) > 1 {
		middle := (startY + endY) / 2
		x := detector.FindBeamStart(middle)
		oppositeX := x + (width - 1)
		oppositeY := middle - (width - 1)

		found := detector.BeamAt(oppositeX, oppositeY)

		if found {
			startY = middle
			closestPointX = x
		} else {
			endY = middle
		}
	}

	closestPointY := startY - (width - 1)
	return closestPointX, closestPointY
}
