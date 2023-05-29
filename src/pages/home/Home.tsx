import Button from "../../components/shared/button/Button";
import "./Home.scss"

import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/home/info-card/InfoCard";

function Home() {

    const infoSection = useRef<HTMLDivElement>(null);
    const navBarPx = 40;

    const navigate = useNavigate(); 

    const routeChange = () => { 
      navigate('games');
    }

    const scrollDown = () => {
        if (infoSection.current) {
            window.scrollTo({
                top: infoSection.current.offsetTop - navBarPx,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="home">
            <div className="hero-wrapper">
                <div className="hero-content">
                    <div className="hero">
                        <h1>BLOCK BET</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
                        </p>
                    </div>
                    <div className="cta">
                        <Button
                            label="Play"
                            onClick={routeChange}
                        />
                    </div>
                </div>
                <div className="hero-image">
                    <img src="/public/assets/bet-card.png" alt="" />
                </div>
                <div className="scroll" onClick={scrollDown}>
                    <img src="/public/assets/double-down-64.png" alt="" />
                </div>
            </div>
            <div className="info-wrapper" ref={infoSection}>
                <h2>About</h2>
                <div className="info-content">
                    <InfoCard noImage color='primary' title="Low House Edge" content="Our extremely low house edge gives you significantly better odds compared to traditional casinos. With house edge as low as 0.5%, you have a much better chance of winning big at ZKasino than on any other platform!"/>
                    <InfoCard noImage color='secondary' title="No KYC" content="We do not require user registration, KYC, or funds to be deposited. Simply connect and place bets straight from your wallet. There is no way for us to limit, hold or steal your funds like a regular casino would!"/>
                    <InfoCard noImage color='tertiary' title="Provably Fair Betting" content="Our bet results are backed by Chainlink VRF and transparent odds are displayed publicly in our game smart contracts, so you can trust that every spin and deal is completely fair and random."/>
                </div>
            </div>
            <div className="info-wrapper">
                <h2>Insights</h2>
                <div className="info-content">
                    <InfoCard color='primary' title="$154,126,548" content="Total Betting Volume"/>
                    <InfoCard color='secondary' title="1,905,541" content="Total Bets"/>
                    <InfoCard color='tertiary' title="54,214" content="Total Users"/>
                </div>
            </div>
        </div>
    );
}

export default Home;