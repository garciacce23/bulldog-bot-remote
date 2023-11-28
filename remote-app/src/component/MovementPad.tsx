import React from 'react';
import '../style/MovementPad.css';

interface MovementPadProps {
    onDirectionClick: (direction: string) => void;
}

const buttons = [
    { label: 'Up-Left', direction: 'u' },
    { label: 'Up', direction: 'i' },
    { label: 'Up-Right', direction: 'o' },
    { label: 'Left', direction: 'j' },
    { label: 'Center', direction: 'k' },
    { label: 'Right', direction: 'l' },
    { label: 'Down-Left', direction: 'm' },
    { label: 'Down', direction: ',' },
    { label: 'Down-Right', direction: '.' },
];

const MovementPad: React.FC<MovementPadProps> = ({ onDirectionClick }) => {
    return (
        <div className="movement-pad">
            {buttons.map((button, index) => (
                <button key={index} onClick={() => onDirectionClick(button.direction)}>
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default MovementPad;