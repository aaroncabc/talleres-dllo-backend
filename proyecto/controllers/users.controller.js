import { db } from "../utils/db.js";
import { generateToken } from "../utils/auth.js";


/**
 * CREATE USER (registro)
 */
export function createUser(data) {
  const { email, password, name, permissions = {} } = data;

  if (!email || !password)
    throw new Error("Email y password requeridos");

  const exists = db.users.find(u => u.email === email);
  if (exists) throw new Error("Usuario ya existe");

  const user = {
    id: db.users.length + 1,
    email,
    password,
    name,
    permissions,
    deleted: false,
    history: [] // historial de reservas
  };

  db.users.push(user);
  return user;
}


/**
 * LOGIN (crear token)
 */
export function loginUser(email, password) {
  const user = db.users.find(
    u => u.email === email && u.password === password && !u.deleted
  );

  if (!user) throw new Error("Credenciales inválidas");

  const token = generateToken({
    id: user.id,
    permissions: user.permissions
  });

  return { token };
}


/**
 * GET ONE USER (autenticado)
 */
export function getUserById(userId) {
  const user = db.users.find(u => u.id == userId && !u.deleted);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
}


/**
 * UPDATE USER
 * Solo el mismo usuario o uno con permiso "edit_users"
 */
export function updateUser(userId, updates, requester) {
  const user = db.users.find(u => u.id == userId && !u.deleted);
  if (!user) throw new Error("Usuario no existe");

  if (requester.id != userId && !requester.permissions?.edit_users)
    throw new Error("No autorizado");

  Object.assign(user, updates);
  return user;
}

export function getUserHistory(userId) {
  const user = db.users.find(u => u.id == userId && !u.deleted);
  if (!user) throw new Error("Usuario no encontrado");

  return user.history;
}


/**
 * DELETE USER (soft delete)
 * Solo el mismo usuario o uno con permiso "delete_users"
 */
export function deleteUser(userId, requester) {
  const user = db.users.find(u => u.id == userId);
  if (!user) throw new Error("Usuario no existe");

  if (requester.id != userId && !requester.permissions?.delete_users)
    throw new Error("No autorizado");

  user.deleted = true;
  return true;
}
