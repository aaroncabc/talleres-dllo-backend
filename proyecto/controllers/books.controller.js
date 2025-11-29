import { db } from "../utils/db.js";

/**
 * CREATE BOOK
 */
export function createBook(data, userPermissions) {
  if (!userPermissions?.create_books)
    throw new Error("No autorizado");

  const book = {
    id: db.books.length + 1,
    ...data,
    deleted: false,
    reserved_by: [] // historial
  };

  db.books.push(book);
  return book;
}


/**
 * GET ONE BOOK
 */
export function getBook(bookId) {
  const book = db.books.find(b => b.id == bookId && !b.deleted);
  if (!book) throw new Error("Libro no encontrado");
  return book;
}


/**
 * GET MANY BOOKS (filtros + paginación)
 */
export function readBooks(filters) {
  let {
    genero,
    fecha,
    editorial,
    autor,
    nombre,
    disponible,
    page = 1,
    limit = 10
  } = filters;

  let books = db.books.filter(b => !b.deleted);

  if (genero) books = books.filter(b => b.genero === genero);
  if (fecha) books = books.filter(b => b.fecha === fecha);
  if (editorial) books = books.filter(b => b.editorial === editorial);
  if (autor) books = books.filter(b => b.autor === autor);
  if (nombre) books = books.filter(b => b.nombre.includes(nombre));
  if (disponible) books = books.filter(b => b.disponible == disponible);

  const start = (page - 1) * limit;
  const paginated = books.slice(start, start + limit);

  return {
    libros: paginated.map(b => b.nombre),
    pagina_actual: Number(page),
    pagina_maxima: Math.ceil(books.length / limit),
    por_pagina: Number(limit)
  };
}


/**
 * UPDATE BOOK
 */
export function updateBook(bookId, updates, userPermissions) {
  if (!userPermissions?.edit_books)
    throw new Error("No autorizado");

  const book = db.books.find(b => b.id == bookId && !b.deleted);
  if (!book) throw new Error("Libro no encontrado");

  Object.assign(book, updates);
  return book;
}


/**
 * DELETE BOOK (soft delete)
 */
export function deleteBook(bookId, userPermissions) {
  if (!userPermissions?.delete_books)
    throw new Error("No autorizado");

  const book = db.books.find(b => b.id == bookId);
  if (!book) throw new Error("Libro no encontrado");

  book.deleted = true;
  return true;
}


/**
 * RESERVE BOOK (historial libro + usuario)
 */
export function reserveBook(bookId, user) {
  const book = db.books.find(b => b.id == bookId && !b.deleted);
  if (!book) throw new Error("Libro no encontrado");

  const reservation = {
    user_id: user.id,
    user_name: user.name,
    fecha_reserva: new Date().toISOString(),
    fecha_entrega: null
  };

  book.reserved_by.push(reservation);
  user.history.push({
    book_id: book.id,
    book_name: book.nombre,
    fecha_reserva: reservation.fecha_reserva,
    fecha_entrega: null
  });

  return reservation;
}
