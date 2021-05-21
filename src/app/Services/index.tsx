import React, { useEffect } from 'react';
import './style.scss';

import Service from './Service';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ServiceDisplay } from '../../store/models/servicesTypes';
import { setCurrentIndex, setDisplay, setTicking } from '../../store/actions/servicesAction';

const Services = () => {
    const dispatch = useDispatch();
    const { services, display, currentIndex, ticking } = useSelector((state: RootState) => state.services);
    let tickingTimeout: NodeJS.Timeout | null = null;

    useEffect(() => {
        if (window.innerWidth > 768 && window.location.href.includes('#') && services) {
            const indexToLocate = parseInt(window.location.hash.replace('#', ''));
            const servicesDisplay = services.items.slice().map((service, index) => {
                const d: ServiceDisplay = {
                    service: service
                }
                if (index < indexToLocate) {
                    d.isDown = true;
                }
                return d;
            });
            dispatch(setDisplay(servicesDisplay));

        } else if (services) {
            const servicesDisplay = services.items.slice().map((service, index) => {
                return {
                    service: service
                } as ServiceDisplay
            });
            dispatch(setDisplay(servicesDisplay));
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
        return () => {
            if (tickingTimeout) {
                clearInterval(tickingTimeout);
            }
            dispatch(setCurrentIndex(0));
        }
    }, [dispatch, services, tickingTimeout]);

    const slideDurationTimeout = () => {
        const t = setTimeout(() => {
            dispatch(setTicking(false));
        }, 300);
        tickingTimeout = t;
    }

    const handleOnWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (window.innerWidth > 768 && display) {
            console.log(ticking);
            if (!ticking) {
                if (e.deltaY > 0) {
                    dispatch(setTicking(true));
                    if (currentIndex < display.length - 1) {
                        const services = display.slice();
                        services[currentIndex].isUp = false;
                        services[currentIndex].isDown = true;
                        dispatch(setDisplay(services));
                        dispatch(setCurrentIndex(currentIndex + 1));
                    }
                    slideDurationTimeout();
                } else {
                    dispatch(setTicking(true));
                    if (currentIndex > 0) {
                        const services = display.slice();
                        services[currentIndex - 1].isUp = true;
                        services[currentIndex - 1].isDown = false;
                        dispatch(setDisplay(services));
                        dispatch(setCurrentIndex(currentIndex - 1));
                    }
                    slideDurationTimeout();
                }
            }
        }
    }

    const handleClickDot = (index: number) => {
        dispatch(setDisplay(moveToLocation(index)));
        dispatch(setCurrentIndex(index));
    }

    const moveToLocation = (indexToLocate: number) => {
        if (display) {
            return display.slice().map((service, index) => {
                if (index < indexToLocate) {
                    service.isDown = true;
                    service.isUp = false;
                } else {
                    service.isDown = false;
                    service.isUp = true;
                }
                return service;
            });
        } else {
            return null;
        }
    }

    const renderDots = () => {
        if (display) {
            return display.slice().map((service, index) => (
                <div
                    className={`services-page-dot${index === currentIndex ? ' services-page-dot-focus' : ''}`}
                    onClick={() => handleClickDot(index)} key={`dot-${index}`}
                />
            ));
        }
    }

    const renderServices = () => {
        if (display) {
            return display.slice().map((service, index) => (
                <Service
                    service={service}
                    align={index % 2 ? 'right' : 'left'}
                    keyId={`service-${index}`}
                    key={index}
                />
            ));
        }
    }

    return (
        <div className="services-page" onWheel={handleOnWheel}>
            {renderServices()}
            <div className="services-page-dots">{renderDots()}</div>
        </div>
    );
}

export default Services;