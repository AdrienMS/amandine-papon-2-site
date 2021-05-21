import { Image } from "../../../store/models/imagesTypes";

export const INPUT = 'INPUT';
export const CHECKBOX = 'CHECKBOX';
export const IMAGE = 'IMAGE';

export interface ListModel {
    type: typeof INPUT | typeof CHECKBOX | typeof IMAGE;
    label: string;
    size?: number;
    images?: Array<Image>;
}

export default interface FieldModel {
    label: string;
    type: string;
    value: any | Array<FieldModel>;
    htmlText?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    size?: number | string;
    images?: Array<Image>;
    fieldID?: number;
    parentID?: number;
    model?: Array<ListModel>;
    height?: string;
}
