const express = require('express');
const router = express.Router();
const { desglosarString, twoSum, conversionRomana, descomposicion } = require('../utils/taller3');

router.get('/', (req, res) => {
  res.send('Bienvenido al Taller 3. Usa POST en /desglosar, /two-sum, /romano o /descomposicion');
});

router.post('/desglosar', (req, res) => {
  const { cadena, tipo } = req.body;
  if (!cadena || !tipo) return res.status(400).json({ error: 'Faltan parámetros: cadena y tipo' });
  res.json({ cadena, tipo, resultado: desglosarString(cadena, tipo) });
});

router.post('/two-sum', (req, res) => {
  const { nums, objetivo } = req.body;
  if (!Array.isArray(nums) || objetivo === undefined) return res.status(400).json({ error: 'Debe enviar un array "nums" y un "objetivo"' });
  res.json({ nums, objetivo, resultado: twoSum(nums, objetivo) });
});

router.post('/romano', (req, res) => {
  const { romano } = req.body;
  if (!romano) return res.status(400).json({ error: 'Debe enviar un número romano' });
  res.json({ romano, resultado: conversionRomana(romano) });
});

router.post('/descomposicion', (req, res) => {
  const { entrada } = req.body;
  if (!entrada) return res.status(400).json({ error: 'Debe enviar una cadena válida' });
  res.json({ entrada, resultado: descomposicion(entrada) });
});

module.exports = router;
