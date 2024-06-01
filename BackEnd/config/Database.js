const mongoose = require("mongoose");

const DatabaseConnect = async() => {
  const url= process.env.DB_ATLUS_URL
  try {
    await mongoose.connect(url).then(conn => {
      console.log(
        `Database Connected Successfully with ${conn.connection.host}`
      );
    });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = DatabaseConnect;
