(function () {

    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function ($scope, $state, classifiedsFactory, $mdSidenav, $mdToast) {

            var vm = this;

            vm.categories;
            vm.classifieds;
            vm.classified;
            vm.openSideBar = openSideBar;

            vm.classifieds = classifiedsFactory.ref;

            vm.classifieds.$loaded().then(function(classifieds){
                vm.categories = getCategories(classifieds);
            });

            $scope.$on('newClassified', function(event, classified){
                vm.classifieds.$add(classified);
                showToast('Classified Saved!');
            })

            $scope.$on('editSaved', function(event, message){
               showToast(message);
            });

            function openSideBar() {
                $state.go('classifieds.new')
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position("top, right")
                        .hideDelay(3000)
                );
            }

            function getCategories(classifieds) {

                var categories = [];

                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                })

                return _.uniq(categories);
            }

        });

})();