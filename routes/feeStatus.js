const express = require("express");
const { createOrUpdateFeePayment } = require("../controllers/feeStatusController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post('/createFeeStatus', verifyToken, createOrUpdateFeePayment);
// router.delete('/deleteExam/:examId', verifyToken, deleteExam);
// router.put('/updateExam', verifyToken, updateExam);
// router.get('/getAllExams', verifyToken, getAllExams);

module.exports = router;