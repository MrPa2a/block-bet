import "./Games.scss";

import ThreeDDice from "../../components/games/dice-game/3dice/3Dice";
import SimpleDice from "../../components/games/dice-game/simple-dice/SimpleDice";

function Games () {
    return ( 
        <div className="games">
            <h2>Games</h2>
            <div className="games-container">
                {/* <Dice /> */}
                <SimpleDice />
            </div>
        </div>
     );
}

export default Games;