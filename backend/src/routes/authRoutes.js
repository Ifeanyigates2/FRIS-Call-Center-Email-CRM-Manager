const express = require('express');
const router = express.Router();
const passport = require('../services/outlookAuthService');
const { requireRole } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.get('/login', passport.authenticate('azuread-openidconnect'));

// New route for username/password login
router.post('/login', authController.login);

router.post(
  '/callback',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

router.get('/profile', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Example protected routes
router.get('/admin', requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});
router.get('/staff', requireRole('staff'), (req, res) => {
  res.json({ message: 'Welcome, staff member!' });
});

module.exports = router;
