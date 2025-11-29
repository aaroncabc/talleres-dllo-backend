import { jest } from "@jest/globals";

import {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  getUserHistory,
  deleteUser
} from "../controllers/users.controller.js";

import { db } from "../utils/db.js";


beforeEach(() => {
  db.users.length = 0;
});


/**
 * CREATE USER
 */
describe("createUser()", () => {
  test("✔ crea un usuario correctamente", () => {
    const user = createUser({
      email: "test@mail.com",
      password: "1234",
      name: "Aaron"
    });

    expect(user.email).toBe("test@mail.com");
    expect(db.users.length).toBe(1);
  });

  test("✘ falla por email faltante", () => {
    expect(() =>
      createUser({ password: "1234" })
    ).toThrow("Email y password requeridos");
  });

  test("✘ falla por usuario duplicado", () => {
    createUser({ email: "test@mail.com", password: "123" });

    expect(() =>
      createUser({ email: "test@mail.com", password: "abc" })
    ).toThrow("Usuario ya existe");
  });
});


/**
 * LOGIN USER
 */
describe("loginUser()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      email: "test@mail.com",
      password: "1234",
      permissions: {},
      deleted: false
    });
  });

  test("✔ login exitoso devuelve token", () => {
    const { token } = loginUser("test@mail.com", "1234");
    expect(token).toBeDefined();
  });

  test("✘ falla por credenciales", () => {
    expect(() =>
      loginUser("test@mail.com", "wrong")
    ).toThrow("Credenciales inválidas");
  });
});


/**
 * GET USER
 */
describe("getUserById()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      email: "a@mail.com",
      password: "123",
      name: "Aaron",
      deleted: false
    });
  });

  test("✔ retorna usuario correcto", () => {
    const user = getUserById(1);
    expect(user.name).toBe("Aaron");
  });

  test("✘ falla si no existe", () => {
    expect(() => getUserById(999)).toThrow("Usuario no encontrado");
  });
});


/**
 * UPDATE USER
 */
describe("updateUser()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      name: "Aaron",
      deleted: false,
      permissions: {}
    });
  });

  test("✔ usuario se actualiza a sí mismo", () => {
    const requester = { id: 1, permissions: {} };

    const updated = updateUser(1, { name: "Pedro" }, requester);

    expect(updated.name).toBe("Pedro");
  });

  test("✔ admin actualiza usuario", () => {
    const requester = { id: 99, permissions: { edit_users: true } };

    const updated = updateUser(1, { name: "AdminChange" }, requester);

    expect(updated.name).toBe("AdminChange");
  });

  test("✘ falla sin permisos ni ser dueño", () => {
    const requester = { id: 99, permissions: {} };

    expect(() =>
      updateUser(1, { name: "X" }, requester)
    ).toThrow("No autorizado");
  });
});


describe("getUserHistory()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      deleted: false,
      history: [
        { book_id: 1, book_name: "Libro A", fecha_reserva: "2024-01-01", fecha_entrega: null }
      ]
    });
  });

  test("✔ retorna historial correctamente", () => {
    const history = getUserHistory(1);

    expect(history.length).toBe(1);
    expect(history[0].book_name).toBe("Libro A");
  });

  test("✘ falla si el usuario no existe", () => {
    expect(() => getUserHistory(99)).toThrow("Usuario no encontrado");
  });
});

/**
 * DELETE USER
 */
describe("deleteUser()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      deleted: false,
      permissions: {}
    });
  });

  test("✔ usuario se elimina a sí mismo (soft delete)", () => {
    const requester = { id: 1, permissions: {} };

    deleteUser(1, requester);

    expect(db.users[0].deleted).toBe(true);
  });

  test("✔ admin puede eliminar", () => {
    const requester = { id: 99, permissions: { delete_users: true } };

    deleteUser(1, requester);

    expect(db.users[0].deleted).toBe(true);
  });

  test("✘ falla sin permisos", () => {
    const requester = { id: 99, permissions: {} };

    expect(() =>
      deleteUser(1, requester)
    ).toThrow("No autorizado");
  });
});
