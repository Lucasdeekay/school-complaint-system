const Complaint = require("../models/Complaint");
const Admin = require("../models/Admin");

const createComplaint = async (req, res) => {
  const { title, description, suggestion, category } = req.body;
  const userId = req.userId;

  try {
    const complaint = new Complaint({
      title,
      description,
      suggestion,
      category,
      user: userId,
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserComplaints = async (req, res) => {
  const userId = req.userId;
  try {
    const complaints = await Complaint.find({ user: userId });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reopenComplaint = async (req, res) => {
  const complaintId = req.params.id;
  try {
    const complaint = await Complaint.findOne({ _id: complaintId, user: req.userId });
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    if (complaint.status === "open") {
      return res.status(400).json({ error: "Complaint is already open" });
    }
    complaint.status = "open";
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdminComplaints = async (req, res) => {
  const adminId = req.userId;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(403).json({ error: "Access denied" });
    }
    const complaints = await Complaint.find({
      status: { $in: ["open", "in-review"] },
      category: admin.category,
    });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const closeComplaint = async (req, res) => {
  const complaintId = req.params.id;
  const adminId = req.userId;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(403).json({ error: "Access denied" });
    }
    const complaint = await Complaint.findOne({
      _id: complaintId,
      category: admin.category,
      status: { $in: ["open", "in-review"] },
    });
    if (!complaint) {
      return res
        .status(404)
        .json({ error: "Complaint not found or already closed" });
    }
    complaint.status = "closed";
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reviewComplaint = async (req, res) => {
  const complaintId = req.params.id;
  const adminId = req.userId;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(403).json({ error: "Access denied" });
    }
    const complaint = await Complaint.findOne({
      _id: complaintId,
      category: admin.category,
      status: { $in: ["open"] },
    });
    if (!complaint) {
      return res
        .status(404)
        .json({ error: "Complaint not found or already closed" });
    }
    complaint.status = "in-review";
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComplaint,
  getUserComplaints,
  reopenComplaint,
  getAdminComplaints,
  closeComplaint,
  reviewComplaint,
};
