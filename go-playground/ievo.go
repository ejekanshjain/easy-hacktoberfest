package main

import (
	"fmt"
	"math"
	"time"
)

func generatePermutations(arr []int) [][]int {
	var result [][]int

	var permute func(arr []int, current []int)
	permute = func(arr []int, current []int) {
		if len(arr) == 0 {
			result = append(result, current)
			return
		}

		for i := range arr {
			newArr := make([]int, len(arr))
			copy(newArr, arr)
			item := newArr[i]
			newArr = append(newArr[:i], newArr[i+1:]...)
			permute(newArr, append(current, item))
		}
	}

	permute(arr, nil)

	return result
}

func computeTime(sequence []int, items [][]float64) float64 {
	nJobs := len(items[0])
	start := make([]float64, nJobs)
	end := make([]float64, nJobs)

	for _, itemIndex := range sequence {
		item := items[itemIndex]

		for i := 0; i < nJobs; i++ {
			var prevJobsTotalTime float64
			if i == 0 {
				prevJobsTotalTime = 0
			} else {
				prevJobsTotalTime = end[i-1]
			}

			currentJobTime := item[i]

			start[i] = math.Max(prevJobsTotalTime, end[i])
			end[i] = start[i] + currentJobTime
		}
	}

	return end[nJobs-1]
}

func main() {
	startTime := time.Now()
	items := [][]float64{
		{0.23, 0.19, 0.19, 0.19, 1, 0.35},
		{0.35, 0.29, 0.29, 0.1, 1, 0.53},
	}

	deadline := 7.0
	assembly := 1.0
	deadlineBeforeAssembly := deadline - assembly

	var min float64 = math.Inf(1)
	var bestSequence []int

	sequence := []int{0, 1}
	allPermutations := generatePermutations(sequence)

	fmt.Println("Total permutations =>", len(allPermutations))

	for _, permutation := range allPermutations {
		time := computeTime(permutation, items)
		fmt.Println("Time for sequence", permutation, "=>", time)
		if time < min {
			min = time
			bestSequence = permutation
		}
	}

	fmt.Println("Best sequence:", bestSequence, "Time:", min)
	fmt.Println("Start Date:", math.Floor(deadlineBeforeAssembly-min))
	elapsed := time.Since(startTime)
	fmt.Println("Execution time:", elapsed)
}
