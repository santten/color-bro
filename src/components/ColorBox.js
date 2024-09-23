import React from 'react'

function ColorBox({ color, isLocked, lockColor, unlockColor, randomizeColor }) {
    return (
        <div style={{
            backgroundColor: color,
        }} className="colorBox">
            {isLocked ? <button onClick={unlockColor}>unlock</button> :
                <><button onClick={lockColor}>lock</button>
                    <button onClick={randomizeColor}>randomize this only</button></>}
            {color}
        </div>
    )
}

export default ColorBox

