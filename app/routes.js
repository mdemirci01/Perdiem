var Post = require('./models/post');

function getPosts(res) {
    Post.find(function (err, posts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(posts); // return all posts in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all posts
    app.get('/api/posts', function (req, res) {
        // use mongoose to get all posts in the database
        getPosts(res);
    });

    // create post and send back all posts after creation
    app.post('/api/posts', function (req, res) {

        // create a post, information comes from AJAX request from Angular
        Post.create({
            text: req.body.text,
            createDate: new Date(),
            done: false
        }, function (err, post) {
            if (err)
                res.send(err);

            // get and return all the posts after you create another
            getPosts(res);
        });

    });

    // delete a post
    app.delete('/api/posts/:post_id', function (req, res) {
        Post.remove({
            _id: req.params.post_id
        }, function (err, post) {
            if (err)
                res.send(err);

            getPosts(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
