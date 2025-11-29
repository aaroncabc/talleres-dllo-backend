import { Router } from "express";
import { auth } from "../utils/auth.js";

import {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/users.controller.js";

import { db } from "../utils/db.js";

const router = Router();

/**
 * REGISTER USER (público)
 */
router.post("/", (req, res) => {
  try {
    const user = createUser(req.body);
    res.status(201).json({ user });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * LOGIN USER (público)
 */
router.post("/login", (req, res) => {
  try {
    const { token } = loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * GET USER (autenticado)
 */
router.get("/", auth, (req, res) => {
  try {
    const user = getUserById(req.user.id);
    res.json({ user });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

/**
 * UPDATE USER
 */
router.put("/:id", auth, (req, res) => {
  try {
    const requester = db.users.find(u => u.id == req.user.id);

    const updated = updateUser(
      req.params.id,
      req.body,
      requester
    );

    res.json({ user: updated });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * GET USER HISTORY
 */
router.get("/history", auth, (req, res) => {
  try {
    const history = getUserHistory(req.user.id);
    res.json({ history });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

/**
 * DELETE USER (soft delete)
 */
router.delete("/:id", auth, (req, res) => {
  try {
    const requester = db.users.find(u => u.id == req.user.id);

    deleteUser(req.params.id, requester);

    res.json({ message: "Usuario inhabilitado" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
