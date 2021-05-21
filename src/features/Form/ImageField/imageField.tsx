import React, { CSSProperties } from 'react';
import './style.scss';

import SelectImages from '../../../app/Admin/components/SelectImages/selectImages';
import Field from '../Field';
import { getImageFromKey } from '../../../store/actions/imagesAction';
import { Image } from '../../../store/models/imagesTypes';

class ImageField extends Field {
    onValid = (key: string) => {
        if (this.props.onImagesChanged) this.props.onImagesChanged(this.props.indexGroup);
        this.setState({openImage: false});
        this.handleChanged(key);
        this.handleFocus(null);
    }

    renderFieldType() {
        const images = this.props.field.images ? this.props.field.images : [] as Array<Image>;
        const image = images.length > 0 ? getImageFromKey(this.props.field.value, images) : null;
        const style = {
            height: this.props.field.height ? this.props.field.height : '200px',
            marginTop: this.props.field.height ? '0' : undefined
        } as CSSProperties;
        const styleModifyText = {
            marginTop: this.props.field.height ? '20px' : undefined
        } as CSSProperties;

        return (
            <>
                <div className='field-image' onClick={() => this.setState({openImage: true})} style={style}>
                    {image ?
                        <img src={image.full} alt="field" className="field-image-photo" style={style} /> :
                        <div className="field-image-no-photo">
                            <p style={styleModifyText}>Pas d'image sélectionnée</p>
                        </div>
                    }
                    <div className="field-image-text">
                        <p style={styleModifyText}>Modifier</p>
                    </div>
                </div>
                {this.state.openImage ? <SelectImages onClose={() => this.setState({openImage: false})} onValid={this.onValid} /> : <></>}
            </>
        );
    }
};

export default ImageField;