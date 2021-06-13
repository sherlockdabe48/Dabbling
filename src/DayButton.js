import React, { useState, useContext } from "react"
import { DayContext } from "./DateWall"

export default function DayButton({ day, finished, count }) {
  const { handleStatusChange } = useContext(DayContext)
  const [dayStatus, setDayStatus] = useState(finished)
  let buttonClass = finished ? "btn--finished" : "btn--normal"

  function toggleDayStatus() {
    setDayStatus((prevStatus) => {
      return prevStatus === false ? true : false
    })
    handleStatusChange(day, { day: day, finished: !dayStatus })
  }

  return (
    <div className="button-wrapper">
      {dayStatus && <i className="fas fa-check"></i>}
      <button
        className={`btn btn--day ${buttonClass}`}
        onClick={() => {
          toggleDayStatus()
        }}
      >
        {day}
      </button>
    </div>
  )
}
