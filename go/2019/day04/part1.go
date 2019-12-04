package day04

import (
	"fmt"
	"strings"
)

func isValid(i int) bool {
	str := fmt.Sprint(i)
	parts := strings.Split(str, "")
	return hasDouble(parts) && isIncreasing(parts)
}

func isIncreasing(digits []string) bool {
	for i := 0; i < len(digits)-1; i++ {
		if digits[i] > digits[i+1] {
			return false
		}
	}

	return true
}

func hasDouble(digits []string) bool {
	for i := 0; i < len(digits)-1; i++ {
		if digits[i] == digits[i+1] {
			return true
		}
	}

	return false
}

func CountValidPasswords(start, end int) int {
	count := 0
	for i := start; i <= end; i++ {
		if isValid(i) {
			count++
		}
	}
	return count
}
