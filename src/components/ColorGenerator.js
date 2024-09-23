import React from 'react'
import { useEffect, useState } from 'react';
import "../App.css"
import ColorBox from './ColorBox';

const ColorGenerator = () => {
    const [yourPrimary, setYourPrimary] = useState(sessionStorage.getItem("yourPrimary") || "#343434")
    const [yourAccent, setYourAccent] = useState(sessionStorage.getItem("yourAccent") || "#232323")
    const [yourSecondary, setYourSecondary] = useState(sessionStorage.getItem("yourSecondary") || "#121212")
    const [yourDark, setYourDark] = useState(sessionStorage.getItem("yourSecondary") || "#001122")
    const [yourLight, setYourLight] = useState(sessionStorage.getItem("yourSecondary") || "#ffeeff")

    const [lockedColors, setLockedColors] = useState([]);

    const randomizeColor = (typeArray) => {
        if (typeArray.length === 0) {
            typeArray = [setYourPrimary, setYourAccent, setYourSecondary, setYourDark, setYourLight]
            typeArray = typeArray.filter(item => !lockedColors.includes(item))
        };

        typeArray.forEach(setColor => {
            let max = 255
            let min = 0
            switch (setColor) {
                case (setYourDark):
                    max = 60;
                    break;
                case (setYourLight):
                    console.log("randomizing light color")
                    max = 55;
                    min = 200;
                    break;
            }

            const r = Math.floor(Math.random() * max + min);
            const g = Math.floor(Math.random() * max + min);
            const b = Math.floor(Math.random() * max + min);

            const randomHex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);


            if (randomHex.length < 6) {
                randomHex += "f".repeat(6 - randomHex.length);
            }
            setColor("#" + randomHex);
            sessionStorage.setItem(setColor.name, ("#" + randomHex));
        });

    }

    const setLock = (func) => {
        setLockedColors(prevArray => [...prevArray, func]);
        console.log("set lock to", func)
    }

    const removeLock = (func) => {
        setLockedColors(prevArray => prevArray.filter(item => item !== func));
        console.log("removed lock from", func)
    };

    return (
        <div className="boxHolder">

            <ColorBox
                color={yourDark}
                isLocked={lockedColors.includes(setYourDark)}
                lockColor={() => setLock(setYourDark)}
                unlockColor={() => removeLock(setYourDark)}
                randomizeColor={() => randomizeColor([setYourDark])}
            />

            <ColorBox
                color={yourPrimary}
                isLocked={lockedColors.includes(setYourPrimary)}
                lockColor={() => setLock(setYourPrimary)}
                unlockColor={() => removeLock(setYourPrimary)}
                randomizeColor={() => randomizeColor([setYourPrimary])}
            />
            <ColorBox
                color={yourAccent}
                isLocked={lockedColors.includes(setYourAccent)}
                lockColor={() => setLock(setYourAccent)}
                unlockColor={() => removeLock(setYourAccent)}
                randomizeColor={() => randomizeColor([setYourAccent])}
            />
            <ColorBox
                color={yourSecondary}
                isLocked={lockedColors.includes(setYourSecondary)}
                lockColor={() => setLock(setYourSecondary)}
                unlockColor={() => removeLock(setYourSecondary)}
                randomizeColor={() => randomizeColor([setYourSecondary])}
            />

            <ColorBox
                color={yourLight}
                isLocked={lockedColors.includes(setYourLight)}
                lockColor={() => setLock(setYourLight)}
                unlockColor={() => removeLock(setYourLight)}
                randomizeColor={() => randomizeColor([setYourLight])}
            />

            <button onClick={() => randomizeColor([])}>randomize all</button>
            <div>{yourPrimary}, {yourAccent}, {yourSecondary}</div>
        </div>
    )
}

export default ColorGenerator;