const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await db.User.findOne({ where: { username: username } }); // ค้นหาว่า username นี้มีใน database หรือยัง

  if (user) {
    res.status(400).send({ message: "Username already taken." });
  } else {
    const salt = bcryptjs.genSaltSync(12); // สร้าง salt ขึ้นมา
    const hashedPassword = bcryptjs.hashSync(password, salt); // hash password ด้วย bcryptjs ก่อนจะเก็บลง Database

    // เก็บ username และ password ลง database
    await db.User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).send({ message: "User created" });
  }
};

const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await db.User.findOne({ where: { username } }); // หาว่ามี Username นี้ใน database ไหม

  if (!user) { // ถ้าไม่มีก็ส่งไปว่า username หรีอ password ผิด
    res.status(400).send({ message: "Invalid username or password" });
  } else {
    const isSuccess = bcryptjs.compareSync(password, user.password); // เทียบ password ที่ส่งมาจาก postman กับ user.password ที่มาจาก database ว่าตรงกันไหมถ้าตรงกันก็จะคืนเป็น TrueD

    if (isSuccess) {
      const payload = { // ใส่ข้อมูลที่จะแนบไปกับ Token ไว้ใน object ที่ชื่อว่า payload
        id: user.id,
      };

      // ทำการ generate token ขึ้นมาโดยให้มีอายุ 3600 วินาที และมี secret เป็น "codecamp5" และส่ง payload ให้แนบไปกับ token ด้วย
      const token = jwt.sign(payload, "codecamp5", { expiresIn: 3600 });

      res.status(200).send({ token: token });
    } else {
      res.status(400).send({ message: "Invalid username or password" });
    }
  }
};

module.exports = { registerUser, loginUser };
