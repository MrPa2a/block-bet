import './SimpleDice.scss';

import ThreeDDice from "../3dice/3Dice";
import Button from "../../../shared/button/Button"

import { useEffect, useState } from 'react';
import BetInputs from '../../../shared/bets-input/BetInput';
import { useSelector } from 'react-redux';
import { BetState } from '../../../../store/stateTypes';

function SimpleDice() {
    const state = useSelector((state) => state);
    const betState = state as BetState;
    // const dispatch = useDispatch();

    const [selectedDice, setSelectedDice] = useState([] as number[]);
    const [multiplier, setMultiplier] = useState(0);
    const [winrate, setWinrate] = useState(0);
    const [totalWager, setTotalWager] = useState(0);
    const [maxGain, setMaxGain] = useState(0);

    const [isRollToggled, setIsRollToggled] = useState(false);
    const [isRolling, setIsRolling] = useState(false);

    const handleRollClick = () => {
        setIsRollToggled(true);
    };

    const resetRollClick = () => {
        setIsRollToggled(false);
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
        setTotalWager(betState.wager * betState.multipleBets);
    }, [betState.wager, betState.multipleBets])

    useEffect(() => {
        setMaxGain(betState.wager * multiplier * betState.multipleBets);
    }, [betState.wager, multiplier, betState.multipleBets])

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
                    <Button label="Roll" onClick={handleRollClick} disabled={isRolling || selectedDice.length === 0 || betState.wager === 0} />
                </div>
            </div>
            <BetInputs />
        </div>
    );
}

export default SimpleDice;