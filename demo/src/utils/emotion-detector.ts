import axios, { AxiosResponse } from "axios";

export const DataURIToBlob = (dataURI: string) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
};

export interface Emotions {
    angry: number;
    fear: number;
    surprise: number;
    disgust: number;
    happy: number;
    neutral: number;
    sad: number;
}

const analyzeEmotions = async (image: File) => {
    const form = new FormData();
    form.append("image", image);

    const { data: emotions } = await axios.post<
        unknown,
        AxiosResponse<Emotions>
    >(
        "https://serena-backend-2g6tjw7nja-et.a.run.app/serena-emotion-detector/detect",
        form
    );

    return emotions;
};

export default analyzeEmotions;
