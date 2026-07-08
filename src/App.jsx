import { useCallback, useEffect, useState } from 'react'

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
    const [secretLength, setSecretLength] = useState(3)
    const [secretString, setSecretString] = useState('')
    const [dataIndex, setDataIndex] = useState(0)
    const [data, setData] = useState([])
    const [guess, setGuess] = useState('')
    const [checkResult, setCheckResult] = useState(checkResultEnum.unknown)

    const initNewGame = useCallback(() => {
        const localSecretString = createRandomString(alphabetCharArray, secretLength)
        setSecretString(localSecretString)
        console.log(localSecretString)
        const localData = stringToMorseArray(localSecretString)
        setData(localData)
        setCheckResult(checkResultEnum.unknown)
        setGuess('')
        setDataIndex(0)
    }, [secretLength])

    useEffect(() => {
        initNewGame()
    }, [initNewGame])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDataIndex(c => ((c + 1) % Math.max(1, data.length)))
        }, 240)
        return () => clearInterval(intervalId)
    }, [data])

    const signal = data[dataIndex] ? indicatorOn : indicatorOff

    const handleDataLengthChanged = event => {
        setSecretLength(event.target.value)
    }

    const checkGuessForCorrectness = () => {
        if (guess.trim() === secretString) {
            setCheckResult(checkResultEnum.correct)
        }
        else {
            setCheckResult(checkResultEnum.incorrect)
        }
    }

    const handleGuessChanged = event => {
        setGuess(event.target.value)
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
                return [`Incorrect, was: "${secretString}"`, classNameIncorrect]
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
                            <input id='signalLengthInput' value={secretLength} onChange={e => handleDataLengthChanged(e)} type='number' min='1' max='20' />
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
