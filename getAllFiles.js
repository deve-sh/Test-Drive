const path = require("path");
const fs = require("fs");

const getAllFiles = (dirPath, arrayOfFiles) => {
	const files = fs.readdirSync(dirPath);

	arrayOfFiles = arrayOfFiles || [];

	files.forEach((file) => {
		if (fs.statSync(dirPath + "/" + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
		} else arrayOfFiles.push(path.join(dirPath, "/", file));
	});

	return arrayOfFiles;
};

module.exports = getAllFiles;

// Reference: https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
