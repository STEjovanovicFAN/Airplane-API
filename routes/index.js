var express = require('express');
var router = express.Router();

var db = require('../queries');

/**
 * @swagger
 * definitions:
 *   Airplane:
 *     properties:
 *       name:
 *         type: string
 *       model:
 *         type: string
 *       serial_number:
 *         type: integer
 */

/**
 * @swagger
 * /api/airplanes:
 *   get:
 *     tags:
 *       - Airplane
 *     description: Returns all airplanes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of all airplanes
 *         schema:
 *           $ref: '#/definitions/Airplane'
 */
router.get('/api/airplanes', db.getAllAirplanes);

/**
 * @swagger
 * /api/airplanes/{id}:
 *   get:
 *     tags:
 *       - Airplane
 *     description: Returns a single Airplane
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Airplanes id 
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single airplane
 *         schema:
 *           $ref: '#/definitions/Airplane'
 */
router.get('/api/airplanes/:id', db.getSingleAirplane);

/**
 * @swagger
 * /api/airplanes:
 *   post:
 *     tags:
 *       - Airplane
 *     description: Creates a new airplane
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: airplane
 *         description: Airplane object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Airplane'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/api/airplanes', db.createAirplane);

/**
 * @swagger
 * /api/airplanes/{id}:
 *   put:
 *     tags:
 *       - Airplane
 *     description: Updates a single airplane
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Airplane's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: airplane
 *         description: Airplane to change
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Airplane'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/api/airplanes/:id', db.updateAirplane);

/**
 * @swagger
 * /api/airplanes/{id}:
 *   delete:
 *     tags:
 *       - Airplane
 *     description: Deletes a single Airplane
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Airplane's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/api/airplanes/:id', db.removeAirplane);


module.exports = router;
