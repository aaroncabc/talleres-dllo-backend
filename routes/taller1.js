const express = require('express');
const router = express.Router();
const { convertidorT, resolvedor, mejorParidad, peorParidad } = require('../utils/taller1');

router.get('/', (req, res) => {
  res.send('Bienvenido al Taller 1. Usa POST en /convertidor, /resolvedor, /mejor-paridad o /peor-paridad');
});

router.post('/convertidor', (req, res) => {
  const { C } = req.body;
  if (C === undefined) return res.status(400).json({ error: 'Falta el parámetro C' });
  res.json({ C, F: convertidorT(parseFloat(C)) });
});

router.post('/resolvedor', (req, res) => {
  const { a, b, c, op } = req.body;
  if ([a, b, c].some(v => v === undefined)) return res.status(400).json({ error: 'Faltan parámetros: a, b o c' });
  res.json({ a, b, c, op, resultado: resolvedor(parseFloat(a), parseFloat(b), parseFloat(c), op) });
});

router.post('/mejor-paridad', (req, res) => {
  const { num } = req.body;
  if (num === undefined) return res.status(400).json({ error: 'Falta el parámetro num' });
  res.json({ num, resultado: mejorParidad(parseInt(num)) });
});

router.post('/peor-paridad', (req, res) => {
  const { num } = req.body;
  if (num === undefined) return res.status(400).json({ error: 'Falta el parámetro num' });
  res.json({ num, resultado: peorParidad(parseInt(num)) });
});

module.exports = router;
