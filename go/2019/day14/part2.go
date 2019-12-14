package day14

func FindMaxFuel(factory *Factory, oreAmount int) int {
	min := 1
	max := oreAmount

	for min < max-1 {
		middle := (min + max) / 2

		factory.ClearStock()
		requiredOre, _ := factory.Produce(ChemicalQuantity{Chemical: "FUEL", Quantity: middle})
		if requiredOre < oreAmount {
			min = middle
		} else {
			max = middle
		}
	}
	return min
}
