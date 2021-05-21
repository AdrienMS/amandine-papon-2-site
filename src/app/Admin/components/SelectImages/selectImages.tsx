import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './style.scss';

import {
    FaTrash
} from 'react-icons/fa';

import LoadingElement from '../../../../features/LoadingElement/LoadingElement';

import { getImages, addNewImage, deleteImageFromKey } from '../../../../store/actions/imagesAction';
import { RootState } from '../../../../store';
import { Image } from '../../../../store/models/imagesTypes';

interface SelectImagesProps {
    onPage?: boolean;
    onClose: () => void;
    onValid: (key: string) => void;
}

const SelectImages: FC<SelectImagesProps> = (props: SelectImagesProps) => {
    const dispatch = useDispatch();
    const { images } = useSelector((state: RootState) => state.images);
    const [keySelected, setKeySelected] = useState('');

    useEffect(() => {
        dispatch(getImages(() => {console.log('error')}));
    }, [dispatch]);
    
    
    const handleUploadImages = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i += 1) {
                dispatch(addNewImage(
                    files[i],
                    () => console.log('error on upload images'),
                    (key: string | null) => {
                        if (key) setKeySelected(key);
                    })
                );
            }
        }
    }

    const changeSelectedKey = (key: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (!props.onPage) setKeySelected(key);
    }

    const onDelete = (image: Image, e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(deleteImageFromKey(image));
    }

    const renderImages = () => {
        if (images) {
            return images.map((image, index) =>
                <div
                    className={`select-images-image${!props.onPage && keySelected === image.key ? ' selected' : ''}`}
                    key={`select-images-image-${index}`}
                    onClick={e => changeSelectedKey(image.key, e)}
                >
                    <LazyLoadImage
                        alt='Amandine Papon - select-images'
                        placeholderSrc={image.pixelized}
                        src={image.full}
                        effect='blur'
                    />
                    {props.onPage ? <FaTrash onClick={e => onDelete(image, e)} /> : <></>}
                </div>
            )
        } else {
            const toReturn = [];
            for (let i = 0; i < 20; i += 1) {
                toReturn.push(<div className="select-images-image" key={`select-images-loading-${i}`}><LoadingElement width='100%' height='100%' rounded={false} /></div>);
            }
            return toReturn;
        }
    }

    return (
        <div className={`select-images${props.onPage ? ' on-page' : ''}`}>
            <div className="select-images-content">
                <div className="select-images-head">
                    {!props.onPage ? <h2 className="title">Choisir une image</h2> : <></>}
                    <div className="select-images-file">
                        <input className="select-images-file-input" type="file" id='file' placeholder="Choose file" multiple onChange={handleUploadImages} />
                        <label htmlFor="file" className="select-images-file-label">Téléverser des images</label>
                    </div>
                </div>
                <div className="select-images-container">
                    {renderImages().reverse()}
                </div>
                {!props.onPage ? 
                    (<div className="select-images-footer">
                        <button className="cancel" onClick={(e) => {props.onClose(); e.preventDefault(); setKeySelected('');}}>Annuler</button>
                        <button className="valid" onClick={(e) => {props.onValid(keySelected); e.preventDefault(); setKeySelected('');}}>Valider</button>
                    </div>)
                    : <></>
                }
            </div>
        </div>
    );
}

export default SelectImages;