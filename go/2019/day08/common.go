package day08

import (
	"bytes"
	"fmt"
	"io/ioutil"
)

type Layer []string

func (l Layer) String() string {
	var result bytes.Buffer
	for _, row := range l {
		fmt.Fprintln(&result, row)
	}
	return result.String()
}

func (l Layer) CountColors() map[int32]int {
	result := make(map[int32]int)
	for _, row := range l {
		for _, color := range row {
			result[color]++
		}
	}
	return result
}

func (l Layer) Get(r int, c int) int32 {
	return int32(l[r][c])
}

type Image struct {
	Layers []Layer
	Width  int
	Height int
}

func readImage(file string, w, h int) Image {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	var layers []Layer

	dataStr := string(data)

	for len(dataStr) > 0 {
		layerData := dataStr[:w*h]
		layer := toLayer(layerData, w, h)
		layers = append(layers, layer)
		dataStr = dataStr[w*h:]
	}

	image := Image{
		Width:  w,
		Height: h,
		Layers: layers,
	}

	return image
}

func toLayer(data string, width int, height int) Layer {
	layer := make(Layer, height)

	for i := range layer {
		layer[i] = data[i*width : (i+1)*width]
	}

	return layer
}
