import React from 'react'
import { useEffect, useState } from 'react';
import "../App.css"
import ColorBox from './ColorBox';

const ColorGenerator = ({
        yourDark, setYourDark,
        yourPrimary, setYourPrimary,
        yourAccent, setYourAccent,
        yourSecondary, setYourSecondary,
        yourLight, setYourLight
    }) => {

        const [lockedColors, setLockedColors] = useState([]);

        const fullTypeArray =
            [
                { stringName: "yourDark", stateSet: setYourDark, stateCur: yourDark },
                { stringName: "yourPrimary", stateSet: setYourPrimary, stateCur: yourPrimary },
                { stringName: "yourAccent", stateSet: setYourAccent, stateCur: yourAccent },
                { stringName: "yourSecondary", stateSet: setYourSecondary, stateCur: yourSecondary },
                { stringName: "yourLight", stateSet: setYourLight, stateCur: yourLight },
            ]

        const randomizeColor = (typeArray) => {
            if (typeArray.length === 0) {
                typeArray = fullTypeArray.filter(item => !lockedColors.includes(item.stateSet))
            };

            typeArray.forEach(item => {
                let max = 255
                let min = 0
                switch (item.stateSet) {
                    case (setYourDark):
                        max = 60;
                        break;
                    case (setYourLight):
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
                item.stateSet("#" + randomHex);
                sessionStorage.setItem(item.stringName, ("#" + randomHex));
            });

        }

        const setLock = (func) => {
            setLockedColors(prevArray => [...prevArray, func]);
        }

        const removeLock = (func) => {
            setLockedColors(prevArray => prevArray.filter(item => item !== func));
        };

        return (
            <div>
                <div className="boxHolder">
                    {fullTypeArray.map(item =>
                        <ColorBox
                            key={`${item.stringName}-box`}
                            color={item.stateCur}
                            storageName={item.stringName}
                            setFunc={item.stateSet}
                            isLocked={lockedColors.includes(item.stateSet)}
                            lockColor={() => setLock(item.stateSet)}
                            unlockColor={() => removeLock(item.stateSet)}
                            randomizeColor={() => randomizeColor([item])}
                        />
                    )}
                </div>

                <button onClick={() => randomizeColor([])}>randomize all</button>
            </div>
        )
    }

export default ColorGenerator;