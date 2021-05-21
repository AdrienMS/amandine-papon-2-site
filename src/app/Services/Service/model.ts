export default interface ServiceModel {
    name: string;
    icon: string;
    desc: string;
    content: string;
    color?: string;
    isDown?: boolean;
    isUp?: boolean;
}