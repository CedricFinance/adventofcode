package main

import (
	"github.com/stretchr/testify/assert"
	"math/big"
	"testing"
)

func TestLinearDeck_DealIntoNewStack(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.DealIntoNewStack()
	checkDeck(d, []int64{9, 8, 7, 6, 5, 4, 3, 2, 1, 0}, t)

	d = NewLinearDeck(big.NewInt(10))
	d = d.DealWithIncrement(big.NewInt(3))
	checkDeck(d, []int64{0, 7, 4, 1, 8, 5, 2, 9, 6, 3}, t)
	d = d.Cut(big.NewInt(5))
	checkDeck(d, []int64{5, 2, 9, 6, 3, 0, 7, 4, 1, 8}, t)
	d = d.DealIntoNewStack()
	checkDeck(d, []int64{8, 1, 4, 7, 0, 3, 6, 9, 2, 5}, t)
}

func TestLinearDeck_Cut_Positive(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.Cut(big.NewInt(3))

	PrintDeck(d)
	checkDeck(d, []int64{3, 4, 5, 6, 7, 8, 9, 0, 1, 2}, t)

	d = &LinearDeck{
		Count: big.NewInt(10),
		A:     big.NewInt(-1),
		B:     big.NewInt(0),
	}
	d = d.Cut(big.NewInt(3))

	PrintDeck(d)
	checkDeck(d, []int64{7, 6, 5, 4, 3, 2, 1, 0, 9, 8}, t)
}

func TestLinearDeck_Cut_Negative(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.Cut(big.NewInt(-3))

	PrintDeck(d)
}

func TestLinearDeck_DealWithIncrement(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.DealWithIncrement(big.NewInt(3))

	PrintDeck(d)

	d = d.DealWithIncrement(big.NewInt(3))
	PrintDeck(d)
}

func TestLinearDeck_DealWithIncrementBis(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.DealWithIncrement(big.NewInt(7))

	PrintDeck(d)

	d = d.DealWithIncrement(big.NewInt(7))
	PrintDeck(d)
}

func TestLinearDeck_DealWithIncrement2(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.DealWithIncrement(big.NewInt(7))

	PrintDeck(d)

	checkDeck(d, []int64{0, 3, 6, 9, 2, 5, 8, 1, 4, 7}, t)
}

func checkDeck(d *LinearDeck, expectedValues []int64, t *testing.T) {
	for i, expectedValue := range expectedValues {
		if d.Get(big.NewInt(int64(i))).Int64() != expectedValue {
			t.Errorf("%dth value must be %d, got %d", i, expectedValue, d.Get(big.NewInt(int64(i))))
		}
	}
}

func TestLinearDeck_Ex1(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.DealWithIncrement(big.NewInt(7))
	d = d.DealIntoNewStack()
	d = d.DealIntoNewStack()

	PrintDeck(d)

	expectedValues := []int64{0, 3, 6, 9, 2, 5, 8, 1, 4, 7}
	for i, expectedValue := range expectedValues {
		if d.Get(big.NewInt(int64(i))).Int64() != expectedValue {
			t.Errorf("%dth value must be %d, got %d", i, expectedValue, d.Get(big.NewInt(int64(i))))
		}
	}
}

func TestLinearDeck_Ex2(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.Cut(big.NewInt(6))
	PrintDeck(d)

	d = d.DealWithIncrement(big.NewInt(7))
	PrintDeck(d)

	d = d.DealIntoNewStack()
	PrintDeck(d)

	expectedValues := []int64{3, 0, 7, 4, 1, 8, 5, 2, 9, 6}
	for i, expectedValue := range expectedValues {
		if d.Get(big.NewInt(int64(i))).Int64() != expectedValue {
			t.Errorf("%dth value must be %d, got %d", i, expectedValue, d.Get(big.NewInt(int64(i))))
		}
	}
}

func TestLinearDeck_Ex3(t *testing.T) {
	d := NewLinearDeck(big.NewInt(10))
	d = d.DealWithIncrement(big.NewInt(7))
	PrintDeck(d)

	d = d.DealWithIncrement(big.NewInt(9))
	PrintDeck(d)

	d = d.Cut(big.NewInt(-2))
	PrintDeck(d)

	expectedValues := []int64{6, 3, 0, 7, 4, 1, 8, 5, 2, 9}
	for i, expectedValue := range expectedValues {
		if d.Get(big.NewInt(int64(i))).Int64() != expectedValue {
			t.Errorf("%dth value must be %d, got %d", i, expectedValue, d.Get(big.NewInt(int64(i))))
		}
	}
}

func TestPart2(t *testing.T) {
	d := readLinear("input.txt", big.NewInt(119315717514047))

	checkDeck(d, []int64{90946404012537, 25718848390794, 79807010283098, 14579454661355, 68667616553659, 3440060931916, 57528222824220, 111616384716524, 46388829094781, 100476990987085, 35249435365342, 89337597257646, 24110041635903, 78198203528207, 12970647906464, 67058809798768, 1831254177025, 55919416069329, 110007577961633, 44780022339890, 98868184232194, 33640628610451, 87728790502755, 22501234881012, 76589396773316, 11361841151573, 65450003043877, 222447422134, 54310609314438, 108398771206742, 43171215584999, 97259377477303, 32031821855560, 86119983747864, 20892428126121, 74980590018425, 9753034396682, 63841196288986, 117929358181290, 52701802559547, 106789964451851, 41562408830108, 95650570722412, 30423015100669, 84511176992973, 19283621371230, 73371783263534, 8144227641791, 62232389534095, 116320551426399, 51092995804656, 105181157696960, 39953602075217, 94041763967521, 28814208345778, 82902370238082, 17674814616339, 71762976508643, 6535420886900, 60623582779204, 114711744671508, 49484189049765, 103572350942069, 38344795320326, 92432957212630, 27205401590887, 81293563483191, 16066007861448, 70154169753752, 4926614132009, 59014776024313, 113102937916617, 47875382294874, 101963544187178, 36735988565435, 90824150457739, 25596594835996, 79684756728300, 14457201106557, 68545362998861, 3317807377118, 57405969269422, 111494131161726, 46266575539983, 100354737432287, 35127181810544, 89215343702848, 23987788081105, 78075949973409, 12848394351666, 66936556243970, 1709000622227, 55797162514531, 109885324406835, 44657768785092, 98745930677396, 33518375055653, 87606536947957, 22378981326214, 76467143218518}, t)

	d1 := Compose(d, big.NewInt(1))
	if d.Get(big.NewInt(0)).Cmp(d1.Get(big.NewInt(0))) != 0 {
		t.Errorf("1: not equals")
	}

	d2 := Compose(d, big.NewInt(2))
	if d.Get(d.Get(big.NewInt(0))).Cmp(d2.Get(big.NewInt(0))) != 0 {
		t.Errorf("2: not equals")
	}

	d3 := Compose(d, big.NewInt(3))
	if d.Get(d.Get(d.Get(big.NewInt(0)))).Cmp(d3.Get(big.NewInt(0))) != 0 {
		t.Errorf("3: not equals")
	}

	d4 := Compose(d, big.NewInt(4))
	if d.Get(d.Get(d.Get(d.Get(big.NewInt(0))))).Cmp(d4.Get(big.NewInt(0))) != 0 {
		t.Errorf("4: not equals")
	}

	finalDeck := Compose(d, big.NewInt(101741582076661))
	assert.Equal(t, big.NewInt(62416301438548), finalDeck.Get(big.NewInt(2020)))
}
