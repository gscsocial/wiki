# API接口-HTTP

> http调用接口。<br />

## 获取账户基本信息
* 请求地址：http://[ip]:[port]/wallet/getaccount
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：账户基本信息
### 示例：
```
# 请求：
http://127.0.0.1:8090/wallet/getaccount?address=2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b

# 返回：
{
	"type": "AssetIssue",
	"address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
	"allowance": 448000000,
	"is_witness": true,
	"account_resource": {}
}
```
## 创建转账交易
* 请求地址：http://[ip]:[port]/wallet/createtransfertransaction
* 请求方式：POST
* 请求参数：TransferContract——转账合约
* 返回值：转账的交易信息
```
message TransferContract {
   bytes owner_address = 1;
   bytes to_address = 2;
   int64 amount = 3;
 }

owner_address：转账账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
to_address： 目标账户地址。
amount：转账金额。
```

### 示例：
```
# 请求：
http://127.0.0.1:8090/wallet/createtransfertransaction
{
    "owner_address":"2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
    "to_address": "2697241d547a40d6675f4538dec25649147f725304",
    "amount": 1000000000000000
}

# 返回：
{
	"txID": "a11f67362d848c4c38f83265555049ce1113e67030208f296eae132fde98a870",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"amount": 1000000000,
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
				},
				"type_url": "type.googleapis.com/protocol.TransferContract"
			},
			"type": "TransferContract"
		}],
		"ref_block_bytes": "0045",
		"ref_block_hash": "087034df7b0b8ce5",
		"expiration": 1539150165000,
		"timestamp": 1539150106203
	}
}
```
## 交易签名
* 请求地址：http://[ip]:[port]/wallet/gettransactionsign
* 请求方式：POST
* 请求参数：transaction——交易
* 返回值：包含签名信息的交易
```
{
    "transaction": { 创建的交易 },
    "privateKey": "your private key"
}
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/gettransactionsign
{
	"transaction": {
		"txID": "a11f67362d848c4c38f83265555049ce1113e67030208f296eae132fde98a870",
		"raw_data": {
			"contract": [{
				"parameter": {
					"value": {
						"amount": 1000000000,
						"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
						"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
					},
					"type_url": "type.googleapis.com/protocol.TransferContract"
				},
				"type": "TransferContract"
			}],
			"ref_block_bytes": "0045",
			"ref_block_hash": "087034df7b0b8ce5",
			"expiration": 1539150165000,
			"timestamp": 1539150106203
		}
	},
	"privateKey": "567fb555e8b57a016c3c3453ee67ff053decbd793c38eb55ff91b18b6d8b50c3"
}
# 返回：
{
	"signature": ["a6044c4ca07beaf01f119ada309ae72d11f5044a54c9e10751f40ae28661989b664eb7593a01d7c5f5ebd5b1a189a7d0efd6782dd76f2dc773ea6c63dda9d06f01"],
	"txID": "a11f67362d848c4c38f83265555049ce1113e67030208f296eae132fde98a870",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"amount": 1000000000,
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
				},
				"type_url": "type.googleapis.com/protocol.TransferContract"
			},
			"type": "TransferContract"
		}],
		"ref_block_bytes": "0045",
		"ref_block_hash": "087034df7b0b8ce5",
		"expiration": 1539150165000,
		"timestamp": 1539150106203
	}
}
```
## 广播交易
* 请求地址：http://[ip]:[port]/wallet/broadcasttransaction
* 请求方式：POST
* 请求参数：transaction——签名了的交易
* 返回值：广播成功与否
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/broadcasttransaction
{
	"signature": ["a6044c4ca07beaf01f119ada309ae72d11f5044a54c9e10751f40ae28661989b664eb7593a01d7c5f5ebd5b1a189a7d0efd6782dd76f2dc773ea6c63dda9d06f01"],
	"txID": "a11f67362d848c4c38f83265555049ce1113e67030208f296eae132fde98a870",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"amount": 1000000000,
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
				},
				"type_url": "type.googleapis.com/protocol.TransferContract"
			},
			"type": "TransferContract"
		}],
		"ref_block_bytes": "0045",
		"ref_block_hash": "087034df7b0b8ce5",
		"expiration": 1539150165000,
		"timestamp": 1539150106203
	}
}

# 返回：
{
	"result": true
}
```
## 更新账户名称
* 请求地址：http://[ip]:[port]/wallet/updateaccount
* 请求方式：POST
* 请求参数：AccountUpdateContract——更新账户名称合约
* 返回值：账户更新的交易信息
```
message AccountUpdateContract {
   bytes account_name = 1;
   bytes owner_address = 2;
}

