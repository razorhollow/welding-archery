import styles from './ScoreKeeper.module.css'

import { useState, useEffect, useRef } from 'react'
import { getValue } from '@testing-library/user-event/dist/utils'

const ScoreKeeper = () => {
  const [tempScore, setTempScore] = useState(0)
  const [score, setScore] = useState(0)
  const [roundScore, setRoundScore] = useState([])

  const buttonRef = useRef()

  const toggleButtons = ((bool)=> {
    let buttons = [...buttonRef.current.children]
    buttons.forEach(button => {
      button.disabled = bool
    })
  })


  const [arrow, setArrow] = useState(1) 

  const handleDisk = () => {
    setTempScore(tempScore - 1)
    toggleButtons(true)
    setScore(score + tempScore)
  }

  const handleMiss = () => {
    setTempScore(tempScore + 1)
    setArrow(arrow + 1)
    if (arrow === 2) {
      toggleButtons(true)
    }
  }

  const handleHit = () => {
    toggleButtons(true)
    if (arrow === 2) {
      setTempScore(tempScore - .5)
    } else {
      setTempScore(0)
    }
  }

  const handleNext = () => {
    toggleButtons(false)
    setScore(score + tempScore)
    setTempScore(0)
    setRoundScore([...roundScore, tempScore])
  }

  const handlePass = () => {
    toggleButtons(true)
    alert('fortune favors the brave')
  }

  useEffect(()=> {
    console.log(roundScore)
  })

  return (
    <div className={styles.container}>
      {roundScore.length > 0 ?
        <>
          <h3>Current Score Through {roundScore.length} Targets</h3>
          <p className="score-box">{score}</p>
        </>
      :
        <h3>Ready to Begin: Round 1</h3>
    }
      <div ref={buttonRef} className="button-container">
        <button className="calculator" onClick={handleDisk}>Disk</button>
        <button className="calculator" onClick={handleHit}>Hit</button>
        <button className="calculator" onClick={handleMiss}>Miss</button>
      </div>
      {arrow === 2 ? <button className='calculator' onClick={handlePass}>Pass</button> : null}
      <h4>Score This Round: {tempScore}</h4>
      <button onClick={handleNext}>Next Target</button>
    </div>
  )
}

export default ScoreKeeper
