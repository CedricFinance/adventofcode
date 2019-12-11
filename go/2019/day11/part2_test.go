package day11

import (
	"fmt"
	"github.com/CedricFinance/adventofcode/2019/lib"
	"github.com/logrusorgru/aurora"
	"github.com/stretchr/testify/assert"
	"strings"
	"testing"
)

func Test_part2(t *testing.T) {
	program := lib.ReadProgramM("input.txt", 10000)

	hull := PaintPanels(program, White)

	fmt.Println(hull.String(aurora.BgBlack(" ").String(), aurora.BgWhite(" ").String()))

	str := hull.String(" ", "#")
	assert.Equal(t, strings.Join([]string{
		" #### #  # #### #  #  ##  #### ###  #  #   ",
		" #    # #  #    # #  #  # #    #  # # #    ",
		" ###  ##   ###  ##   #    ###  #  # ##     ",
		" #    # #  #    # #  #    #    ###  # #    ",
		" #    # #  #    # #  #  # #    # #  # #    ",
		" #    #  # #### #  #  ##  #    #  # #  #   ",
		"",
	}, "\n"), str)
}
