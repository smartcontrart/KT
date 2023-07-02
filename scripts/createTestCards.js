// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const contractAddresses = require("../contract-addresses.json");
const cardsData = require("../cardsData.json");

var fs = require("fs");

async function main() {
  console.log(contractAddresses);
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);

  const chainId = await deployer.getChainId();

  console.log(`Using chain: #${chainId}`);

  console.log("Getting contracts ...");

  const Void2122Corporation = await ethers.getContractFactory(
    "Void2122Corporation"
  );
  const void2122Corporation = await Void2122Corporation.attach(
    contractAddresses.proxies.corporation
  );

  console.log(
    `Got Corporation at address: ${contractAddresses.proxies.corporation}`
  );

  const Void2122Factory = await ethers.getContractFactory("Void2122Factory");
  const void2122Factory = await Void2122Factory.attach(
    contractAddresses.proxies.factory
  );

  console.log(`Got Factory at address: ${contractAddresses.proxies.factory}`);

  const Void2122Loot = await ethers.getContractFactory("Void2122Loot");
  const void2122Loot = await Void2122Loot.attach(
    contractAddresses.proxies.loot
  );

  console.log(`Got Loot at address: ${contractAddresses.proxies.loot}`);

  const Void2122Mod = await ethers.getContractFactory("Void2122Mod");
  const void2122Mod = await Void2122Mod.attach(contractAddresses.proxies.mod);

  console.log(`Got Mod at address: ${contractAddresses.proxies.mod}`);

  const Void2122Schematic = await ethers.getContractFactory(
    "Void2122Schematic"
  );
  const void2122Schematic = await Void2122Schematic.attach(
    contractAddresses.proxies.schematic
  );

  console.log(
    `Got Schematic at address: ${contractAddresses.proxies.schematic}`
  );

  const Void2122Unit = await ethers.getContractFactory("Void2122Unit");
  const void2122Unit = await Void2122Unit.attach(
    contractAddresses.proxies.unit
  );

  console.log(`Got Unit at address: ${contractAddresses.proxies.unit}`);

  console.log(cardsData);
  let corporations = cardsData.cards.corporations;
  for (let i = 0; i < corporations.length; i++) {
    await void2122Corporation
      .connect(deployer)
      .createCorporation(corporations[i]);
  }

  let factories = cardsData.cards.factories;
  for (let i = 0; i < factories.length; i++) {
    await void2122Factory.connect(deployer).createFactory(factories[i]);
  }

  let loots = cardsData.cards.loots;
  for (let i = 0; i < loots.length; i++) {
    await void2122Loot.connect(deployer).createLoot(loots[i]);
  }

  let mods = cardsData.cards.mods;
  for (let i = 0; i < mods.length; i++) {
    await void2122Mod.connect(deployer).createMod(mods[i]);
  }

  let schematics = cardsData.cards.schematics;
  for (let i = 0; i < schematics.length; i++) {
    await void2122Schematic.connect(deployer).createSchematic(schematics[i]);
  }

  let units = cardsData.cards.units;
  for (let i = 0; i < units.length; i++) {
    await void2122Unit.connect(deployer).createUnit(units[i]);
  }

  console.log("Cards created");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});