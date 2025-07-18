const userRoles = require('../utils/userRoles');

function requireRole(role) {
  return function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userEmail = req.user.email;
    const user = userRoles.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
    if (!user || user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
}

module.exports = { requireRole };
