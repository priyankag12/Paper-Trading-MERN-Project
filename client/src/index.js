import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Provider } from 'react-redux';
import { Store } from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={Store}>
            <App />
        </Provider>
    </React.StrictMode>
);
