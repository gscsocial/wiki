# 发布一个合约
这里通过HTTP和RPC两种方式发布一个简单的智能合约，介绍了智能合约发布的整个流程。
#### 智能合约的发布分为以下几步：
* 编写智能合约
* 编译智能合约
* 部署智能合约
  + 生成合约的交易
  + 对交易进行签名
  + 广播该交易

## 编写智能合约
示例智能合约，如下：
```
contract gsc{
    function getName () returns(string) {
        return "gsc";
    }
}
```
## 编译智能合约
  1. solc编译<br />
  `solc -o outputDirectory --bin --ast --asm sourceFile.sol`
  2. 或者，solcjs编译<br />
  `solcjs sourceFile.sol -o outputDirectory --bin --abi --opcodes`

## 部署合约
### RPC:
  * 方法：`public org.gsc.api.GrpcAPI.TransactionExtention deployContract(org.gsc.protos.Contract.CreateSmartContract request);`
  * 参数：`CreateSmartContract`
  * 返回值：`TransactionExtention`

示例代码，如下：
```
```
### HTTP:
#### 创建合约的交易
 * 请求地址：http://[ip]:[port]/wallet/deploycontract
 * 请求方式：POST
 * 请求数据：JSON

请求数据，如下：
```
{
    "contract_name":"gsc",
    "owner_Address": "266068aae2bfec4e3124221f0428276d78bed5896c",
    "abi": 	{
		"constant": false,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
    "fee_limit": 100000000,
    "call_value": 0,
    "consume_user_resource_percent": 0,
    "bytecode": "600a60"
}
```

 返回数据为包含该合约的交易，如下：
```
{
	"txID": "04915ff385f5a8219a0902cbe0e7a3f480bcf40b344ed3a0c6d0874d6bd204c6",
	"contract_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"new_contract": {
						"bytecode": "608060405234801561001057600080fd5b5061012a806100206000396000f300608060405260043610603e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146043575b600080fd5b348015604e57600080fd5b50605560c7565b6040805160208082528351818301528351919283929083019185019080838360005b83811015608d5781810151838201526020016077565b50505050905090810190601f16801560b95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051808201909152600381527f67736300000000000000000000000000000000000000000000000000000000006020820152905600a165627a7a72305820846554ac0bf0060ddb3beac4d8cdabe997530db09992be85cb177e5182e251520029",
						"name": "contractDemo",
						"origin_address": "a0abd4......",
						"abi": {
        		"constant": false,
        		"inputs": [],
        		"name": "getName",
        		"outputs": [
        			{
        				"name": "",
        				"type": "string"
        			}
        		],
        		"payable": false,
        		"stateMutability": "nonpayable",
        		"type": "function"
        	 }
					}
				},
				"type_url": "type.googleapis.com/protocol.CreateSmartContract"
			},
			"type": "CreateSmartContract"
		}],
		"ref_block_bytes": "0000",
		"ref_block_hash": "1b487913b59c7114",
		"expiration": 60000,
		"fee_limit": 100000000,
		"timestamp": 1536658110141
	}
}
```
#### 对交易进行签名
 1. 调用接口：
     * 请求地址：http://[ip]:[port]/wallet/gettransactionsign
     * 请求方式：POST
     * 请求数据：JSON

 请求数据：
