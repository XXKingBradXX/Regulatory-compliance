// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UpdatesList from './components/UpdatesList';
import UpdateDetail from './components/UpdateDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UpdatesList />} />
          <Route path="/change/:changeId" element={<UpdateDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
