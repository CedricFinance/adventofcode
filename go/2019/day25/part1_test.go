package day25

import (
	"bufio"
	"bytes"
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
	"unicode"
)

func TestPart1(t *testing.T) {
	data := lib.ReadData("input.txt")

	lastNumberDisplayed := RunGame(data, []string{
		"west",
		"south", "south", "south", "take asterisk", "north", "north", "north",
		"west",
		"west", "west", "take dark matter", "east",
		"south", "take fixed point",
		"west", "take food ration", "east",
		"north", "east",
		"south", "take astronaut ice cream",
		"south", "take polygon",
		"east", "take easter egg",
		"east", "take weather machine",
		"east", "east",
		"north", "north",
		"drop polygon", "drop fixed point", "drop food ration", "drop asterisk",
		"north",
		/*
					full: lighter
					nothing: heavier
			        take weather machine
			        take dark matter
			        take easter egg
			        take astronaut ice cream
		*/
	})

	assert.Equal(t, "285213704", lastNumberDisplayed)
}

func RunGame(data []int64, initialCommands []string) string {
	mem := lib.NewMapMemory(data)

	program := lib.NewProgram("Game", mem)

	go program.Run()

	var lastNumberDisplayed bytes.Buffer

	go func() {
		inNumber := false
		for {
			c := <-program.Output
			fmt.Printf("%c", c)
			if unicode.IsDigit(rune(c)) {
				if !inNumber {
					lastNumberDisplayed.Reset()
				}
				inNumber = true
				fmt.Fprintf(&lastNumberDisplayed, "%c", c)
			} else {
				inNumber = false
			}
		}
	}()

	end := make(chan bool)

	go func() {
		reader := bufio.NewReader(os.Stdin)

		for _, cmd := range initialCommands {
			SendCommand(cmd+"\n", program)
		}

		running := true
		for running {
			select {
			case <-program.Exited:
				running = false
			}
			str, _ := reader.ReadString('\n')
			SendCommand(str, program)
		}

		fmt.Println()

		end <- true
	}()

	_ = <-end
	return lastNumberDisplayed.String()
}
