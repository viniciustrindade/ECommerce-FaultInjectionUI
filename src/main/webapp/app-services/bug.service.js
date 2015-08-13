(function() {
	'use strict';

	angular.module('app').factory('BugService', BugService);

	BugService.$inject = [ '$http' ];
	function BugService($http) {
		var service = {};

		service.SaveFaults = SaveFaults;
		service.ReadFaults = ReadFaults;
		service.ReadAllFaults = ReadAllFaults;
		service.StopFaults = StopFaults;

		return service;

		function SaveFaults(jsonData,injectNow) {
			return $http({
				method : 'POST',
				url : injectNow == true ? ECommerceApp.Constants.INJECTFAULTSERVICEURL : ECommerceApp.Constants.SAVEFAULTSERVICEURL,
				data : jsonData, // pass in data as strings
				headers : {
					'Content-Type' : 'application/json'
				}
			})
					.then(
							handleSuccess,
							handleError('Error while saving the Fault Information. Please try again later.'));

			// private functions
			function handleSuccess(data) {
				return data;
			}

			function handleError(error) {
				return function() {
					return {
						success : false,
						message : error
					};
				};
			}
		}
		
		function ReadFaults(usrname) {
			return $http({
				method : 'GET',
				url : ECommerceApp.Constants.READFAULTSERVICEURL,
				headers: {
					   'username': usrname
					 }
			})
					.then(
							handleSuccess,
							handleError('Error while reading the Fault Information. Please try again later.'));

			// private functions
			function handleSuccess(data) {
				return data;
			}

			function handleError(error) {
				return function() {
					return {
						success : false,
						message : error
					};
				};
			}
		}
		
		function ReadAllFaults(usrname) {
			return $http({
				method : 'GET',
				url : ECommerceApp.Constants.READALLFAULTSERVICEURL
			})
					.then(
							handleSuccess,
							handleError('Error while reading the Fault Information. Please try again later.'));

			// private functions
			function handleSuccess(data) {
				return data;
			}

			function handleError(error) {
				return function() {
					return {
						success : false,
						message : error
					};
				};
			}
		}

		
		function StopFaults(usrname,faultname) {
			return $http({
				method : 'GET',
				url : ECommerceApp.Constants.STOPFAULTSERVICEURL,
				headers: {
					   'username': usrname,
					   'faultname':faultname
					 }
			})
					.then(
							handleSuccess,
							handleError('Error while reading the Fault Information. Please try again later.'));

			// private functions
			function handleSuccess(data) {
				return data;
			}

			function handleError(error) {
				return function() {
					return {
						success : false,
						message : error
					};
				};
			}
		}
		
	}

})();