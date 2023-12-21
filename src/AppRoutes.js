// AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import XmlReader from './components/XmlReader';
import XmlDataPage from './components/XmlDataPage';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } />
        <Route
          path="/xml-reader"
          element={
            <Layout>
              <XmlReader />
            </Layout>
          } />
        <Route
          path="/xml-data"
          element={
            <Layout>
              <XmlDataPage />
            </Layout>
          } />
        {/* Adicione uma rota padrão */}
        <Route
          element={
            <Layout>
              <Home />
            </Layout>
          } />
      </Routes>
    </>
  );
}

export default AppRoutes;