```
{
	"txID": "04915ff385f5a8219a0902cbe0e7a3f480bcf40b344ed3a0c6d0874d6bd204c6",
	"contract_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"new_contract": {
						"bytecode": "608060405234801561001057600080fd5b5061012a806100206000396000f300608060405260043610603e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146043575b600080fd5b348015604e57600080fd5b50605560c7565b6040805160208082528351818301528351919283929083019185019080838360005b83811015608d5781810151838201526020016077565b50505050905090810190601f16801560b95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051808201909152600381527f67736300000000000000000000000000000000000000000000000000000000006020820152905600a165627a7a72305820846554ac0bf0060ddb3beac4d8cdabe997530db09992be85cb177e5182e251520029",
						"name": "contractDemo",
						"origin_address": "a0abd4......",
						"abi": {
        		"constant": false,
        		"inputs": [],
        		"name": "getName",
        		"outputs": [
        			{
        				"name": "",
        				"type": "string"
        			}
        		],
        		"payable": false,
        		"stateMutability": "nonpayable",
        		"type": "function"
        	 }
					}
				},
				"type_url": "type.googleapis.com/protocol.CreateSmartContract"
			},
			"type": "CreateSmartContract"
		}],
		"ref_block_bytes": "0000",
		"ref_block_hash": "1b487913b59c7114",
		"expiration": 60000,
		"fee_limit": 100000000,
		"timestamp": 1536658110141
	},
  "privateKey": "your private key"
}
```
 返回数据：
```
{
	"txID": "04915ff385f5a8219a0902cbe0e7a3f480bcf40b344ed3a0c6d0874d6bd204c6",
	"contract_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"new_contract": {
						"bytecode": "608060405234801561001057600080fd5b5061012a806100206000396000f300608060405260043610603e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146043575b600080fd5b348015604e57600080fd5b50605560c7565b6040805160208082528351818301528351919283929083019185019080838360005b83811015608d5781810151838201526020016077565b50505050905090810190601f16801560b95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051808201909152600381527f67736300000000000000000000000000000000000000000000000000000000006020820152905600a165627a7a72305820846554ac0bf0060ddb3beac4d8cdabe997530db09992be85cb177e5182e251520029",
						"name": "contractDemo",
						"origin_address": "26d4b9367799eaa3197fecb144eb71de1e049abc",
						"abi": {
        		"constant": false,
        		"inputs": [],
        		"name": "getName",
        		"outputs": [
        			{
        				"name": "",
        				"type": "string"
        			}
        		],
        		"payable": false,
        		"stateMutability": "nonpayable",
        		"type": "function"
        	 }
					}
				},
				"type_url": "type.googleapis.com/protocol.CreateSmartContract"
			},
			"type": "CreateSmartContract"
		}],
		"ref_block_bytes": "0000",
		"ref_block_hash": "4a487b13b59c7114",
		"expiration": 60000,
		"fee_limit": 100000000,
		"timestamp": 1536658110141
	},
  "signature": "signature"
}
```

 编写代码在本地生成交易的签名信息。
```
String privStr = "26d4b9367799eaa3197fecb144eb71de1e049abc"; //用户私钥
BigInteger privKey = new BigInteger(privStr, 16);
ECKey key = ECKey.fromPrivate(privKey);

Protocol.Transaction.Builder tbs = transaction.toBuilder();
byte[] hash = sha256(transaction.getRawData().toByteArray());
List<Protocol.Transaction.Contract> contractList = transaction.getRawData().getContractList();
for (int i = 0; i < contractList.size(); i++) {
    ECKey.ECDSASignature signature = key.sign(hash);
    ByteString byteString = ByteString.copyFrom(signature.toByteArray());
    tbs.addSignature(byteString);
}
```
> 推荐使用方式2，不推荐使用方式1。方式1涉及到私钥安全，如使用建议在安全的环境下进行。

#### 广播交易
 * 请求地址：http://[ip]:[port]/wallet/broadcasttransaction
 * 请求方式：POST
 * 请求参数：JSON

 请求示例
