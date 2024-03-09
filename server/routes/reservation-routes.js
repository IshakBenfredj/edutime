const express = require("express");
const requireAuth = require("../middlewares/requireAuth.js");
const {
  accpetRefuseRes,
  addReservation,
  deleteReservation,
  getClientReservations,
  getUserReservations,
} = require("../controllers/reservationController.js");

const router = express.Router();

router.post("/add", requireAuth, addReservation);
router.get("/client",requireAuth, getClientReservations);
router.get("/user",requireAuth, getUserReservations);
router.delete("/delete/:id", requireAuth, deleteReservation);
router.put("/accpetRefuseRes/:etat", requireAuth, accpetRefuseRes);

module.exports = router;