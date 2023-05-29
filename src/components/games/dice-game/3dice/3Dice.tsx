import "./3Dice.scss";

import { useRef, useEffect, useState } from "react";

function getRandom(max: number, min: number) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
}

function determineVisibleFace() {
    const faces = [".face1", ".face2", ".face3", ".face4", ".face5", ".face6"];

    const cubeElement = document.getElementById("cube") as HTMLElement;
    const cubeBounds = cubeElement.getBoundingClientRect();

    const centerX = cubeBounds.left + cubeBounds.width / 2;
    const centerY = cubeBounds.top + cubeBounds.height / 2;

    for (const face of faces) {
        const element = document.querySelector(face) as HTMLElement;
        const elementStyles = window.getComputedStyle(element);

        const { left, top } = element.getBoundingClientRect();

        const width = parseFloat(elementStyles.width);
        const height = parseFloat(elementStyles.height);

        const offsetX = left + width / 2 - centerX;
        const offsetY = top + height / 2 - centerY;

        const targetX = centerX + offsetX;
        const targetY = centerY + offsetY;

        const targetElement = document.elementFromPoint(targetX, targetY);

        if (targetElement === element) {
            return parseInt(face.replace(".face", ""));
        }
    }

    return null; // Aucune face visible trouvée
}

interface ThreeDDiceProps {
    resetRollClick: any,
    isRollToggled: any,
    setIsRolling: any,
    selectedDice: any
}

const ThreeDDice: React.FC<ThreeDDiceProps> = ({
    resetRollClick,
    isRollToggled,
    setIsRolling,
    selectedDice
}) => {

    const cube = useRef<HTMLDivElement>(null);
    const faceOne = useRef<HTMLDivElement>(null);
    const faceTwo = useRef<HTMLDivElement>(null);
    const faceThree = useRef<HTMLDivElement>(null);
    const faceFour = useRef<HTMLDivElement>(null);
    const faceFive = useRef<HTMLDivElement>(null);
    const faceSix = useRef<HTMLDivElement>(null);

    const [winFace, setWinFace] = useState(1)

    const min = 1;
    const max = 24;

    useEffect(() => {
        const diceFaces = [faceOne, faceTwo, faceThree, faceFour, faceFive, faceSix];

        const getVisibleDiceFace = () => {

            let maxIndex = -1;
            let maxWidth = 0;
            let maxHeight = 0;

            diceFaces.forEach((child, index) => {
                const tmpHeight = child.current && Math.ceil(child.current.getBoundingClientRect().height);
                const tmpWidth = child.current && Math.ceil(child.current.getBoundingClientRect().width);

                if (tmpHeight && tmpWidth && tmpHeight >= maxHeight && tmpWidth >= maxWidth) {
                    maxIndex = index;
                    maxHeight = tmpHeight;
                    maxWidth = tmpWidth;
                }
            });

            return maxIndex + 1;
        }

        const onRollStart = () => {
            console.log("animation start")
            setIsRolling(true);
        }

        const onRollEnd = () => {
            const face = getVisibleDiceFace();
            const computedFace = determineVisibleFace();

            setIsRolling(false);
            setWinFace(computedFace || 0);

            console.log("animation end, face is", face || computedFace);
            console.log("you", selectedDice.includes(computedFace) ? 'WIN' : 'LOOSE')
        }

        const target = cube.current;

        target?.addEventListener('transitionstart', onRollStart);
        target?.addEventListener('transitionend', onRollEnd);

        return () => {
            target?.removeEventListener('transitionstart', onRollStart);
            target?.removeEventListener('transitionend', onRollEnd);
        }
    }, [selectedDice, setIsRolling, winFace]);

    useEffect(() => {
        const handleDiceClick = () => {
            const xRand = getRandom(max, min);
            const yRand = getRandom(max, min);

            if (cube.current) {
                cube.current.style.animation = 'float 3s ease-in-out';
                cube.current.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
                cube.current.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
            }
        }

        if (isRollToggled) {
            resetRollClick()
            handleDiceClick()
        }
    }, [isRollToggled, resetRollClick, winFace]);

    return (
        <div className="dice-container">
            <div id="cube" ref={cube}>
                <div ref={faceOne} className={`front face1 ${selectedDice.includes(1) && 'selected'}`}>
                    <span className="dot dot1"></span>
                </div>
                <div ref={faceTwo} className={`top face2 ${selectedDice.includes(2) && 'selected'}`}>
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                </div>
                <div ref={faceThree} className={`right face3 ${selectedDice.includes(3) && 'selected'}`}>
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                </div>
                <div ref={faceFour} className={`left face4 ${selectedDice.includes(4) && 'selected'}`}>
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                    <span className="dot dot4"></span>
                </div>
                <div ref={faceFive} className={`bottom face5 ${selectedDice.includes(5) && 'selected'}`}>
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                    <span className="dot dot4"></span>
                    <span className="dot dot5"></span>
                </div>
                <div ref={faceSix} className={`back face6 ${selectedDice.includes(6) && 'selected'}`}>
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                    <span className="dot dot4"></span>
                    <span className="dot dot5"></span>
                    <span className="dot dot6"></span>
                </div>
            </div>
        </div>
    );
}

export default ThreeDDice;