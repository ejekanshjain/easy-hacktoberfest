// package main

// import (
// 	"bufio"
// 	"encoding/csv"
// 	"encoding/json"
// 	"fmt"
// 	"os"
// 	"sort"
// 	"strconv"
// 	"strings"
// 	"time"
// )

// type Product struct {
// 	Name  string
// 	Times []float64
// }

// var products []Product
// var jobs int

// func main() {
// 	filePath := "Book3.csv"
// 	read(filePath)

// 	if len(products) == 0 {
// 		fmt.Println("No products found in the CSV.")
// 		return
// 	}

// 	jobs = len(products[0].Times)

// 	// fmt.Println("Starting...")
// 	// fmt.Println("Enter deadline:")
// 	// var deadline int
// 	// fmt.Scanln(&deadline)
// 	deadline := 15

// 	assemblyTime := 1
// 	assemblyDate := deadline - assemblyTime

// 	startTime := time.Now()

// 	jsonBytes, _ := json.MarshalIndent(products, "", "  ")
// 	_ = os.WriteFile("test.json", jsonBytes, 0644)

// 	bestSeq := sptf()
// 	minTime := compTime(bestSeq)

// 	endTime := time.Now()
// 	duration := endTime.Sub(startTime)

// 	fmt.Println("\nbest seq:", bestSeq)
// 	fmt.Println("min time:", minTime, "days")
// 	startDate := assemblyDate - int(minTime)
// 	fmt.Println("start date:", startDate, "oct")
// 	fmt.Printf("Execution time: %.2f seconds\n", duration.Seconds())
// }

// func read(filePath string) {
// 	file, err := os.Open(filePath)
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 		return
// 	}
// 	defer file.Close()

// 	reader := csv.NewReader(bufio.NewReader(file))
// 	reader.Comma = ','
// 	reader.LazyQuotes = true

// 	records, err := reader.ReadAll()
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 		return
// 	}

// 	productMap := make(map[string][]float64)

// 	for _, record := range records[1:] {
// 		if len(record) < 3 {
// 			fmt.Println("Invalid data in CSV. Expected at least 3 columns.")
// 			return
// 		}

// 		productName := strings.TrimSpace(record[1])
// 		processTime, err := strconv.ParseFloat(strings.TrimSpace(record[2]), 64)
// 		if err != nil {
// 			fmt.Println("Error parsing time:", err)
// 			return
// 		}

// 		productMap[productName] = append(productMap[productName], processTime)
// 	}

// 	jobs = MaxNumJobs(productMap)
// 	products = make([]Product, 0, len(productMap))

// 	for productName, times := range productMap {
// 		products = append(products, Product{Name: productName, Times: times})
// 	}
// }

// func compTime(prodSeq []int) float64 {
// 	start := make([]float64, jobs)
// 	end := make([]float64, jobs)
// 	for i := range end {
// 		end[i] = 0
// 	}

// 	for _, productIndex := range prodSeq {
// 		times := products[productIndex].Times
// 		for j, pTime := range times {
// 			if j >= jobs {
// 				break
// 			}
// 			mStart := 0.0
// 			if j > 0 {
// 				mStart = end[j-1]
// 			}
// 			start[j] = MaxFloat64(mStart, end[j])
// 			end[j] = start[j] + pTime
// 		}
// 	}

// 	if jobs <= 0 {
// 		return 0
// 	}

// 	return end[jobs-1]
// }

// func sptf() []int {
// 	indices := make([]int, len(products))
// 	for i := range indices {
// 		indices[i] = i
// 	}

// 	sort.Slice(indices, func(i, j int) bool {
// 		sumTimesI := sumTimes(products[indices[i]].Times)
// 		sumTimesJ := sumTimes(products[indices[j]].Times)
// 		return sumTimesI < sumTimesJ
// 	})

// 	fmt.Println("indices:", indices)

// 	return indices
// }

// func sumTimes(times []float64) float64 {
// 	sum := 0.0
// 	for _, t := range times {
// 		sum += t
// 	}
// 	return sum
// }

// func MaxFloat64(a, b float64) float64 {
// 	if a > b {
// 		return a
// 	}
// 	return b
// }

// func MaxNumJobs(productMap map[string][]float64) int {
// 	maxJobs := 0
// 	for _, times := range productMap {
// 		if len(times) > maxJobs {
// 			maxJobs = len(times)
// 		}
// 	}
// 	return maxJobs
// }
