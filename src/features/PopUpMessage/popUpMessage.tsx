import React, { useEffect } from 'react';
import './style.scss';

import { FaTimes, FaCheck } from 'react-icons/fa';

import Animation, { SLIDE } from '../Animation/animation';

const PopUpMessage = (props: {msg: string, isSuccess: boolean, visible: boolean, duration: number, endAnimation: () => void}) => {
    
    useEffect(() => {
        if (props.visible) {
            const timer = setTimeout(() => props.endAnimation(), props.duration);
            return (() => {
                clearInterval(timer);
            });
        }
    }, [props])

    return (
        <Animation visible={props.visible} duration={props.duration} type={SLIDE}>
        <div className='popup'>
            {props.isSuccess ? <FaCheck className='popup-icon green' /> : <FaTimes  className='popup-icon red' />}
            <p className="popup-text">{props.msg}</p>
        </div>
        </Animation>
    );
}

export default PopUpMessage;