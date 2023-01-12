# javascript部署智能合约

部署的过程，其实把在remix上部署的过程转换为代码

1. 安装**[solc-js](https://github.com/ethereum/solc-js)**

```bash
yarn add solc
```

1. 编译智能合约

```bash
yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
```

编译成功后会看到文件夹中出现了这样了文件

![截屏2023-01-02 14.17.32.png](javascript%E9%83%A8%E7%BD%B2%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%207cfc6835c7ec4a9db7c5a2719d010193/%25E6%2588%25AA%25E5%25B1%258F2023-01-02_14.17.32.png)

1. 安装[ganache](https://trufflesuite.com/ganache/)
2. 安装[ethers.js](https://docs.ethers.org/v5/getting-started/#installing)和fs-extra

```bash
yarn add ethers
yarn add fs-extra
```

1. 编写代码

```jsx
const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // deploy a contract?Wait for it to be deploy
  // contract deploy -> wouln't wait for it to finish
  // compile them in our code
  // compile them separately
  // HTTP://127.0.0.1:7545
  const provides = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "e935f87bd47e5b40bc18f6af8e588a081f736204292b05d215484e162dd688ec",
    provides
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

1. 执行文件

```bash
node deploy.js
```

执行完成后，会发现

![截屏2023-01-02 15.29.11.png](javascript%E9%83%A8%E7%BD%B2%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%207cfc6835c7ec4a9db7c5a2719d010193/%25E6%2588%25AA%25E5%25B1%258F2023-01-02_15.29.11.png)