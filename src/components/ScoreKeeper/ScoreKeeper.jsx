import styles from './ScoreKeeper.module.css'

import { useState, useRef } from 'react'

const ScoreKeeper = () => {
  const [tempScore, setTempScore] = useState(0)
  const [score, setScore] = useState(0)
  const [roundScore, setRoundScore] = useState([])

  const buttonRef = useRef()

  const toggleButtons = (()=> {
    let buttons = [...buttonRef.current.children]
    buttons.forEach(button => {
      button.disabled ? button.disabled = false : button.disabled = true
    })
  })


  const [arrow, setArrow] = useState(1) 

  const handleDisk = (evt) => {
    setTempScore(tempScore - 1)
    toggleButtons()
    setRoundScore(...roundScore, [tempScore])
  }

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
        <button className="calculator">Hit</button>
        <button className="calculator">Miss</button>
      </div>
      {arrow === 2 ? <button className='calculator'>Pass</button> : null}
      <h4>Score This Round: {tempScore}</h4>
    </div>
  )
}

export default ScoreKeeper
