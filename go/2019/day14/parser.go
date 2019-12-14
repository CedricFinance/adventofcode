package day14

import (
	"io/ioutil"
	"strconv"
	"strings"
)

func Read(file string) Reactions {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	result := make(Reactions)
	for _, line := range lines {
		reaction := parseReaction(line)
		result[reaction.Output.Chemical] = reaction
	}

	return result
}

func parseReaction(line string) Reaction {
	parts := strings.Split(line, " => ")

	inputs := parseChemicalsList(parts[0])
	output := parseChemical(parts[1])

	return Reaction{
		Inputs: inputs,
		Output: output,
	}
}

func parseChemicalsList(str string) []ChemicalQuantity {
	parts := strings.Split(str, ", ")

	result := make([]ChemicalQuantity, len(parts))
	for i, part := range parts {
		result[i] = parseChemical(part)
	}

	return result
}

func parseChemical(str string) ChemicalQuantity {
	parts := strings.Split(str, " ")

	q, _ := strconv.ParseInt(parts[0], 10, 16)

	return ChemicalQuantity{
		Chemical: parts[1],
		Quantity: int(q),
	}
}
