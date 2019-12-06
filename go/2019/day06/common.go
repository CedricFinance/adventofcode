package day06

import (
	"io/ioutil"
	"strings"
)

type Object struct {
	Name        string
	OrbitAround *Object
}
type Orbits struct {
	Objects map[string]*Object
}

func (o Orbits) Count() interface{} {
	totalOrbits := 0
	for _, obj := range o.Objects {
		for obj.OrbitAround != nil {
			totalOrbits++
			obj = obj.OrbitAround
		}
	}
	return totalOrbits
}

func readOrbits(file string) Orbits {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")

	orbits := Orbits{
		Objects: make(map[string]*Object),
	}

	for _, line := range lines {
		parts := strings.Split(line, ")")

		obj, ok := orbits.Objects[parts[0]]
		if !ok {
			obj = &Object{Name: parts[0]}
			orbits.Objects[obj.Name] = obj
		}

		obj2, ok := orbits.Objects[parts[1]]
		if !ok {
			obj2 = &Object{Name: parts[1]}
			orbits.Objects[obj2.Name] = obj2
		}

		obj2.OrbitAround = obj
	}

	return orbits
}
