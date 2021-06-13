import React, { useEffect, useState } from "react"
import DayButtons from "./DayButtons"

const DAY_COUNTS_LOCAL_STORAGE_KEY = "dabbling.dayCounts"

export const DayContext = React.createContext()

function DateWall() {
  const [inputDays, setInputDays] = useState("")
  var inputDaysNumber = parseInt(inputDays)
  let currentDayCounts = []
  const [dayCounts, setDayCounts] = useState(currentDayCounts)

  const dayContextValue = {
    handleStatusChange,
  }

  function handleStatusChange(day, count) {
    const newDayCounts = [...dayCounts]
    const index = newDayCounts.findIndex((d) => d.day === day)
    newDayCounts[index] = count
    console.log(newDayCounts)
    setDayCounts(newDayCounts)
  }

  function getDayCounts() {
    const newDayCounts = makeDayCount()
    setDayCounts(newDayCounts)
  }

  function makeDayCount() {
    for (let i = 1; i <= inputDaysNumber; i++) {
      let dayObj = { day: i, finished: false }
      currentDayCounts.push(dayObj)
    }
    return currentDayCounts
  }

  function handleSubmit(e) {
    e.preventDefault()
    getDayCounts()
  }

  function handleChange(e) {
    setInputDays(e.target.value)
  }

  //load data
  useEffect(() => {
    const dayCountsJson = localStorage.getItem(DAY_COUNTS_LOCAL_STORAGE_KEY)
    if (dayCountsJson != null) setDayCounts(JSON.parse(dayCountsJson))
  }, [])

  //save data
  useEffect(() => {
    localStorage.setItem(
      DAY_COUNTS_LOCAL_STORAGE_KEY,
      JSON.stringify(dayCounts)
    )
  }, [dayCounts])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="day-counts-input"
          type="number"
          value={inputDays}
          onChange={handleChange}
        />
        <span className="sub-text">Days</span>
        <button className="btn btn--create ml-1 hide" type="submit">
          Create
        </button>
      </form>

      <div className="date-wall__wrapper">
        <DayContext.Provider value={dayContextValue}>
          <DayButtons dayCounts={dayCounts} />
        </DayContext.Provider>
      </div>
    </>
  )
}

// const sampleDayCounts = [
//     {day: 1},
//     {day: 2},
//     {day: 3},
//     {day: 4},
//     {day: 5},
//     {day: 6},
//     {day: 7},
//     {day: 8},
//     {day: 9},
//     {day: 10},
//     {day: 11},
//     {day: 12},
//     {day: 13},
//     {day: 14},
//     {day: 15},
//     {day: 16},
//     {day: 17},
//     {day: 18},
//     {day: 19},
//     {day: 20},
// ]

export default DateWall
