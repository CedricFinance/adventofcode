package day12

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_part2(t *testing.T) {
	sX, sY, sZ := part2Input()

	periodicity, xPeriodicity, yPeriodicity, zPeriodicity := FindSystemPeriodicity(sX, sY, sZ)

	assert.Equal(t, 161428, xPeriodicity)
	assert.Equal(t, 113028, yPeriodicity)
	assert.Equal(t, 231614, zPeriodicity)
	assert.Equal(t, 528250271633772, periodicity)
}

func Test_part2_ex1(t *testing.T) {
	sX, sY, sZ := part2ex1Input()

	periodicity, xPeriodicity, yPeriodicity, zPeriodicity := FindSystemPeriodicity(sX, sY, sZ)

	assert.Equal(t, 18, xPeriodicity)
	assert.Equal(t, 28, yPeriodicity)
	assert.Equal(t, 44, zPeriodicity)
	assert.Equal(t, 2772, periodicity)
}

func part2ex1Input() (System, System, System) {
	sX := System([]SpaceObject{
		{Position: -1},
		{Position: 2},
		{Position: 4},
		{Position: 3},
	})
	sY := System([]SpaceObject{
		{Position: 0},
		{Position: -10},
		{Position: -8},
		{Position: 5},
	})
	sZ := System([]SpaceObject{
		{Position: 2},
		{Position: -7},
		{Position: 8},
		{Position: -1},
	})
	return sX, sY, sZ
}

func part2Input() (System, System, System) {
	sX := System([]SpaceObject{
		{Position: -19},
		{Position: -9},
		{Position: -4},
		{Position: 1},
	})
	sY := System([]SpaceObject{
		{Position: -4},
		{Position: 8},
		{Position: 5},
		{Position: 9},
	})
	sZ := System([]SpaceObject{
		{Position: 2},
		{Position: -16},
		{Position: -11},
		{Position: -13},
	})
	return sX, sY, sZ
}

func Test_GCD(t *testing.T) {
	type args struct {
		a int
		b int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{args: args{4, 1}, want: 1},
		{args: args{2, 4}, want: 2},
		{args: args{35, 4}, want: 1},
		{args: args{35, 14}, want: 7},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := GCD(tt.args.a, tt.args.b); got != tt.want {
				t.Errorf("GCD() = %v, want %v", got, tt.want)
			}
		})
	}
}
