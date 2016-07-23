var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('DB.db');

/**
 * @namespace /users
 */

/**
 * @method get
 * @memberOf /users
 * @description RESTful api method. Return a single user.
 * @param {number} id - id of user
 * @returns User
 */
/** documented as /users/get/:id */
router.get('/:id', function(req, res, next) {
  db.get('SELECT * FROM Users WHERE id = $id', {
  	$id: req.params.id
	}, function (error, data) {
		res.json(data);
	})
});

/**
 * @method getAll
 * @memberOf /users
 * @description RESTful api method. Return a all users.
 * @returns Users
 */
router.get('/', function (req, res, next) {
	db.all('SELECT * FROM Users', {}, function(error, data) {
		res.json(data);
	});
});


/**
 * @method post
 * @memberOf /users
 * @description RESTful api method. Post user to database.
 * @param {object} user - New user
 * @returns Posted user
 */
router.post('/', function (req, res, next) {
	const {
		firstName: $firstName,
		lastName: $lastName,
		email: $email,
		gender: $gender,
		city: $city
	} = req.body;
	db.run('INSERT INTO Users(firstName, lastName, email, gender, city) VALUES ($firstName, $lastName, $email, $gender, $city)', {
		$firstName, $lastName, $email, $gender, $city
	}, function (error) {
		if (!error) {
			res.send(arguments);
		} else {
			res.json({'error': 'error'})
		}
	})
});


/**
 * @method put
 * @memberOf /users
 * @description RESTful api method. Put user to database
 * @param {object} user - changed user
 * @param {number} id - id of user
 * @returns Changed user
 */
router.put('/:id', function (req, res, next) {
	const {
		firstName: $firstName,
		lastName: $lastName,
		email: $email,
		gender: $gender,
		city: $city
	} = req.body;
	const $id = req.params.id;
	db.run('UPDATE Users SET firstName = $firstName, lastName = $lastName, email = $email, gender = $gender, city = $city WHERE id = $id;', {
		$firstName, $lastName, $email, $gender, $city, $id
	}, function (error) {
		if (!error) {
			res.json(req.body);
		}
	});
});

/**
 * @method delete
 * @memberOf /users
 * @description RESTful api method. Delete user form database.
 * @param {number} id - id of deleted user
 * @returns empty object
 */
router.delete('/:id', function (req, res, next) {
	const $id = req.params.id;
	db.run('DELETE FROM Users WHERE id=$id;', {$id}, function (error, data) {
		res.json({});
	});
});

module.exports = router;
