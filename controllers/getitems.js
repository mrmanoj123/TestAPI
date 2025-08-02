const { pool, poolConnect } = require("../ConfigDB/database");

exports.getuserinfo = async (req, res) => {
  try {
    await poolConnect; // Ensure connection is ready
    const result = await pool.request().query("SELECT * FROM Users");
    return res.status(200).json({
      message: "User information retrieved successfully",
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
