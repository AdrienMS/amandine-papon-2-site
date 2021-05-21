import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { RootState } from '../../../../store';
import { getLocation, setSize } from '../../../../store/actions/locationAction';
import LoadingElement from '../../../../features/LoadingElement/LoadingElement';

const Location: FC = () => {
    const dispatch = useDispatch();
    const { location, size } = useSelector((state: RootState) => state.location);

    useEffect(() => {
        const handleSizes = () => {
            if (window.innerHeight <= 500 && window.innerWidth <= 940) {
                dispatch(setSize(document.getElementById('location-places')?.offsetHeight));
            } else if (size) {
                dispatch(setSize(undefined));
            }
        }
        dispatch(getLocation(() => console.error('error on get companies')));
        window.addEventListener('resize', handleSizes);
        return () => {
            window.removeEventListener('resize', handleSizes);
        }
    }, [dispatch, size]);

    const renderLocation = () => {
        if (location) {
            return (
                <div className="location-places" id='location-places'>
                    <h2 className="title">{location.title}</h2>
                    <p className="text" dangerouslySetInnerHTML={{__html: location.text as string}}></p>
                </div>
            );
        } else {
            return (
                <div className="location-places" id='location-places'>
                    <div className="title"><LoadingElement width='100%' height='49px' rounded={true} /></div>
                    <div className="text"><LoadingElement width='100%' height='100px' rounded={true} /></div>
                </div>
            );
        }
    }

    // change API KEY
    return (
        <section className="location" style={size ? {'height': `calc(40vh + ${size}px)`} : {}}>
            <div className="location-map">
                <LoadScript googleMapsApiKey='AIzaSyCOlCWglACdL8xVijkKzuO5JFlPbpd7Wpw'>
                    <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100%'}}
                        center={{lat: 43.5211591, lng: -0.66302774}}
                        zoom={9}
                    ></GoogleMap>
                </LoadScript>
            </div>
            {renderLocation()}
        </section>
    );
}

export default Location;