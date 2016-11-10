angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
   
    $scope.comments = [];

    $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);

       
      });
    };

    $scope.addComment = function() {
    	var allData = $http.get('/comments').success(function(data){
      angular.copy(data, $scope.comments);
    });
    	//var dataLength = Object.keys(allData).length;

//    	console.log("" + dataLength);
var count = 0;
var i;

for (i in allData) {
    if (allData.hasOwnProperty(i)) {
        count++;
    }
}
console.log("" + count);
      
  
      //I need to check here all the comments! Where can I access that info? 
if($scope.formContent === '') { return; }
      console.log("In addComment with "+$scope.formContent);
      $scope.create({
        title: $scope.formContent,
        upvotes: 0,
      });
      $scope.formContent = '';

      //$scope.comments.push({title:$scope.formContent,upvotes:0});
      //$scope.formContent='';
    };


$scope.upvote = function(comment) {
        return $http.put('/comments/' + comment._id + '/upvote')
          .success(function(data){
            console.log("upvote worked");
            comment.upvotes += 1;
          });
       };

       $scope.downvote = function(comment) {
        return $http.put('/comments/' + comment._id + '/upvote')
          .success(function(data){
            console.log("downvote worked");
            comment.upvotes -= 1;
          });
       };

 	$scope.incrementUpvotes = function(comment) {
      //comment.upvotes += 1;

       $scope.upvote(comment);

    };

    $scope.decrementUpvotes = function(comment) {
      $scope.downvote(comment);
      //console.log("Downvoting! upvotes is " + comment.upvotes);
      if(comment.upvotes < 1)
      {
      	//console.log("inside if loop! deleting comment!");
      	$scope.delete(comment);
      }
    };

 $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

$scope.getAll = function() {
    return $http.get('/comments').success(function(data){
      angular.copy(data, $scope.comments);
    });
  };
$scope.getAll();
  }
]);