owner_address：账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
account_name： 账户名称  如： "GSCAccount”。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/updateaccount
{
	"account_name": "475343", # Hex String: `Hex.toHexString("GSC".getBytes())`
	"owner_address": "2688ff93bdc32b090aeb648ad33ecdae9181b4beac" # Base58 Address
}

# 返回：
{
	"txID": "1ff6ffc0e7e9b23a057b4eaf677a6addee795dc21da85878ec9cefb861f0606e",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"account_name": "475343",
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c"
				},
				"type_url": "type.googleapis.com/protocol.AccountUpdateContract"
			},
			"type": "AccountUpdateContract"
		}],
		"ref_block_bytes": "0292",
		"ref_block_hash": "16cb5f4c9efd9e5c",
		"expiration": 1539151938000,
		"timestamp": 1539151878240
	}
}
```

## 超级代表进行投票

* 请求地址：http://[ip]:[port]/wallet/votewitnessaccount
* 请求方式：GET
* 请求参数：VoteWitnessContract——投票超级代表合约
* 返回值：投票成功与否
```
message VoteWitnessContract {
   message Vote {
     bytes vote_address = 1;
     int64 vote_count = 2;
   }
   bytes owner_address = 1;
   repeated Vote votes = 2;
   bool support = 3;
 }
owner_address：投票人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
vote_address： 超级节点候选人的地址，HexString类型。
vote_count：投给超级节点候选人的票数。
votes：超级节点候选人列表。
support：是否支持，这里应该是恒为true,该参数暂未使用。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/votewitnessaccount
{
	"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
	"votes": [{
		"vote_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
		"vote_count": 1
	}]
}
# 返回：
{
	"result": true
}
```

## Token发行
* 请求地址：http://[ip]:[port]/wallet/createassetissue
* 请求方式：GET
* 请求参数：AssetIssueContract——Token发行合约
* 返回值：Token发行的交易信息
```
message AssetIssueContract {
   message FrozenSupply {
     int64 frozen_amount = 1;
     int64 frozen_days = 2;
   }
   bytes owner_address = 1;
   bytes name = 2;
   bytes abbr = 3;
   int64 total_supply = 4;
   repeated FrozenSupply frozen_supply = 5;
   int32 gsc_num = 6;
   int32 num = 8;
   int64 start_time = 9;
   int64 end_time = 10;
   int64 order = 11;
   int32 vote_score = 16;
   bytes description = 20;
   bytes url = 21;
   int64 free_asset_net_limit = 22;
   int64 public_free_asset_net_limit = 23;
   int64 public_free_asset_net_usage = 24;
   int64 public_latest_free_net_time = 25;
 }

owner_address：发行Token的账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
name：发布Token的名称  如：“GSCContract”。
abbr：发布Token的简称。
total_supply：发行总的token数量  如：100000000000。
frozen_supply：冻结Token的数量和冻结时间列表。
gsc_num：对应GSC数量。
num： 对应的自定义资产数目。
start_time：开始时间  格式：1560894975158。
end_time：结束时间  格式：1560894975158。
order：相同asset_name时，order递增，默认初始值为0。
vote_score：合约的评分。
description：Token的描述。
url：Token的url地址链接。
free_asset_net_limit：每个账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_limit：所有账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_usage：所有账户使用免费带宽（转移该资产时使用）。
public_latest_free_net_time：最近一次转移该Token使用免费带宽的时间。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/createassetissue
{
"owner_address":"266068aae2bfec4e3124221f0428276d78bed5896c",
"name":"475343",
"abbr": "475343",
"total_supply" :4321,
"gsc_num":1,
"num":1,
"start_time" :1560894975158,
"end_time":1566894975158,
"description":"68747470733a2f2f677363616e2e736f6369616c2f",
"url":"68747470733a2f2f677363616e2e736f6369616c2f",
"free_asset_net_limit":10000,
"public_free_asset_net_limit":10000,
"frozen_supply":{"frozen_amount":1, "frozen_days":1}
}
# 返回：
{
	"txID": "e4d243582ed09be02c0528227b905f7fb972066bab8b1145737fc9c19fe67ede",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"gsc_num": 1,
					"frozen_supply": [{
						"frozen_amount": 1,
						"frozen_days": 2
					}],
					"total_supply": 4321,
					"num": 1,
					"end_time": 1533894312158,
					"description": "007570646174654e616d6531353330363038383733343633",
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"url": "007570646174654e616d6531353330363038383733343633",
					"free_asset_net_limit": 10000,
					"start_time": 1530894315158,
					"public_free_asset_net_limit": 10000,
					"name": "6173736574497373756531353330383934333132313538",
					"abbr": "6162627231353330383934333132313538"
				},
				"type_url": "type.googleapis.com/protocol.AssetIssueContract"
			},
			"type": "AssetIssueContract"
		}],
		"ref_block_bytes": "0000",
		"ref_block_hash": "d8a47dc1341a00f5",
		"expiration": 60000,
		"timestamp": 1539154355974
	}
}
```
## 更新超级代表
* 请求地址：http://[ip]:[port]/wallet/updatewitness
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：更新成功与否
```
message WitnessUpdateContract {
   bytes owner_address = 1;
   bytes update_url = 12;
 }

