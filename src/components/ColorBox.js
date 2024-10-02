import { React, useState, useEffect } from 'react'

function ColorBox({ color, setFunc, storageName, isLocked, lockColor, unlockColor, randomizeColor }) {
    const [inputValue, setInputValue] = useState(color);
    const [showInputFeedback, setShowInputFeedBack] = useState(false)

    useEffect(() => {
        setInputValue(color);
    }, [color]);

    const handleInputChange = (e, func) => {
        const value = e.target.value
        const regex = /^[#a-fA-F0-9]+$/;

        if (regex.test(value) && (value.length === 7 || value.length === 4)) {
            setShowInputFeedBack(false)
            func(e.target.value)
        } else {
            setShowInputFeedBack(true)
        }
        setInputValue(value);
        sessionStorage.setItem(storageName, color)
    }

    const handleInputBlur = (e, color, setFunc) => {
        setInputValue(color)
        setFunc(color)
        setShowInputFeedBack(false)
    }

    return (
        <div className="colorBoxContainer">
            <div style={{
                backgroundColor: color,
            }} className="colorBoxColor">
            </div>
            <div className="colorBoxButtons">
                <input
                    type="text"
                    value={inputValue}
                    onBlur={(e) => handleInputBlur(e, color, setFunc)}
                    onChange={(e) => handleInputChange(e, setFunc)}></input>

                    {showInputFeedback && <p className="invalidHex">Invalid hex</p>}
                    {!showInputFeedback && isLocked && <button onClick={unlockColor}>Unlock</button>}
                    {!showInputFeedback && !isLocked && <div><button onClick={lockColor}>Lock&nbsp;</button>|
                        <button onClick={randomizeColor}>&nbsp;Generate</button></div>}
            </div>
        </div>
    )
}

export default ColorBox

