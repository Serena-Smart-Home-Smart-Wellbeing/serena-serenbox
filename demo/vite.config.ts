import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const face_detection_workaround = () => {
    return {
        name: "face_detection_workaround",
        load(id) {
            if (path.basename(id) === "face_detection.js") {
                let code = fs.readFileSync(id, "utf-8");
                code += "exports.FaceDetection = FaceDetection;";
                return { code };
            } else {
                return null;
            }
        },
    };
};

const camera_utils_workaround = () => {
    return {
        name: "camera_utils_workaround",
        load(id) {
            if (path.basename(id) === "camera_utils.js") {
                let code = fs.readFileSync(id, "utf-8");
                code += "exports.Camera = Camera;";
                return { code };
            } else {
                return null;
            }
        },
    };
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/serena-serenbox/",
    build: {
        rollupOptions: {
            plugins: [face_detection_workaround(), camera_utils_workaround()],
        },
    },
});
