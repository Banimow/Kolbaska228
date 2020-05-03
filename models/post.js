var {mongoose} = require('../libs/mongoose');

var PostSchema = mongoose.Schema({
    text: String,
    title: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId
    },
    created: {
        type: Date,
        default: Date.now
    },
    preview: String, 
    size: {
        type: String, 
        required: true
    },
    imagesIndexes: [{type: String}], 
    photos: [{type: String}],
    links: [{type: String}],
    authors: [{type: String}],
    tag_name: {
      type: String,
      required: false
    }
});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.createPost = function(newPost, callback) {
    newPost.save(callback);
}
