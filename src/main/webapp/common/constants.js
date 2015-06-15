//Namespaced Constants
var ECommerceApp;
//MyAppName Namespace
(function (ECommerceApp) {
    //MyAppName.Constants Namespace
    (function (Constants) {
        //Private
        function createConstant(name, val) {
            Object.defineProperty(ECommerceApp.Constants, name, {
                value: val,
                writable: false
            });
        }

        //Public
        
        Constants.SERVICEURL = createConstant("SERVICEURL", 'http://localhost:1111/appdynamicspilot/');
        Constants.USERSERVICEURL = createConstant("USERSERVICEURL", 'http://localhost:1111/appdynamicspilot/rest/user/login');
        Constants.PRODUCTSERVICEURL = createConstant("PRODUCTSERVICEURL",'http://localhost:1111/AngularUI/rest/service/json/getallitems');
        Constants.CARTSERVICEGETITEMSURL = createConstant("CARTSERVICEGETITEMSURL",'http://localhost:1111/AngularUI/rest/service/json/getcartitems');
        Constants.CARTSERVICEADDITEMSURL = createConstant("CARTSERVICEADDITEMSURL",'http://localhost:1111/AngularUI/rest/service/json/additemtocart');
        Constants.CARTSERVICEREMOVEITEMSURL = createConstant("CARTSERVICEREMOVEITEMSURL",'http://localhost:1111/AngularUI/rest/service/json/removeitemfromcart');
        Constants.CHECKOUTSERVICEURL = createConstant("CHECKOUTSERVICEURL",'http://localhost:1111/AngularUI/rest/service/json/checkout');
       

        ECommerceApp.Constants = Constants;
    })(ECommerceApp.Constants || (ECommerceApp.Constants = {}));
})(ECommerceApp || (ECommerceApp = {}));