const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs").promises;

const settings = ["command", "output"].reduce((obj, key) => {
	obj[key] = core.getInput(key);
	return obj;
}, {});

(async () => {
	let myOutput = "";

	const options = {};
	options.listeners = {
		"stdout": (data) => {
			myOutput += data.toString();
		}
	};
	await exec.exec(settings.command, [], options);

	await fs.writeFile(settings.output, myOutput);
})();
