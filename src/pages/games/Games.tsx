import "./Games.scss";

import SimpleDice from "../../components/games/dice-game/simple-dice/SimpleDice";

function Games () {
    return ( 
        <div className="games">
            <h2>Games</h2>
            <div className="games-container">
                <SimpleDice />
            </div>
        </div>
     );
}

export default Games;