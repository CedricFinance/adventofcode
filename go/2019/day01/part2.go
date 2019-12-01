package day01

func totalFuelRequired(mass int) int {
	totalFuel := 0

	f := fuelRequired(mass)
	for f > 0 {
		totalFuel += f
		f = fuelRequired(f)
	}

	return totalFuel
}
