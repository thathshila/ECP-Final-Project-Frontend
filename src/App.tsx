// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Users from './pages/Users';       // Users page (formerly Customers)
import Products from './pages/Products'; // Products page (formerly Foods)


const theme = createTheme({
    palette: {
        primary: {
            main: '#ff6b35',   // main food accent
            light: '#ff8c5a',
            dark: '#e54b1a',
        },
        secondary: {
            main: '#e54b1a',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#fff8f0', // soft food theme background
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(135deg, #ff6b35 0%, #e54b1a 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #e54b1a 0%, #ff6b35 100%)',
                    },
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />         {/* Users page */}
                    <Route path="/products" element={<Products />} />   {/* Products page */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;