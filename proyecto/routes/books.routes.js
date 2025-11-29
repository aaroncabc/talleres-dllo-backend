import { Router } from "express";
import { auth } from "../utils/auth.js";
import {
  createBook,
  readBooks,
  getBook,
  updateBook,
  deleteBook,
  reserveBook
} from "../controllers/books.controller.js";

import { db } from "../utils/db.js";

const router = Router();

/**
 * GET LIST - público
 */
router.get("/", (req, res) => {
  try {
    const result = readBooks(req.query);
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * GET ONE - público
 */
router.get("/:id", (req, res) => {
  try {
    const book = getBook(req.params.id);
    res.json({ book });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

/**
 * CREATE BOOK - requiere permiso
 */
router.post("/", auth, (req, res) => {
  try {
    const book = createBook(req.body, req.user.permissions);
    res.status(201).json({ book });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * UPDATE BOOK - requiere permiso
 */
router.put("/:id", auth, (req, res) => {
  try {
    const book = updateBook(
      req.params.id,
      req.body,
      req.user.permissions
    );
    res.json({ book });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * DELETE BOOK - requiere permiso
 */
router.delete("/:id", auth, (req, res) => {
  try {
    deleteBook(req.params.id, req.user.permissions);
    res.json({ message: "Libro inhabilitado" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * RESERVE BOOK - cualquier usuario autenticado
 */
router.post("/:id/reserve", auth, (req, res) => {
  try {
    const user = db.users.find(u => u.id === req.user.id);
    const reservation = reserveBook(req.params.id, user);
    res.json({ reservation });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
