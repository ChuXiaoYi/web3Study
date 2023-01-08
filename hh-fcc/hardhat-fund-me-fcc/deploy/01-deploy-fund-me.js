//import
//main function
// calling of main function

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployments, log } = deployments;
  const { deployer } = await getNamedAccounts();
};
