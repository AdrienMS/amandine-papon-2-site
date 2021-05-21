import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { getAbout } from '../../../../store/actions/aboutAction';
import { RootState } from '../../../../store';

import LoadingElement from '../../../../features/LoadingElement/LoadingElement';
import { getImageFromKey } from '../../../../store/actions/imagesAction';

const About: FC = () => {
    const dispatch = useDispatch();
    const { about } = useSelector((state: RootState) => state.about);
    const { images } = useSelector((state: RootState) => state.images);

    useEffect(() => {
        dispatch(getAbout());
    }, [dispatch]);

    const renderImages = () => {
        const background = images ? getImageFromKey(about?.background as string, images) : null;
        const profil = images ? getImageFromKey(about?.profil as string, images): null;

        if (background && profil) {
            return (
                <div className="about-images">
                    <LazyLoadImage
                        alt='Amandine Papon - background'
                        placeholderSrc={background.pixelized}
                        src={background.full}
                        effect='blur'
                        className='description-photo'
                    />
                    <LazyLoadImage
                        alt='Amandine Papon - about'
                        placeholderSrc={profil.pixelized}
                        src={profil.full}
                        effect='blur'
                        className='description-photo-profil'
                    />
                </div>
            );
        } else {
            return (
                <div className="description-photo">
                    <LoadingElement width='100%' height='100%' rounded={false} />
                </div>
            );
        }
    }

    if (about) {
        return (
            <section className='about' id='about'>
                <div className="about-container">
                    <h2 className="title">{about.title}</h2>
                    <h3 className="sub-title">{about.subTitle}</h3>
                    <div className="description">
                        <div className="text" dangerouslySetInnerHTML={{__html: about.text}} />
                    </div>
                    {renderImages()}
                </div>
            </section>
        );
    } else {
        return (
            <section className='about' id='about'>
                <div className="about-container">
                    <h2 className="title"><LoadingElement width='350px' height='49px' rounded={true} /></h2>
                    <h3 className="sub-title"><LoadingElement width='250px' height='39px' rounded={true} /></h3>
                    <div className="description">
                        <div className="text">
                            <LoadingElement width='100%' height='28px' rounded={true} />
                            <LoadingElement width='100%' height='28px' rounded={true} />
                            <LoadingElement width='100%' height='28px' rounded={true} />
                            <LoadingElement width='100%' height='28px' rounded={true} />
                            <LoadingElement width='60%' height='28px' rounded={true} />
                        </div>
                    </div>
                    {renderImages()}
                </div>
            </section>
        );
    }
}

export default About;