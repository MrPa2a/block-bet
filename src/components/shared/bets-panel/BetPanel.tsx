import './BetPanel.scss';

import React, { useState } from 'react';
import BetInputs from '../bets-input/BetInput';

const BetPanel: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`panel ${isExpanded ? 'expanded' : ''}`}>
            <div className="header" onClick={handleToggle}>
                Click to {isExpanded ? 'close' : 'set'} wager
            </div>
            {isExpanded && (
                <div className="content">
                    <BetInputs />
                </div>
            )}
        </div>
    );
};

export default BetPanel;
