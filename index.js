const db = require("./models");
const express = require("express"); // Import Express มาไว้ใช้
const app = express(); // สร้าง Express App ขึ้นมา
// Express จัดการ HTTP Request

const studentRoutes = require("./routes/student");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/students", studentRoutes);

db.sequelize.sync().then(() => {
  // สั่งให้ Sequelize ไป Sync Database ให้ตรงกับ Models ของเรา
  app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
  }); // เอา Express App ที่เราสร้างขึ้นมา ไปจัดการ HTTP Request ที่ Port 8000
});
