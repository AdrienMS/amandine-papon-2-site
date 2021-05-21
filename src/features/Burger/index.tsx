import React from 'react';
import './style.scss';

interface BurgerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function Burger(props: BurgerProps) {
    return (
        <button className={`burger${props.open ? ' burger-open' : ''}`} onClick={() => props.setOpen(!props.open)}>
            <div />
            <div />
            <div />
        </button>
    );
}

export default Burger;