package main

import (
	"fmt"
	"io/ioutil"
	"math/big"
	"strconv"
	"strings"
)

type LinearDeck struct {
	Count *big.Int
	A     *big.Int
	B     *big.Int
}

func (d *LinearDeck) Get(i *big.Int) *big.Int {
	result := big.NewInt(0)
	result.Mul(i, d.A)
	result.Add(result, d.B)
	result.Mod(result, d.Count)
	return result
}

func (d *LinearDeck) CardCount() *big.Int {
	return d.Count
}

func (d *LinearDeck) DealIntoNewStack() *LinearDeck {
	newA := big.NewInt(0)
	newA.Neg(d.A)

	newB := big.NewInt(0)
	newB.Sub(d.B, d.A)
	// A (-X-1) + B = - A X + B - A
	// A = - A
	// B = B - A

	return &LinearDeck{
		Count: d.Count,
		A:     newA,
		B:     newB,
	}
}

func (d *LinearDeck) Cut(n *big.Int) *LinearDeck {
	newB := big.NewInt(0)
	newB.Mul(d.A, n)
	newB.Add(newB, d.B)
	newB.Mod(newB, d.Count)
	// A (X + n) + B= A X + (A n + B)
	// A = A
	// B = (A n + B) % CardCount

	return &LinearDeck{
		Count: d.Count,
		A:     d.A,
		B:     newB,
	}
}

func (d *LinearDeck) DealWithIncrement(n *big.Int) *LinearDeck {
	multInv := big.NewInt(0)
	gcd := big.NewInt(0)
	gcd.GCD(multInv, nil, n, d.Count)
	if multInv.Cmp(big.NewInt(0)) == -1 {
		multInv.Mod(multInv, d.Count)
	}

	newA := big.NewInt(0)
	newA.Mul(multInv, d.A)

	// (A ( multInv X ) + B)
	// A = A multInv % cardCount
	// B = B

	return &LinearDeck{
		Count: d.Count,
		A:     newA,
		B:     d.B,
	}
}

func NewLinearDeck(count *big.Int) *LinearDeck {
	return &LinearDeck{
		Count: count,
		A:     big.NewInt(1),
		B:     big.NewInt(0),
	}
}

func PrintDeck(d *LinearDeck) {
	var i int64
	for i = 0; i < d.CardCount().Int64(); i++ {
		fmt.Printf("%d ", d.Get(big.NewInt(i)))
	}
	fmt.Println()
}

func readLinear(file string, cardCount *big.Int) *LinearDeck {
	data, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(data), "\n")

	var d = NewLinearDeck(cardCount)

	for _, line := range lines {
		if line == "deal into new stack" {
			d = d.DealIntoNewStack()
		} else if line[0:3] == "cut" {
			n, _ := strconv.Atoi(line[4:])
			d = d.Cut(big.NewInt(int64(n)))
		} else if line[:19] == "deal with increment" {
			n, _ := strconv.Atoi(line[20:])
			d = d.DealWithIncrement(big.NewInt(int64(n)))
		}
	}

	return d
}

func Compose(d *LinearDeck, newInt *big.Int) *LinearDeck {
	if newInt.Cmp(big.NewInt(1)) == 0 {
		return d
	}

	half := big.NewInt(0)
	half.Div(newInt, big.NewInt(2))

	newD := Compose(d, half)

	t := big.NewInt(0)
	t.Mod(newInt, big.NewInt(2))

	newD = ComposeDeck(newD, newD)
	if t.Int64() == 1 {
		newD = ComposeDeck(newD, d)
	}

	return newD
}

func ComposeDeck(d *LinearDeck, d2 *LinearDeck) *LinearDeck {
	newA := big.NewInt(0)
	newA.Mul(d.A, d2.A)
	newA.Mod(newA, d.Count)

	newB := big.NewInt(0)
	newB.Mul(d.A, d2.B)
	newB.Add(newB, d.B)
	newB.Mod(newB, d.Count)

	return &LinearDeck{
		Count: d.Count,
		A:     newA,
		B:     newB,
	}
}
