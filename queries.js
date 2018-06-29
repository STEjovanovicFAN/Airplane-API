var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://postgres:SJ@localhost:5432/airplanes';
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
  var aplaneID = parseInt(req.params.id);
    db.one('select * from aplanes where id = $1', aplaneID)
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
  db.none('insert into aplanes(name, model, serial_number)' +
      'values(${name}, ${model}, ${serial_number})',
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
    db.none('update aplanes set name=$1, model=$2, serial_number=$3 where id=$4',
    [req.body.name, req.body.model,
       parseInt(req.body.serial_number), parseInt(req.params.id)])
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
    var aplaneID = parseInt(req.params.id);
    db.result('delete from aplanes where id = $1', aplaneID)
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

function getCanned


module.exports = {
    getAllAirplanes: getAllAirplanes,
    getSingleAirplane: getSingleAirplane,
    createAirplane: createAirplane,
    updateAirplane: updateAirplane,
    removeAirplane: removeAirplane,
    getCanned: getCanned 
};