owner_address：超级代表地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
update_url： 超级节点更新的url。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/updatewitness
{
	"owner_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
	"update_url": "68747470733a2f2f677363616e2e736f6369616c2f"
}
# 返回：
{

}
```
## 创建账户
一个已经激活的账户创建一个新账户，需要花费0.1GSC
* 请求地址：http://[ip]:[port]/wallet/createaccount
* 请求方式：GET
* 请求参数：AccountCreateContract——创建账户合约
* 返回值：创建账户的交易
```
message AccountCreateContract {
   bytes owner_address = 1;
   bytes account_address = 2;
   AccountType type = 3;
 }

owner_address： 创建的账户人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
account_address： 将要创建的账户地址。
type：账户类型——比如：0 代表的账户类型是Normal。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/createaccount
{
	"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
	"account_address": "265fa1d46f4a6f0b4e692aa3b86980b1201053febf"
}
# 返回：
{
	"txID": "9367a3d39ae3f204a1ec2568024c2c92171290e5960d7537b6d7ee673492a156",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"account_address": "265fa1d46f4a6f0b4e692aa3b86980b1201053febf"
				},
				"type_url": "type.googleapis.com/protocol.AccountCreateContract"
			},
			"type": "AccountCreateContract"
		}],
		"ref_block_bytes": "013e",
		"ref_block_hash": "c7c1fdc4b17cc0dc",
		"expiration": 1539155373000,
		"timestamp": 1539155314150
	}
}
```
## 申请成为超级代表
* 请求地址：http://[ip]:[port]/wallet/createwitness
* 请求方式：GET
* 请求参数：WitnessCreateContract——申请成为超级代表合约
* 返回值：申请成为超级代表的交易
```
message WitnessCreateContract {
   bytes owner_address = 1;
   bytes url = 2;
 }

owner_address： 申请人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
url： 超级节点人网址。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/createwitness
{
	"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
	"url": "68747470733a2f2f677363616e2e736f6369616c2f"
}
# 返回：
{
	"txID": "22252d56842baad1a8c14248aad9ee0321361bc52cfded2553c7fc5515e8b085",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"url": "68747470733a2f2f677363616e2e736f6369616c2f"
				},
				"type_url": "type.googleapis.com/protocol.WitnessCreateContract"
			},
			"type": "WitnessCreateContract"
		}],
		"ref_block_bytes": "0008",
		"ref_block_hash": "acdc0915c061b9e4",
		"expiration": 1539155958000,
		"timestamp": 1539155900067
	}
}
```
## 转让Token
* 请求地址：http://[ip]:[port]/wallet/transferasset
* 请求方式：GET
* 请求参数：TransferAssetContract——转让Token合约
* 返回值：转让Token的交易
```
message TransferAssetContract {
   bytes asset_name = 1;
   bytes owner_address = 2;
   bytes to_address = 3;
   int64 amount = 4;
 }

asset_name：发布Token的名称。
owner_address：Token持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
to_address： 目标账户地址。
amount：转账Token的数量
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/transferasset
{
	"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
	"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
	"asset_name": "475343466f756e646174696f6e",
	"amount": 100
}
# 返回：
{
	"txID": "1bb10e5f3bc98cf78ebd30a4084261a74fbbc11c55a3797c84baa5226af5cc81",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"amount": 1,
					"asset_name": "6173736574497373756531353330383934333132313538",
					"owner_address": "2688ff93bdc32b090aeb648ad33ecdae9181b4beac",
					"to_address": "2688ff93bdc32b090aeb648ad33ecdae9181b4beac"
				},
				"type_url": "type.googleapis.com/protocol.TransferAssetContract"
			},
			"type": "TransferAssetContract"
		}],
		"ref_block_bytes": "03fa",
		"ref_block_hash": "b4da5715826e6d7d",
		"expiration": 1539167985000,
		"timestamp": 1539167925289
	}
}
```
## 参与token发行
* 请求地址：http://[ip]:[port]/wallet/participateassetissue
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：参与token发行的交易
```
message TransferAssetContract {
   bytes asset_name = 1;
   bytes owner_address = 2;
   bytes to_address = 3;
   int64 amount = 4;
 }

