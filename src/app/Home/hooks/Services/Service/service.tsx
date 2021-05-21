import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

import { Link } from 'react-router-dom';

import { Service as ServiceModel } from '../../../../../store/models/servicesTypes';
import { Image } from '../../../../../store/models/imagesTypes';
import { RootState } from '../../../../../store';
import { getImageFromKey } from '../../../../../store/actions/imagesAction';

const Service = (props: {service: ServiceModel, keyId: number}) => {
    const { images } = useSelector((state: RootState) => state.images);
    let serviceImage = {} as Image;

    if (images) serviceImage = getImageFromKey(props.service?.image as string, images);

    return (
        <Link to={`/services#${props.keyId}`} className="card" style={{backgroundImage: `url(${serviceImage.full})`}} key={`service-item-${props.keyId}`}>
            <div className="card-content">
                <h3 className='title'>{props.service.name}</h3>
                <p className="description">{props.service.desc}</p>
            </div>
        </Link>
    )
}

export default Service;