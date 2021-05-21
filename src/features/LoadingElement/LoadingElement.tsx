import React from 'react';
import './style.scss';

class LoadingElement extends React.Component<{width: string, height: string, rounded: boolean}, {}>  {
    render() {
        return (
            <div
                className={`loading-element${this.props.rounded ? ' rounded': ''}`}
                style={{width: this.props.width, height: this.props.height}}
            />
        );
    }
}

export default LoadingElement;