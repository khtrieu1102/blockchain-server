exports.okResponse = (res, succeeded, message, data) => {
	return res.json({ succeeded, message, data });
};

exports.badRequestResponse = (res, succeeded, message, data) => {
	return res.status(400).json({ succeeded, message, data });
};

exports.unauthorizedResponse = (res, succeeded, message, data) => {
	return res.status(401).json({ succeeded, message, data });
};

exports.forbiddenResponse = (res, succeeded, message, data) => {
	return res.status(403).json({ succeeded, message, data });
};

exports.notFoundResponse = (res, succeeded, message, data) => {
	return res.status(404).json({ succeeded, message, data });
};

exports.serverErrorResponse = (res, succeeded, message, data) => {
	return res.status(500).json({ succeeded, message, data });
};
