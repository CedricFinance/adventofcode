package day03

func Min(first, second int) int {
	if first < second {
		return first
	}
	return second
}

func Max(first, second int) int {
	if first > second {
		return first
	}
	return second
}

func Abs(i int) int {
	if i >= 0 {
		return i
	}
	return -i
}
