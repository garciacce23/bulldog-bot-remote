import React, { useEffect } from 'react';
import nipplejs from 'nipplejs';

interface JoystickProps {
    onJoystickMove: (angle: number, force: number) => void;
}

const Joystick: React.FC<JoystickProps> = ({ onJoystickMove }) => {
    useEffect(() => {
        // Get the container element
        const container = document.getElementById('joystick-container');

        // Only create the joystick if the container exists
        if (container) {
            const joystick = nipplejs.create({
                zone: container,
                mode: 'static',
                position: { left: '50%', top: '50%' },
                color: 'blue',
                size: 100
            });

            joystick.on('move', (evt, data) => {
                const angle = data.angle.degree;
                const force = data.force;
                onJoystickMove(angle, force);
            });

            joystick.on('end', () => {
                onJoystickMove(0, 0);
            });

            return () => {
                joystick.destroy();
            };
        }

        // If the container doesn't exist, you might want to handle this case
        // e.g., by logging an error or setting an error state.
    }, [onJoystickMove]);

    return <div id="joystick-container" style={{ width: '200px', height: '200px' }} />;
};

export default Joystick;
