import './BetInputs.scss';

import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { BetState } from '../../../store/stateTypes';
import { updateMultipleBets, updateWager } from '../../../store/bets/betAction';

function BetInputs() {
    const state = useSelector((state) => state);
    const betState = state as BetState;
    const dispatch = useDispatch();

    const onMultipleBetsChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.target.value)) {
            event.preventDefault();
        } else {
            const value = Math.floor(Number(event.target.value))
            if (value <= 100) {
                // setMultipleBets(value);
                dispatch(updateMultipleBets(value));
            } else {
                // setMultipleBets(100);
                dispatch(updateMultipleBets(100));
            }
        }
    };

    const handleWagerClick = (step?: number) => {
        let newVal = betState.wager;
        if (step == 0) {
            newVal = 0
        } else if (step && newVal * step <= betState.MAX) {
            newVal *= step
        } else {
            newVal = betState.MAX
        }
        // setWager(newVal)
        dispatch(updateWager(newVal))
    }

    const onWagerChange = (event: ChangeEvent<HTMLInputElement>) => {
        // setWager(Number(event.target.value));
        dispatch(updateWager(Number(event.target.value)))
    };

    const onSliderValueChange = (value: number[], callback) => {
        dispatch(callback(value[1]))
    }

    return (
        <div className="dices-bet">
            <div className="input-box">
                <span className="title">Wager</span>
                <input type='number' className='content-container' value={betState.wager} onChange={(e) => onWagerChange(e)} />
                <RangeSlider
                    className="single-thumb"
                    defaultValue={[0, 0]}
                    thumbsDisabled={[true, false]}
                    rangeSlideDisabled={true}
                    max={betState.MAX}
                    step={0.00001}
                    value={[0, betState.wager]}
                    onInput={(v: number[]) => onSliderValueChange(v, updateWager)}
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
                <input type='number' pattern="[0-9]*" className='content-container' value={betState.multipleBets} onChange={(e) => onMultipleBetsChange(e)} />
                <RangeSlider
                    className="single-thumb"
                    defaultValue={[0, 0]}
                    thumbsDisabled={[true, false]}
                    rangeSlideDisabled={true}
                    max={100}
                    step={1}
                    value={[0, betState.multipleBets]}
                    onInput={(v: number[]) => onSliderValueChange(v, updateMultipleBets)}
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
    );
}

export default BetInputs;