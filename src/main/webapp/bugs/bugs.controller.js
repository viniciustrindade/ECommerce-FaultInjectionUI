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
			ReadAllFaults();
		}
		function loadCurrentUser() {
			bc.user = $rootScope.globals.currentUser.username;
		}
		function ShowHideControls() {
			$rootScope.flash = null;
			$("#liuser").show();
			bc.injectdataLoading = false;
			bc.dataLoading = false;
		}
		
		bc.status = {
				isopen: false
		};

		bc.buglists = [{
			'id':1,
			'username':bc.user,
			'bugname':'',
			'selectedfromtime':'00:00',
			'selectedtotime':'00:30',
			'timeframe':''
		}];
		bc.readAllFaultsData = [];
		bc.notificationlist = [];
		
		bc.fromtimes = getdatatimeframe();
		bc.totimes = getdatatimeframe();
		
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
						 bc.notificationlist.push(jsonData);
					});
				}
			});
		}
		
		// Regular function with arguments
		function ReadAllFaults(){
		    // Do The Thing Here
			BugService.ReadAllFaults(bc.user).then(function(response) {
				if (response != null && response.success != null && !response.success) {
					FlashService.Error(response.message);
				} else {
					bc.readAllFaultsData = [];
					var obj = [];
					$.each(response.data, function(notificationindex, notificationelement) {
						 var jsonData = {};
						 jsonData['bugname'] = notificationelement.bugname;
						 jsonData['timeframe'] = notificationelement.timeframe;
						 jsonData['username'] = notificationelement.username;
						 bc.readAllFaultsData.push(jsonData);
					});
				}
			});
		}
		
		function checkvalidtime(timeframe){
			var timeframe = timeframe.split(" - ");
			 if(timeframe != null && timeframe != undefined){
				 var starttime = timeframe[0].split(":");
				 var endtime = timeframe[1].split(":");
				 
				 var startdate = new Date();
				 startdate.setHours(starttime[0]);
				 startdate.setMinutes(starttime[1]);
				 
				 var enddate = new Date();
				 enddate.setHours(endtime[0]);
				 enddate.setMinutes(endtime[1]);
				 if(startdate >= enddate)
					 return false;
				 else
					 return true;
			 }
		}
		
		bc.addNewBug = function() {
			ShowHideControls();
			var newItemNo = bc.buglists.length+1;
			bc.buglists.push({'id': newItemNo,'username':bc.user,'selectedfromtime':'00:00','selectedtotime':'00:30'});
		};
		
		bc.SaveBug = function() {
			ShowHideControls();
			bc.dataLoading = true;
			var mandatorybug = true;
			var duplicatebug = true;
			var duplicatebugbysameuser = true;
			var invaliddate = true;
			var duplicatebugname = '';
			var duplicatebugnamebysameuser = '';
			var duplicatetimeframe = '';
			var duplicateusername = ''
			if(bc.buglists == null || bc.buglists == undefined || bc.buglists.length == 0){
				mandatorybug = false;
			} else {
				$.each(bc.buglists, function(index, element) {
					if (element.bugname == null || element.bugname == undefined || element.bugname == ''){
						mandatorybug = false;
					}
					//Assign the timeframe
					element.timeframe = element.selectedfromtime + ' - ' + element.selectedtotime;
					//Check if start date is greater than end date
					if(checkvalidtime(element.timeframe) == false){
						invaliddate = false;
					}
				});
				$.each(bc.buglists, function(index, element) {
					var bugname = element.bugname;
					var timeframe = element.timeframe;
					$.each(bc.readAllFaultsData, function(faultindex, faultelement) {
						
						if(faultelement.bugname == bugname){
							var enteredtimeframe = timeframe.split(" - ");
							 var existingtimeframe = faultelement.timeframe.split(" - ");
							 
							 if(existingtimeframe != null && existingtimeframe != undefined &&  enteredtimeframe != null && enteredtimeframe != undefined){
								 var starttime = existingtimeframe[0].split(":");
								 var endtime = existingtimeframe[1].split(":");
								 
								 var enteredstarttime = enteredtimeframe[0].split(":");
								 var enteredendtime = enteredtimeframe[1].split(":");
								 
								 var startdate = new Date();
								 startdate.setHours(starttime[0]);
								 startdate.setMinutes(starttime[1]);
								 
								 var enddate = new Date();
								 enddate.setHours(endtime[0]);
								 enddate.setMinutes(endtime[1]);
								 
								 var enteredstartdate = new Date();
								 enteredstartdate.setHours(enteredstarttime[0]);
								 enteredstartdate.setMinutes(enteredstarttime[1]);
								 
								 var enteredenddate = new Date();
								 enteredenddate.setHours(enteredendtime[0]);
								 enteredenddate.setMinutes(enteredendtime[1]);
								 if((startdate <= enteredstartdate && enddate > enteredstartdate) || (startdate < enteredenddate && enddate > enteredenddate)){
									 duplicatebugname = bugname;
									 duplicateusername = faultelement.username;
									 duplicatetimeframe = faultelement.timeframe;
									 duplicatebug = false;
									 return;
								 }
							 }
					    }
					});
				});
				
				$.each(bc.buglists, function(index, element) {
	 				var bugnamebysameuser = element.bugname;
					$.each(bc.notificationlist, function(notificationindex, notificationelement) {
						if(notificationelement.bugname == bugnamebysameuser){
							duplicatebugnamebysameuser = bugnamebysameuser;
					    	duplicatebugbysameuser = false;
						}
					});
				});
			}
			
			if(mandatorybug && duplicatebug && invaliddate && duplicatebugbysameuser)
			{
				BugService.SaveFaults(bc.buglists,false).then(function(response) {
					if (response != null && response.success != null && !response.success) {
						FlashService.Error(response.message);
						bc.dataLoading = false;
					}else{
						FlashService.Success(response.data);
						bc.buglists = [{
							'id':1,
							'username':bc.user,
							'bugname':'',
							'selectedfromtime':'00:00',
							'selectedtotime':'00:30',
							'timeframe':''
						}];
						ReadFaults();
						ReadAllFaults();
						bc.dataLoading = false;
					}
				});
			} else if(!invaliddate){
				FlashService.Error("End date should always be greater than start date");
				bc.dataLoading = false;
			} else if(!mandatorybug){
				FlashService.Error("Please enter a valid Fault name.");
				bc.dataLoading = false;
			} else if(!duplicatebug){
				FlashService.Error(duplicatebugname + " has already been injected by " + duplicateusername + " from " + duplicatetimeframe);
				bc.dataLoading = false;
			} else if(!duplicatebugbysameuser){
				FlashService.Error(duplicatebugnamebysameuser + " has already been injected");
				bc.dataLoading = false;
			}
		};
		
		bc.InjectNow = function() {
			var mandatorybug = true;
			ShowHideControls();
			bc.injectdataLoading = true;
			
			if(bc.buglists == null || bc.buglists == undefined || bc.buglists.length == 0){
				mandatorybug = false;
			} else {
				$.each(bc.buglists, function(index, element) {
					if (element.bugname == null || element.bugname == undefined || element.bugname == ''){
						mandatorybug = false;
					}
				});
			}
			if(mandatorybug)
			{
				BugService.SaveFaults(bc.buglists,true).then(function(response) {
					if (response != null && response.success != null && !response.success) {
						FlashService.Error(response.message);
						bc.injectdataLoading = false;
					}else{
						FlashService.Success(response.data);
						bc.buglists = [{
							'id':1,
							'username':bc.user,
							'bugname':'',
							'selectedfromtime':'00:00',
							'selectedtotime':'00:30',
							'timeframe':''
						}];
						bc.injectdataLoading = false;
					}
				});
			} else if(!mandatorybug){
				FlashService.Error("Please enter a valid Fault name.");
				bc.injectdataLoading = false;
			}
		};
		
		bc.BugClick = function(buglist,$event) {
			var addbug = true;
			$.each(bc.buglists, function(index, element) {
			    if(element.bugname == angular.element($event.currentTarget).parent().text()){
			    	addbug = false;
			    }
			});
			
			if(addbug){
				//Assign the bug name
				buglist.bugname = angular.element($event.currentTarget).parent().text();
			} else {
				FlashService.Error(angular.element($event.currentTarget).parent().text() + "  has already been added");
			}
		}
		
		bc.StopFault = function(notificationlist,notification,index) {
			BugService.StopFaults(bc.user,notification.bugname).then(function(response) {
				if (response != null && response.success != null && !response.success) {
					FlashService.Error(response.message);
				}else{
					notificationlist.splice(index, 1);
					FlashService.Success(notification.bugname + " has been stopped succesfully");
					ReadFaults();
					ReadAllFaults();
				}
			});
		}
		
		//Removes item from bug
		bc.RemoveFromBugs = function(buglists,buglist,index){
			if(buglist.bugname != null && buglist.bugname != '' && buglist.bugname != undefined){
				FlashService.Success("'" + buglist.bugname + "'  was removed from your bug lists.");
			}
			buglists.splice(index, 1);
		}
		
		bc.setfromtime = function(buglist,fromtime) {
			buglist.selectedfromtime = fromtime;
		};
		
		bc.settotime = function(buglist,totime) {
			buglist.selectedtotime = totime;
		};
		
		function replacer(key,value)
		{
		    if (key=="selectedfromtime") return undefined;
		    else if (key=="selectedtotime") return undefined;
		    else return value;
		}
	}
	
	
})();