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
					bc.notificationlist = [];
					var obj = [];
					$.each(response.data, function(notificationindex, notificationelement) {
						 var jsonData = {};
						 jsonData['bugname'] = notificationelement.bugname;
						 jsonData['timeframe'] = notificationelement.timeframe;
						 jsonData['username'] = notificationelement.username;
						 
						 var currentdate = new Date();
						 var timeframe = notificationelement.timeframe.split(" - ");
						 
						 if(timeframe != null && timeframe != undefined){
							 var starttime = timeframe[0].split(":");
							 var endtime = timeframe[1].split(":");
							 
							 var startdate = new Date();
							 startdate.setHours(starttime[0]);
							 startdate.setMinutes(starttime[1]);
							 
							 var enddate = new Date();
							 enddate.setHours(endtime[0]);
							 enddate.setMinutes(endtime[1]);
							 
							 if(startdate <= currentdate &&
								enddate >= currentdate){
								 jsonData['action'] = 'Running';
								 jsonData['btnclass'] = 'btn btn-warning btn-xs';
							 }
							 else{
								 jsonData['action'] = '  Stop ';
								 jsonData['btnclass'] = 'btn btn-danger btn-xs';
							 }
						 }
						bc.notificationlist.push(jsonData);
					});
				}
			});
		}
		
		
		
		bc.addNewBug = function() {
			ShowHideControls();
			var newItemNo = bc.buglists.length+1;
			bc.buglists.push({'id': newItemNo,'username':bc.user});
		};
		
		bc.SaveBug = function() {
			var mandatorybug = true;
			var duplicatebug = true;
			var duplicatebugname = '';
			ShowHideControls();
			bc.dataLoading = true;
			
			if(bc.buglists.length == 0)
				mandatorybug = false;
			
			$.each(bc.buglists, function(index, element) {
				if (element.bugname == null || element.bugname == undefined || element.bugname == ''){
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
				BugService.SaveFaults(bc.buglists,false).then(function(response) {
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
				FlashService.Error("Please enter a valid Fault name.");
			} else if(!duplicatebug){
				FlashService.Error(duplicatebugname + " has already been injected");
			}
			bc.dataLoading = false;
		};
		
		bc.InjectNow = function() {
			var mandatorybug = true;
			ShowHideControls();
			bc.injectdataLoading = true;
			
			if(bc.buglists.length == 0)
				mandatorybug = false;
			
			$.each(bc.buglists, function(index, element) {
				if (element.bugname == null || element.bugname == undefined || element.bugname == ''){
					mandatorybug = false;
				}
			});
			if(mandatorybug)
			{
				BugService.SaveFaults(bc.buglists,true).then(function(response) {
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
					}
				});
			} else if(!mandatorybug){
				FlashService.Error("Please enter a valid Fault name.");
			} 
			bc.injectdataLoading = false;
		};
		
		bc.BugClick = function(buglist,$event) {
			var addbug = true;
			$.each(bc.buglists, function(index, element) {
			    if(element.bugname == angular.element($event.currentTarget).parent().text()){
			    	addbug = false;
			    }
			});
			
			if(addbug){
				//Randomization of Date
				var randomstarthour = Math.floor((Math.random() * 23));
				var randomstartminute = Math.floor((Math.random() * 60));
				var randomoffset = Math.floor((Math.random() * 60));
				var date = new Date();
				
				//Random Start Date
				date.setHours(randomstarthour);
				date.setMinutes(randomstartminute);
				var starthour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
				var startminute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
				
				//Random End Date by adding random offset
				date.setMinutes(date.getMinutes() + randomoffset);
				var endhour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
				var endminute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
				
				//Assign the bug name and calculated timeframe
				buglist.bugname = angular.element($event.currentTarget).parent().text();
				buglist.timeframe = starthour + ':' + startminute + ' - ' + endhour + ':' + endminute;
			} else {
				FlashService.Error(angular.element($event.currentTarget).parent().text() + "  has already been added");
			}
		}
		
		//Removes item from bug
		bc.RemoveFromBugs = function(buglists,buglist,index){
			if(buglist.bugname != null && buglist.bugname != '' && buglist.bugname != undefined){
				FlashService.Success("'" + buglist.bugname + "'  was removed from your bug lists.");
			}
			buglists.splice(index, 1);
		}
	}
	
	
})();