asset_name：发布Token的名称。
owner_address：Token持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
to_address： 目标账户地址。
amount：转账Token的数量
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/participateassetissue
{
  "asset_name":"3230313271756265696a696e67",
  "to_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
  "owner_address":"26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
  "amount":100
}
# 返回：
{
	"type": "AssetIssue",
	"address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
	"allowance": 448000000,
	"is_witness": true,
	"account_resource": {}
}
```
## 冻结资产
冻结GSC，获取带宽，获取投票权
* 请求地址：http://[ip]:[port]/wallet/freezebalance
* 请求方式：GET
* 请求参数：FreezeBalanceContract——冻结资产合约
* 返回值：冻结资产的交易
```
message FreezeBalanceContract {
   bytes owner_address = 1;
   int64 frozen_balance = 2;
   int64 frozen_duration = 3;
   ResourceCode resource = 10;
 }

owner_address：资产地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
frozen_balance：冻结资产的数量。
frozen_duration：冻结资产的时间段。
resource： 冻结GSC获取资源的类型。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/freezebalance
{
"owner_address":"266068aae2bfec4e3124221f0428276d78bed5896c",
"frozen_balance": 10000,
"frozen_duration": 3
}
# 返回：
{
	"txID": "cfbba0c5db6014248e21dadeadd4b508cc2872c7fa62943e08ba5e691f19c33b",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"frozen_duration": 3,
					"frozen_balance": 100000000000000,
					"owner_address": "2688ff93bdc32b090aeb648ad33ecdae9181b4beac"
				},
				"type_url": "type.googleapis.com/protocol.FreezeBalanceContract"
			},
			"type": "FreezeBalanceContract"
		}],
		"ref_block_bytes": "0392",
		"ref_block_hash": "0eb5f2cd44114a7f",
		"expiration": 1539167637000,
		"timestamp": 1539167577437
	}
}
```
## 解冻资产
解冻已经结束冻结期的GSC，会同时失去这部分GSC带来的带宽和投票权
* 请求地址：http://[ip]:[port]/wallet/unfreezebalance
* 请求方式：GET
* 请求参数：owner_address——资产地址
* 返回值：解冻资产成功与否
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/unfreezebalance
{
"owner_address":"266068aae2bfec4e3124221f0428276d78bed5896c",
}
# 返回：
{"result": true}
```
## 解冻Token
解冻已经结束冻结期的Token
* 请求地址：http://[ip]:[port]/wallet/unfreezeasset
* 请求方式：GET
* 请求参数：owner_address——Token账户地址
* 返回值：解冻Token成功与否
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/unfreezeasset
{
  "owner_address":"2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
}
# 返回：
{"result": true}
```
## 超级代表奖励
超级代表体现奖励到balance，每24个小时可以提现一次
* 请求地址：http://[ip]:[port]/wallet/withdrawbalance
* 请求方式：GET
* 请求参数：owner_address——超级地址
* 返回值：超级代表奖励
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/withdrawbalance
{
  "owner_address":"2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
}
# 返回：
{
}
```
## 修改token信息
* 请求地址：http://[ip]:[port]/wallet/updateasset
* 请求方式：GET
* 请求参数：UpdateAssetContract——token更新合约
* 返回值：修改token信息的交易
```
message UpdateAssetContract {
       bytes owner_address = 1;
       bytes description = 2;
       bytes url = 3;
       int64 new_limit = 4;
       int64 new_public_limit = 5;
}
`owner_address`：合约持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
`description`： Token的描述。
`url`：Token的Url。
`new_limit`：每个调用者可以消耗Bandwidth points的限制。
`new_public_limit`： 所有调用者可以消耗Bandwidth points的限制。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/updateasset
{
"owner_address":"2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
"description": ""，
"url": "",
"new_limit" : 1000000,
"new_public_limit" : 100
}
# 返回：
{
	"txID": "1bf9c84048f1b90de47ad05a489d3b72335dab7961ff6a5ec3d26ccd614c8707",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"new_public_limit": 100,
					"owner_address": "2688ff93bdc32b090aeb648ad33ecdae9181b4beac",
					"url": "007570646174654e616d6531353330363038383733343633",
					"new_limit": 1000000
				},
				"type_url": "type.googleapis.com/protocol.UpdateAssetContract"
			},
			"type": "UpdateAssetContract"
		}],
		"ref_block_bytes": "02ea",
		"ref_block_hash": "3910301c50f95536",
		"expiration": 1539167079000,
		"timestamp": 1539167019775
	}
}
```
## 查询api所在机器连接的节点
* 请求地址：http://[ip]:[port]/wallet/listnodes
* 请求方式：GET
* 请求参数：
* 返回值：api所在机器连接的节点列表

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/listnodes

