package day14

import (
	"container/heap"
	"fmt"
)

type ChemicalQuantity struct {
	Chemical string
	Quantity int
}

type Reaction struct {
	Inputs []ChemicalQuantity
	Output ChemicalQuantity
}

type Reactions map[string]Reaction

func (r Reactions) Children(node Node) []Node {
	reaction := r[string(node)]
	children := make([]Node, len(reaction.Inputs))
	for i, input := range reaction.Inputs {
		children[i] = Node(input.Chemical)
	}
	return children
}

func (r Reactions) InputsFor(c ChemicalQuantity) ([]ChemicalQuantity, int, error) {
	reaction, ok := r[c.Chemical]

	if !ok {
		return nil, 0, fmt.Errorf("no reaction for chemical %q", c.Chemical)
	}

	multiplier := (c.Quantity + reaction.Output.Quantity - 1) / reaction.Output.Quantity

	inputs := make([]ChemicalQuantity, len(reaction.Inputs))

	for i, input := range reaction.Inputs {
		inputs[i] = ChemicalQuantity{
			Chemical: input.Chemical,
			Quantity: input.Quantity * multiplier,
		}
	}

	return inputs, multiplier * reaction.Output.Quantity, nil
}

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

type Node string

type Graph interface {
	Children(node Node) []Node
}

func TopologicalSort(startNode Node, graph Graph) []Node {
	markedNodes := make(map[Node]bool)
	return topologicalSortInternal(startNode, graph, markedNodes)
}

func topologicalSortInternal(root Node, graph Graph, markedNodes map[Node]bool) []Node {
	children := graph.Children(root)
	var result []Node
	for _, child := range children {
		result = visit(child, graph, markedNodes, result)
	}
	return result
}

func visit(root Node, graph Graph, markedNodes map[Node]bool, result []Node) []Node {
	if markedNodes[root] {
		return result
	}
	for _, child := range graph.Children(root) {
		result = visit(child, graph, markedNodes, result)
	}
	markedNodes[root] = true
	result = append(result, root)
	return result
}
