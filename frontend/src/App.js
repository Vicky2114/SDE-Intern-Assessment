import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CarListPage from './pages/CarListPage';
import AddProductPage from './pages/AddProductPage';
import CarDetailPage from './pages/CarDetailPage';
import EditProductPage from './pages/EditProductPage';
import PrivateRoute from './services/PrivateRoutes';


function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route path="/carList" element={<PrivateRoute element={<CarListPage />} />} />
        <Route path="/add-product" element={<PrivateRoute element={<AddProductPage />} />} />
        <Route path="/carDetails/:id" element={<PrivateRoute element={<CarDetailPage />} />} />
        <Route path="/edit-car/:id" element={<PrivateRoute element={<EditProductPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
