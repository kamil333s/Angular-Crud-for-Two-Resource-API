
require('angular');

var app = angular.module('cruddyApp', []);
require('./directives/select.js')(app);
require('./directives/nav.js')(app);
require('./services/myFactory.js')(app);

var URL = 'http://localhost:3000';

app.controller('usersController', ['$http',function($http) {
	var vm = this;
	vm.header = 'Users';
	vm.users = [{name:'', sid:'', favClass:''}];
	vm.tempUser = {};

	vm.backupUser = function(user) {
		vm.tempUser.name = user.name;
		vm.tempUser.sid = user.sid;	
		vm.tempUser.favClass = user.favClass;	
	};

	vm.cancelUser = function(user) {
		user.name = vm.tempUser.name;
		user.sid = vm.tempUser.sid;
		user.favClass = vm.tempUser.favClass;
		vm.backupUser(user);
	};

	vm.getUsers = function() {
		$http({
			method:'GET',
			url: URL + '/users',
			headers: {
				'content-type':'application/json'
			}
		}).then(function success(res) {
			if (res.data.data.length > 0) {
				vm.users = res.data.data;
				console.log('success');
			}// if
		}, function error(res) {
			//alert('There was an error');
			console.dir('GET error:', res);
			}// error
		);// then
	};// getUsers

	vm.createUser = function(user) {
		console.log('POST!');
		console.dir(user);
		$http({
			method:'POST',
			url: URL + '/users',
			headers: {
				'content-type':'application/json'
			},
			data: {
				name:user.name,
				sid:user.sid,
				favClass:user.favClass,
				password: user.password
			}
		}).then(function success(res) {
			if (res.status == 200) {
				console.log('POST success');
				console.dir(res.data);
				vm.users.push({
				name:user.name,
				sid:user.sid,
				favClass:user.favClass
			});
				//vm.getUsers();
			}// if
		}, function error(res) {
			console.log('POST error');
			console.dir(res);
			}// error
		);// then
	};// createUser

	vm.updateUser = function(user) {
		$http({
			method:'PUT',
			url: URL + '/users/' + user._id,
			headers: {
				'content-type':'application/json'
			},
			data: {
				name:user.name,
				sid:user.sid,
				favClass: user.favClass
			}
		}).then(function success(res) {
			if (res.status == 200) {
				//vm.users.push(user);
				//vm.getUsers();
			}// if
		}, function error(res) {
			alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// createUser

	vm.deleteUser = function(user) {
		console.log('DELETE');
		console.dir(user);
		$http({
			method:'DELETE',
			url: URL + '/users/' + user._id,
			headers: {
				'content-type':'application/json'
			}
		}).then(function success(res) {
			if (res.status == 200) {
				var index = vm.users.indexOf(user); 
				vm.users.splice(index, 1);
			}// if
		}, function error(res) {
			alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// getUsers
}]);

app.controller('courseController', ['$http',function($http) {
	var vm = this;
	vm.header = 'Courses';
	vm.courses = [{dept:'', number:'', enrollment:0, maxEnroll:0}];

	var tempCourse = {};

	vm.backupCourse = function(course) {
		tempCourse.dept = course.dept;
		tempCourse.number = course.number;	
		tempCourse.enrollment = course.enrollment;
		tempCourse.maxEnroll = course.maxEnroll;	
	};

	vm.cancelCourse = function(course) {
		course.dept = tempCourse.dept;
		course.number = tempCourse.number;	
		course.enrollment = tempCourse.enrollment;
		course.maxEnroll = tempCourse.maxEnroll;
		vm.backupCourse();
	};

	vm.getCourses = function() {
		$http({
			method:'GET',
			url: URL + '/courses',
			headers: {
				'content-type':'application/json'
			}
		}).then(function success(res) {
			console.dir(res);
			if (res.data.data.length > 0) {
				vm.courses = res.data.data;
				console.dir(vm.courses);
			}// if
		}, function error(res) {
			// alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// getCourses

	vm.createCourse = function(course) {
		$http({
			method:'POST',
			url: URL + '/courses',
			headers: {
				'content-type':'application/json'
			},
			data: {
				dept:course.dept,
				number:course.number,
				enrollment:course.enrollment,
				maxEnroll:course.maxEnroll
			}
		}).then(function success(res) {
			console.dir(res);
			if (res.status == 200) {
				// vm.courses.push(course);
				vm.getCourses();
			}// if
		}, function error(res) {
			alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// createCourse

	vm.updateCourse = function(course) {
		if (course.enrollment == 'hidden') {
			course.enrollment = null;
		}
		$http({
			method:'PUT',
			url: URL + '/courses/' + course._id,
			headers: {
				'content-type':'application/json'
			},
			data: {
				dept:course.dept,
				number:course.number,
				enrollment: course.enrollment,
				maxEnroll: course.maxEnroll
			}
		}).then(function success(res) {
			if (res.status == 200) {
				//vm.courses.push(course);
				vm.getCourses();
			}// if
		}, function error(res) {
			alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// createCourse

	vm.deleteCourse = function(course) {
		$http({
			method:'DELETE',
			url: URL + '/courses/' + course._id,
			headers: {
				'content-type':'application/json'
			}
		}).then(function success(res) {
			if (res.status == 200) {
				var index = vm.courses.indexOf(course); 
				vm.courses.splice(index, 1);
			}// if
		}, function error(res) {
				alert('There was an error');
				console.log(res);
			}// error
		);// then
	};// getCourses
}]);

app.controller('loginController', ['$http', 'myFactory', function($http, myFactory) {
	console.log("login called");
	var vm = this;
	vm.username = '';
	vm.password = '';
	vm.loggedBool = false;
	vm.message = '';

	vm.login = function(){
    	$http({
		method:'POST',
		url: URL + '/login',
		headers: {
			'content-type':'application/json',
			'authorization': 'Basic ' + btoa(vm.username + ':' + vm.password)
		}
		}).then(function success(res) {
		if (res.status == 200) {
			myFactory.setToken(res.data.token);
			vm.loggedIn();
			console.dir(res.data.token);
		}// if
		}, function error(res) {
			// vm.message = res.data
			alert(res.data);
			console.log(res);
		}// error
	);// then
    };
  

	vm.logout = function(){
		myFactory.clearToken();
		vm.username = '';
		vm.password = '';
		vm.loggedBool = false;
	}

	vm.loggedIn = function(){
  		vm.loggedBool= true;
  	}
  	vm.loggedOut = function(){
  		vm.loggedBool = false;
  	}
}]);