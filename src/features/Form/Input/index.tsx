import React from 'react';
import './style.scss';

import Field from '../Field';

class Input extends Field {
    renderFieldType() {
        if (this.props.field.type === 'textarea') {
            return (
                <textarea
                    name=""
                    id={this.props.keyId.toString()}
                    placeholder={this.props.field.placeholder}
                    value={this.props.field.value}
                    onChange={e => { this.handleChanged(e.target.value); this.handleFocus(null); }}
                    required={this.props.field.required}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    className="field-input field-textarea">
                </textarea>
            );
        } else {
            return (
                <input
                    type={this.props.field.type}
                    id={this.props.keyId.toString()}
                    name={this.props.keyId.toString()}
                    placeholder={this.props.field.placeholder}
                    value={this.props.field.value}
                    onChange={e => { this.handleChanged(e.target.value); this.handleFocus(null); }}
                    required={this.props.field.required}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    className='field-input'
                />
            );
        }
    }
};

export default Input;