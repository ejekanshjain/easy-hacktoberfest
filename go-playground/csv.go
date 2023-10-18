package main

import (
	"encoding/csv"
	"fmt"
	"math"
	"os"
	"strconv"
	"time"
)

type ItemWithJob struct {
	ItemId string
	JobId  string
	Time   float64
}

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

	file, err := os.Open("data.csv")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)

	records, err := reader.ReadAll()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	var arr []ItemWithJob
	myMap := make(map[string]int)
	counter := 1

	for i, record := range records {
		if i == 0 {
			continue
		}
		if len(record) != 3 {
			fmt.Println("Skipping invalid record:", record)
			continue
		}
		time, err := strconv.ParseFloat(record[2], 64)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
		obj := ItemWithJob{
			ItemId: record[0],
			JobId:  record[1],
			Time:   time,
		}
		if _, ok := myMap[obj.ItemId]; !ok {
			myMap[obj.ItemId] = counter
			counter++
		}
		arr = append(arr, obj)
	}

	items := make([][]float64, len(myMap))

	for _, record := range arr {
		items[myMap[record.ItemId]-1] = append(items[myMap[record.ItemId]-1], record.Time)
	}

	fmt.Println("Items =>", items)

	deadline := 15.0
	// assembly := 1.0
	// deadlineBeforeAssembly := deadline - assembly

	var min float64 = math.Inf(1)
	var bestSequence []int

	sequence := make([]int, len(items))
	for i := range sequence {
		sequence[i] = i
	}
	allPermutations := generatePermutations(sequence)

	fmt.Println("Total permutations =>", len(allPermutations))

	for _, permutation := range allPermutations {
		time := computeTime(permutation, items)
		// fmt.Println("Time for sequence", permutation, "=>", time)
		if time < min {
			min = time
			bestSequence = permutation
		}
	}

	fmt.Println("Best sequence:", bestSequence, "Time:", min)
	fmt.Println("Start Date:", (deadline - min))
	elapsed := time.Since(startTime)
	fmt.Println("Execution time:", elapsed)

}
