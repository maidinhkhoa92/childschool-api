const contract = require('../../services/contact');
const error = require('../../helper/error');

module.exports.list = {
	handler: function (req, res) {
        var { paged, limit } = req.query;
        paged = parseInt(paged);
        limit = parseInt(limit);
        
		contract.list(paged, limit).then(data => {
			res.status(200).send(data);
		}).catch(err => {
			next(err);
		});
	}
};

module.exports.remove = {
	handler: (req, res) => {
		const { id } = req.params;
		
		contract.remove(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			next(err);
		});
	}
};