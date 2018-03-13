angular.module('postService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Posts', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/posts');
			},
			create : function(postData) {
				return $http.post('/api/posts', postData);
			},
			delete : function(id) {
				return $http.delete('/api/posts/' + id);
			}
		}
	}]);