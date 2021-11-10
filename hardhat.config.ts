import { task } from 'hardhat/config';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";

import { HardhatRuntimeEnvironment, HardhatUserConfig } from 'hardhat/types';

task("accounts", "Prints the list of accounts", async (args, hre: HardhatRuntimeEnvironment) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/bc4d11088848481a972333f5161120fe`,
      accounts: {
        mnemonic: `absurd anchor bullet lobster unable exclude weird lucky bar soda dumb first`
      },
      gasPrice: 2000000000,
    },
    testnet: {
      chainId: 97,
      url: `https://data-seed-prebsc-2-s3.binance.org:8545/`,
      accounts: {
        mnemonic: `absurd anchor bullet lobster unable exclude weird lucky bar soda dumb first`
      },
      gasPrice: 20000000000,
    },
    mainnet: {
      chainId: 56,
      url: `https://bsc-dataseed.binance.org/`,
      accounts: {
        mnemonic: ``
      },
      gasPrice: 5000000000,
    }
  },
  etherscan: {
    apiKey: "I1SZKJHEB7EYJPX7NGK68T3PEB2SPZISJM"
  }
}

export default config