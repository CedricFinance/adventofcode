package main

import (
	"fmt"
	"io/ioutil"
	"math/big"
	"strconv"
	"strings"
)

type Deck interface {
	CardCount() int
	Get(i int) int
}

type SimpleDeck struct {
	Count int
}

func (d *SimpleDeck) Get(i int) int {
	return i
}

func (d *SimpleDeck) CardCount() int {
	return d.Count
}

type DealIntoNewStack struct {
	deck Deck
}

func (d *DealIntoNewStack) CardCount() int {
	return d.deck.CardCount()
}

func (d *DealIntoNewStack) Get(i int) int {
	return d.deck.Get(d.CardCount() - 1 - i)
}

type CutCards struct {
	deck Deck
	n    int
}

func (c *CutCards) CardCount() int {
	return c.deck.CardCount()
}

func (c CutCards) Get(i int) int {
	cardCount := c.deck.CardCount()
	index := (cardCount + i + c.n) % cardCount
	return c.deck.Get(index)
}

type DealWithIncrement struct {
	deck    Deck
	n       int
	mapping []int
}

func (d *DealWithIncrement) CardCount() int {
	return d.deck.CardCount()
}

func (d *DealWithIncrement) Get(i int) int {
	return d.deck.Get(d.mapping[i])
}

type FastDealWithIncrement struct {
	deck    Deck
	n       int
	multInv int
}

func (d *FastDealWithIncrement) CardCount() int {
	return d.deck.CardCount()
}

func (d *FastDealWithIncrement) Get(i int) int {
	result := big.NewInt(0)
	result.Mul(big.NewInt(int64(i)), big.NewInt(int64(d.multInv)))
	result.Mod(result, big.NewInt(int64(d.deck.CardCount())))
	i = (i * d.multInv) % d.deck.CardCount()
	if i < 0 {
		i = i + d.CardCount()
	}
	return d.deck.Get(int(result.Int64()))
}

func FindCard(d Deck, card int) int {
	for i := 0; i < 10007; i++ {
		if d.Get(i) == card {
			return i
		}
	}
	return -1
}

func read(file string, cardCount int) Deck {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	var d Deck = &SimpleDeck{Count: cardCount}

	for _, line := range lines {
		if line == "deal into new stack" {
			d = &DealIntoNewStack{deck: d}
		} else if line[0:3] == "cut" {
			n, _ := strconv.Atoi(line[4:])
			d = &CutCards{deck: d, n: n}
		} else if line[:19] == "deal with increment" {
			n, _ := strconv.Atoi(line[20:])

			d = NewFastDealWithIncrement(d, n)
		}
	}

	return d
}

type Factory struct {
	mapping []int
}

func (f *Factory) NewDealWithIncrement(d Deck, n int) Deck {
	for i := range f.mapping {
		f.mapping[i] = (i * n) % len(f.mapping)
	}

	reverseMapping := make([]int, len(f.mapping))
	for i, v := range f.mapping {
		reverseMapping[v] = i
	}

	d = &DealWithIncrement{deck: d, n: n, mapping: reverseMapping}

	return d
}

func NewFastDealWithIncrement(d Deck, n int) Deck {
	multInv := big.NewInt(0)
	big.NewInt(0).GCD(multInv, nil, big.NewInt(int64(n)), big.NewInt(int64(d.CardCount())))

	if !multInv.IsInt64() {
		panic(fmt.Errorf("not int64"))
	}

	d = &FastDealWithIncrement{deck: d, n: n, multInv: int(multInv.Int64())}

	return d
}
