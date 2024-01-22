import React, { useEffect, useState } from "react"
import DayButtons from "./DayButtons"

const DAY_COUNTS_LOCAL_STORAGE_KEY = "dabbling.dayCounts"

export const DayContext = React.createContext()

function DateWall() {
  const [inputDays, setInputDays] = useState("100")
  const [showTextField, setShowTextField] = useState(false)
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

  function toggleTextField() {
    setShowTextField(!showTextField)
  }

  function handleSubmit(e) {
    e.preventDefault()
    getDayCounts()
    toggleTextField()
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
      <form className="day-input-form" onSubmit={handleSubmit}>
        <input
          className="day-counts-input"
          type="number"
          value={inputDays}
          onChange={handleChange}
        />

        <span
          className="sub-text"
          onClick={() => {
            toggleTextField()
          }}
        >
          Days
        </span>
      </form>

      <div className="date-wall__wrapper">
        <DayContext.Provider value={dayContextValue}>
          <DayButtons dayCounts={dayCounts} />
        </DayContext.Provider>
      </div>
    </>
  )
}

export default DateWall
