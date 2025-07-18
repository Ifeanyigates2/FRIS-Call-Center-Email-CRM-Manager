const axios = require('axios');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // TODO: Implement authentication against Microsoft Graph API or OAuth ROPC flow
    // This is a placeholder response for demonstration
    // Replace with actual authentication logic
    if (email === 'test@example.com' && password === 'password') {
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
