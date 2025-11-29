import { jest } from "@jest/globals";

import {
  createBook,
  readBooks,
  getBook,
  updateBook,
  deleteBook,
  reserveBook
} from "../controllers/books.controller.js";

import { db } from "../utils/db.js";


// Utilidad para simular un usuario
function createUserMock(id = 1) {
  return {
    id,
    name: "Usuario Test",
    permissions: {},
    history: []
  };
}

beforeEach(() => {
  db.books.length = 0;
  db.users = [createUserMock(1)];
});


// -----------------------------
// CREATE BOOK
// -----------------------------
describe("createBook()", () => {
  test("✔ Crea un libro exitosamente con permisos", () => {
    const permissions = { create_books: true };

    const book = createBook(
      { nombre: "Libro A", autor: "Juan", disponible: true },
      permissions
    );

    expect(book.nombre).toBe("Libro A");
    expect(db.books.length).toBe(1);
  });

  test("✘ Falla al crear sin permisos", () => {
    const permissions = {};

    expect(() =>
      createBook({ nombre: "Libro A" }, permissions)
    ).toThrow("No autorizado");
  });
});


// -----------------------------
// GET ONE
// -----------------------------
describe("getBook()", () => {
  beforeEach(() => {
    db.books.push({
      id: 1,
      nombre: "Libro A",
      deleted: false
    });
  });

  test("✔ Obtiene un libro existente", () => {
    const book = getBook(1);
    expect(book.nombre).toBe("Libro A");
  });

  test("✘ Falla si el libro no existe", () => {
    expect(() => getBook(99)).toThrow("Libro no encontrado");
  });
});


// -----------------------------
// GET MANY (Filtros + paginación)
// -----------------------------
describe("readBooks()", () => {
  beforeEach(() => {
    db.books.push(
      { id: 1, nombre: "Libro A", genero: "Aventura", deleted: false },
      { id: 2, nombre: "Libro B", genero: "Horror", deleted: false }
    );
  });

  test("✔ Obtiene libros sin filtros", () => {
    const result = readBooks({});
    expect(result.libros.length).toBe(2);
  });

  test("✔ Filtra por género", () => {
    const result = readBooks({ genero: "Aventura" });
    expect(result.libros).toContain("Libro A");
    expect(result.libros.length).toBe(1);
  });

  test("✔ Filtrado vacío si no hay coincidencias", () => {
    const result = readBooks({ genero: "SciFi" });
    expect(result.libros.length).toBe(0);
  });
});


// -----------------------------
// UPDATE BOOK
// -----------------------------
describe("updateBook()", () => {
  beforeEach(() => {
    db.books.push({
      id: 1,
      nombre: "Libro A",
      deleted: false
    });
  });

  test("✔ Actualiza un libro con permisos", () => {
    const permissions = { edit_books: true };

    const updated = updateBook(1, { nombre: "Nuevo nombre" }, permissions);

    expect(updated.nombre).toBe("Nuevo nombre");
  });

  test("✘ Falla sin permisos", () => {
    const permissions = {};

    expect(() =>
      updateBook(1, { nombre: "Nuevo" }, permissions)
    ).toThrow("No autorizado");
  });

  test("✘ Falla si el libro no existe", () => {
    const permissions = { edit_books: true };

    expect(() =>
      updateBook(99, { nombre: "Nuevo" }, permissions)
    ).toThrow("Libro no encontrado");
  });
});


// -----------------------------
// DELETE BOOK (SOFT DELETE)
// -----------------------------
describe("deleteBook()", () => {
  beforeEach(() => {
    db.books.push({
      id: 1,
      nombre: "Libro A",
      deleted: false
    });
  });

  test("✔ Inhabilita un libro con permisos", () => {
    const permissions = { delete_books: true };

    deleteBook(1, permissions);

    expect(db.books[0].deleted).toBe(true);
  });

  test("✘ Falla sin permisos", () => {
    expect(() =>
      deleteBook(1, {})
    ).toThrow("No autorizado");
  });

  test("✘ Falla si el libro no existe", () => {
    const permissions = { delete_books: true };

    expect(() => deleteBook(99, permissions)).toThrow("Libro no encontrado");
  });
});


// -----------------------------
// RESERVE BOOK (HISTORIAL)
// -----------------------------
describe("reserveBook()", () => {
  beforeEach(() => {
    db.books.push({
      id: 1,
      nombre: "Libro A",
      deleted: false,
      reserved_by: []
    });

    db.users[0] = createUserMock(1);
  });

  test("✔ Reserva un libro correctamente y llena historial", () => {
    const user = db.users[0];

    const reservation = reserveBook(1, user);

    expect(reservation.user_id).toBe(1);
    expect(user.history.length).toBe(1);
    expect(db.books[0].reserved_by.length).toBe(1);
  });

  test("✘ Falla si el libro no existe", () => {
    const user = db.users[0];

    expect(() => reserveBook(99, user)).toThrow("Libro no encontrado");
  });
});
