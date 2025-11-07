const express = require('express');
const router = express.Router();
const { findMax, findMin, includes, sum, missingNumbers } = require('../utils/taller2');

router.get('/', (req, res) => {
  res.send('Bienvenido al Taller 2. Usa POST en /find-max, /find-min, /includes, /sum o /missing-numbers');
});

router.post('/find-max', (req, res) => {
  const { arr } = req.body;
  if (!Array.isArray(arr)) return res.status(400).json({ error: 'El parámetro arr debe ser un array' });
  res.json({ arr, max: findMax(arr) });
});

router.post('/find-min', (req, res) => {
  const { arr } = req.body;
  if (!Array.isArray(arr)) return res.status(400).json({ error: 'El parámetro arr debe ser un array' });
  res.json({ arr, min: findMin(arr) });
});

router.post('/includes', (req, res) => {
  const { arr, val } = req.body;
  if (!Array.isArray(arr) || val === undefined) return res.status(400).json({ error: 'Debe enviar un array y un valor "val"' });
  res.json({ arr, val, incluye: includes(arr, val) });
});

router.post('/sum', (req, res) => {
  const { arr } = req.body;
  if (!Array.isArray(arr)) return res.status(400).json({ error: 'El parámetro arr debe ser un array' });
  res.json({ arr, suma: sum(arr) });
});

router.post('/missing-numbers', (req, res) => {
  const { arr } = req.body;
  if (!Array.isArray(arr)) return res.status(400).json({ error: 'El parámetro arr debe ser un array' });
  res.json({ arr, faltantes: missingNumbers(arr) });
});

module.exports = router;
