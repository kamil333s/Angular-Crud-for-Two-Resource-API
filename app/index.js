require('angular');

var app = angular.module('cruddyApp', []);
var URL = 'http://localhost:3000';

app.controller('userController', ['$http',function($http) {
	var vm = this;
	vm.header = 'Users';
	vm.users = [{name:'Name', sid:'SID', password:''}];

	var tempUser = {};

	vm.backupUser = function(user) {
		tempUser.name = user.name;
		tempUser.sid = user.sid;	
		tempUser.password = user.password;	
	};

	vm.cancelUser = function(user) {
		user.name = tempUser.name;
		user.sid = tempUser.sid;
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
				// console.dir(vm.users);
			}// if
		}, function error(res) {
			alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// getUsers

	vm.createUser = function(user) {
		$http({
			method:'POST',
			url: URL + '/users',
			headers: {
				'content-type':'application/json'
			},
			data: {
				name:user.name,
				sid:user.sid,
				password:user.password
			}
		}).then(function success(res) {
			console.dir(res);
			if (res.status == 200) {
				// vm.users.push(user);
				vm.getUsers();
			}// if
		}, function error(res) {
			alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// createUser

	vm.updateUser = function(user) {
		if (user.password == 'hidden') {
			user.password = null;
		}
		$http({
			method:'PUT',
			url: URL + '/users/' + user._id,
			headers: {
				'content-type':'application/json'
			},
			data: {
				name:user.name,
				sid:user.sid,
				password: null || user.password
			}
		}).then(function success(res) {
			if (res.status == 200) {
				//vm.users.push(user);
				vm.getUsers();
			}// if
		}, function error(res) {
			alert('There was an error');
			console.log(res);
			}// error
		);// then
	};// createUser

	vm.deleteUser = function(user) {
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
	vm.courses = [{dept:'Dept', number:'Number', enrollment:0, maxEnroll:99}];

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
			alert('There was an error');
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