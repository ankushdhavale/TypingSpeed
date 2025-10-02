import { GlobalStyle } from "./Styles/global";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";

function App() {
	const { theme } = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/user' element={<UserPage />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