# 返回：
{
	"nodes": [{
		"address": {
			"host": "3132372e302e302e31",
			"port": 16668
		}
	}, {
		"address": {
			"host": "3132372e302e302e31",
			"port": 16667
		}
	}]
}
```
## 查询账户发行的token
* 请求地址：http://[ip]:[port]/wallet/getassetissuebyaccount
* 请求方式：POST
* 请求参数：address——token账户地址
* 返回值：用户发行的token（一个用户只能发行一个token）

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getassetissuebyaccount
{
	"address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b"
}
# 返回：
{
	"assetIssue": [{
		"owner_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
		"name": "6173736574497373756531353330383934333132313538",
		"abbr": "6162627231353330383934333132313538",
		"total_supply": 4321,
		"frozen_supply": [{
			"frozen_amount": 1,
			"frozen_days": 2
		}],
		"gsc_num": 1,
		"num": 1,
		"start_time": 1549165341705,
		"end_time": 1559165341705,
		"description": "007570646174654e616d6531353330363038383733343633",
		"url": "007570646174654e616d6531353330363038383733343633",
		"free_asset_net_limit": 10000,
		"public_free_asset_net_limit": 10000
	}]
}
```
## 查询带宽信息
* 请求地址：http://[ip]:[port]/wallet/getaccountnet
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：带宽信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getaccountnet?address=266068aae2bfec4e3124221f0428276d78bed5896c
# 返回：
{
	"freeNetLimit": 5000,
	"TotalNetLimit": 43200000000
}
```
## 根据名称查询token
* 请求地址：http://[ip]:[port]/wallet/getassetissuebyname
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：查询token信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getassetissuebyname?value=44756354616E
# 返回：
{
	"owner_address": "2688ff93bdc32b090aeb648ad33ecdae9181b4beac",
	"name": "6173736574497373756531353330383934333132313538",
	"abbr": "6162627231353330383934333132313538",
	"total_supply": 4321,
	"frozen_supply": [{
		"frozen_amount": 1,
		"frozen_days": 2
	}],
	"gsc_num": 1,
	"num": 1,
	"start_time": 1549165341705,
	"end_time": 1559165341705,
	"description": "007570646174654e616d6531353330363038383733343633",
	"url": "007570646174654e616d6531353330363038383733343633",
	"free_asset_net_limit": 10000,
	"public_free_asset_net_limit": 10000
}
```
## 查询最新块信息
* 请求地址：http://[ip]:[port]/wallet/getnowblock
* 请求方式：GET
* 请求参数：
* 返回值：最新块信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getnowblock
# 返回：
{
	"blockID": "0000000000000386b64212cf2e6c162196ba1230e65799e278b1013e45f7ece6",
	"block_header": {
		"raw_data": {
			"number": 902,
			"txTrieRoot": "0000000000000000000000000000000000000000000000000000000000000000",
			"witness_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
			"parentHash": "000000000000038521630a09ca2498b47cbdcb60e1875af97f2f3e26dda77550",
			"version": 1,
			"timestamp": 1539159084000
		},
		"witness_signature": "5455e0737be2c397139137318a2eec4abe6f7c4d51eef3fc2002807106bc36b812d40ab4f41c625153f69a1cee3043dc308b1d95a7e5d0a5b41459f3464d3bf900"
	}
}
```
## 通过高度查询块
* 请求地址：http://[ip]:[port]/wallet/getblockbynum
* 请求方式：GET
* 请求参数：
* 返回值：块信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getblockbynum?num=1
# 返回：
{
	"blockID": "0000000000000001147321b0722dc9f2f7e6d1edb64d85a0f1ed204613918969",
	"block_header": {
		"raw_data": {
			"number": 1,
			"txTrieRoot": "0000000000000000000000000000000000000000000000000000000000000000",
			"witness_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
			"parentHash": "00000000000000007a74f35a26725200186582d2de4d1196ad0365142fca2706",
			"version": 1,
			"timestamp": 1539156375000
		},
		"witness_signature": "e90eb4426f08c653a94b1dfb11b8d6dbe7b6b9af7f43f6f493c6f9d38ee0e12f39876b7a89f93d3f3ceb1e8cb136c0099749b2e49130ac92c2a192e1eca2aafd00"
	}
}
```
## 通过ID查询块
* 请求地址：http://[ip]:[port]/wallet/getblockbyid
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：块信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getblockbyid?value=0000000000000001147321b0722dc9f2f7e6d1edb64d85a0f1ed204613918969

