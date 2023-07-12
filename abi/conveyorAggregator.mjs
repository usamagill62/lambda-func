export const aggregatorABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_weth",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "ETHTransferFailed",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "InsufficientMsgValue",
      "type": "error"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "expectedAmountOut",
              "type": "uint256"
          }
      ],
      "name": "InsufficientOutputAmount",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "InvalidAddress",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "InvalidReferral",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "MsgSenderIsNotOwner",
      "type": "error"
  },
  {
      "inputs": [],
      "name": "UnauthorizedCaller",
      "type": "error"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "referrer",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "receiver",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "referralFee",
              "type": "uint256"
          }
      ],
      "name": "Referral",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "receiver",
              "type": "address"
          }
      ],
      "name": "Swap",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "receiver",
              "type": "address"
          }
      ],
      "name": "SwapExactEthForToken",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "receiver",
              "type": "address"
          }
      ],
      "name": "SwapExactTokenForEth",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "receiver",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "Withdraw",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "CONVEYOR_MULTICALL",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "WETH",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "confirmTransferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint128",
              "name": "amountOutMin",
              "type": "uint128"
          },
          {
              "internalType": "uint128",
              "name": "protocolFee",
              "type": "uint128"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "referrer",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "referralFee",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.ReferralInfo",
              "name": "referralInfo",
              "type": "tuple"
          },
          {
              "internalType": "bool",
              "name": "isReferral",
              "type": "bool"
          }
      ],
      "name": "quoteSwapExactEthForToken",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "gasConsumed",
              "type": "uint256"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "referrer",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "referralFee",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.ReferralInfo",
              "name": "referralInfo",
              "type": "tuple"
          },
          {
              "internalType": "bool",
              "name": "isReferral",
              "type": "bool"
          }
      ],
      "name": "quoteSwapExactTokenForEth",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "gasConsumed",
              "type": "uint256"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "referrer",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "referralFee",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.ReferralInfo",
              "name": "referralInfo",
              "type": "tuple"
          },
          {
              "internalType": "bool",
              "name": "isReferral",
              "type": "bool"
          }
      ],
      "name": "quoteSwapExactTokenForToken",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "gasConsumed",
              "type": "uint256"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorGenericMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          }
      ],
      "name": "quoteSwapExactTokenForTokenOptimized",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "gasConsumed",
              "type": "uint256"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint128",
              "name": "amountOutMin",
              "type": "uint128"
          },
          {
              "internalType": "uint128",
              "name": "protocolFee",
              "type": "uint128"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          }
      ],
      "name": "swapExactEthForToken",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint128",
              "name": "amountOutMin",
              "type": "uint128"
          },
          {
              "internalType": "uint128",
              "name": "protocolFee",
              "type": "uint128"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "referrer",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "referralFee",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.ReferralInfo",
              "name": "referralInfo",
              "type": "tuple"
          }
      ],
      "name": "swapExactEthForTokenWithReferral",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          }
      ],
      "name": "swapExactTokenForEth",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "referrer",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "referralFee",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.ReferralInfo",
              "name": "referralInfo",
              "type": "tuple"
          }
      ],
      "name": "swapExactTokenForEthWithReferral",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          }
      ],
      "name": "swapExactTokenForToken",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorGenericMulticall",
              "name": "genericMulticall",
              "type": "tuple"
          }
      ],
      "name": "swapExactTokenForTokenOptimized",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "tokenIn",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "tokenOut",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amountOutMin",
              "type": "uint256"
          },
          {
              "components": [
                  {
                      "internalType": "uint24",
                      "name": "zeroForOneBitmap",
                      "type": "uint24"
                  },
                  {
                      "internalType": "uint40",
                      "name": "callTypeBitmap",
                      "type": "uint40"
                  },
                  {
                      "internalType": "uint64",
                      "name": "toAddressBitmap",
                      "type": "uint64"
                  },
                  {
                      "internalType": "uint128",
                      "name": "feeBitmap",
                      "type": "uint128"
                  },
                  {
                      "internalType": "address",
                      "name": "tokenInDestination",
                      "type": "address"
                  },
                  {
                      "components": [
                          {
                              "internalType": "address",
                              "name": "target",
                              "type": "address"
                          },
                          {
                              "internalType": "bytes",
                              "name": "callData",
                              "type": "bytes"
                          }
                      ],
                      "internalType": "struct ConveyorRouterV1.Call[]",
                      "name": "calls",
                      "type": "tuple[]"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.SwapAggregatorMulticall",
              "name": "swapAggregatorMulticall",
              "type": "tuple"
          },
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "referrer",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "referralFee",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct ConveyorRouterV1.ReferralInfo",
              "name": "referralInfo",
              "type": "tuple"
          }
      ],
      "name": "swapExactTokenForTokenWithReferral",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
  }
];
