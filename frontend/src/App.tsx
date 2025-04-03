
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerNeeds from './pages/CustomerNeeds';
import ProductFeatures from './pages/ProductFeatures';
import MatchingTool from './pages/MatchingTool';
import MatrixOverview from './pages/MatrixOverview';
import AdminUpload from './pages/AdminUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/needs" element={<CustomerNeeds />} />
        <Route path="/products" element={<ProductFeatures />} />
        <Route path="/tool" element={<MatchingTool />} />
        <Route path="/matrix" element={<MatrixOverview />} />
        <Route path="/admin" element={<AdminUpload />} />
      </Routes>
    </Router>
  );
}
export default App;
