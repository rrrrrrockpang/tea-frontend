app.controller('Maincontroller', ['$scope', function($scope) {
    $scope.hi = ["1", "2", "3"];
    $scope.addItem = function() {
        console.log($scope.hi);
        $scope.hi.push($scope.addToDo);
    };
}])