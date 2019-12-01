package day01

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_fuelRequired(t *testing.T) {
	type args struct {
		mass int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{args: args{1}, want: 0},
		{args: args{12}, want: 2},
		{args: args{14}, want: 2},
		{args: args{1969}, want: 654},
		{args: args{100756}, want: 33583},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.want, fuelRequired(tt.args.mass))
		})
	}
}

func Test_part1(t *testing.T) {
	totalFuel := 0
	masses := readInput("input.txt")

	for _, mass := range masses {
		totalFuel += fuelRequired(mass)
	}

	assert.Equal(t, 3412496, totalFuel)
}
