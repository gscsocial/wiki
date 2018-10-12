# API接口-RPC
> rpc调用接口。接口包括RPC接口和HTTP接口两部分。

### GSC Address 与 Base58 Address 转换
  GSC Address以G开头，经过Base58编码后形成，较易记忆，如：GdQeizMsg6SQV6SjWMvR5k5EqPDuBRE5Pi。
  Http接口中的地址参数需要Base58 Address，因此需要转换，其转换方法如下：<br />
```
String Base58Address = "GdQeizMsg6SQV6SjWMvR5k5EqPDuBRE5Pi";
byte[] address = Wallet.decodeFromBase58Check(Base58Address);
```

## 获取账户基本信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Account getAccount(org.gsc.protos.Protocol.Account request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.Account | 账户address |

* 返回值：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Account | 返回账户基本信息 |
### 2. 示例
* 源码：
```
ManagedChannel channel = null;
WalletGrpc.WalletBlockingStub blockingStub = null;

String startNode = "127.0.0.1:19999";
channel = ManagedChannelBuilder.forTarget(startNode).usePlaintext(true).build();
blockingStub = WalletGrpc.newBlockingStub(channel);

byte[] accountAddress = Hex.decode("2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b");

ByteString addr = ByteString.copyFrom(accountAddress);
Protocol.Account request = Protocol.Account.newBuilder().setAddress(addr).build();

Protocol.Account account = blockingStub.getAccount(request);

logger.info("Account Balance: " + account.getBalance());
logger.info("Account Name: " + account.getAccountName().toStringUtf8());
logger.info("Account Address: " + ByteArray.toHexString(account.getAddress().toByteArray()));
logger.info("Account Resource: " + account.getAccountResource());
```
* 输出：
```
15:22:56.586 INFO [Wallet Demo(RPC)] Account Balance: 2000000000000000
15:22:56.587 INFO [Wallet Demo(RPC)] Account Name: GSC
15:22:56.588 INFO [Wallet Demo(RPC)] Account Address: 2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b
15:22:56.593 INFO [Wallet Demo(RPC)] Account Resource:
```

## 通过账户ID获取账户基本信息

### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Account getAccountById(org.gsc.protos.Protocol.Account request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.Account | 账户address |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Account | 返回账户基本信息 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```
## 通过账户ID获取账户基本信息2
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction updateAccount(org.gsc.protos.Contract.AccountUpdateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.AccountUpdateContract2 | 账户更新类型合约，包含账户名称、账户地址。 |

```
message AccountUpdateContract {
   bytes account_name = 1;
   bytes owner_address = 2;
 }

owner_address：账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
account_name： 账户名称  如： "GSCaccount”。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含更新账户的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```
## 创建转账交易
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction createTransaction(org.gsc.protos.Contract.TransferContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.TransferContract | 交易类型合约，包含提供方地址、接收方地址、金额 |

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

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含转账合约的交易，钱包签名后再请求广播交易。 |


### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 创建转账交易2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention createTransaction2(org.gsc.protos.Contract.TransferContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.TransferContract | 交易类型合约，包含提供方地址、接收方地址、金额 |

```
message TransferContract {
   bytes owner_address = 1;
   bytes to_address = 2;
   int64 amount = 3;
 }

owner_address：转账地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
to_address： 目标账户地址。
amount：转账金额。
```

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.TransactionExtention | 返回包含转账合约的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 广播交易
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.Return broadcastTransaction(org.gsc.protos.Protocol.Transaction request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.Transaction | 由钱包签名的交易，已经由钱包签名的交易。需要改变区块链状态的操作都封装在交易中。 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.Return | 成功或失败，广播交易前会预执行交易，返回其结果。注意：返回成功不一定保证交易成功。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 设置账户ID
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction setAccountId(org.gsc.protos.Contract.SetAccountIdContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.SetAccountIdContract | 设置账户ID合约，包含账户ID及地址 |

```
message SetAccountIdContract {
   bytes account_id = 1;
   bytes owner_address = 2;
 }

owner_address：账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
account_id： 账户Id。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含设置账户ID的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 更新账户
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention updateAccount2(org.gsc.protos.Contract.AccountUpdateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.AccountUpdateContract | 更新账户类型合约，包含账户名称、账户地址。 |

```
message AccountUpdateContract {
   bytes account_name = 1;
   bytes owner_address = 2;
 }

owner_address：账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
account_name： 账户名称  如： "GSCaccount”。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.TransactionExtention | 返回包含更新账户的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 超级节点投票
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction voteWitnessAccount(org.gsc.protos.Contract.VoteWitnessContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.VoteWitnessContract | 超级节点投票类型合约，包含投票人地址和一个投票对象列表(最多不能超过30个投票对象)，包含候选人地址和投票数。 |

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
owner_address：投票账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
vote_address： 超级节点候选人的地址。
vote_count：投给超级节点候选人的票数。
votes：超级节点候选人列表。
support：是否支持，这里应该是恒为true,暂未使用该参数。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含投票的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 投票超级节点
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention voteWitnessAccount2(org.gsc.protos.Contract.VoteWitnessContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.VoteWitnessContract | 超级节点投票类型合约，包含投票人地址和一个投票对象列表(最多不能超过30个投票对象)，包含候选人地址和投票数。 |

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
owner_address：投票地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
vote_address： 超级节点候选人的地址。
vote_count：投给超级节点候选人的票数。
votes：超级节点候选人列表。
support：是否支持，这里应该是恒为true,暂未使用该参数。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.TransactionExtention | 返回包含投票的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 发行Token
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction createAssetIssue(org.gsc.protos.Contract.AssetIssueContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.AssetIssueContract | Token发布类型合约，包含发行人地址、token名称、总发行量、GSCvstoken汇兑比例、开始时间、结束时间、衰减率、投票分数、详细描述、url、每账户最多消耗带宽值，总带宽消耗值以及token冻结资产。 |

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

owner_address：发行Token账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
name：发布Token的名称  如：“GSCcontract”。
abbr： 。
total_supply：发行总的token数量  如：100000000000。
frozen_supply：冻结Token的数量和冻结时间列表。
gsc_num：对应gsc数量。
num： 对应的自定义资产数目。
start_time：开始时间  格式：1539167925289。
end_time：结束时间  格式：1539167925289。
order：相同asset_name时，order递增，默认初始值为0。
vote_score：合约的评分。
description：Token的描述。
url：Token的url地址链接。
free_asset_net_limit：每个账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_limit：所有账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_usage：所有账户使用免费带宽（转移该资产时使用）。
public_latest_free_net_time：最近一次转移该Token使用免费带宽的时间。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回token发行的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 发行Token2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention createAssetIssue2(org.gsc.protos.Contract.AssetIssueContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.AssetIssueContract | Token发布类型合约，包含发行人地址、token名称、总发行量、GSCvstoken汇兑比例、开始时间、结束时间、衰减率、投票分数、详细描述、url、每账户最多消耗带宽值，总带宽消耗值以及token冻结资产。 |

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
   int64 order = 11; // the order of tokens of the same name
   int32 vote_score = 16;
   bytes description = 20;
   bytes url = 21;
   int64 free_asset_net_limit = 22;
   int64 public_free_asset_net_limit = 23;
   int64 public_free_asset_net_usage = 24;
   int64 public_latest_free_net_time = 25;
 }

owner_address：发行Token账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
name：发布Token的名称  如：“GSCcontract”。
abbr： 。
total_supply：发行总的token数量  如：100000000000。
frozen_supply：冻结Token的数量和冻结时间列表。
gsc_num：对应gsc数量。
num： 对应的自定义资产数目。
start_time：开始时间  格式：1539167925289。
end_time：结束时间  格式：1539167925289。
order：相同asset_name时，order递增，默认初始值为0。
vote_score：合约的评分。
description：Token的描述。
url：Token的url地址链接。
free_asset_net_limit：每个账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_limit：所有账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_usage：所有账户使用免费带宽（转移该资产时使用）。
public_latest_free_net_time：最近一次转移该Token使用免费带宽的时间。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.TransactionExtention | 返回token发行的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 更新超级节点信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction updateWitness(org.gsc.protos.Contract.WitnessUpdateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.WitnessUpdateContract | 超级节点更新类型合约，包含账户地址、Url。 |

```
message WitnessUpdateContract {
   bytes owner_address = 1;
   bytes update_url = 12;
 }

owner_address：超级节点地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
update_url： 超级节点更新后的url。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含更新超级节点信息的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 更新超级节点信息2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention updateWitness2(org.gsc.protos.Contract.WitnessUpdateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.WitnessUpdateContract | 超级节点更新类型合约，包含账户地址、Url。 |

```
message WitnessUpdateContract {
   bytes owner_address = 1;
   bytes update_url = 12;
 }

owner_address：超级节点地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
update_url： 超级节点更新后的url。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回包含更新超级节点信息的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 创建账户
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction createAccount(org.gsc.protos.Contract.AccountCreateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.AccountCreateContract | 账户创建类型合约，包含账户类型、账户地址。 |

```
message AccountCreateContract {
   bytes owner_address = 1;
   bytes account_address = 2;
   AccountType type = 3;
 }

owner_address：账户地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
account_address： 将要创建的账户地址。
type：账户类型——比如：0 代表的账户类型是Normal。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含创建账户的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 创建账户2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention createAccount2(org.gsc.protos.Contract.AccountCreateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.AccountCreateContract | 账户创建类型合约，包含账户类型、账户地址。 |

```
message AccountCreateContract {
   bytes owner_address = 1;
   bytes account_address = 2;
   AccountType type = 3;
 }

owner_address：创建账户的地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
account_address： 将要创建的账户地址。
type：账户类型——比如：0 代表的账户类型是Normal。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回包含创建账户的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 申请成为超级节点
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction createWitness(org.gsc.protos.Contract.WitnessCreateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.WitnessCreateContract | 超级节点创建类型合约，包含账户地址、Url。 |

```
message WitnessCreateContract {
   bytes owner_address = 1;
   bytes url = 2;
 }

owner_address：申请者地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
url： 超级节点后续人网址。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含申请成为候选人的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 申请成为超级节点2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention createWitness2(org.gsc.protos.Contract.WitnessCreateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| org.gsc.protos.Contract.WitnessCreateContract | 是 | AccountCreateContract | 超级节点创建类型合约，包含账户地址、Url。 |

```
message WitnessCreateContract {
   bytes owner_address = 1;
   bytes url = 2;
 }

owner_address：申请者地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
url： 超级节点后续人网址。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回包含申请成为候选人的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 转让Token
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction transferAsset(org.gsc.protos.Contract.TransferAssetContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| org.gsc.protos.Contract.TransferAssetContract | 是 | AccountCreateContract | 转账发布的Token类型合约，包含token名称、提供方地址、接收方地址、token数量。 |

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
amount：转账Token的数量。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含转让token的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 转让Token2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention transferAsset2(org.gsc.protos.Contract.TransferAssetContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| org.gsc.protos.Contract.TransferAssetContract | 是 | AccountCreateContract | 转账发布的Token类型合约，包含Token名称、提供方地址、接收方地址、Token数量。 |

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
amount：转账Token的数量。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回包含转让Token的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 购买Token
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction participateAssetIssue(org.gsc.protos.Contract.ParticipateAssetIssueContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.ParticipateAssetIssueContract | 购买发行Token类型合约，包含Token名称、提供方地址、接收方地址、Token数量。 |

```
message ParticipateAssetIssueContract {
   bytes owner_address = 1;
   bytes to_address = 2;
   bytes asset_name = 3;
   int64 amount = 4;
 }

owner_address：购买人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
to_address：发行Token所有者地址。
account_name： 发行Token的名称，包括Token名称和order
amount：购买发行Token使用gsc的数量。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含购买Token的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 创建账户
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention participateAssetIssue2(org.gsc.protos.Contract.ParticipateAssetIssueContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.ParticipateAssetIssueContract | 购买发行Token类型合约，包含Token名称、提供方地址、接收方地址、Token数量。 |

```
message ParticipateAssetIssueContract {
   bytes owner_address = 1;
   bytes to_address = 2;
   bytes asset_name = 3;
   int64 amount = 4;
 }

owner_address：创建人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
to_address：发行Token所有者地址。
account_name： 发行Token的名称，包括Token名称和order
amount：购买发行Token使用gsc的数量。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回包含购买Token的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 冻结资产
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction freezeBalance(org.gsc.protos.Contract.FreezeBalanceContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.FreezeBalanceContract | 冻结资产类型合约，包含地址、锁定资金、锁定时间。锁定时间为3天。 |

```
message FreezeBalanceContract {
   bytes owner_address = 1;
   int64 frozen_balance = 2;
   int64 frozen_duration = 3;
   ResourceCode resource = 10;
 }

owner_address：资产持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
frozen_balance：冻结资产的数量。
frozen_duration：冻结资产的时间段。
resource： 冻结gsc获取资源的类型。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回包含资产的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 冻结资产2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention freezeBalance2(org.gsc.protos.Contract.FreezeBalanceContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.FreezeBalanceContract | 冻结资产类型合约，包含地址、锁定资金、锁定时间。锁定时间为3天。 |

```
message FreezeBalanceContract {
   bytes owner_address = 1;
   int64 frozen_balance = 2;
   int64 frozen_duration = 3;
   ResourceCode resource = 10;
 }

owner_address：资产持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
frozen_balance：冻结资产的数量。
frozen_duration：冻结资产的时间段。
resource： 冻结gsc获取资源的类型。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回包含资产的交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 解冻资产
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction unfreezeBalance(org.gsc.protos.Contract.UnfreezeBalanceContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.UnfreezeBalanceContract	 | 解冻资产类型合约，包含地址。 |

```
message UnfreezeBalanceContract {
   bytes owner_address = 1;
   ResourceCode resource = 10;
 }

owner_address：资产持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
resource： 解冻资产类型。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回解冻资产交易信息，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 解冻资产2
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.TransactionExtention unfreezeBalance2(org.gsc.protos.Contract.UnfreezeBalanceContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.UnfreezeBalanceContract	 | 解冻资产类型合约，包含地址。 |

```
message UnfreezeBalanceContract {
   bytes owner_address = 1;
   ResourceCode resource = 10;
 }

owner_address：资产持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
resource： 解冻资产类型。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回解冻资产交易信息，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 解冻Token
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction unfreezeAsset(org.gsc.protos.Contract.UnfreezeAssetContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.UnfreezeAssetContract | 解冻Token类型合约，包含地址。 |

```
message UnfreezeAssetContract {
   bytes owner_address = 1;
 }

owner_address：Token持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 解冻Token2
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.TransactionExtention unfreezeAsset2(org.gsc.protos.Contract.UnfreezeAssetContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.UnfreezeAssetContract | 解冻Token类型合约，包含地址。 |

```
message UnfreezeAssetContract {
   bytes owner_address = 1;
 }

owner_address：Token持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 超级代表奖励
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction withdrawBalance(org.gsc.protos.Contract.WithdrawBalanceContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.WithdrawBalanceContract | 提取奖励类型合约，包含地址。 |

```
message WithdrawBalanceContract {
   bytes owner_address = 1;
 }

owner_address：超级代表地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 超级代表奖励2
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.TransactionExtention withdrawBalance2(org.gsc.protos.Contract.WithdrawBalanceContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.WithdrawBalanceContract	 | 提取奖励类型合约，包含地址。 |

```
message WithdrawBalanceContract {
   bytes owner_address = 1;
 }

owner_address：超级代表地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 修改token信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.TransactionExtention updateAsset2(org.gsc.protos.Contract.UpdateAssetContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.UpdateAssetContract | 更新Token参数类型合约，包括Token发行者的地址、Token的描述、Token的url、每账户最多消耗带宽值、总带宽消耗值 |

```
message UpdateAssetContract {
   bytes owner_address = 1;
   bytes description = 2;
   bytes url = 3;
   int64 new_limit = 4;
   int64 new_public_limit = 5;
 }

owner_address：Token持有人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
description： Token的描述。
url：Token的Url。
new_limit：每个调用者可以消耗Bandwidth point的限制。
new_public_limit： 所有调用者可以消耗Bandwidth points的限制。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 创建提议
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention proposalCreate(org.gsc.protos.Contract.ProposalCreateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.ProposalCreateContract | 创建提议类型合约，包括提议 |

```
message ProposalCreateContract {
   bytes owner_address = 1;
   map<int64, int64> parameters = 2;
 }

owner_address：创建提议人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
parameters： 提议。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

##  赞成提议
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention proposalApprove(org.gsc.protos.Contract.ProposalApproveContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.ProposalApproveContract | 赞成提议类型合约，包括提议ID，是否赞成。 |

```
message ProposalApproveContract {
   bytes owner_address = 1;
   int64 proposal_id = 2;
   bool is_add_approval = 3; // add or remove approval
 }

owner_address：赞成提议人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
proposal_id： 提议的Id。
is_add_approval：是否赞成提议。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 删除提议
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention proposalDelete(org.gsc.protos.Contract.ProposalDeleteContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.FreezeBalanceContract | 删除提议类型合约，包括提议地址。 |

```
message ProposalDeleteContract {
   bytes owner_address = 1;
   int64 proposal_id = 2;
 }

owner_address：删除提议人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
proposal_id： 提议ID。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 购买存储
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention buyStorage(org.gsc.protos.Contract.BuyStorageContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.BuyStorageContract | 购买存储类型合约，用于购买存储的钱。 |

```
message BuyStorageContract {
  bytes owner_address = 1;
  int64 quant = 2;
}

owner_address：购买存储人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
quant： 购买存储的钱。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 购买字节存储
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention buyStorageBytes(org.gsc.protos.Contract.BuyStorageBytesContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.BuyStorageBytesContract | 购买字节存储类型合约，用于购买存储的钱。 |

```
message BuyStorageBytesContract {
  bytes owner_address = 1;
  int64 bytes = 2; // storage bytes for buy
}

owner_address：购买字节存储人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
bytes： 购买的存储。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 售卖存储
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention sellStorage(org.gsc.protos.Contract.SellStorageContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.SellStorageContract | 售卖存储类型合约，存储。 |

```
message SellStorageContract {
  bytes owner_address = 1;
  int64 storage_bytes = 2;
}

owner_address：售卖存储人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
storage_bytes： 存储。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 创建交易所
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention exchangeCreate(org.gsc.protos.Contract.ExchangeCreateContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.ExchangeCreateContract | 创建交易所类型合约。 |

```
message ExchangeCreateContract {
   bytes owner_address = 1;
   bytes first_token_id = 2;
   int64 first_token_balance = 3;
   bytes second_token_id = 4;
   int64 second_token_balance = 5;
 }

owner_address：创建交易所人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
first_token_id： 第1种token的id 。
first_token_balance：第1种token的balance。
second_token_id：第2种token的id。
second_token_balance：第2种token的balance。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 给交易所注资
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention exchangeInject(org.gsc.protos.Contract.ExchangeInjectContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.ExchangeInjectContract	 | 给交易所注资类型合约。 |

```
message ExchangeInjectContract {
   bytes owner_address = 1;
   int64 exchange_id = 2;
   bytes token_id = 3;
   int64 quant = 4;
 }

owner_address：给交易所注资人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
exchange_id： 交易对的id。
token_id：要注资的token的id。
quant：要注资的token的金额。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 从交易所撤资
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention exchangeWithdraw(org.gsc.protos.Contract.ExchangeWithdrawContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.FreezeBalanceContract | 从交易所撤资类型合约。 |

```
message ExchangeWithdrawContract {
   bytes owner_address = 1;
   int64 exchange_id = 2;
   bytes token_id = 3;
   int64 quant = 4;
 }

owner_address：从交易所撤资人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
exchange_id： 交易对的id。
token_id：要撤资的token的id。
quant：要撤资的token的金额。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 在交易所交易
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention exchangeTransaction(org.gsc.protos.Contract.ExchangeTransactionContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.ExchangeTransactionContract | 在交易所交易类型合约
。 |

```
message ExchangeTransactionContract {
   bytes owner_address = 1;
   int64 exchange_id = 2;
   bytes token_id = 3;
   int64 quant = 4;
 }

owner_address：交易所交易人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
exchange_id： 交易对的id。
token_id：要卖出的token的id。
quant：要卖出的token的金额。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionExtention | 返回交易，钱包签名后再请求广播交易。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取节点列表

* 方法：

`public org.gsc.api.GrpcAPI.NodeList listNodes(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.NodeList | 返回节点列表。 |

#### 2. 示例
* 源码：
```
```
* 输出：
```
```
## 获取Token列表
### 1. 接口说明
* 方法：

`publicrequest)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.Account | 账户信息 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| public org.gsc.api.GrpcAPI.AssetIssueList | 返回Token列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取账户网络
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.AccountNetMessage getAccountNet(org.gsc.protos.Protocol.Account request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.Account | 账户信息 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.AccountNetMessage | 返回账户网络。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取账户资源
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.AccountResourceMessage getAccountResource(org.gsc.protos.Protocol.Account request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.Account | 账户信息 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.AccountResourceMessage | 返回账户信息 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过Token名称查询Token信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Contract.AssetIssueContract getAssetIssueByName(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BytesMessage | Bytes类型，Token名称。 |

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

owner_address：Token地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
name：发布Token的名称  如：“GSCcontract”。
abbr： 。
total_supply：发行总的token数量  如：100000000000。
frozen_supply：冻结Token的数量和冻结时间列表。
gsc_num：对应gsc数量。
num： 对应的自定义资产数目。
start_time：开始时间  格式：1539167925289。
end_time：结束时间  格式：1539167925289。
order：相同asset_name时，order递增，默认初始值为0。
vote_score：合约的评分。
description：Token的描述。
url：Token的url地址链接。
free_asset_net_limit：每个账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_limit：所有账户可以使用的免费带宽（转移该资产时使用）。
public_free_asset_net_usage：所有账户使用免费带宽（转移该资产时使用）。
public_latest_free_net_time：最近一次转移该Token使用免费带宽的时间。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Contract.AssetIssueContract | Token详细信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取块信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Block getNowBlock(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Block | 返回块信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取块信息2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.BlockExtention getNowBlock2(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.BlockExtention | 返回块信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过块号获取块信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Block getBlockByNum(org.gsc.api.GrpcAPI.NumberMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.NumberMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Block | 返回块信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过块号获取块信息2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.BlockExtention getBlockByNum2(org.gsc.api.GrpcAPI.NumberMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.NumberMessage | 块号 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.BlockExtention | 返回块信息。 |
### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过块号获取块中的交易数
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.NumberMessage getTransactionCountByBlockNum(org.gsc.api.GrpcAPI.NumberMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.NumberMessage	 | 块号 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.NumberMessage | 返回交易数。 |
### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过块号获取块信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Block getBlockById(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BytesMessage | Bytes信息 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Block | 返回块信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 按照范围查询块
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.BlockList getBlockByLimitNext(org.gsc.api.GrpcAPI.BlockLimit request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BlockLimit |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.BlockList | 返回块区块列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 按照范围查询块2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.BlockListExtention getBlockByLimitNext2(org.gsc.api.GrpcAPI.BlockLimit request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| NodeList | 返回节点列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 查询最新的几个块
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.BlockList getBlockByLatestNum(org.gsc.api.GrpcAPI.NumberMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.NumberMessage | 块号 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.BlockList | 返回块区块列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 查询最新的几个块2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.BlockListExtention getBlockByLatestNum2(org.gsc.api.GrpcAPI.NumberMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.NumberMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.BlockListExtention | 返回块列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过交易ID获取交易信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction getTransactionById(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BytesMessage | Bytes类型 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回交易信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```
## 通过交易ID获取交易信息2
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.TransactionInfo getTransactionInfoById2(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BytesMessage | Bytes |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.TransactionInfo | 返回交易信息 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```
## 部署智能合约
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention deployContract(org.gsc.protos.Contract.CreateSmartContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.CreateSmartContract | 创建智能类型合约 |

```
message CreateSmartContract {
   bytes owner_address = 1;
   SmartContract new_contract = 2;
 }

owner_address：部署智能合约人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
new_contract： 智能合约。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.TransactionExtention | 返回交易信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取智能合约
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.SmartContract getContract(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BytesMessage | Bytes类型。 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.SmartContract | 返回智能合约。 |
```
message CreateSmartContract {
   bytes owner_address = 1;
   SmartContract new_contract = 2;
 }

owner_address：智能合约地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
new_contract： 智能合约。
```

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 执行智能合约
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention triggerContract(org.gsc.protos.Contract.TriggerSmartContract request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Contract.TriggerSmartContract | 执行智能合约。 |
```
message TriggerSmartContract {
   bytes owner_address = 1;
   bytes contract_address = 2;
   int64 call_value = 3;
   bytes data = 4;
 }

owner_address：执行智能合约人地址，HexString类型  如： “2667ec8e3af5ea0bbb7cf92826af329cf54b9d7f6b”。
contract_address： 合约地址。
call_value：gsc的值。
data：操作参数。
```
* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.TransactionExtention | 返回交易信息。 |
### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取超级节点列表
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.WitnessList listWitnesses(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.WitnessList | 返回超级节点列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取提议列表
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.ProposalList listProposals(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.ProposalList | 返回提议列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过提议ID获取提议信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Proposal getProposalById(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| org.gsc.api.GrpcAPI.BytesMessage | 是 | EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Proposal | 返回提议信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取交易所列表
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.ExchangeList listExchanges(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.ExchangeList | 返回交易所列表 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

### 通过ID获取交易所信息
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Exchange getExchangeById(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BytesMessage | Bytes |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Exchange | 返回交易所信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取节获取区块链参数信息点列表
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.ChainParameters getChainParameters(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.ChainParameters | 返回区块链参数信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取Token信息
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.AssetIssueList getAssetIssueList(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.AssetIssueList | 返回Token列表 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 分页获取Token信息
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.AssetIssueList getPaginatedAssetIssueList(org.gsc.api.GrpcAPI.PaginatedMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.PaginatedMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.AssetIssueList | 返回Token列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取总交易数
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.NumberMessage totalTransaction(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.NumberMessage | 返回交易总数 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取下次统计投票的时间
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.NumberMessage getNextMaintenanceTime(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage |  |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.NumberMessage  | 返回节点列表。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取交易签名
### 1. 接口说明
* 方法：

`public org.gsc.protos.Protocol.Transaction getTransactionSign(org.gsc.protos.Protocol.TransactionSign request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.TransactionSign | 签名交易 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.protos.Protocol.Transaction | 返回交易的签名信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 获取交易签名2
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.TransactionExtention getTransactionSign2(org.gsc.protos.Protocol.TransactionSign request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.protos.Protocol.TransactionSign | 签名交易 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.TransactionExtention | 返回交易的签名信息。 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 创建地址
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.BytesMessage createAddress(org.gsc.api.GrpcAPI.BytesMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.BytesMessage | Bytes |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.BytesMessage | 返回地址 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过密码快捷转账
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.EasyTransferResponse easyTransfer(org.gsc.api.GrpcAPI.EasyTransferMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EasyTransferMessage | 转账信息，转账用的密码，toAddress，转账的数量 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.EasyTransferResponse | 返回转账创建的transaction，交易ID，以及广播的结果result |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 通过私钥快捷转账
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.EasyTransferResponse easyTransferByPrivate(org.gsc.api.GrpcAPI.EasyTransferByPrivateMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EasyTransferByPrivateMessage | 转账信息，转账用的密码，toAddress，转账的数量 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.EasyTransferResponse | 返回转账创建的transaction，交易ID，以及广播的结果result |

### 2. 示例
* 源码：
```
```
* 输出：
```
```

## 生成地址和私钥
### 1. 接口说明
* 方法：

`public org.gsc.api.GrpcAPI.AddressPrKeyPairMessage generateAddress(org.gsc.api.GrpcAPI.EmptyMessage request)`

* 参数：

| 参数名 | 必须 | 类型 | 说明 |
| :------:| :------: | :------: | :------: |
| request | 是 | org.gsc.api.GrpcAPI.EmptyMessage | 转账信息，转账用的密码，toAddress，转账的数量 |

* 返回：

| 返回类型 | 说明 |
| :------:| :------: |
| org.gsc.api.GrpcAPI.AddressPrKeyPairMessage | 返回私钥地址对 |

### 2. 示例
* 源码：
```
```
* 输出：
```
```
