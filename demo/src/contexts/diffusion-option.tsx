import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";
import { DetectionMode, DiffusionOption } from "../types/diffusion-options";
import { Emotions } from "../utils/emotion-detector";

export interface IDiffusionOptionContext {
    duration: number;
    detectionMode: DetectionMode;
    diffusionOption: DiffusionOption;
    slotA: boolean;
    slotB: boolean;
    isSessionRunning: boolean;
    emotions: Emotions;
    energetic: Pick<Emotions, "anger" | "fear" | "surprise"> & {
        total: number;
    };
    relax: Pick<Emotions, "joy" | "sadness" | "neutral" | "disgust"> & {
        total: number;
    };
    setSessionRunning: Dispatch<SetStateAction<boolean>>;
    setDuration: Dispatch<SetStateAction<number>>;
    setDetectionMode: Dispatch<SetStateAction<DetectionMode>>;
    setDiffusionOption: Dispatch<SetStateAction<DiffusionOption>>;
    setSlotA: Dispatch<SetStateAction<boolean>>;
    setSlotB: Dispatch<SetStateAction<boolean>>;
    setEmotions: Dispatch<SetStateAction<Emotions>>;
}

export const DiffusionOptionContext = createContext<IDiffusionOptionContext>({
    duration: 10,
    detectionMode: DetectionMode.INTERVAL,
    diffusionOption: DiffusionOption.MATCH_MOOD,
    setDuration: () => {},
    setDetectionMode: () => {},
    setDiffusionOption: () => {},
    slotA: false,
    setSlotA: () => {},
    slotB: false,
    setSlotB: () => {},
    isSessionRunning: false,
    setSessionRunning: () => {},
    emotions: {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0,
        surprise: 0,
        neutral: 0,
    },
    energetic: {
        anger: 0,
        fear: 0,
        surprise: 0,
        total: 0,
    },
    relax: {
        joy: 0,
        sadness: 0,
        neutral: 0,
        disgust: 0,
        total: 0,
    },
    setEmotions: () => {},
});

export const DiffusionOptionProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [duration, setDuration] = useState(10);
    const [detectionMode, setDetectionMode] = useState(DetectionMode.INTERVAL);
    const [diffusionOption, setDiffusionOption] = useState(
        DiffusionOption.MATCH_MOOD
    );
    const [slotA, setSlotA] = useState(false);
    const [slotB, setSlotB] = useState(false);
    const [isSessionRunning, setSessionRunning] = useState(false);
    const [emotions, setEmotions] = useState<Emotions>({
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0,
        surprise: 0,
        neutral: 0,
    });

    const context: IDiffusionOptionContext = {
        duration,
        setDuration,
        detectionMode,
        setDetectionMode,
        diffusionOption,
        setDiffusionOption,
        slotA,
        setSlotA,
        slotB,
        setSlotB,
        isSessionRunning,
        setSessionRunning,
        emotions,
        setEmotions,
        energetic: {
            anger: emotions.anger,
            fear: emotions.fear,
            surprise: emotions.surprise,
            total: emotions.anger + emotions.fear + emotions.surprise,
        },
        relax: {
            joy: emotions.joy,
            sadness: emotions.sadness,
            neutral: emotions.neutral,
            disgust: emotions.disgust,
            total: emotions.joy + emotions.sadness + emotions.neutral,
        },
    };

    return (
        <DiffusionOptionContext.Provider value={context}>
            {children}
        </DiffusionOptionContext.Provider>
    );
};
