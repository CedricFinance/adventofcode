package lib

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

type Program struct {
	Name               string
	Data               []int64
	Input              chan int64
	Output             chan int64
	Exited             chan bool
	RelativeBaseOffset int64
}

func NewProgram(name string, programMemory []int64, input, output chan int64) *Program {
	return &Program{
		Name:   name,
		Data:   programMemory,
		Input:  input,
		Output: output,
		Exited: make(chan bool, 1),
	}
}

func ReadProgram(filename string) *Program {
	return ReadProgramM(filename, 0)
}

func ReadProgramM(filename string, memorySize int) *Program {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		panic(err)
	}
	programData := strings.Split(string(data), ",")
	decodedProgram := make([]int64, memorySize+len(programData))
	for i, str := range programData {
		num, err := strconv.ParseInt(str, 10, 64)
		if err != nil {
			panic(err)
		}
		decodedProgram[i] = num
	}
	return NewProgram("program", decodedProgram, make(chan int64, 1), make(chan int64))
}

func (p *Program) Decode(pc int) Instruction {
	opcode := p.Data[pc]
	parametersMode := make(map[int]ParameterMode)

	if opcode > 99 {
		str := fmt.Sprintf("%d", opcode)
		parameterModesStr := str[0 : len(str)-2]
		for i, mode := range parameterModesStr {
			parametersMode[len(parameterModesStr)-1-i] = ParameterMode(mode - '0')
		}
	}

	operation := opcode % 100
	op, ok := opcodes[operation]

	if !ok {
		panic(fmt.Errorf("unknown opcode %d at %d\n", operation, pc))
	}

	return Instruction{
		opcode:         operation,
		parametersMode: parametersMode,
		parameters:     p.Data[pc+1 : pc+1+op.Length-1],
		Length:         op.Length,
	}
}

func (p *Program) Run() {
	pc := 0
	for p.Data[pc] != 99 {
		instruction := p.Decode(pc)

		if instruction.opcode == 1 {
			left := instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			right := instruction.getParameter(1, p.Data, p.RelativeBaseOffset)
			dest := instruction.getParameterAddress(2, p.RelativeBaseOffset)
			p.Data[dest] = left + right
			pc += instruction.Length
		} else if instruction.opcode == 2 {
			left := instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			right := instruction.getParameter(1, p.Data, p.RelativeBaseOffset)
			dest := instruction.getParameterAddress(2, p.RelativeBaseOffset)
			p.Data[dest] = left * right
			pc += instruction.Length
		} else if instruction.opcode == 3 {
			dest := instruction.getParameterAddress(0, p.RelativeBaseOffset)
			p.Data[dest] = <-p.Input
			pc += instruction.Length
		} else if instruction.opcode == 4 {
			p.Output <- instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			pc += instruction.Length
		} else if instruction.opcode == 5 {
			test := instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			if test != 0 {
				pc = int(instruction.getParameter(1, p.Data, p.RelativeBaseOffset))
			} else {
				pc += instruction.Length
			}
		} else if instruction.opcode == 6 {
			test := instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			if test == 0 {
				pc = int(instruction.getParameter(1, p.Data, p.RelativeBaseOffset))
			} else {
				pc += instruction.Length
			}
		} else if instruction.opcode == 7 {
			first := instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			second := instruction.getParameter(1, p.Data, p.RelativeBaseOffset)
			result := int64(0)
			if first < second {
				result = 1
			}
			dest := instruction.getParameterAddress(2, p.RelativeBaseOffset)
			p.Data[dest] = result
			pc += instruction.Length
		} else if instruction.opcode == 8 {
			first := instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			second := instruction.getParameter(1, p.Data, p.RelativeBaseOffset)
			result := int64(0)
			if first == second {
				result = 1
			}
			dest := instruction.getParameterAddress(2, p.RelativeBaseOffset)
			p.Data[dest] = result
			pc += instruction.Length
		} else if instruction.opcode == 9 {
			first := instruction.getParameter(0, p.Data, p.RelativeBaseOffset)
			p.RelativeBaseOffset = p.RelativeBaseOffset + first
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

var opcodes = map[int64]Opcode{
	1:  {Length: 4},
	2:  {Length: 4},
	3:  {Length: 2},
	4:  {Length: 2},
	5:  {Length: 3},
	6:  {Length: 3},
	7:  {Length: 4},
	8:  {Length: 4},
	9:  {Length: 2},
	99: {Length: 1},
}

type ParameterMode int8

const (
	Position ParameterMode = iota
	Immediate
	Relative
)

type Instruction struct {
	opcode         int64
	parameters     []int64
	parametersMode map[int]ParameterMode
	Length         int
}

func (i Instruction) getParameter(parameterIndex int, memory []int64, relativeBase int64) int64 {
	param := i.parameters[parameterIndex]
	if i.parametersMode[parameterIndex] == Immediate {
		return param
	} else if i.parametersMode[parameterIndex] == Relative {
		return memory[relativeBase+param]
	}
	return memory[param]
}

func (i Instruction) getParameterAddress(parameterIndex int, relativeBase int64) int64 {
	param := i.parameters[parameterIndex]
	if i.parametersMode[parameterIndex] == Immediate {
		return param
	} else if i.parametersMode[parameterIndex] == Relative {
		return relativeBase + param
	}
	return param
}
