const core = require("@actions/core");
// const exec = require("@actions/exec");
const fs = require("fs").promises;
const execCmd = require("child_process").exec;

const settings = ["command", "output"].reduce((obj, key) => {
	obj[key] = core.getInput(key);
	return obj;
}, {});

(async () => {
	const result = await exec(settings.command);
	await fs.writeFile(settings.output, result);

	// let myOutput = "";

	// const options = {};
	// options.listeners = {
	// 	"stdout": (data) => {
	// 		myOutput += data.toString();
	// 	}
	// };
	// await exec.exec(settings.command, [], options);

	// await fs.writeFile(settings.output, myOutput);
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
