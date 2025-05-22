import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'; // Import Outlet for nested routes

/**
 * Fallback component to check for essential Redux state (userId)
 * and redirect to the homepage if it's missing.
 * It renders its children (nested routes) via <Outlet />.
 */
const Fallback = () => {
  // Access userId from the Redux store
  const userId = useSelector(state => state.user?.id);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if userId is missing or undefined
    if (!userId && window.location.pathname !== '/antre') {
      // Navigate to the base path of your application, which is '/antre'
      navigate('/antre');
    }
  }, [userId, navigate]); // Dependencies: re-run if userId or navigate function changes

  // Render the nested routes (children) if userId is present
  // Or, you could render a loading/fallback UI while the check is happening
  // For now, we'll just render Outlet. The useEffect handles the redirect.
  return <Outlet />;
};

export default Fallback;