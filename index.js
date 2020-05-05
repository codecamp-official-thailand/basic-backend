const db = require("./models");
const cors = require("cors");
const express = require("express"); // Import Express มาไว้ใช้
const app = express(); // สร้าง Express App ขึ้นมา
// Express จัดการ HTTP Request

const studentRoutes = require("./routes/student");
const userRoutes = require("./routes/user");

require("./config/passport/passport"); // เป็นการบอกให้ passport สร้าง strategy ทั้งหมดที่เราเขียนไว้

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/students", studentRoutes);
app.use("/users", userRoutes);

db.sequelize.sync({ force: false }).then(() => {
  // สั่งให้ Sequelize ไป Sync Database ให้ตรงกับ Models ของเรา
  app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
  }); // เอา Express App ที่เราสร้างขึ้นมา ไปจัดการ HTTP Request ที่ Port 8000
});