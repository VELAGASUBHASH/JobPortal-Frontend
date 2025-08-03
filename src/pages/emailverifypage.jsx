import React, { useState, useEffect } from 'react';
import { useAuth } from '../Component/auth.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const EmailVerifyPage = () => {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill email from navigation state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await verifyEmail(email.trim(), code.trim());
    setLoading(false);

    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Verify Your Email</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="code" className="block mb-1 font-medium">
            6-Digit Verification Code
          </label>
          <input
            type="text"
            id="code"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="123456"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailVerifyPage;
