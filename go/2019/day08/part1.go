package day08

import "math"

func FindLayerWithFewestZeros(image Image) (int, map[int32]int) {
	minZeros := math.MaxInt64
	var minLayerColors map[int32]int
	for _, layer := range image.Layers {
		counts := layer.CountColors()
		if counts['0'] < minZeros {
			minZeros = counts['0']
			minLayerColors = counts
		}
	}
	return minZeros, minLayerColors
}
