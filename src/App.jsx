import { useEffect, useState } from 'react'

import { stringToMorseArray } from './logic/transformer'

// proportion 1:3:7

const indicatorOn = '◉'
const indicatorOff = ' '

function App() {
    const [input, setInput] = useState('')
    const [dataIndex, setDataIndex] = useState(0)
    const [data, setData] = useState([])

    const handleInputChange = e => {
        setInput(e.target.value)
        setData(stringToMorseArray(e.target.value))
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDataIndex(c => ((c + 1) % Math.max(1, data.length)))
        }, 240)
        return () => clearInterval(intervalId)
    }, [data])

    const signal = data[dataIndex] ? indicatorOn : indicatorOff

    return (
        <>
            <h2>JSMorse</h2>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input id='input' type='text' value={input} onChange={e => handleInputChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {dataIndex}
                        </td>
                        <td>
                            {signal}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default App
