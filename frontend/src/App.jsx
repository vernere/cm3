import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
//import LoginPage from  "./pages/LoginPage";
//import SignupPage from   "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage"
import Login from "./pages/login";
import Signup from "./pages/Signup";
import JobPage from "./pages/JobPage";


const App = () => {

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-job" element={<AddJobPage />} />
              <Route path="/jobs/:id" element={<JobPage />} />
              <Route path="/login" element={<AddJobPage />} />
              <Route path="/signup" element={<AddJobPage />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup /> } />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
