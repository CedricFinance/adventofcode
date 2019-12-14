package day14

import (
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
