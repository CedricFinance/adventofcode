package lib

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

type Program struct {
	data   []int
	Output int
}

func ReadProgram() *Program {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	programData := strings.Split(string(data), ",")
	decodedProgram := make([]int, len(programData))
	for i, str := range programData {
		num, _ := strconv.ParseInt(str, 10, 32)
		decodedProgram[i] = int(num)
	}
	return &Program{
		data:   decodedProgram,
		Output: 0,
	}
}

func (p *Program) Decode(pc int) Instruction {
	opcode := p.data[pc]
	immediateParameters := make(map[int]bool)

	if opcode > 99 {
		str := fmt.Sprintf("%d", opcode)
		parameterModesStr := str[0 : len(str)-2]
		for i, mode := range parameterModesStr {
			immediateParameters[len(parameterModesStr)-1-i] = ParameterMode(mode) == '1'
		}
	}

	operation := int(opcode % 100)
	op, ok := opcodes[operation]

	if !ok {
		panic(fmt.Errorf("unknown opcode %d\n", operation))
	}

	return Instruction{
		opcode:              operation,
		immediateParameters: immediateParameters,
		parameters:          p.data[pc+1 : pc+1+op.Length-1],
		Length:              op.Length,
	}
}

func (p *Program) Run(input int) {
	pc := 0
	for p.data[pc] != 99 {
		instruction := p.Decode(pc)

		if instruction.opcode == 1 {
			left := instruction.getParameter(0, p.data)
			right := instruction.getParameter(1, p.data)
			dest := p.data[pc+3]
			p.data[dest] = left + right
			pc += instruction.Length
		} else if instruction.opcode == 2 {
			left := instruction.getParameter(0, p.data)
			right := instruction.getParameter(1, p.data)
			dest := p.data[pc+3]
			p.data[dest] = left * right
			pc += instruction.Length
		} else if instruction.opcode == 3 {
			dest := p.data[pc+1]
			p.data[dest] = input
			pc += instruction.Length
		} else if instruction.opcode == 4 {
			fmt.Printf("%d\n", instruction.getParameter(0, p.data))
			p.Output = instruction.getParameter(0, p.data)
			pc += instruction.Length
		} else {
			panic(fmt.Errorf("unknown opcode %d", instruction.opcode))
		}

	}
}

type Opcode struct {
	Length int
}

var opcodes = map[int]Opcode{
	1:  {Length: 4},
	2:  {Length: 4},
	3:  {Length: 2},
	4:  {Length: 2},
	99: {Length: 1},
}

type ParameterMode int8

const (
	Position ParameterMode = iota
	Immediate
)

type Instruction struct {
	opcode              int
	parameters          []int
	immediateParameters map[int]bool
	Length              int
}

func (i Instruction) getParameter(parameterIndex int, memory []int) int {
	param := i.parameters[parameterIndex]
	if i.immediateParameters[parameterIndex] {
		return param
	}
	return memory[param]
}
