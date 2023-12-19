import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";
import { DetectionMode, DiffusionOption } from "../types/diffusion-options";

export interface IDiffusionOptionContext {
    duration: number;
    detectionMode: DetectionMode;
    diffusionOption: DiffusionOption;
    slotA: boolean;
    slotB: boolean;
    setDuration: Dispatch<SetStateAction<number>>;
    setDetectionMode: Dispatch<SetStateAction<DetectionMode>>;
    setDiffusionOption: Dispatch<SetStateAction<DiffusionOption>>;
    setSlotA: Dispatch<SetStateAction<boolean>>;
    setSlotB: Dispatch<SetStateAction<boolean>>;
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
    };

    return (
        <DiffusionOptionContext.Provider value={context}>
            {children}
        </DiffusionOptionContext.Provider>
    );
};
