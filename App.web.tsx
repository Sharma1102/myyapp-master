import React from 'react';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Login from './component/Login';
 import Home from './component/Home';
 import Registration from './component/Registration';
 import Data from './component/Data'
 const WebNavigator: React.FC = () => {
   return (
     <Router>
       <Routes>
         <Route path="/" element={<Login/>} />
         <Route path="/Registration" element={<Registration/>} />
         <Route path="/Home" element={<Home/>} />
         <Route path="/Data" element={<Data/>} />
       </Routes>
     </Router>
   );
 }
 export default WebNavigator;