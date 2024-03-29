//Namespaced Constants
var ECommerceApp;
// MyAppName Namespace
(function(ECommerceApp) {
	// MyAppName.Constants Namespace
	(function(Constants) {
		// Private
		function createConstant(name, val) {
			Object.defineProperty(ECommerceApp.Constants, name, {
				value : val,
				writable : false
			});
		}

		// Public

		// initialize messageResource.js
		messageResource.init({
			// path to directory containing config.properties
			filePath : 'resources'
		});

		// load config.properties file
		messageResource
				.load(
						'config',
						function() {
							// load file callback

							// get value corresponding to a key from
							// config.properties
							Constants.USERSERVICEURL = createConstant(
									"USERSERVICEURL",
									 messageResource.get('hostname', 'config') + 'rest/service/json/login');
							Constants.SAVEFAULTSERVICEURL = createConstant(
									"SAVEFAULTSERVICEURL",
									messageResource.get('hostname', 'config') + 'rest/service/json/savefaults');
							Constants.READFAULTSERVICEURL = createConstant(
									"READFAULTSERVICEURL",
									messageResource.get('hostname', 'config') + 'rest/service/json/readfaults');
							Constants.READALLFAULTSERVICEURL = createConstant(
									"READALLFAULTSERVICEURL",
									messageResource.get('hostname', 'config') + 'rest/service/json/readallfaults');
							Constants.INJECTFAULTSERVICEURL = createConstant(
									"INJECTFAULTSERVICEURL",
									messageResource.get('hostname', 'config') + 'rest/service/json/injectfaults');
							Constants.STOPFAULTSERVICEURL = createConstant(
									"STOPFAULTSERVICEURL",
									messageResource.get('hostname', 'config') + 'rest/service/json/stopfaults');
						});

		ECommerceApp.Constants = Constants;
	})(ECommerceApp.Constants || (ECommerceApp.Constants = {}));
})(ECommerceApp || (ECommerceApp = {}));