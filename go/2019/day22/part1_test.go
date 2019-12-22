package main

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestDealWithIncrement_Get3(t *testing.T) {
	f := Factory{mapping: make([]int, 10)}

	d := f.NewDealWithIncrement(&SimpleDeck{Count: 10}, 3)

	assert.Equal(t, 4, d.Get(2))
}

func TestDealWithIncrement_Get3twice(t *testing.T) {
	d := NewFastDealWithIncrement(&SimpleDeck{Count: 10}, 3)
	d = NewFastDealWithIncrement(d, 3)

	assert.Equal(t, 0, d.Get(0))
	assert.Equal(t, 9, d.Get(1))
}

func TestDealWithIncrement_Get7(t *testing.T) {
	d := NewFastDealWithIncrement(&SimpleDeck{Count: 10}, 7)
	if d.Get(7) != 1 {
		t.Errorf("error")
	}
	if d.Get(4) != 2 {
		t.Errorf("error 2 expected got %d", d.Get(4))
	}
}

func Test_Part1(t *testing.T) {
	d := read("input.txt", 10007)

	index := FindCard(d, 2019)

	assert.Equal(t, 2480, index)
}
