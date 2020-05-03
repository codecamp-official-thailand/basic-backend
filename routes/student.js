const express = require("express");
const router = express.Router();
const studentContoller = require("../controllers/student");

router.get("/", studentContoller.getAllStudents);
router.get("/:id", studentContoller.getStudentById);
router.post("/", studentContoller.createNewStudent);
router.put("/:id", studentContoller.editStudentById);
router.delete("/:id", studentContoller.deleteStudentById);

module.exports = router;
