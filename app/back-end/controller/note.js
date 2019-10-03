const note = require('../../services/note');
const error = require('../../helper/error');

module.exports.list = {
	handler: function (req, res) {
        var { paged, limit } = req.query;
        paged = parseInt(paged);
        limit = parseInt(limit);
        
		note.list(paged, limit).then(data => {
			res.status(200).send(data);
		}).catch(err => {
			console.log(err)
			error(res.boom, err);
		});
	}
};

module.exports.remove = {
	handler: (req, res) => {
		const { id } = req.params;
		
		note.remove(id).then(Data => {
			res.status(200).send(Data);
		}).catch(err => {
			error(res.boom, err);
		});
	}
};