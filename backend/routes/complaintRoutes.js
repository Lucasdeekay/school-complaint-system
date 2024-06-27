// backend/routes/complaintRoutes.js
const { Router } = require("express");
const router = Router();
const complaintController = require("../controllers/complaintController");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, complaintController.createComplaint);
router.get("/get", verifyToken, complaintController.getUserComplaints);
router.patch("/reopen/:id", verifyToken, complaintController.reopenComplaint);
router.get("/admin", verifyToken, complaintController.getAdminComplaints);
router.patch("/close/:id", verifyToken, complaintController.closeComplaint);
router.patch("/review/:id", verifyToken, complaintController.reviewComplaint);

module.exports = router;
