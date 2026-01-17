import React from 'react';

/* ===========================
   OLD APP CODE (COMMENTED)
   =========================== */

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './Component/auth.jsx';
// import { Web3Provider } from './Component/web3.jsx';

// // Components
// import Navbar from './Component/navbar.jsx';
// import Home from './pages/home.jsx';
// import Login from './pages/login.jsx';
// import Register from './pages/register.jsx';
// import Dashboard from './pages/dashboard.jsx';
// import Jobs from './pages/jobs.jsx';
// import JobDetail from './pages/jobdetail.jsx';
// import PostJob from './pages/postjob.jsx';
// import Applications from './pages/applications.jsx';
// import ProtectedRoute from './Component/protectedRoute.jsx';
// import EmailVerifyPage from './pages/emailverifypage.jsx';
// import Profile from './pages/profile.jsx';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <Web3Provider>
//           <Router>
//             <div className="min-h-screen bg-gray-50">
//               <Navbar />
//               <main className="container mx-auto px-4 py-8">
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/register" element={<Register />} />
//                   <Route path="/jobs" element={<Jobs />} />
//                   <Route path="/jobs/:id" element={<JobDetail />} />
//                   <Route path="/verify-email" element={<EmailVerifyPage />} />

//                   <Route path="/dashboard" element={
//                     <ProtectedRoute>
//                       <Dashboard />
//                     </ProtectedRoute>
//                   } />

//                   <Route path="/profile" element={
//                     <ProtectedRoute>
//                       <Profile />
//                     </ProtectedRoute>
//                   } />

//                   <Route path="/post-job" element={
//                     <ProtectedRoute>
//                       <PostJob />
//                     </ProtectedRoute>
//                   } />

//                   <Route path="/applications" element={
//                     <ProtectedRoute>
//                       <Applications />
//                     </ProtectedRoute>
//                   } />
//                 </Routes>
//               </main>
//               <Toaster position="top-right" />
//             </div>
//           </Router>
//         </Web3Provider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

/* ===========================
   NEW MAINTENANCE APP
   =========================== */

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="max-w-xl w-full text-center bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-12 border border-white/10">
        
        {/* Logo / Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-wide">
          Portfolio Under Maintenance
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
          I am currently upgrading my portfolio with a more advanced, modern,
          and professional experience.
        </p>

        {/* Divider */}
        <div className="h-px bg-white/20 my-6"></div>

        {/* Message */}
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Thank you for your patience. If you have any questions, collaboration
          ideas, or opportunities, feel free to reach out.
        </p>

        {/* Email Button */}
        <a
          href="mailto:velagasubhash03@gmail.com"
          className="inline-block w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm sm:text-base hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          Contact Me → velagasubhash03@gmail.com
        </a>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Subhash Velaga. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
