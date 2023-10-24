// package main

// import (
// 	"encoding/csv"
// 	"fmt"
// 	"math"
// 	"os"
// 	"strconv"
// )

// type CSVRow struct {
// 	ItemId string
// 	JobId  string
// 	Time   float64
// }

// type Job struct {
// 	Number int
// 	JobId  string
// 	Time   float64
// }

// type Item struct {
// 	Number int
// 	ItemId string
// 	Jobs   []Job
// }

// func nextPermutation(arr []int) bool {
// 	i := len(arr) - 1
// 	for i > 0 && arr[i-1] >= arr[i] {
// 		i--
// 	}

// 	if i <= 0 {
// 		return false
// 	}

// 	j := len(arr) - 1
// 	for arr[j] <= arr[i-1] {
// 		j--
// 	}

// 	arr[i-1], arr[j] = arr[j], arr[i-1]

// 	j = len(arr) - 1
// 	for i < j {
// 		arr[i], arr[j] = arr[j], arr[i]
// 		i++
// 		j--
// 	}

// 	return true
// }

// func computeTime(sequence []int, items [][]float64) float64 {
// 	nJobs := len(items[0])
// 	start := make([]float64, nJobs)
// 	end := make([]float64, nJobs)

// 	for _, itemIndex := range sequence {
// 		item := items[itemIndex]

// 		for i := 0; i < nJobs; i++ {
// 			var prevJobsTotalTime float64
// 			if i == 0 {
// 				prevJobsTotalTime = 0
// 			} else {
// 				prevJobsTotalTime = end[i-1]
// 			}

// 			currentJobTime := item[i]

// 			start[i] = math.Max(prevJobsTotalTime, end[i])
// 			end[i] = start[i] + currentJobTime
// 		}
// 	}

// 	return end[nJobs-1]
// }

// func main() {
// 	// startTime := time.Now()

// 	csvFile, err := os.Open("data.csv")
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 		return
// 	}
// 	defer csvFile.Close()

// 	reader := csv.NewReader(csvFile)

// 	records, err := reader.ReadAll()
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 		return
// 	}

// 	var csvRows []CSVRow

// 	itemIdToIndexMap := make(map[string]int)
// 	jobIdToIndexMap := make(map[string]int)

// 	itemsCount := 0
// 	jobsCount := 0

// 	for i, record := range records {
// 		if i == 0 {
// 			continue
// 		}

// 		if len(record) != 3 {
// 			fmt.Println("Skipping invalid record:", record)
// 			continue
// 		}

// 		time, err := strconv.ParseFloat(record[2], 64)
// 		if err != nil {
// 			fmt.Println("Skipping invalid record:", record)
// 			continue
// 		}

// 		obj := CSVRow{
// 			ItemId: record[0],
// 			JobId:  record[1],
// 			Time:   time,
// 		}

// 		if _, ok := itemIdToIndexMap[obj.ItemId]; !ok {
// 			itemIdToIndexMap[obj.ItemId] = itemsCount
// 			itemsCount++
// 		}

// 		if _, ok := jobIdToIndexMap[obj.JobId]; !ok {
// 			jobIdToIndexMap[obj.JobId] = jobsCount
// 			jobsCount++
// 		}

// 		csvRows = append(csvRows, obj)
// 	}

// 	fmt.Println("Total Unique Items:", itemsCount)
// 	// fmt.Println("Total Unique Jobs:", jobsCount)

// 	finalItems := make([]Item, (itemsCount))

// 	for _, obj := range csvRows {
// 		itemIndex := itemIdToIndexMap[obj.ItemId]

// 		finalItems[itemIndex].Number = itemIndex
// 		finalItems[itemIndex].ItemId = obj.ItemId

// 		for len(finalItems[itemIndex].Jobs) < jobsCount {
// 			finalItems[itemIndex].Jobs = append(finalItems[itemIndex].Jobs, Job{})
// 		}

// 		jobIndex := jobIdToIndexMap[obj.JobId]

// 		finalItems[itemIndex].Jobs[jobIndex].Number = jobIndex
// 		finalItems[itemIndex].Jobs[jobIndex].JobId = obj.JobId
// 		finalItems[itemIndex].Jobs[jobIndex].Time = obj.Time
// 	}

// 	// jsonBytes, _ := json.MarshalIndent(finalItems, "", "  ")
// 	// _ = os.WriteFile("test.json", jsonBytes, 0644)

// 	items := make([][]float64, itemsCount)

// 	for _, record := range finalItems {

// 		items[record.Number] = make([]float64, jobsCount)

// 		for _, job := range record.Jobs {
// 			items[record.Number][job.Number] = job.Time
// 		}
// 	}

// 	deadline := 15.0

// 	var minTime float64 = math.Inf(1)
// 	var bestSequence []int

// 	sequence := make([]int, itemsCount)
// 	for i := range sequence {
// 		sequence[i] = i
// 	}

// 	totalPermutations := 1
// 	for {
// 		currentTime := computeTime(sequence, items)
// 		if currentTime < minTime {
// 			minTime = currentTime
// 			bestSequence = make([]int, itemsCount)
// 			copy(bestSequence, sequence)
// 		}
// 		if !nextPermutation(sequence) {
// 			break
// 		}
// 		totalPermutations++
// 	}

// 	// fmt.Println("Total permutations =>", totalPermutations)

// 	fmt.Println("Best sequence:", bestSequence, "Time:", minTime)
// 	fmt.Println("Start Date:", math.Floor(deadline-minTime))

// 	// elapsed := time.Since(startTime)
// 	// fmt.Println("Execution time:", elapsed)
// }
