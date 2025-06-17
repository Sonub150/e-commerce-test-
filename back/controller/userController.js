const User = require('../models/user.models'); // ✅ Correct model path


                // with userId
// const getUsersdata = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         res.status(200).json({
//             success: true,
//             userData: {
//                 name: `${user.firstName} ${user.lastName}`,
//                 email: user.email,
//                 phone: user.mobNo,
//                 address: user.address,
//                 isVerified: user.isVerified,
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

const  getUsersdata= async (req, res) => {
  const userId = req.query.userId; // ✅ safe access for optional ID

  try {
    if (userId) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.status(200).json({ success: true, user });
    } else {
      // Return all users if no userId is provided
      const users = await User.find();
      return res.status(200).json({ success: true, users });
    }
  } catch (err) {
    console.error("❌ getUser error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const userController = {
    getUsersdata
};

module.exports = userController;
