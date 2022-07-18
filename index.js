const core = require("@actions/core");
const fs = require("fs").promises;
const execCmd = require("child_process").exec;

const settings = ["command", "data", "output"].reduce((obj, key) => {
	obj[key] = core.getInput(key);
	return obj;
}, {});

(async () => {
	if (!command && !data) {
		throw new Error("Either command or data is required as an input.");
	}

	const result = data || await exec(settings.command);
	await fs.writeFile(settings.output, result);
})();

function exec(cmd) {
	return new Promise((resolve, reject) => {
		execCmd(cmd, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			} else {
				resolve(stdout);
			}
		});
	});
}
