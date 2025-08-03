import React, { useEffect, useState } from 'react';
import { useAuth } from '../Component/auth.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent applications
  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await axios.get('https://jobportal-backend-g2k3.onrender.com/api/jobs/user/applications');
        setApplications(res.data ?? []);
      } catch (err) {
        setApplications([]);
      }
      setLoading(false);
    };
    getApplications();
  }, []);

  // Get up to 3 most recent applications to preview in dashboard
  const recentApps = applications.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-semibold mb-6">Welcome, {user?.name || 'User'}!</h1>
      <p className="text-gray-700 mb-8">
        This is your dashboard where you can manage your profile and view your job applications.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Your Profile Card */}
        <div
          className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/profile')}
        >
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          <p>Update your personal information and skills.</p>
        </div>
        {/* Applications Card */}
        <div
          className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/applications')}
        >
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          {loading ? (
            <p>Loading applications...</p>
          ) : !applications.length ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            <ul>
              {recentApps.map((app, idx) => (
                <li key={idx} className="mb-2">
                  <span className="font-medium">{app.job.title}</span>
                  <span className="mx-2 text-gray-500">-</span>
                  <span
                    className={
                      app.application.status === "accepted"
                        ? "text-green-600 font-semibold"
                        : app.application.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-500 font-semibold"
                    }
                  >
                    {app.application.status.charAt(0).toUpperCase() +
                      app.application.status.slice(1)}
                  </span>
                </li>
              ))}
              {applications.length > 3 && (
                <li className="text-blue-600 mt-2 cursor-pointer">...see all</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
