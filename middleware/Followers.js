const { spawn } = require("child_process");
function convertStringToNumber(inputString) {
  const multiplierMap = { K: 1000, M: 1000000 };
  const regex = /^(\d+)([KM]?)$/i;

  const match = inputString.match(regex);

  if (match) {
    const numberPart = parseInt(match[1], 10);
    const multiplier = multiplierMap[match[2].toUpperCase()] || 1;
    return numberPart * multiplier;
  } else {
    return parseInt(inputString, 10);
  }
}

async function followerfetch(platform, username) {
  return new Promise((resolve, reject) => {
    let scriptOutput = "";

    const pythonProcess = spawn("python", [
      `../event_inflluencer_website/AI_ML/main_${platform}.py`,
      username,
    ]);

    pythonProcess.stdout.on("data", (data) => {
      scriptOutput += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      reject(data);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(scriptOutput);
      } else {
        reject(`Python script exited with code ${code}`);
      }
    });
  });
}

const Followers = async (req, res, next) => {
  if (req.body.type === "Influencer") {
    try {
      req.platform = {};
      let platforms = req.body.platform;
      if (platforms.length === 0) {
        throw 1;
      }
      for (let i in platforms) {
        let followers = await followerfetch(
          platforms[i].split("/")[0].toUpperCase(),
          platforms[i].split("/")[1].replace(/\?/g, "."),
        );
        const num_string = JSON.parse(followers.replace(/'/g, '"')).Followers;
        const num = convertStringToNumber(num_string);
        let str = platforms[i];
        req.platform[str] = num;
      }
    } catch (error) {
      req.error = 1;
    }
  }

  next();
};

module.exports = Followers;
