import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TestModeContextProvider } from "./context/TestModeContext.jsx";
import { ThemeContextProvider, useTheme } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeContextProvider>
			<TestModeContextProvider>
				<BrowserRouter>
					<ToastContainer transition={Bounce} />
					<App />
				</BrowserRouter>
			</TestModeContextProvider>
		</ThemeContextProvider>
	</StrictMode>
);