# 返回：
{
	"blockID": "0000000000000001147321b0722dc9f2f7e6d1edb64d85a0f1ed204613918969",
	"block_header": {
		"raw_data": {
			"number": 1,
			"txTrieRoot": "0000000000000000000000000000000000000000000000000000000000000000",
			"witness_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
			"parentHash": "00000000000000007a74f35a26725200186582d2de4d1196ad0365142fca2706",
			"version": 1,
			"timestamp": 1539156375000
		},
		"witness_signature": "e90eb4426f08c653a94b1dfb11b8d6dbe7b6b9af7f43f6f493c6f9d38ee0e12f39876b7a89f93d3f3ceb1e8cb136c0099749b2e49130ac92c2a192e1eca2aafd00"
	}
}
```
## 按照范围查询块
* 请求地址：http://[ip]:[port]/wallet/getblockbylimitnext
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：查询范围内的块信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getblockbylimitnext
{
	"startNum": 1,
	"endNum": 2
}
# 返回：
{
	"blockID": "0000000000000001147321b0722dc9f2f7e6d1edb64d85a0f1ed204613918969",
	"block_header": {
		"raw_data": {
			"number": 1,
			"txTrieRoot": "0000000000000000000000000000000000000000000000000000000000000000",
			"witness_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
			"parentHash": "00000000000000007a74f35a26725200186582d2de4d1196ad0365142fca2706",
			"version": 1,
			"timestamp": 1539156375000
		},
		"witness_signature": "e90eb4426f08c653a94b1dfb11b8d6dbe7b6b9af7f43f6f493c6f9d38ee0e12f39876b7a89f93d3f3ceb1e8cb136c0099749b2e49130ac92c2a192e1eca2aafd00"
	}
}
```
## 查询最新的几个块
* 请求地址：http://[ip]:[port]/wallet/getblockbylatestnum
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：最新的几个块信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getblockbylatestnum?num=2

# 返回：
{
	"block": [{
		"blockID": "000000000000048be90ccfb238fd3320f0d37b3979f11e24514ccde09fac2d57",
		"block_header": {
			"raw_data": {
				"number": 1163,
				"txTrieRoot": "0000000000000000000000000000000000000000000000000000000000000000",
				"witness_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
				"parentHash": "000000000000048a68f51e626790900152cfc6fe49dba8bb7c6a1f216a1520fa",
				"version": 1,
				"timestamp": 1539159867000
			},
			"witness_signature": "263be8d3e9ed7f7c653bed2eef48d35df3303365630376d688604c94ee11cf20768340eac3073c99e019809c958de0a1619c49816bbfd14e010dbf83ae212b3e00"
		}
	}, {
		"blockID": "000000000000048cea8a63844a7ded92f46644f4be6339e13564243d8248cdcc",
		"block_header": {
			"raw_data": {
				"number": 1164,
				"txTrieRoot": "0000000000000000000000000000000000000000000000000000000000000000",
				"witness_address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
				"parentHash": "000000000000048be90ccfb238fd3320f0d37b3979f11e24514ccde09fac2d57",
				"version": 1,
				"timestamp": 1539159870000
			},
			"witness_signature": "135d9e6ff7cdb2ac96aac1627392398d63413f8628e90e6cf1db90e51967734923667380f941d28e9e73757ecfbd5e54dd3bae8e708cb8bae9d97fe4c364a20e00"
		}
	}]
}
```
## 通过ID查询交易
交易为广播出去的交易
* 请求地址：http://[ip]:[port]/wallet/gettransactionbyid
* 请求方式：GET
* 请求参数：value——交易ID
* 返回值：交易信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/gettransactionbyid?value=a11f67362d848c4c38f83265555049ce1113e67030208f296eae132fde98a870
# 返回：
{
	"signature": ["a6044c4ca07beaf01f119ada309ae72d11f5044a54c9e10751f40ae28661989b664eb7593a01d7c5f5ebd5b1a189a7d0efd6782dd76f2dc773ea6c63dda9d06f01"],
	"txID": "a11f67362d848c4c38f83265555049ce1113e67030208f296eae132fde98a870",
	"raw_data": {
		"contract": [{
			"parameter": {
				"value": {
					"amount": 1000000000,
					"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
					"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
				},
				"type_url": "type.googleapis.com/protocol.TransferContract"
			},
			"type": "TransferContract"
		}],
		"ref_block_bytes": "0045",
		"ref_block_hash": "087034df7b0b8ce5",
		"expiration": 1539150165000,
		"timestamp": 1539150106203
	}
}
```
## 查询所有witness列表
* 请求地址：http://[ip]:[port]/wallet/listwitnesses
* 请求方式：GET
* 请求参数：
* 返回值：所查询的witness列表

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/listwitnesses

