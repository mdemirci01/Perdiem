angular.module('postController', [])

	// inject the Post service factory into our controller
	.controller('mainController', ['$scope','$http','Posts', function($scope, $http, Posts) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all posts and show them
		// use the service to get all the posts
		Posts.get()
			.success(function(data) {
				$scope.posts = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createPost = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Posts.create($scope.formData)

					// if successful creation, call our get function to get all the new posts
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.posts = data; // assign our new list of posts
					});
			}
		};

		// DELETE ==================================================================
		// delete a post after checking it
		$scope.deletePost = function(id) {
			$scope.loading = true;

			Posts.delete(id)
				// if successful creation, call our get function to get all the new posts
				.success(function(data) {
					$scope.loading = false;
					$scope.posts = data; // assign our new list of posts
				});
		};
	}]);