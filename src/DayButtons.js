import React from "react"
import DayButton from "./DayButton"

function DayButtons({ dayCounts }) {
  return (
    <div className="date-wall__grid">
      {dayCounts.map((count) => {
        return <DayButton key={count.day} count={count} {...count} />
      })}
    </div>
  )
}

export default DayButtons
