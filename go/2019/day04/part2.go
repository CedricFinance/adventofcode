package day04

import (
	"fmt"
	"strings"
)

func isReallyValid(i int) bool {
	str := fmt.Sprint(i)
	parts := strings.Split(str, "")
	return hasExactlyDouble(parts) && isIncreasing(parts)
}

func hasExactlyDouble(digits []string) bool {
	i := 0
	for i < len(digits)-1 {
		dups := 1
		for i < len(digits)-1 && digits[i] == digits[i+1] {
			dups++
			i++
		}

		if dups == 1 {
			i++
		}
		if dups == 2 {
			return true
		}
	}

	return false
}

func CountReallyValidPasswords(start, end int) int {
	count := 0
	for i := start; i <= end; i++ {
		if isReallyValid(i) {
			count++
		}
	}
	return count
}
