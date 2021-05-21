import React, { CSSProperties } from 'react';
import './style.scss';

import Field from '../Field';

class Checkbox extends Field {
    renderFieldType() {
        return (
            <input
                type="checkbox"
                className="field-checkbox"
                id={this.props.keyId.toString()}
                name={this.props.keyId.toString()}
                onChange={e => { this.handleChanged(e.target.value); this.handleFocus(null); }}
                required={this.props.field.required}
            />
        );
    }

    render() {
        let fieldStyle = {} as CSSProperties;
        if (this.props.field.size !== 'center') {
            fieldStyle = {
                width: `calc(${this.props.field.size ? `${this.props.field.size}%` : '100%'} - 20px)`,
            }
        } else {
            fieldStyle = {
                width: `fit-content`,
                margin: '0 auto'
            }
        }
        const htmlText = {__html: this.props.field.htmlText? this.props.field.htmlText : '<i style="color: red">Il faut définir htmlText</i>'};
        return (
            <div
                key={`input-${this.props.keyId}`}
                onBlur={this.handleBlur}
                className={`field-container${this.state.isFocus ? ' focus' : ''}${this.props.field.error ? ' error' : ''}`}
                style={fieldStyle}
            >
                {this.renderFieldType()}
                <label htmlFor={this.props.keyId.toString()} className='field-label-checkbox' dangerouslySetInnerHTML={htmlText}>
                </label>
                {this.renderError()}
            </div>
        );
    }
}

export default Checkbox;