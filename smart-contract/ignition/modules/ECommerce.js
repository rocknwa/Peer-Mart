const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ECommerceModule", (m) => {
  const constructorArg = "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda"; // Address to pass to the constructor

  const ecommerce = m.contract("ECommerce", [constructorArg]);

  return { ecommerce };
});
