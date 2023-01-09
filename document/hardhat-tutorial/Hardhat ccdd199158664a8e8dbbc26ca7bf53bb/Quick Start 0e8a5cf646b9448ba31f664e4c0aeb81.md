# Quick Start

## 创建项目

在您的项目文件夹中运行`yarn hardhat`:

![Untitled](Quick%20Start%200e8a5cf646b9448ba31f664e4c0aeb81/Untitled.png)

让我们创建 JavaScript 或 TypeScript 项目并通过这些步骤来编译、测试和部署示例合约。我们建议使用 TypeScript，但如果您不熟悉它，请选择 JavaScript。

创建完成后，可以在文件夹中看到这样的结构：

![Untitled](Quick%20Start%200e8a5cf646b9448ba31f664e4c0aeb81/Untitled%201.png)

## 运行任务

再次运行`yarn hardhat`，查看可以执行的任务类型:

![Untitled](Quick%20Start%200e8a5cf646b9448ba31f664e4c0aeb81/Untitled%202.png)

## 编译合约

进入`contract/`文件夹，会发现`Lock.sol`文件，执行编译命令：

```bash
yarn hardhat compile
```

成功后，会发现多出了`artifacts/`文件夹

## 测试合约

进入`test/`文件夹，会发现`Lock.ts`文件，执行测试命令：

```bash
yarn hardhat test
```

执行结束后，可以看到命令行打印出来的结果：

![Untitled](Quick%20Start%200e8a5cf646b9448ba31f664e4c0aeb81/Untitled%203.png)

## 部署合约

进入`script/`文件夹，会发现`deploy.ts`文件，执行部署命令：

```bash
yarn hardhat run scripts/deploy.ts
```

执行结束后，可以看到命令行打印出来的结果：

![Untitled](Quick%20Start%200e8a5cf646b9448ba31f664e4c0aeb81/Untitled%204.png)

## ****将钱包或 Dapp 连接到 Hardhat Network****

默认情况下，Hardhat 将在启动时启动一个新的 Hardhat Network 内存实例。也可以以独立方式运行 Hardhat Network，以便外部客户端可以连接到它。这可能是 MetaMask、您的 Dapp 前端或脚本。

要以这种方式运行 Hardhat Network，请运行`yarn hardhat node`:

![Untitled](Quick%20Start%200e8a5cf646b9448ba31f664e4c0aeb81/Untitled%205.png)

这将向 Hardhat Network 公开一个 JSON-RPC 接口。要使用它，请将您的钱包或应用程序连接到`http://127.0.0.1:8545`.

如果您想将 Hardhat 连接到此节点，例如针对它运行部署脚本，您只需使用`--network localhost:`

```bash
yarn hardhat run scripts/deploy.ts --network localhost
```

<aside>
⚠️ 注意，如果想使用localhost，一定要保证`yarn hardhat node`正在运行

</aside>

🎉恭喜！您已经创建了一个项目并编译、测试和部署了一个智能合约。