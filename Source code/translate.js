var app=angular.module("Translate",[]);
app.controller("Translatecontroller",function ($scope,$http) {
    $scope.translate = function () {
        var word = document.getElementById('pac-input').value;
        var language = document.getElementById('lang').value;
        $http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170912T043653Z.754436e01d62c63c.db1c1e1846c6b9d231e0e97648caf6ae2da8a203&text=' + word + '&lang=' + language).success(function (data) {
            console.log(data);
            $scope.output = data.text;
        })
    }
})