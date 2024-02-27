import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PropertiesPage } from "../Pages/propertiesPage";
import { PropertyPage } from "../Pages/propertyPage";
import Navbar from "../Components/common/navbar";
import { PropertyPolicies } from "../Pages/propertyPolicies";

const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<PropertiesPage />} />
        <Route path='/details' element={<PropertyPage />} />
        <Route path='/policies' element={<PropertyPolicies />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
