var request = require('request'),
    templatemodels = require('./templatemodels');


exports.index = function (req, res) {
    res.render('app');
};

exports.views = function (req, res) {
    var name = req.params.name;

    res.render('views' + req.originalUrl, templatemodels(name));
};
