package day08

import (
	"fmt"
	"github.com/logrusorgru/aurora"
	"github.com/stretchr/testify/assert"
	"strings"
	"testing"
)

func Test_part2(t *testing.T) {
	image := readImage("input.txt", 25, 6)

	fmt.Println(image.Decode(aurora.BgBlack(" ").String(), aurora.BgWhite(" ").String()))

	asciiImage := image.Decode(" ", "#")
	assert.Equal(t, strings.Join([]string{
		" ##   ##  ###  #  # #    ",
		"#  # #  # #  # #  # #    ",
		"#    #    #  # #### #    ",
		"# ## #    ###  #  # #    ",
		"#  # #  # #    #  # #    ",
		" ###  ##  #    #  # #### ",
		"",
	}, "\n"), asciiImage)
}
