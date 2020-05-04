const express = require("express");
const router = express.Router();
const studentContoller = require("../controllers/student");
const passport = require("passport");

const auth = passport.authenticate("jwt-authentication", { session: false });

router.get("/", studentContoller.getAllStudents);
router.get("/:id", studentContoller.getStudentById);
router.post("/", studentContoller.createNewStudent);
router.put("/:id", studentContoller.editStudentById); // path นี้ไม่ได้ใส่ auth เวลายิงไ่ม่ต้องใส่ Token
router.delete("/:id", auth, studentContoller.deleteStudentById); // Path นี้ใส่ auth เวลายิง postman ต้องใส่ token มาด้วย

module.exports = router;
