import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './main';

function App() {
  return (
    <Routes>
      <Route path='/:page' element={<Main />} />
      <Route path='*' element={<Navigate to={`/1`} replace />} />
    </Routes>
  );
}

export default App;
