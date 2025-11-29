import express from "express";
import usersRoutes from "./routes/users.routes.js";
import booksRoutes from "./routes/books.routes.js";

const app = express();
app.use(express.json());

// Rutas
app.use("/usuarios", usersRoutes);
app.use("/libros", booksRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
