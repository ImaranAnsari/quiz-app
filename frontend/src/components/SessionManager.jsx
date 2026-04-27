import { useEffect } from 'react';
import { refreshToken } from '../api/User';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes check interval

const SessionManager = () => {
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    // Track user activity
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);

    // Initial activity update
    updateActivity();

    // Setup token refresh interval
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const lastActivityStr = localStorage.getItem("lastActivity");
      
      if (!token || !lastActivityStr) return;
      
      const lastActivity = parseInt(lastActivityStr, 10);
      const now = Date.now();
      
      // If user has been active recently, refresh the token
      if (now - lastActivity < INACTIVITY_TIMEOUT) {
        refreshToken()
          .then(res => {
            if (res.data && res.data.data && res.data.data.token) {
               localStorage.setItem("token", res.data.data.token);
            }
          })
          .catch(err => {
            // The global Axios interceptor will catch 401s and log out
            console.log("Session refresh failed", err);
          });
      }
    }, REFRESH_INTERVAL);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      clearInterval(interval);
    };
  }, []);

  return null; // Headless component
};

export default SessionManager;
