import { ThunkAction } from 'redux-thunk';

import imageCompression from 'browser-image-compression';

import * as CONSTANTS from '../models/constants';
import { ImagesAction, SET_IMAGES, Image } from '../models/imagesTypes';

import { RootState } from '..';
import firebase from '../../firebase/config';

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, ImagesAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_LOADING,
            payload: value
        });
    }
}

export const getImages = (onError: () => void): ThunkAction<void, RootState, null, ImagesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            firebase.database().ref('images/').on('value', (data: firebase.database.DataSnapshot) => {
                if (data.val()) {
                    const arrayImages = Object.keys(data.val()).map((key: string) => {
                        return {
                            full: data.val()[key].full,
                            pixelized: data.val()[key].pixelized,
                            key: key,
                        };
                    });
                    dispatch({
                        type: SET_IMAGES,
                        payload: arrayImages
                    });
                    dispatch(setLoading(false));
                }
            }, error => {
                dispatch(setError(error.message));
                dispatch(setLoading(false));
            });
        } catch (err) {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

const onCompressFile = async (file: File, maxSizeMB: number, quality: number, onProgressFunc: (p: number) => void, maxWidth?: number) => {
    return await imageCompression(file, {
        maxSizeMB: maxSizeMB,
        useWebWorker: true,
        maxWidthOrHeight: maxWidth ? maxWidth : undefined,
        initialQuality: quality,
        onProgress: (p: number) => onProgressFunc(p)
    });
}

const uploadFile = (file: File, type: string): Promise<string> => {
    return new Promise(
        (resolve, reject) => {
            const uploadFile = firebase.storage().ref().child(`images/${type}-${Date.now()}`).put(file);
            uploadFile.on(firebase.storage.TaskEvent.STATE_CHANGED,
                () => {},
                (error) => reject(error),
                () => {
                    uploadFile.snapshot.ref.getDownloadURL().then(
                        (value: string) => resolve(value),
                        (error) => reject(error)
                    );
                }
            );
        }
    )
}

export const addNewImage = (file: File, onError: () => void, generatedKey?: (key: string | null) => void): ThunkAction<void, RootState, null, ImagesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const compressedFiles = { full: null as unknown as File, pixelized: null as unknown as File };
            if (file.size >= 1) {
                compressedFiles.full = await onCompressFile(file, 0.1, 1, (p: number) => console.log(file.name, p, 'full'));
            } else {
                compressedFiles.full = file;
            }
            compressedFiles.pixelized = await onCompressFile(file, 0.0004, .1, (p: number) => console.log(file.name, p, 'pixelized'), 50);
            const [full, pixelized] = await Promise.all([uploadFile(compressedFiles.full, 'full'), uploadFile(compressedFiles.pixelized, 'pixelized')]);
            const pathsFiles = {full: full, pixelized: pixelized};
            const data = await firebase.database().ref('images/').push(pathsFiles);
            dispatch(getImages(() => console.error('error on get images')));
            if (generatedKey) generatedKey(data.key);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

export const deleteImageFromKey = (image: Image): ThunkAction<void, RootState, null, ImagesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.storage().refFromURL(image.pixelized).delete();
            await firebase.storage().refFromURL(image.full).delete();
            await firebase.database().ref('images/').child(image.key).remove();
            dispatch(getImages(() => console.error('error on get images')));
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}

export const getImageFromKey = (key: string, images: Array<Image>) => {
    return images.filter((image: Image) => image.key === key)[0];
}

// export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
//     return async dispatch => {
//         try {
//             dispatch(setLoading(true));
//             const login = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
//             if (login.user) {
//                 dispatch({
//                     type: CONSTANTS.SET_USER,
//                     payload: { email: data.email }
//                 });
//                 dispatch(setLoading(false));
//             }
//         } catch (err) {
//             console.log(err);
//             onError();
//             dispatch(setError(err.message));
//         }
//     }
// }

// export const logout = (): ThunkAction<void, RootState, null, AuthAction> => {
//     return async dispatch => {
//         try {
//             dispatch(setLoading(true));
//             await firebase.auth().signOut();
//             dispatch({
//                 type: CONSTANTS.SIGN_OUT
//             });
//             dispatch(setLoading(false));
//         } catch (err) {
//             console.log(err);
//             dispatch(setLoading(false));
//         }
//     }
// }

export const setError = (msg: string): ThunkAction<void, RootState, null, ImagesAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_ERROR,
            payload: msg
        });
    }
}

// export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
//     return dispatch => {
//       dispatch({
//         type: CONSTANTS.SET_SUCCESS,
//         payload: msg
//       });
//     }
// }