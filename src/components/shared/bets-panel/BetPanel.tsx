import './BetPanel.scss';

import React, { useState } from 'react';
import BetInputs from '../bets-input/BetInput';

const BetPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  const computedStyle = getComputedStyle(document.body);
  const background = computedStyle.getPropertyValue('--background');
  const primaryColor = computedStyle.getPropertyValue('--primary');
  const secondaryLightColor = computedStyle.getPropertyValue('--secondary-light');

  return (
    // <div
    //   style={{
    //     height: isExpanded ? 'auto' : '30px', // Hauteur initiale de la partie "émergée"
    //     position: 'fixed',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     backgroundColor: secondaryLightColor,
    //     transition: 'height 0.3s ease-in-out',
    //     cursor: 'pointer',
    //     borderTopRightRadius: '20px',
    //     borderTopLeftRadius: '20px',
    //   }}
    //       onClick={handleToggle}
    //   >
    //   <div
    //     style={{
    //       position: 'absolute',
    //       backgroundColor: secondaryLightColor,
    //       bottom: isExpanded ? 'auto' : '-10px', // Position de la partie "émergée"
    //       left: 0,
    //       right: 0,
    //       height: '10px',
    //       borderTopRightRadius: '20px',
    //       borderTopLeftRadius: '20px',
    //     }}
    //     draggable={!isExpanded} // Désactiver le glissement lorsque le panneau est ouvert
    //     onDragStart={(e) => e.preventDefault()}
    //     onDrag={handleToggle}
    //   />
    //   {isExpanded && (
    //     <div
    //       style={{
    //         padding: '50px',
    //         backgroundColor: secondaryLightColor,
    //         transition: 'all 0.3s ease-in-out',
    //         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    //         display: 'flex',
    //         alignItems: 'flex-end',
    //         justifyContent: 'center',
    //         borderTopRightRadius: '20px',
    //         borderTopLeftRadius: '20px',
    //       }}
    //     >
    //       <BetInputs />
    //     </div>
    //   )}
    // </div>
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
