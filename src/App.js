import { useState, useEffect } from "react"
import DateWall from "./DateWall"
import "./styles/App.css"

const HEADER_TEXT_LOCAL_STORAGE_KEY = "dabbling.headerText"

function App() {
  const [headerText, setHeaderText] = useState("#100DaysOfSwiftUI")
  const [showTextField, setShowTextField] = useState(false)

  function toggleTextField() {
    setShowTextField(!showTextField)
  }

  function handleChange(change) {
    setHeaderText(change)
  }

  function handleSubmit(e) {
    e.preventDefault()
    toggleTextField()
  }

  //load data
  useEffect(() => {
    const headerTextJson = localStorage.getItem(HEADER_TEXT_LOCAL_STORAGE_KEY)
    if (headerTextJson != null) setHeaderText(JSON.parse(headerTextJson))
  }, [])

  //save data
  useEffect(() => {
    localStorage.setItem(
      HEADER_TEXT_LOCAL_STORAGE_KEY,
      JSON.stringify(headerText)
    )
  }, [headerText])

  return (
    <div className="web-body">
      <h1
        className="header-message"
        onClick={() => {
          toggleTextField()
        }}
      >
        {headerText}
      </h1>
      {showTextField && (
        <form onSubmit={handleSubmit}>
          <input
          className="header-text-input"
            type="text"
            value={headerText}
            onChange={(e) => handleChange(e.target.value)}
          />
        </form>
      )}
      <DateWall />
    </div>
  )
}

export default App
