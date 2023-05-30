import './SimpleDice.scss';

import ThreeDDice from "../3dice/3Dice";
import Button from "../../../shared/button/Button"

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

function SimpleDice() {
    const [selectedDice, setSelectedDice] = useState([] as number[]);
    const [multiplier, setMultiplier] = useState(0);
    const [winrate, setWinrate] = useState(0);
    const [wager, setWager] = useState(0);
    const [mutipleBets, setMultipleBets] = useState(1);
    const [totalWager, setTotalWager] = useState(0);
    const [maxGain, setMaxGain] = useState(0);

    const [isRollToggled, setIsRollToggled] = useState(false);
    const [isRolling, setIsRolling] = useState(false);

    const MAX = 0.235

    const handleRollClick = () => {
        setIsRollToggled(true);
    };

    const resetRollClick = () => {
        setIsRollToggled(false);
    }

    // const handleMultipleBetsClick = (direction: string) => {
    //     let newVal = mutipleBets;
    //     if (direction === 'up') {
    //         newVal++;
    //     } else if (direction === 'down' && newVal > 1) {
    //         newVal--;
    //     }
    //     setMultipleBets(newVal);
    // }

    const onMultipleBetsChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.target.value)) {
            event.preventDefault();
        } else {
            const value = Math.floor(Number(event.target.value))
            if (value <= 100) {
                setMultipleBets(value);
            } else {
                setMultipleBets(100)
            }
        }
    };

    const handleWagerClick = (step?: number) => {
        let newVal = wager;
        if (step == 0) {
            newVal = 0
        } else if (step && newVal * step <= MAX) {
            newVal *= step
        } else {
            newVal = MAX
        }
        setWager(newVal)
    }

    const onWagerChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWager(Number(event.target.value));
    };

    const onSliderValueChange = (value: number[], callback: { (value: SetStateAction<number>): void; (arg0: number): void; }) => {
        callback(value[1])
    }

    const toggleSelectedDice = (i: number) => {
        let dices = [...selectedDice];

        if (dices.includes(i)) {
            dices = dices.filter(elem => elem != i);
        } else if (dices.length < 5) {
            dices.push(i);
        }
        setSelectedDice(dices);
    }

    useEffect(() => {
        const MULTIPLIERS = [0, 5.88, 2.94, 1.96, 1.47, 1.176];
        setMultiplier(MULTIPLIERS[selectedDice.length]);
    }, [selectedDice])

    useEffect(() => {
        setWinrate(!selectedDice.length ? 0 : selectedDice.length / 6 * 100);
    }, [selectedDice])

    useEffect(() => {
        setTotalWager(wager * mutipleBets);
    }, [wager, mutipleBets])

    useEffect(() => {
        setMaxGain(wager * multiplier * mutipleBets);
    }, [wager, multiplier, mutipleBets])

    return (
        <div className="dice-game-container">
            <div className="dices-choice">
                <div className="dices">
                    <div className={`dice one-dice ${selectedDice.includes(1) && 'selected'}`} onClick={() => !isRolling && toggleSelectedDice(1)}>
                        <span className="point"></span>
                    </div>
                    <div className={`dice two-dice ${selectedDice.includes(2) && 'selected'}`} onClick={() => !isRolling && toggleSelectedDice(2)}>
                        <span className="point"></span>
                        <span className="point"></span>
                    </div>
                    <div className={`dice three-dice ${selectedDice.includes(3) && 'selected'}`} onClick={() => !isRolling && toggleSelectedDice(3)}>
                        <span className="point"></span>
                        <span className="point"></span>
                        <span className="point"></span>
                    </div>
                    <div className={`dice four-dice ${selectedDice.includes(4) && 'selected'}`} onClick={() => !isRolling && toggleSelectedDice(4)}>
                        <div className="point-col">
                            <span className="point"></span>
                            <span className="point"></span>
                        </div>
                        <div className="point-col">
                            <span className="point"></span>
                            <span className="point"></span>
                        </div>
                    </div>
                    <div className={`dice five-dice ${selectedDice.includes(5) && 'selected'}`} onClick={() => !isRolling && toggleSelectedDice(5)}>
                        <div className="point-col">
                            <span className="point"></span>
                            <span className="point"></span>
                        </div>
                        <div className="point-col">
                            <span className="point"></span>
                        </div>
                        <div className="point-col">
                            <span className="point"></span>
                            <span className="point"></span>
                        </div>
                    </div>
                    <div className={`dice six-dice ${selectedDice.includes(6) && 'selected'}`} onClick={() => !isRolling && toggleSelectedDice(6)}>
                        <div className="point-col">
                            <span className="point"></span>
                            <span className="point"></span>
                            <span className="point"></span>
                        </div>
                        <div className="point-col">
                            <span className="point"></span>
                            <span className="point"></span>
                            <span className="point"></span>
                        </div>
                    </div>
                </div>
                <div className="dice-outputs">
                    <div className="output-box">
                        <span className="title">Multiplier</span>
                        <div className="content-container">
                            <span className="content-text">
                                {multiplier}x
                            </span>
                        </div>
                    </div>
                    <div className="output-box">
                        <span className="title">Win</span>
                        <div className="content-container">
                            <span className="content-text">
                                {winrate.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dice-animation">
                <div className="threed-dice">
                    <ThreeDDice
                        isRollToggled={isRollToggled}
                        resetRollClick={resetRollClick}
                        selectedDice={selectedDice}
                        setIsRolling={setIsRolling}
                    />
                </div>
                <div className="gains">
                    <div className="input-box">
                        <span className="title">Total Wager</span>
                        <div className="content-container">
                            <span className="content-text">
                                {totalWager}
                            </span>
                        </div>
                    </div>
                    <div className="input-box">
                        <span className="title">Max gain</span>
                        <div className="content-container">
                            <span className="content-text">
                                {maxGain}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cta">
                    <Button label="Roll" onClick={handleRollClick} disabled={isRolling || selectedDice.length === 0 || wager === 0} />
                </div>
            </div>
            <div className="dices-bet">
                <div className="input-box">
                    <span className="title">Wager</span>
                    {/* <div className="content-container">
                        <span className="content-text">
                            {wager}
                        </span>
                    </div> */}
                    <input type='number' className='content-container' value={wager} onChange={(e) => onWagerChange(e)} />
                    <RangeSlider 
                        className="single-thumb"
                        defaultValue={[0, 0]}
                        thumbsDisabled={[true, false]}
                        rangeSlideDisabled={true}
                        max={MAX}
                        step={0.00001}
                        value={[0, wager]}
                        onInput={(v: number[]) => onSliderValueChange(v, setWager)}
                    />
                    <div className="action-box">
                        <div className="multipliers">
                            <div className="half" onClick={() => handleWagerClick(0.5)}>
                                1/2
                            </div>
                            <div className="double" onClick={() => handleWagerClick(2)}>
                                2x
                            </div>
                            <div className="max" onClick={() => handleWagerClick()}>
                                Max
                            </div>
                        </div>
                        <div className="reset" onClick={() => handleWagerClick(0)}>
                            ↺
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="title">Multiple Bets</span>
                    {/* <div className="content-container">
                        <span className="content-text">
                            {mutipleBets}
                        </span>
                        <div className="up-and-down">
                            <span onClick={() => handleMultipleBetsClick('up')}>▲</span>
                            <span onClick={() => handleMultipleBetsClick('down')}>▼</span>
                        </div>
                    </div> */}
                    <input type='number' pattern="[0-9]*" className='content-container' value={mutipleBets} onChange={(e) => onMultipleBetsChange(e)} />
                    <RangeSlider 
                        className="single-thumb"
                        defaultValue={[0, 0]}
                        thumbsDisabled={[true, false]}
                        rangeSlideDisabled={true}
                        max={100}
                        step={1}
                        value={[0, mutipleBets]}
                        onInput={(v: number[]) => onSliderValueChange(v, setMultipleBets)}
                    />
                </div>
                <div className="divider"></div>
                <div className="input-box">
                    <span className="title">Stop Gain</span>
                    <div className="content-container">
                        <span className="content-text">
                            -
                        </span>
                    </div>
                </div>
                <div className="input-box">
                    <span className="title">Stop Loss</span>
                    <div className="content-container">
                        <span className="content-text">
                            -
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SimpleDice;