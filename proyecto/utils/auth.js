export function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "No autenticado" });

  try {
    const user = JSON.parse(Buffer.from(token, "base64").toString());
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

export function generateToken(user) {
  return Buffer.from(JSON.stringify(user)).toString("base64");
}
