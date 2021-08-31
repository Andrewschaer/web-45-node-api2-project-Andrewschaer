// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find()
        .then(allPosts => {
            res.status(200).json(allPosts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "The posts information could not be retrieved"});
        });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "The post information could not be retrieved"});
        });
});

router.post('/', (req, res) => {
    if (req.body.title && req.body.contents) {
        Post.insert(req.body)
            .then(newPostID => {
                Post.findById(newPostID.id)
                    .then (addedPost => {
                        res.status(201).json(addedPost)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: "There was an error while saving the post to the database"});
                    });         
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: "There was an error while saving the post to the database"});
            });
    } else {
        res.status(400).json({message: "Please provide title and contents for the post"});
    }
});

router.put('/:id', (req, res) => {
    if (req.body.title && req.body.contents) {
        Post.update(req.params.id, req.body)
            .then( () => {
                Post.findById(req.params.id)
                    .then(updatedPost => {
                        if (updatedPost) {
                            res.status(200).json(updatedPost);
                        } else {
                            res.status(404).json({message: "The post with the specified ID does not exist"});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: "The post information could not be modified"});
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: "The post information could not be modified"});
            });
    } else {
        res.status(400).json({message: "Please provide title and contents for the post"});
    }
});

router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(postToDelete => {
            if (postToDelete) {
                Post.remove(req.params.id)
                    .then( () => {
                        res.status(200).json(postToDelete);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: "The post could not be removed"});
                    });
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "The post could not be removed"});
        });
});

router.get('/:id/comments', (req, res) => {
    Post.findById(req.params.id)
        .then( postOfInterest => {
            if (postOfInterest) {
                Post.findPostComments(req.params.id)
                    .then(allPostComments => {
                        res.status(200).json(allPostComments);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: "The comments information could not be retrieved"});
                    });
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "The comments information could not be retrieved"});
        });
});

module.exports = router