# 返回：
{
	"witnesses": [{
		"address": "2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b",
		"voteCount": 100025,
		"url": "GSC3",
		"totalProduced": 1296,
		"latestBlockNum": 1296,
		"latestSlotNum": 513053422,
		"isJobs": true
	}]
}
```
## 查询所有token列表
* 请求地址：http://[ip]:[port]/wallet/getassetissuelist
* 请求方式：GET
* 请求参数：
* 返回值：所有的token列表

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getassetissuelist

# 返回：
{
	"assetIssue": [{
		"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
		"name": "6173736574497373756531353330383934333132313538",
		"abbr": "6162627231353330383934333132313538",
		"total_supply": 4321,
		"frozen_supply": [{
			"frozen_amount": 1,
			"frozen_days": 2
		}],
		"gsc_num": 1,
		"num": 1,
		"start_time": 1549165341705,
		"end_time": 1559165341705,
		"description": "007570646174654e616d6531353330363038383733343633",
		"url": "007570646174654e616d6531353330363038383733343633",
		"free_asset_net_limit": 10000,
		"public_free_asset_net_limit": 10000
	}]
}
```
## 分页查询token列表
* 请求地址：http://[ip]:[port]/wallet/getpaginatedassetissuelist
* 请求方式：GET
* 请求参数：
* 返回值：分页token列表

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getpaginatedassetissuelist
{
	"offset": 0,
	"limit": 10
}
# 返回：
{
	"assetIssue": [{
		"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
		"name": "6173736574497373756531353330383934333132313538",
		"abbr": "6162627231353330383934333132313538",
		"total_supply": 4321,
		"frozen_supply": [{
			"frozen_amount": 1,
			"frozen_days": 2
		}],
		"gsc_num": 1,
		"num": 1,
		"start_time": 1549165341705,
		"end_time": 1559165341705,
		"description": "007570646174654e616d6531353330363038383733343633",
		"url": "007570646174654e616d6531353330363038383733343633",
		"free_asset_net_limit": 10000,
		"public_free_asset_net_limit": 10000
	}]
}
```
## 查询所有交易总数
* 请求地址：http://[ip]:[port]/wallet/totaltransaction
* 请求方式：GET
* 请求参数：
* 返回值：所有交易总数

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/totaltransaction

# 返回：
{"num": 1}
```
## 获取下次统计投票的时间
* 请求地址：http://[ip]:[port]/wallet/getnextmaintenancetime
* 请求方式：GET
* 请求参数：
* 返回值：下次统计投票的时间

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getnextmaintenancetime

# 返回：
{
  "num": 1539172800000
}
```
## 通过密码快捷转账
> 该api存在泄漏密码的风险，请确保在安全的环境中调用该api。调用该api前请先调用createAddress生成地址。
* 请求地址：http://[ip]:[port]/wallet/easytransfer
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：快捷转账的交易信息和转账成功与否

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/easytransfer
{
    "owner_address":"266068aae2bfec4e3124221f0428276d78bed5896c",
    "to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
    "amount": 1000000000
}
# 返回：
{
	"result": {
		"result": true
	},
	"transaction": {
		"signature": ["b9d5caf22cc7e226d54ddc5afc101821e770f9acadb4178632360f8cbe5667d611010c45a3073693e8e1fac99c2f332a2525fc0dd39785feef39de808e65545f01"],
		"txID": "583bfa0174c8e39df95f327e8bb1c50757e9ad076f29f12c54ee49f0f7a1658a",
		"raw_data": {
			"contract": [{
				"parameter": {
					"value": {
						"amount": 100,
						"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
						"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
					},
					"type_url": "type.googleapis.com/protocol.TransferContract"
				},
				"type": "TransferContract"
			}],
			"ref_block_bytes": "0603",
			"ref_block_hash": "61947898cae0b644",
			"expiration": 1539161055000,
			"timestamp": 1539160997041
		}
	}
}
```
## 通过私钥快捷转账
* 请求地址：http://[ip]:[port]/wallet/easytransferbyprivate
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：快捷转账的交易信息和转账成功与否

