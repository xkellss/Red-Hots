import React from "react"
import "./index.css"
import App from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./hooks/components/AuthProvider";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider >
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)