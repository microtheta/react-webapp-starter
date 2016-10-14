'use strict';


var request = require('supertest');

var server = require('../index');

describe('Server loading test', function () {
	beforeEach(function () {
		this.timeout(15000);
	});
	afterEach(function () {
		server.close();
	});
	describe('Test Express starts', function() {
		it('Should responds to /', function testSlash(done) {
			request(server)
			.get('/')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;
				done();
			});;
		});
	});

	describe('Test Login', function() {

		it('Should responds 302 and goto login page when trying to login w/o username and password', function testLogin(done) {
			request(server)
			.post('/login')
			.expect('Location', '/login')
			.expect(302, done);
		});

		it('Should responds 302 and goto hotme page when trying to login with username and password', function testLogin(done) {
			request(server)
			.post('/login')
			.send({'email':'test@test.com', 'password': 'test123'})
			.expect(302)
			.expect('Location', '/')
			.end(function (err, res) {
				if (err) throw err;
				done();
			});
		});
	});

/*
	describe('Test if user is authenticated', function() {

		it('Should responds 401 if user has no auth token', function testUser(done) {
			request(server)
			.get('/user')
			.expect(401, done);
		});

		it('Should responds 200 if user has a valid auth token', function testUser(done) {
			request(server)
			.get('/user')
			.set('Authorization', 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.EmZq03wowIM-00EA2AOYiFgrmSP46ENTBroJn0wNndg') //set header for this test
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;
				done();
			});
		});

	});
*/
	
	// it('404 everything else', function testPath(done) {
	//   request(server)
	//     .get('/foo/bar')
	//     .expect(404, done);
	// });
});
