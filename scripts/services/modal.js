angular.module('services.modal', [])
    .factory('Modal', function ($modal) {
        return {
            openYesNoModal: function (title, message, yesCallback, noCallback) {
                var modalInstance = $modal.open({
                    templateUrl: '/views/templates/yes-no-modal.html',
                    controller: 'YesNoModalCtrl',
                    resolve: {
                        title: function () {
                            return title;
                        },
                        message: function () {
                            return message;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    if (yesCallback) yesCallback();
                }, function () {
                    if (noCallback) noCallback()
                });
            }
        };
    })
    .controller('YesNoModalCtrl', function ($scope, $modalInstance, message, title) {
        $scope.message = message;
        $scope.title = title;
        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
