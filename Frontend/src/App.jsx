import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate ,Navigate} from 'react-router-dom';
import Layout from './component/Layout';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Dashboard from './pages/Dashboard';
import PendingPage from './pages/PendingPage'
import CompleatePage from './pages/CompleatePage'
import Profile from './component/Profile';

const App = () => {
  const navigate = useNavigate();

  //  useState should not use destructuring for object properties.
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleAuthSubmit = (data) => {
    const user = {
      email: data.email,
      name: data.name || 'User',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=random`,
    };
    setCurrentUser(user);
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };

  const ProtectedLayout = () => (
    <Layout user={currentUser} onLogout={handleLogout} >
      <Outlet />
    </Layout>
  )

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Login onSubmit={handleAuthSubmit} onSwitchMode={() => navigate('/signup')} />
          </div>
        }
      />

      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <SignUp onSubmit={handleAuthSubmit} onSwitchMode={() => navigate('/login')} />
          </div>
        }
      />

      {/* Wrap protected route with Layout and props */}
      <Route
       element={currentUser ? <ProtectedLayout/> :
        <Navigate to = '/login' replace/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/pending' element={<PendingPage/>}/>
        <Route path='/complete' element={<CompleatePage/>}/>
        <Route path='/profile' element={<Profile user={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout}/>}/>
        
      </Route>
      <Route path='*' element={<Navigate to={currentUser ? '/': '/login'} replace/>}/>
      
    </Routes>
  );
};

export default App;
