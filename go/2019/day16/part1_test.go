package day16

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestGetCoeff(t *testing.T) {
	type args struct {
		outputIndex int
		index       int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{args: args{0, 0}, want: 1},
		{args: args{0, 1}, want: 0},
		{args: args{0, 2}, want: -1},
		{args: args{0, 3}, want: 0},
		{args: args{0, 4}, want: 1},
		{args: args{1, 0}, want: 0},
		{args: args{1, 1}, want: 1},
		{args: args{1, 2}, want: 1},
		{args: args{1, 3}, want: 0},
		{args: args{1, 4}, want: 0},
		{args: args{1, 5}, want: -1},
		{args: args{1, 6}, want: -1},
		{args: args{2, 4}, want: 1},
		{args: args{2, 5}, want: 0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := getCoeff(tt.args.outputIndex, tt.args.index); got != tt.want {
				t.Errorf("getCoeff() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestPartEx1(t *testing.T) {
	input := toDigits("12345678")
	result := RunFFT(input, 4)
	assert.Equal(t, "01029498", result)
}

func TestPart1(t *testing.T) {
	input := toDigits("59758034323742284979562302567188059299994912382665665642838883745982029056376663436508823581366924333715600017551568562558429576180672045533950505975691099771937719816036746551442321193912312169741318691856211013074397344457854784758130321667776862471401531789634126843370279186945621597012426944937230330233464053506510141241904155782847336539673866875764558260690223994721394144728780319578298145328345914839568238002359693873874318334948461885586664697152894541318898569630928429305464745641599948619110150923544454316910363268172732923554361048379061622935009089396894630658539536284162963303290768551107950942989042863293547237058600513191659935")
	result := RunFFT(input, 100)
	assert.Equal(t, "30379585", result)
}
