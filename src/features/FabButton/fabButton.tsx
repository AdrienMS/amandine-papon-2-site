import React, { FC } from 'react';
import './style.scss';

interface FabButtonProps {
    onClick: () => void;
}

const FabButton: FC<FabButtonProps> = (props: FabButtonProps) => {
    return <button className="fab-button" onClick={e => {e.preventDefault(); props.onClick();}}>+</button>
}

export default FabButton;