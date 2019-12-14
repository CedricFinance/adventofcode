package day14

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestReadEx1(t *testing.T) {
	reactions := Read("ex1.txt")

	assert.Equal(t, 6, len(reactions))
	assert.Equal(t, 10, reactions["A"].Output.Quantity)
}

func TestProduceEx1(t *testing.T) {
	reactions := Read("ex1.txt")

	factory := NewFactory(reactions)
	oreRequired, _ := factory.Produce(ChemicalQuantity{
		Chemical: "FUEL",
		Quantity: 1,
	})

	assert.Equal(t, 31, oreRequired)
}

func TestProduceEx2(t *testing.T) {
	reactions := Read("ex2.txt")

	factory := NewFactory(reactions)
	oreRequired, _ := factory.Produce(ChemicalQuantity{
		Chemical: "FUEL",
		Quantity: 1,
	})

	assert.Equal(t, 165, oreRequired)
}

func TestProduceEx3(t *testing.T) {
	reactions := Read("ex3.txt")

	factory := NewFactory(reactions)
	oreRequired, _ := factory.Produce(ChemicalQuantity{
		Chemical: "FUEL",
		Quantity: 1,
	})

	assert.Equal(t, 13312, oreRequired)
}

func TestProducePart1(t *testing.T) {
	reactions := Read("input.txt")

	factory := NewFactory(reactions)
	oreRequired, _ := factory.Produce(ChemicalQuantity{
		Chemical: "FUEL",
		Quantity: 1,
	})

	assert.Equal(t, 97422, oreRequired)
}
