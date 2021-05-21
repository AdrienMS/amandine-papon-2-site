import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { getBanner } from '../../../../store/actions/bannerAction';
import { getImageFromKey } from '../../../../store/actions/imagesAction';
import { RootState } from '../../../../store';

import LoadingElement from '../../../../features/LoadingElement/LoadingElement';

const Banner: FC = () => {
    const dispatch = useDispatch();
    const { banner } = useSelector((state: RootState) => state.banner);
    const { images } = useSelector((state: RootState) => state.images);
    let container = null;
    let containerImage = null;

    useEffect(() => {
        dispatch(getBanner(() => {console.log('error')}));
    }, [dispatch]);

    const renderImage = (isBanner: boolean) => {
        if (images && isBanner) {
            const bannerImage = getImageFromKey(banner?.image as string, images);
            return (
                <LazyLoadImage
                    alt='Amandine Papon - banner'
                    placeholderSrc={bannerImage.pixelized}
                    src={bannerImage.full}
                    effect='blur'
                    className='banner-photo'
                />
            );
        } else {
            return (
                <div className="banner-photo">
                    <LoadingElement width='100vw' height='100vh' rounded={false} />
                </div>
            );
        }
    }

    if (banner) {
        containerImage = renderImage(true);
        container = (
            <div className="container-title">
                <h1 className="title">{banner.title}</h1>
                <h2 className="sub-title">{banner.subTitle}</h2>
                <h3 className="sub-title">{banner.subSubTitle}</h3>
            </div>
        );
    } else {
        containerImage = renderImage(false);
        container = (
            <div className="container-title">
                <h1 className="title"><LoadingElement width='350px' height='49px' rounded={true} /></h1>
                <h2 className="sub-title"><LoadingElement width='450px' height='39px' rounded={true} /></h2>
                <h3 className="sub-title"><LoadingElement width='400px' height='39px' rounded={true} /></h3>
            </div>
        );
    }

    return (
        <section className='banner'>
            <div className="container-image">
                {containerImage}
            </div>
            {container}
        </section>
    );
}

export default Banner;