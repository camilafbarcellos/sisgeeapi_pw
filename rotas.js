const { Router } = require("express");

const controlePredios = require('./controladores/predios');
const controleSalas = require('./controladores/salas');

const rotas = new Router();

rotas.route('/predios')
    .get(controlePredios.getPredios)
    .post(controlePredios.addPredios)
    .put(controlePredios.updatePredios)

rotas.route('/predios/:codigo')
    .delete(controlePredios.deletePredio)
    .get(controlePredios.getPredioPorCodigo)

    rotas.route('/salas')
    .get(controleSalas.getSalas)
    .post(controleSalas.addSalas)
    .put(controleSalas.updateSalas)

rotas.route('/salas/:codigo')
    .delete(controleSalas.deleteSala)
    .get(controleSalas.getSalaPorCodigo)

module.exports = rotas;