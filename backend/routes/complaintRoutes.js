// backend/routes/complaintRoutes.js
import { Router } from "express";
const router = Router();
import complaintController from "../controllers/complaintController";
import verifyToken from "../middleware/auth";

router.post("/", verifyToken, complaintController.createComplaint);
router.get("/", verifyToken, complaintController.getUserComplaints);
router.patch("/reopen/:id", verifyToken, complaintController.reopenComplaint);
router.get('/admin', verifyToken, complaintController.getAdminComplaints);
router.patch('/close/:id', verifyToken, complaintController.closeComplaint);
router.patch('/review/:id', verifyToken, complaintController.reviewComplaint);

export default router;
