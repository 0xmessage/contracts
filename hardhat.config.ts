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
        mnemonic: ``
      },
      gasPrice: 2000000000,
    },
    testnet: {
      chainId: 97,
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: {
        mnemonic: ``
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
    },
    polygonMumbai: {
      chainId: 80001,
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: {
        mnemonic: ``
      },
      gasPrice: 2000000000,
    },
  },
  etherscan: {
    //apiKey: "I1SZKJHEB7EYJPX7NGK68T3PEB2SPZISJM"
    apiKey: "PKJV8PM5CA3TY3V8NDZ2D7C7FVXFXWH42A" //polygon
    //apiKey: "7VBBKFBGRXQ2IY24B43SA1551BZTP3WHI3" //bsc
    //apiKey: "IWRWD4E4KM373MZZXSYNK3CF25H3I51FC4" //etherscan
  }
}

export default config