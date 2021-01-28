const express = require('express');
const ClienteController = require ('../controllers/ClienteController.js');
const router = express.Router();

router.post('/clientes', ClienteController.Insert);
router.get('/clientes', ClienteController.SelectAll);
router.get('/clientes/:id', ClienteController.SelectDetail);
router.put('/clientes/:id', ClienteController.Update);
router.delete('/clientes/:id', ClienteController.Delete);

module.exports = router;
