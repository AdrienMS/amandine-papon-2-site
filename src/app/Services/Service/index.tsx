import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ServiceDisplay } from '../../../store/models/servicesTypes';
import { RootState } from '../../../store';
import { Image } from '../../../store/models/imagesTypes';
import { getImageFromKey } from '../../../store/actions/imagesAction';
import { setMobile } from '../../../store/actions/servicesAction';


interface ServiceProps {
    service: ServiceDisplay;
    align: string;
    keyId: string;
}

const Service = (props: ServiceProps) => {
    const dispatch = useDispatch();
    const { images } = useSelector((state: RootState) => state.images);
    const { mobile } = useSelector((state: RootState) => state.services);
    let serviceImage = {} as Image;

    if (images) serviceImage = getImageFromKey(props.service?.service.image as string, images);

    useEffect(() => {
        const handleSizes = () => {
            if (window.innerWidth <= 768) {
                dispatch(setMobile(true));
            } else {
                dispatch(setMobile(false));
            }
        }

        window.addEventListener('resize', handleSizes);
        handleSizes();
        return () => {
            window.removeEventListener('resize', handleSizes);
        }
    }, [dispatch]);

    return (
        <section
            className={`service${props.service.isDown ? ' down-scroll' : ''}${props.service.isUp ? ' up-scroll' : ''}${props.align === 'right' ? ' service-right' : ''}${mobile ? ' service-mobile' : ''}`}
            key={props.keyId}
        >
            <div className="service-container-image">
                <LazyLoadImage
                    alt='Amandine Papon - service'
                    placeholderSrc={serviceImage.pixelized}
                    src={serviceImage.full}
                    effect='blur'
                    className='service-image'
                />
            </div>
            <div className="service-wrapper">
                <div className="service-container">
                    <h2 className="service-title">{props.service.service.name}</h2>
                    <div className="service-content" dangerouslySetInnerHTML={{__html: props.service.service.content}}></div>
                </div>
            </div>
        </section>
    );
}

export default Service;