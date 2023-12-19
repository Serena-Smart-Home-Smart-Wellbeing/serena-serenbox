import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import theme from "./themes/index.ts";
import { DiffusionOptionProvider } from "./contexts/diffusion-option.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <DiffusionOptionProvider>
                <App />
            </DiffusionOptionProvider>
        </ChakraProvider>
    </React.StrictMode>
);
