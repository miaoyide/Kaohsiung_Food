app.controller('mainController', ['$scope', '$http', function($scope, $http) {

    $scope.loading = true; //載入中的圖案
    $scope.totalFood = []; //總餐廳陣列
    $scope.perpageFood = []; //每頁要顯示的陣列
    $scope.currentPage = 1; //起始頁碼
    $scope.numPerPage = 12; //一頁幾筆
    $scope.maxSize = 5; //頁碼一次最多顯示幾筆

    //取得資料
    $http.post("http://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=2&FileType=1&Lang=C")
        .success(function(data) {
            $scope.loading = null;
            $scope.totalPage = Object.keys(data).length;
            $scope.totalFood.push(data);
            $scope.perpageFood = $scope.totalFood[0].slice(0, 12);
        });


    //改變資料內容
    $scope.pageChanged = function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.perpageFood = $scope.totalFood[0].slice(begin, end);
    };


    //展開店家敘述
    $scope.turn = "展開";
    $scope.readmore = false;

    $scope.showDescription = function() {
        if (!$scope.readmore) {
            $scope.turn = "闔上";
            $scope.readmore = true;
        } else {
            $scope.turn = "展開";
            $scope.readmore = false;
        }
    }

}]);
