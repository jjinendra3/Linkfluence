const { network, getNamedAccounts, deployments } = require("hardhat")
const { parseUnits } = require("ethers")
require("dotenv").config()
require("hardhat-deploy")

module.exports = async function () {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    
    const donation = await deploy("StreamerDonation", {
        from: deployer,
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    console.log("Doantion.address = " + donation.address)
    console.log("Donation.target = " + donation.target)

}

module.exports.tags = ["all", "raffle"]