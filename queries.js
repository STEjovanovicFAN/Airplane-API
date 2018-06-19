var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/airplanes';
var db = pgp(connectionString);

function getAllAirplanes(req, res, next) {
  db.any('select * from aplanes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL airplanes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleAirplane(req, res, next) {
  var aplaneSN = parseInt(req.params.serial_number);
    db.one('select * from aplanes where serial_number = $1', aplaneSN)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE airplane'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createAirplane(req, res, next) {
  req.body.serial_number = parseInt(req.body.serial_number);
  db.none('insert into aplanes(name, serial_number, model)' +
      'values(${name}, ${serial_number}, ${model})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one airplane'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateAirplane(req, res, next) {
    db.none('update aplanes set name=$1, serial_number=$2, model=$3 where serial_number=$4',
    [req.body.name, parseInt(req.body.serial_number),
      req.body.model])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated airplane'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeAirplane(req, res, next) {
    var aplaneSN = parseInt(req.params.serial_number);
    db.result('delete from aplanes where serial_number = $1', aplaneSN)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} airplane`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
    getAllAirplanes: getAllAirplanes,
    getSingleAirplane: getSingleAirplane,
    createAirplane: createAirplane,
    updateAirplane: updateAirplane,
    removeAirplane: removeAirplane
};
