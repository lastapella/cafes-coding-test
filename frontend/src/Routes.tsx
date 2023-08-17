import { Route, Routes } from 'react-router-dom';

// import { Home } from './pages/home/home';
import Cafes from './pages/cafes/list';
import CafeEdit from './pages/cafes/edit';
import EmployeeEdit from './pages/employees/edit';
import EmployeesList from './pages/employees/list';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Cafes />} / >
      <Route path="/cafe/new" element={<CafeEdit mode="new"/>} / >
      <Route path="/cafe/edit" element={<CafeEdit mode="edit" />} / >
      <Route path="/employees" element={<EmployeesList/>} / >
      <Route path="/employee/new" element={<EmployeeEdit mode="new"/>} / >
      <Route path="/employee/edit" element={<EmployeeEdit mode="edit" />} / >
    </Routes>
  )
}

export default AppRoutes
