package day14

import "container/heap"

type Factory struct {
	stock      map[string]int
	reactions  Reactions
	priorities map[string]int
}

func (f *Factory) Produce(c ChemicalQuantity) (int, error) {
	requiredChemicals := &PriorityQueue{
		data:       nil,
		priorities: f.priorities,
	}
	requiredQuantities := make(map[string]int)

	heap.Push(requiredChemicals, c.Chemical)
	requiredQuantities[c.Chemical] = c.Quantity

	for {
		chemical := heap.Pop(requiredChemicals).(string)
		quantity := requiredQuantities[chemical]
		delete(requiredQuantities, chemical)
		if chemical == "ORE" {
			return quantity, nil
		}

		quantity = f.TakeMaximumFromStock(chemical, quantity)
		inputs, producedQuantity, err := f.reactions.InputsFor(ChemicalQuantity{
			Chemical: chemical,
			Quantity: quantity,
		})
		if err != nil {
			panic(err)
		}
		f.AddToStock(chemical, producedQuantity-quantity)

		for _, input := range inputs {
			q, ok := requiredQuantities[input.Chemical]

			if !ok {
				heap.Push(requiredChemicals, input.Chemical)
			}

			requiredQuantities[input.Chemical] = q + input.Quantity
		}
	}
}

func (f *Factory) TakeMaximumFromStock(chemical string, quantity int) int {
	inStock := f.stock[chemical]

	if inStock < quantity {
		delete(f.stock, chemical)
		return quantity - inStock
	}

	f.stock[chemical] = inStock - quantity

	return 0
}

func (f *Factory) AddToStock(chemical string, quantity int) {
	if quantity != 0 {
		f.stock[chemical] += quantity
	}
}

func (f *Factory) ClearStock() {
	f.stock = make(map[string]int)
}

func NewFactory(reactions Reactions) *Factory {
	topologicalSort := TopologicalSort("FUEL", reactions)

	priorities := make(map[string]int)
	for i, name := range topologicalSort {
		priorities[string(name)] = i
	}

	return &Factory{
		stock:      make(map[string]int),
		reactions:  reactions,
		priorities: priorities,
	}
}
