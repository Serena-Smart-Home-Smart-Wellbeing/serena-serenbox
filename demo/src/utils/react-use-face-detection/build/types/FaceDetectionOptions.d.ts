import { Camera } from '@mediapipe/camera_utils';
import { FaceDetection, Options, Results } from '@mediapipe/face_detection';
export declare type FaceDetectionResults = Results;
export declare type FaceDetectionOptions = Options;
export declare type CameraOptions = {
    mediaSrc: HTMLVideoElement;
    onFrame: () => Promise<void>;
    width: number;
    height: number;
};
export declare type ICamera = (cameraOptions: CameraOptions) => Camera;
export interface IFaceDetectionOptions {
    mirrored?: boolean;
    handleOnResults?: (results: FaceDetectionResults) => void;
    faceDetectionOptions?: FaceDetectionOptions;
    faceDetection: FaceDetection;
    camera?: ICamera;
}
