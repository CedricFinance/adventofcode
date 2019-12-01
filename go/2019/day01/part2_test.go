package day01

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_totalFuelRequired(t *testing.T) {
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
		{args: args{1969}, want: 966},
		{args: args{100756}, want: 50346},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.want, totalFuelRequired(tt.args.mass))
		})
	}
}

func Test_part2(t *testing.T) {
	masses := readInput("input.txt")
	totalFuel := 0

	for _, mass := range masses {
		totalFuel += totalFuelRequired(mass)
	}

	assert.Equal(t, 5115845, totalFuel)
}
