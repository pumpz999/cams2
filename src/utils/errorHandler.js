import { toast } from 'react-toastify';

export const handleError = (error, customMessage = null) => {
  const errorMessage = customMessage || 
    error.response?.data?.message || 
    error.message || 
    'An unexpected error occurred';

  // Log to console for debugging
  console.error('Error:', error);

  // Show toast notification
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });

  // Optional: Send error to logging service
  // logErrorToService(error);
};

export const logErrorToService = async (error) => {
  try {
    await fetch('/api/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      })
    });
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
};
