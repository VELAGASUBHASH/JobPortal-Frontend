import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import  {AuthProvider}  from './Component/auth.jsx';
import  {Web3Provider}  from './Component/web3.jsx';

// Components
import Navbar from './Component/navbar.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Dashboard from './pages/dashboard.jsx';
import Jobs from './pages/jobs.jsx';
import JobDetail from './pages/jobdetail.jsx';
import PostJob from './pages/postjob.jsx';
import Applications from './pages/applications.jsx';
import ProtectedRoute from './Component/protectedRoute.jsx';
import EmailVerifyPage from './pages/emailverifypage.jsx';
import Profile from './pages/profile.jsx';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Web3Provider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetail />} />
                  <Route path="/verify-email" element={<EmailVerifyPage />} />

                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile/> 
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/post-job" element={
                    <ProtectedRoute>
                      <PostJob />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/applications" element={
                    <ProtectedRoute>
                      <Applications />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Toaster position="top-right" />
            </div>
          </Router>
        </Web3Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
