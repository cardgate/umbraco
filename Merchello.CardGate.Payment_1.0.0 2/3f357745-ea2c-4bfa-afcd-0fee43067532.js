(function (controllers, undefined) {

    controllers.CardGateGatewayProviderController = function ($scope, $http) {

        $scope.init = function () {

            var key = "cardGateProcessorSettings";
            var extendedSettings = $scope.dialogData.provider.extendedData.getValue(key);

            $scope.providerSettings = extendedSettings ? angular.fromJson(extendedSettings) : {};

            // Watch with object equality to convert back to a string for the submit() call on the Save button
            $scope.$watch(function () {
                return $scope.providerSettings;
            }, function (newValue, oldValue) {
                $scope.dialogData.provider.extendedData.setValue(key, angular.toJson(newValue));
            }, true);
        };
        $scope.init();

    };

    angular.module("umbraco").controller("Merchello.Plugin.GatewayProviders.Payments.Dialogs.CardGateGatewayProviderController", ['$scope', '$http', merchello.Controllers.CardGateGatewayProviderController]);

}(window.merchello.Controllers = window.merchello.Controllers || {}));


angular.module('merchello').controller('Merchello.GatewayProviders.Dialogs.CardGateMethodRefundPaymentController',
       ['$scope', 'invoiceHelper',
       function ($scope, invoiceHelper) {

           $scope.wasFormSubmitted = false;
           $scope.save = save;

           function init() {
               $scope.dialogData.amount = invoiceHelper.round($scope.dialogData.appliedAmount, 2);
           }

           function save() {
               $scope.wasFormSubmitted = true;
               if (invoiceHelper.valueIsInRage($scope.dialogData.amount, 0, $scope.dialogData.appliedAmount)) {
                   $scope.submit($scope.dialogData);
               } else {
                   $scope.refundForm.amount.$setValidity('amount', false);
               }
           }

           // initializes the controller
           init();
       }]);