```
{
    "txID": "95424c8e90184e6c0e2df714c162badf4d1cba7c8fb94250924143e5f92e1b7b",
    "contract_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
    "raw_data": {
        "contract": [
            {
                "parameter": {
                    "value": {
                        "new_contract": {
                            "bytecode": "608060405234801561001057600080fd5b5061012a806100206000396000f300608060405260043610603e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146043575b600080fd5b348015604e57600080fd5b50605560c7565b6040805160208082528351818301528351919283929083019185019080838360005b83811015608d5781810151838201526020016077565b50505050905090810190601f16801560b95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051808201909152600381527f67736300000000000000000000000000000000000000000000000000000000006020820152905600a165627a7a72305820846554ac0bf0060ddb3beac4d8cdabe997530db09992be85cb177e5182e251520029",
                            "abi": {
                        		"constant": false,
                        		"inputs": [],
                        		"name": "getName",
                        		"outputs": [
                        			{
                        				"name": "",
                        				"type": "string"
                        			}
                        		],
                        		"payable": false,
                        		"stateMutability": "nonpayable",
                        		"type": "function"
                        	}
                        }
                    },
                    "type_url": "type.googleapis.com/protocol.CreateSmartContract"
                },
                "type": "CreateSmartContract"
            }
        ],
        "ref_block_bytes": "0000",
        "ref_block_hash": "b92e69a166a986c3",
        "expiration": 60000,
        "fee_limit": 100000000,
        "timestamp": 1537516071522
    },
    "signature": "signature"
}
```
## 获取合约
### RPC:
  * 方法：`public org.gsc.protos.Protocol.SmartContract getContract(org.gsc.api.GrpcAPI.BytesMessage request);`
  * 参数：`BytesMessage`
  * 返回值：`SmartContract`
示例代码，如下：
```
```
### HTTP:
 * 请求地址：http://[ip]:[port]/wallet/getcontract
 * 请求方式：POST
 * 请求参数：JSON

 请求示例：
```
// value 表示合约地址
http://127.0.0.1:8090/wallet/getcontract?value=260019eb34f17c56bf2aaf71cfe5ab7362232147ba
```
```
{
	"bytecode": "608060405234801561001057600080fd5b5061012a806100206000396000f300608060405260043610603e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146043575b600080fd5b348015604e57600080fd5b50605560c7565b6040805160208082528351818301528351919283929083019185019080838360005b83811015608d5781810151838201526020016077565b50505050905090810190601f16801560b95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051808201909152600381527f67736300000000000000000000000000000000000000000000000000000000006020820152905600a165627a7a72305820846554ac0bf0060ddb3beac4d8cdabe997530db09992be85cb177e5182e251520029",
	"name": "barContract",
	"origin_address": "26d4b9367799eaa3197fecb144eb71de1e049abc",
	"abi": {
  "constant": false,
  "inputs": [],
  "name": "getName",
  "outputs": [
    {
      "name": "",
      "type": "string"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
  },
	"contract_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
}
```
## 执行合约
### RPC:
  * 方法：`public org.gsc.api.GrpcAPI.TransactionExtention triggerContract(org.gsc.protos.Contract.TriggerSmartContract request);`
  * 参数：`TriggerSmartContract`
  * 返回值：`TransactionExtention`

示例代码，如下：
```
{
```
### HTTP:
 * 请求地址：http://[ip]:[port]/wallet/triggersmartcontract
 * 请求方式：POST
 * 请求参数：JSON

 请求示例：
```
{
	"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
	"contract_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
	"call_value": 20000000,
	"data": "",      //四个参数为TriggerSmartContract

	"function_selector": "id",
	"parameter": "",
	"fee_limit": 10000000
}
```
 返回结果：
```
{
    "result": {
        "result": true  //表示执行成功
    },
    "txid": "98f3b0d25ea1d6628b05a09c2f02a39ae7a3025c77a89a6f3bfca6bdb746c2bb",
    "transaction": {
        "txID": "36459c6b5c607ee4918c28956a297b218283156db42471b9b2e064de85134379",
        "raw_data": {
            "contract": [
                {
                    "parameter": {
                        "value": {
                            "data": "17d7de7c",
                            "owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
                            "contract_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
                            "call_value": 20000000
                        },
                        "type_url": "type.googleapis.com/protocol.TriggerSmartContract"
                    },
                    "type": "TriggerSmartContract"
                }
            ],
            "ref_block_bytes": "0000",
            "ref_block_hash": "b92e69a166a986c3",
            "expiration": 60000,
            "fee_limit": 10000000,
            "timestamp": 1537513379416
        }
    }
}
```
