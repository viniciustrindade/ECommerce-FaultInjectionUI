(function() {
	'use strict';

	angular.module('app').controller('BugsController', BugsController);

	BugsController.$inject = [ 'UserService', 'sharedProperties',
			'FlashService', '$rootScope' ];

	function BugsController(UserService, sharedProperties, FlashService,
			$rootScope) {
		var bc = this;
		bc.user = null;
		
		initController();

		function initController() {
			loadCurrentUser();
		}
		function loadCurrentUser() {
			bc.user = $rootScope.globals.currentUser.username;
		}

		bc.buglists = [ {
			id : "1",
			Description : "Memory Leak",
			User : "User 1",
			Date : "10/21/2013",
			TimeFrame : "3:29 PM"
		}, {
			id : "2",
			Description : "CPU Consumption",
			User : "User 1",
			Date : "10/21/2013",
			TimeFrame : "3:29 PM"
		}, {
			id : "3",
			Description : "Slow Response",
			User : "User 1",
			Date : "10/21/2013",
			TimeFrame : "3:29 PM"
		}, {
			id : "4",
			Description : "CPU Crash",
			User : "User 1",
			Date : "10/21/2013",
			TimeFrame : "3:29 PM"
		}, {
			id : "5",
			Description : "DB Crash",
			User : "User 1",
			Date : "10/21/2013",
			TimeFrame : "3:29 PM"
		}];
		
		bc.addNewBug = function() {
		      var newItemNo = bc.buglists.length+1;
		      bc.buglists.push({'id':'buglists'+newItemNo});
		    };
	}
	;
})();