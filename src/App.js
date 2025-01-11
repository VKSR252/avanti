import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import DataEntryForm from "./pages/DataEntry";
import Homepage from "./pages/Homepage";
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
    return (

            <Routes>
                <Route path="/">
                    <Route index element={<Homepage />} />
                    <Route path="dataentry" element={<ProtectedRoute><DataEntryForm /></ProtectedRoute> } />
                    <Route path="auth" element={<Auth />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
    );
}

export default App;
