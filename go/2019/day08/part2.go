package day08

import (
	"bytes"
	"fmt"
)

func (i Image) Decode(blackStr, whiteStr string) string {
	var buffer bytes.Buffer
	for r := 0; r < i.Height; r++ {
		for c := 0; c < i.Width; c++ {
			var v string
			if i.getColor(r, c) == '0' {
				v = blackStr
			} else {
				v = whiteStr //aurora.BgWhite(" ")
			}
			fmt.Fprint(&buffer, v)
		}
		fmt.Fprintln(&buffer)
	}
	return buffer.String()
}

func (i Image) getColor(r int, c int) int32 {
	for _, layer := range i.Layers {
		color := layer.Get(r, c)
		if color != '2' {
			return color
		}
	}

	return '2'
}
