(function() {
	'use strict';

	angular.module('app').controller('BugsController', BugsController);

	BugsController.$inject = [ 'UserService', 'BugService','sharedProperties',
			'FlashService', '$rootScope' ];

	function BugsController(UserService,BugService, sharedProperties, FlashService,
			$rootScope) {
		var bc = this;
		bc.user = null;
		
		initController();

		function initController() {
			loadCurrentUser();
			ShowHideControls();
			ReadFaults();
		}
		function loadCurrentUser() {
			bc.user = $rootScope.globals.currentUser.username;
		}
		function ShowHideControls() {
			$rootScope.flash = null;
			$("#liuser").show();
		}

		bc.buglists = [{
			'id':1,
			'username':bc.user,
			'bugname':'',
			'timeframe':'',
		}];
		
		// Regular function with arguments
		function ReadFaults(){
		    // Do The Thing Here
			BugService.ReadFaults(bc.user).then(function(response) {
				if (response != null && response.success != null && !response.success) {
					FlashService.Error(response.message);
				} else {
					bc.notificationlist = response.data;
				}
			});
		}
		
		
		
		bc.addNewBug = function() {
			ShowHideControls();
			var newItemNo = bc.buglists.length+1;
			bc.buglists.push({'id': newItemNo,'username':bc.user});
		};
		
		bc.SubmitBug = function() {
			var mandatorybug = true;
			var duplicatebug = true;
			var duplicatebugname = '';
			ShowHideControls();
			bc.dataLoading = true;
			$.each(bc.buglists, function(index, element) {
				if(element.bugname == '' || element.bugname == 'undefined'){
					mandatorybug = false;
				}
			});
			
			$.each(bc.buglists, function(index, element) {
				var bugname = element.bugname;
				$.each(bc.notificationlist, function(notificationindex, notificationelement) {
					if(notificationelement.bugname == bugname){
						duplicatebugname = bugname;
				    	duplicatebug = false;
				    }
				});
			});
			
			if(mandatorybug && duplicatebug)
			{
				BugService.SaveFaults(bc.buglists).then(function(response) {
					if (response != null && response.success != null && !response.success) {
						FlashService.Error(response.message);
					}else{
						FlashService.Success(response.data);
						bc.buglists = [{
							'id':1,
							'username':bc.user,
							'bugname':'',
							'timeframe':'',
						}];
						ReadFaults();
					}
				});
			} else if(!mandatorybug){
				FlashService.Error("Please enter a valid Fault name and then click Submit");
			} else if(!duplicatebug){
				FlashService.Error(duplicatebugname + " has already been injected");
			}
			bc.dataLoading = false;
		};
		
		bc.BugClick = function(buglist,$event) {
			var addbug = true;
			$.each(bc.buglists, function(index, element) {
			    if(element.bugname == angular.element($event.currentTarget).parent().text()){
			    	addbug = false;
			    }
			});
			
			if(addbug){
				buglist.bugname = angular.element($event.currentTarget).parent().text();
				if(buglist.bugname == "CPU Burner")
					buglist.timeframe = '10:00 - 11:30';
				else 
					buglist.timeframe = '13:30 - 14:00';
			} else {
				FlashService.Error(angular.element($event.currentTarget).parent().text() + "  has already been injected");
			}
		}
		
		//Removes item from bug
		bc.RemoveFromBugs = function(buglists,buglist,index){
			if(buglist.bugname != null && buglist.bugname != '' && buglist.bugname != 'undefined'){
				FlashService.Success("'" + buglist.bugname + "'  was removed from your bug lists.");
			}
			buglists.splice(index, 1);
		}
	}
	
	
})();