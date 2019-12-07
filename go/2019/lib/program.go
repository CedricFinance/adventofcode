package lib

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

type Program struct {
	Name   string
	Data   []int
	Input  chan int
	Output chan int
	Exited chan bool
}

func NewProgram(name string, programMemory []int, input, output chan int) *Program {
	return &Program{
		Name:   name,
		Data:   programMemory,
		Input:  input,
		Output: output,
		Exited: make(chan bool, 1),
	}
}

func ReadProgram(filename string) *Program {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		panic(err)
	}
	programData := strings.Split(string(data), ",")
	decodedProgram := make([]int, len(programData))
	for i, str := range programData {
		num, _ := strconv.ParseInt(str, 10, 32)
		decodedProgram[i] = int(num)
	}
	return NewProgram("program", decodedProgram, make(chan int), make(chan int))
}

func (p *Program) Decode(pc int) Instruction {
	opcode := p.Data[pc]
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
		panic(fmt.Errorf("unknown opcode %d at %d\n", operation, pc))
	}

	return Instruction{
		opcode:              operation,
		immediateParameters: immediateParameters,
		parameters:          p.Data[pc+1 : pc+1+op.Length-1],
		Length:              op.Length,
	}
}

func (p *Program) Run() {
	pc := 0
	for p.Data[pc] != 99 {
		instruction := p.Decode(pc)

		if instruction.opcode == 1 {
			left := instruction.getParameter(0, p.Data)
			right := instruction.getParameter(1, p.Data)
			dest := p.Data[pc+3]
			p.Data[dest] = left + right
			pc += instruction.Length
		} else if instruction.opcode == 2 {
			left := instruction.getParameter(0, p.Data)
			right := instruction.getParameter(1, p.Data)
			dest := p.Data[pc+3]
			p.Data[dest] = left * right
			pc += instruction.Length
		} else if instruction.opcode == 3 {
			dest := p.Data[pc+1]
			p.Data[dest] = <-p.Input
			pc += instruction.Length
		} else if instruction.opcode == 4 {
			p.Output <- instruction.getParameter(0, p.Data)
			pc += instruction.Length
		} else if instruction.opcode == 5 {
			test := instruction.getParameter(0, p.Data)
			if test != 0 {
				pc = int(instruction.getParameter(1, p.Data))
			} else {
				pc += instruction.Length
			}
		} else if instruction.opcode == 6 {
			test := instruction.getParameter(0, p.Data)
			if test == 0 {
				pc = int(instruction.getParameter(1, p.Data))
			} else {
				pc += instruction.Length
			}
		} else if instruction.opcode == 7 {
			first := instruction.getParameter(0, p.Data)
			second := instruction.getParameter(1, p.Data)
			result := 0
			if first < second {
				result = 1
			}
			dest := p.Data[pc+3]
			p.Data[dest] = result
			pc += instruction.Length
		} else if instruction.opcode == 8 {
			first := instruction.getParameter(0, p.Data)
			second := instruction.getParameter(1, p.Data)
			result := 0
			if first == second {
				result = 1
			}
			dest := p.Data[pc+3]
			p.Data[dest] = result
			pc += instruction.Length
		} else {
			panic(fmt.Errorf("unknown opcode %d", instruction.opcode))
		}

	}

	p.Exited <- true
}

type Opcode struct {
	Length int
}

var opcodes = map[int]Opcode{
	1:  {Length: 4},
	2:  {Length: 4},
	3:  {Length: 2},
	4:  {Length: 2},
	5:  {Length: 3},
	6:  {Length: 3},
	7:  {Length: 4},
	8:  {Length: 4},
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
