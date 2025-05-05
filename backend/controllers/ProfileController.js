const { query } = require('../models/UserModel');

// Profile setup controller
const setupProfile = async (req, res) => {
  const { userId, name, classOrDepartment, section } = req.body;

  if (!userId || !name || !classOrDepartment || !section) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Update user profile info and mark profile_completed as true
    const sql = `
      UPDATE users
      SET name = ?, class_or_department = ?, section = ?, profile_completed = true
      WHERE id = ?
    `;
    const values = [name, classOrDepartment, section, userId];
    await query(sql, values);

    // Get updated user role
    const [updatedUser] = await query('SELECT role FROM users WHERE id = ?', [userId]);

    res.status(200).json({ message: 'Profile updated successfully', role: updatedUser.role });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error during profile setup' });
  }
};

module.exports = {
  setupProfile,
};
