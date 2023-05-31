import "./Games.scss";

import SimpleDice from "../../components/games/dice-game/simple-dice/SimpleDice";
import { useState } from 'react';

import { ReactComponent as DiceLogo } from "/public/dice.svg";
import { ReactComponent as SliderLogo } from "/public/slider.svg";

interface GameElement {
    name: string;
    logo: JSX.Element;
    component: JSX.Element;
}

function Games() {

    const GAMES: GameElement[] = [
        {
            name: "Dice",
            logo: <DiceLogo/>,
            component: <SimpleDice />,
        },
        {
            name: "Slider",
            logo: <SliderLogo/>,
            component: <SimpleDice />,
        },
    ];

    const [selectedGame, setSelectedGame] = useState(GAMES[0]);

    return (
        <div className="games">
            <h2>Games</h2>
            <div className="game-carrousel">
                {
                    GAMES.map((game: GameElement) => {
                        return <>
                            <div 
                                className={`game ${selectedGame.name === game.name ? 'selected' : ''}`}
                                onClick={() => setSelectedGame(game)}
                            >
                                <div className="logo">
                                    {game.logo}
                                </div>
                                <div className="name">
                                    {game.name}
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
            <div className="games-container">
                {selectedGame.component}
            </div>
        </div>
    );
}

export default Games;