import { useEffect, useState } from 'react'

import './main.css'

import { alphabetCharArray, createRandomString } from './logic/randomizer'
import { stringToMorseArray } from './logic/transformer'

const indicatorOn = '◉'
const indicatorOff = ' '

const checkResultEnum = {
    unknown: 0,
    correct: 1,
    incorrect: 2,
}

const classNameCorrect = 'correct'
const classNameIncorrect = 'incorrect'

function App() {
    const [dataIndex, setDataIndex] = useState(0)
    const [dataString, setDataString] = useState('')
    const [data, setData] = useState([])
    const [guess, setGuess] = useState('')
    const [checkResult, setCheckResult] = useState(checkResultEnum.unknown)

    const initNewGame = () => {
        const localInput = createRandomString(alphabetCharArray, 3)
        setDataString(localInput)
        console.log(localInput)
        const localData = stringToMorseArray(localInput)
        setData(localData)
        setCheckResult(checkResultEnum.unknown)
        setGuess('')
        setDataIndex(0)
    }

    useEffect(() => {
        initNewGame()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDataIndex(c => ((c + 1) % Math.max(1, data.length)))
        }, 240)
        return () => clearInterval(intervalId)
    }, [data])

    const signal = data[dataIndex] ? indicatorOn : indicatorOff

    const checkGuessForCorrectness = () => {
        if (guess.trim() === dataString) {
            setCheckResult(checkResultEnum.correct)
        }
        else {
            setCheckResult(checkResultEnum.incorrect)
        }
    }

    const handleGuessChanged = e => {
        setGuess(e.target.value)
    }

    const handleGuessEnterKeyDown = () => {
        checkGuessForCorrectness()
    }

    const handleCheckClicked = () => {
        checkGuessForCorrectness()
    }

    const getResultItems = () => {
        switch (checkResult) {
            case checkResultEnum.unknown:
                return ['', '']
            case checkResultEnum.correct:
                return ['Correct!', classNameCorrect]
            case checkResultEnum.incorrect:
                return [`Incorrect, was: "${dataString}"`, classNameIncorrect]
        }
    }

    const [resultString, resultClass] = getResultItems()

    const checkButtonDisabled = checkResult !== checkResultEnum.unknown || guess.length === 0

    const handleResetClicked = () => {
        initNewGame()
    }

    const resetButtonDisabled = checkResult === checkResultEnum.unknown

    return (
        <>
            <h2>JSMorse</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Signal:
                        </td>
                        <td>
                            <span id='signalSpan'>{signal}</span>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Guess:
                        </td>
                        <td>
                            <input id='guessInput' type='text' value={guess} onChange={e => handleGuessChanged(e)} onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleGuessEnterKeyDown()
                                }
                            }} />
                        </td>
                        <td>
                            <button id='checkButton' disabled={checkButtonDisabled} onClick={e => handleCheckClicked(e)}>Check</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <span id='resultSpan' className={resultClass}>{resultString}</span>
                        </td>
                        <td>
                            <button id='resetButton' disabled={resetButtonDisabled} onClick={e => handleResetClicked(e)}>Reset</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default App