示例： <br />
```
# 请求：
http://127.0.0.1:8090/wallet/easytransferbyprivate
{
  "privateKey": "467fb555e8b57a016c3c3453ee67ff053decbd793c38eb55ff91b18b6d8b50c3",
  "toAddress": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7",
  "amount":100
}
# 返回：
{
	"result": {
		"result": true
	},
	"transaction": {
		"signature": ["b9d5caf22cc7e226d54ddc5afc101821e770f9acadb4178632360f8cbe5667d611010c45a3073693e8e1fac99c2f332a2525fc0dd39785feef39de808e65545f01"],
		"txID": "583bfa0174c8e39df95f327e8bb1c50757e9ad076f29f12c54ee49f0f7a1658a",
		"raw_data": {
			"contract": [{
				"parameter": {
					"value": {
						"amount": 100,
						"owner_address": "266068aae2bfec4e3124221f0428276d78bed5896c",
						"to_address": "26b738727bccbff6167a6cf0f747d12132a0ac9ad7"
					},
					"type_url": "type.googleapis.com/protocol.TransferContract"
				},
				"type": "TransferContract"
			}],
			"ref_block_bytes": "0603",
			"ref_block_hash": "61947898cae0b644",
			"expiration": 1539161055000,
			"timestamp": 1539160997041
		}
	}
}
```
## 创建地址
> 通过密码创建地址，该api存在泄漏密码的风险，请确保在安全的环境中调用该api。
* 请求地址：http://[ip]:[port]/wallet/createaddress
* 请求方式：GET
* 请求参数：
* 返回值：创建的地址信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/createaddress?value=467fb555e8b57a016c3c3453ee67ff053decbd793c38eb55ff91b18b6d8b50c3

# 返回：
{
	"base58checkAddress": "GdXpZ5yFnfS4oMByuZjf92ootuiWwfpFv1",
	"value": "26d7f622660ede140c94b1292b1aa8d6c3aba03957"
}
```
## 生成私钥和地址
* 请求地址：http://[ip]:[port]/wallet/generateaddress
* 请求方式：GET
* 请求参数：
* 返回值：生成的私钥和地址

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/generateaddress

# 返回：
{
	"privateKey": "393fb1175d473bf45e0839f9f57165fbe16525e476addfbba4db2dde46e2dc13",
	"address": "GStQSaDMwQqi4jL6nhpEsYN1Rfh9gA5ZD5",
	"hexAddress": "2663315ba6f789070452c1d69e9e24951a0f2cf2a9"
}
```
## 检查地址是否正确
* 请求地址：http://[ip]:[port]/wallet/validateaddress
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：地址是否正确以及地址类型

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/validateaddress?address=26b738727bccbff6167a6cf0f747d12132a0ac9ad7

返回：
{
	"result": true,
	"message": "Hex string format"
}

#
http://127.0.0.1:8090/wallet/validateaddress?address=GaYhhFbQzfxpcHuXa4e1VbjGQeNtbrse85
# 返回：
{
	"result": true,
	"message": "Base58check format"
}
```
## 部署合约
* 请求地址：http://[ip]:[port]/wallet/deploycontract
* 请求方式：POST
* 请求参数：address——账户地址
* 返回值：部署合约的交易
```
message CreateSmartContract {
   bytes owner_address = 1;
   SmartContract new_contract = 2;
 }

owner_address：部署合约的账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
new_contract： 智能合约。
```
示例：<br />
```
# 合约
contract gsc{
    function getName () returns(string) {
        return "gsc";
    }
}

# 请求：
http://127.0.0.1:8090/wallet/deploycontract
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
# 返回：
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
## 执行智能合约
* 请求地址：http://[ip]:[port]/wallet/triggersmartcontract
* 请求方式：GET
* 请求参数：address——账户地址
* 返回值：智能合约执行成功与否
```
message TriggerSmartContract {
   bytes owner_address = 1;
   bytes contract_address = 2;
   int64 call_value = 3;
   bytes data = 4;
 }

owner_address：合约持有人地址。
contract_address： 合约地址。
call_value：gas的值。
data：操作参数。
```
示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/triggersmartcontract
{
	"owner_address": "abd4b9367799eaa3197fecb144eb71de1e049abc",
	"contract_address": "2688ff93bdc32b090aeb648ad33ecdae9181b4beac",
	"call_value": 20000000,
	"data": "",      //四个参数为TriggerSmartContract

	"function_selector": "id",
	"parameter": "",
	"fee_limit": 10000000
}
# 返回：
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
## 获取合约
* 请求地址：http://[ip]:[port]/wallet/getcontract
* 请求方式：GET
* 请求参数：address——合约地址
* 返回值：合约的信息

示例：<br />
```
# 请求：
http://127.0.0.1:8090/wallet/getcontract?address=2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b
# 返回：
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
