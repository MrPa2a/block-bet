import './SimpleRange.scss';

import BetInputs from './../../shared/bets-input/BetInput';

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEffect, useRef, useState } from 'react';
import Button from './../../shared/button/Button';
import { useSelector } from 'react-redux';
import { BetState } from '../../../store/stateTypes';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function SimpleRange() {
    const state = useSelector((state) => state);
    const betState = state as BetState;

    const [multiplier, setMultiplier] = useState(0);
    const [winrate, setWinrate] = useState(0);
    const [totalWager, setTotalWager] = useState(0);
    const [maxGain, setMaxGain] = useState(0);

    const [selectedSliderValue, setSelectedSliderValue] = useState(50);
    const [cursorValue, setCursorValue] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [isFirstRoll, setIsFirstRoll] = useState(true);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const thumbRef = useRef<HTMLDivElement>(null);

    const handleSetSliderValue = (value) => {
        if (!isFirstRoll) setIsFirstRoll(true);
        if (value > 95) {
            setSelectedSliderValue(95)
        } else if (value < 5) {
            setSelectedSliderValue(5)
        } else {
            setSelectedSliderValue(value)
        }
    }

    const handleButtonClick = () => {
        setIsRolling(true);

        const nombreAleatoire = randomIntFromInterval(0, 100);
        // const nbBalayages = randomIntFromInterval(1, 3);
        const nbBalayages = 1;
        const delayBetweenCycles = 10 / nbBalayages; // Délai entre chaque itération de balayage en millisecondes

        // Effectuer les balayages multiples
        performMultipleCycles(nbBalayages, delayBetweenCycles)
            .then(() => {
                startCounterTimeout(nombreAleatoire);
            });
    };

    const performMultipleCycles = async (nbBalayages: number, delayBetweenCycles: number) => {
        for (let i = 1; i < nbBalayages + 1; i++) {
            delayBetweenCycles *= i
            await performSingleCycle(delayBetweenCycles);
            await sleep(delayBetweenCycles);
        }
    };

    const performSingleCycle = async (delay: number) => {
        // Balayage de cursorValue à 100
        for (let i = cursorValue; i <= 100; i++) {
            await sleep(delay); // Délai entre chaque valeur
            setCursorValue(i);
        }

        // Balayage de 99 à 1
        for (let i = 99; i >= 1; i--) {
            await sleep(delay); // Délai entre chaque valeur
            setCursorValue(i);
        }
    };

    const startCounterTimeout = (nombreAleatoire: number) => {
        let compteur = 0;
        let intervalDelay = 10; // Intervalle initial en millisecondes
        const maxIntervalDelay = 500; // Valeur maximale de l'intervalle en millisecondes

        const calculateInverseExponentialDelay = (currentValue: number, totalValues: number) => {
            const base = maxIntervalDelay / intervalDelay;
            const exponent = Math.log(currentValue / intervalDelay) / Math.log(base);
            return Math.pow(totalValues - 2, exponent) * intervalDelay;
        };

        const startTimeout = () => {
            if (compteur <= nombreAleatoire) {
                setCursorValue(compteur);
                compteur++;

                // Calculer le délai exponentiel en fonction du nombre courant et du nombre total
                intervalDelay = calculateInverseExponentialDelay(compteur, nombreAleatoire + 1);
                setTimeoutId(setTimeout(startTimeout, intervalDelay)); // Démarrer le nouveau timeout avec le délai mis à jour
            } else {
                setTimeoutId(null); // Réinitialiser l'ID du timeout lorsque la boucle est terminée
                setIsFirstRoll(false);
                setIsRolling(false);
            }
        };

        setTimeoutId(setTimeout(startTimeout, intervalDelay)); // Démarrer le premier timeout avec l'intervalle initial
    };

    useEffect(() => {
        const a: number = Math.log(22);
        const b: number = Math.log(1);
        const coefficient = 1.05; // Coefficient logarithmique supplémentaire
        const res = Math.exp(coefficient * ((b - a) * (selectedSliderValue - 1)) / (100 - 1) + a);
        setMultiplier(res);
    }, [selectedSliderValue])

    useEffect(() => {
        setWinrate(selectedSliderValue);
    }, [selectedSliderValue])

    useEffect(() => {
        setTotalWager(betState.wager * betState.multipleBets);
    }, [betState.wager, betState.multipleBets])

    useEffect(() => {
        setMaxGain(betState.wager * multiplier * betState.multipleBets);
    }, [betState.wager, multiplier, betState.multipleBets])

    useEffect(() => {
        return () => {
            // Nettoyage du timeout en cas de démontage du composant
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    useEffect(() => {
        const allWithClass = Array.from(
            document.querySelectorAll('.range-slider__thumb[data-upper]')
        ) as HTMLElement[];

        if (allWithClass.length !== 0) {
            const cursorElement = allWithClass[0];
            const sliderElement = allWithClass[1];

            if (sliderElement) {
                sliderElement.style.setProperty('--content', `'${selectedSliderValue}'`);
            }

            if (cursorElement) {
                if (isRolling) {
                    cursorElement.style.setProperty('--content', `'${cursorValue}'`);
                    cursorElement.style.setProperty('--indicator-color', '#cb5554')
                } else if (isFirstRoll) {
                    cursorElement.style.setProperty('--content', '"Click on launch"');
                    cursorElement.style.setProperty('--indicator-color', '#cb5554')
                } else if (cursorValue >= selectedSliderValue) {
                    cursorElement.style.setProperty('--content', '"You loose"');
                    cursorElement.style.setProperty('--indicator-color', '#cb5554')
                } else if (cursorValue < selectedSliderValue) {
                    cursorElement.style.setProperty('--content', '"You win"');
                    cursorElement.style.setProperty('--indicator-color', '#54cb58')
                }
            }
        }

    }, [cursorValue, isFirstRoll, isRolling, selectedSliderValue]);

    return (
        <div className="range-game-container">
            <div className="range-game">

                <div className="range-slider-container">
                    <RangeSlider
                        className="free-thumb"
                        ref={thumbRef}
                        defaultValue={[0, 0]}
                        thumbsDisabled={[true, true]}
                        rangeSlideDisabled={true}
                        step={1}
                        value={[0, cursorValue]}
                    />
                    <RangeSlider
                        className="range-single-thumb"
                        defaultValue={[0, selectedSliderValue]}
                        thumbsDisabled={[true, isRolling]}
                        rangeSlideDisabled={true}
                        step={1}
                        value={[0, selectedSliderValue]}
                        onInput={(v: number[]) => handleSetSliderValue(v[1])}
                    />

                </div>
                <div className="range-inputs">
                    <div className="range-outputs">
                        <div className="output-range">
                            <span className="title">Multiplier</span>
                            <div className="content-container">
                                <span className="content-text">
                                    {multiplier.toFixed(2)}x
                                </span>
                            </div>
                        </div>
                        <div className="output-range">
                            <span className="title">Win</span>
                            <div className="content-container">
                                <span className="content-text">
                                    {winrate}%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="gains">
                        <div className="input-range">
                            <span className="title">Total wager</span>
                            <div className="content-container">
                                <span className="content-text">
                                    {totalWager}
                                </span>
                            </div>
                        </div>
                        <div className="input-range">
                            <span className="title">Max gain</span>
                            <div className="content-container">
                                <span className="content-text">
                                    {maxGain}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cta">
                    <Button label='Launch' onClick={handleButtonClick} disabled={isRolling || !betState.wager} />
                </div>
            </div>
            <div className="range-bets">
                <BetInputs />
            </div>
        </div>
    );
}

export default SimpleRange;