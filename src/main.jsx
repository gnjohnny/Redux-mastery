import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/features/users/userSlice.js";

// Dispatch fetchUsers action when the app starts
store.dispatch(fetchUsers());

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
