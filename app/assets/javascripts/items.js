var itemsApp = angular.module('itemsApp',['ngFileUpload'])
itemsApp.controller('itemsController', ['$scope', 'Upload', function($scope, Upload) {
  $scope.items = [];
  
  var error = function(data) {
    alert(JSON.stringify(data))
  };

  var clearForm = function(item) {
    item.newName = "";
    item.newImage = "";
    item.isEdit = false;
    angular.forEach( angular.element("input[type='file']"), function(inputElem) {
      angular.element(inputElem).val(null);
    });
  }

  $scope.selectFile = function (files, item) {
    if (!item) {
      item = {}
      $scope.item = {}
      $scope.item.newImage = files[0];
    }
    item.newImage = files[0];
  }

  $scope.saveItem = function (item) {
    if (!item || !item.newName) {
      alert("Название не может быть пустым");
      return;
    }
    var success = function(data) {
      item.name = data.name;
      item.image = data.image;
      if (!isEditForm) {
        $scope.items.push(data);
      }
      clearForm(item);
    };

    var isEditForm = false;
    if (item && Number.isInteger(item.id)){
      isEditForm = true;
    }
    
    var type = "POST";
    var url = '/items';
    if (isEditForm) {
      type = 'PUT';
      url = '/items/' + item.id
    }
    console.log('item');console.log(item);
    $scope.upload = Upload.upload({
      url: url + '.json',
      method: type,
      fields: { 'item[name]': item.newName },
      file: item.newImage,
      fileFormDataName: 'item[image]',
      dataType: 'json'
    })
    .success(success)
    .error(error);
  };

  $scope.editItem = function (item) {
    item.newName = item.name
    item.isEdit = true;
  };

  $scope.cancel = function (item) {
    clearForm(item)
  };
  
  $scope.removeItem = function (item) {
    var remove = function(data) {
      $scope.$apply(function() {
        $scope.items.splice( $scope.items.indexOf(item), 1 );
      });
    };

    if (confirm("Вы уверены?")) {
      $.ajax({
        type: 'post',
        url: '/items/' + item.id,
        success: remove,
        error: error,
        dataType: 'json',
        data: {"_method":"delete"}
      });
    }
  };
}]);
  