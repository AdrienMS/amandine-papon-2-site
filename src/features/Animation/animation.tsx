import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

export const FADE = 'FADE';
export const SLIDE = 'SLIDE';

const Animation = (props: {visible: boolean, children: React.ReactNode, duration: number, type: string}) => {
    const childRef = useRef(props.children);
    const [state, setState] = useState(props.visible ? VISIBLE : HIDDEN);
    let className = state === VISIBLE ? 'animation' : 'animation out';

    switch (props.type) {
        case SLIDE:
            className += ' slide';
            break;
        default:
            className += ' fade';
    }

    if (props.visible) {
        childRef.current = props.children;
    }

    useEffect(() => {
        if (!props.visible) {
            setState(LEAVING);
        } else {
            setState((s) => s === HIDDEN ? ENTERING : VISIBLE);
        }
    }, [props.visible]);

    useEffect(() => {
        if (state === LEAVING) {
            const timer = setTimeout(() => {
                setState(HIDDEN);
            }, props.duration);
            return (() => {
                clearTimeout(timer);
            });
        } else if (state === ENTERING) {
            console.log(document.body.offsetHeight);
            setState(VISIBLE);
        }
    }, [props.duration, state]);

    if (state === HIDDEN) {
        return <></>;
    }

    return <div className={className}>{childRef.current}</div>
}

export default Animation;