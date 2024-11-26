import LoginPage from './Common/Login.js'
import SignupPage from './Common/Signup.js'
import ProtectedRoute from './Common/ProtectedRoute.js'

import Home from './Student/Home.js'
import StudentInfo from './Student/StudentInfo.js'
import Register from './Student/Register.js'
import Attendance from './Student/Attendance.js'
import Performance from './Student/Performance.js'
import Contact from './Student/Performance.js'

import AdminAttendance from './Admin/Attendance.js';
import AdminStudentInfo from './Admin/StudentInfo.js';
import './App.css'

import QuizApp from './Student/QuizApp.js'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Router just renders the component according to the navigation links set through NavLinks

function App() {

  return (
    <Router>

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>

        {/*Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/student/:name" element={<StudentInfo />} />
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/attendance/:name" element={<Attendance />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/student" element={<AdminStudentInfo />} />
        <Route path="/admin/performance" element={<Performance />} />
        <Route path="/admin/contact" element={<Contact />} />
      </Routes>

    </Router>


  );
}

export default App;
