# 开发指南
#### 如果您想成为GSC底层公链的开发者，本文档可以帮助您快速入门GSC公链开发，并贡献您的代码。
#### 如果您只是想成为GSC公链的上层应用开发者，那么本文档提供的详细API接口操作说明及Demo，可以帮助您快速的构建基于GSC公链的上层应用，您只需关注业务实现，而无需关注GSC公链底层。

## 简介
#### GSC（Global Social Chain）项目在github上开源，地址：<a href="https://github.com/gscsocial">https://github.com/gscsocial</a>。
#### 包含以下子项目：
* gsc-core       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GSC公链
* wallet-android &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;安卓端钱包
* wallet-ios     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;苹果端钱包
* explorer       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浏览器
* protocol       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GSC协议
<br />

您可以自由的下载源码，并可以申请为开发者。成为开发者以后，可以直接和GSC技术团队成员实时沟通、探讨并解决技术问题。如果您在Github上有较为卓越的贡献，您将有机会加入GSC团队。

## 技术框架
在架构设计上，GSC公链可以分为三个层次，协议层、扩展层和应用层。其中，协议层又可以分为存储层和网络层，它们相互独立但又不可分割。如图：
<!--
![avatar](../../.vuepress/dist/assets/img/gsc-core.jpeg)
-->
应用层是GSC的最上层，是整个GSC的展示层，通过API接口与智能合约层进行交互，GSC的应用层可以是移动端、web端、或是当前的业务服务器。

扩展层包括智能合约和RPC。GSC的智能合约运行在GVM上，并会用到RPC（Remote Procedure Call Protocol）。

协议层包括blockChain、共识算法、挖矿以及网络层，是GSC的四大核心内容。
<!--
!#[avatar](../../.vuepress/dist/assets/img/gsc-struct.jpeg)
-->
### 协议层
协议层是GSC最底层的技术。是一个完整的区块链产品，它维护着GSC公链中的网络节点，并对外提供Api供调用。主要包括网络编程、分布式算法、加密签名、数据存储等4个方面的技术。

* #### 存储层：区块 + 链表及区块链数据结构。GSC中使用的数据库是levelDB。

* #### 网络层：GSC使用成熟的开源框架Netty作为p2p网络的实现技术。

+ #### 共识层：采用ADPoS共识机制，由GSC持有人投票竞选出23个光速节点，光速节点对GSC交易打包记账出块，获得对应的出块奖励。

### 扩展层
GSC扩展层包括GVM和智能合约两部分。开发者可以自由灵活的开发智能合约，在智能合约基础上封装自身的应用。

* #### 扩展层：GSC合约被打包进区块链中，开发者通过地址对这个区块进行访问继而和智能合约交互。

* #### 合约层：GSC合约层为上层应用提供自由灵活的智能合约，使得GSC具有丰富的应用场景。

### 应用层
GSC为开发者提供强大的应用支持，开发者通过地址对这个区块进行访问继而和智能合约交互，进而封装开发者自身的应用，并可以融合分布式存储、机器学习、VR、物联网、大数据等技术，进而实现丰富多彩的区块链应用。GSC对外提供丰富的API接口，开发者完全可以摆脱编程语言的限制。

## 搭建开发环境

### 准备
Oracle JDK 1.8 <br />
Linux OS. (CentOS 7.x)
### 如何构建
在 IntelliJ IDEA 中构建:

  * 打开 IntelliJ. 依次选择 `File` -> `Open`，找到下载的gsc-core文件夹。点击`Open` 。或依次选择 `File` -> `New` -> `Project from Version Control` -> `Git`，在URL中输入`https://github.com/gscsocial/gsc-core.git`，在Directory中选择项目克隆的地址。点击`Clone`。
  *  查看`Import Project from Gradle` 目录下的`Use auto-import`。在 `Gradle JVM` 选项中选择 JDK 1.8。 然后点击 `OK`，IntelliJ 会打开项目开始 gradle 同步。
  * 需要等一段时间，待同步完成后，选择 `Gradle` -> `Tasks` -> `build`,然后点击 `build` 。
### 如何运行
首先，需要修改config.conf文件。
* genesis.block.witnesses 取代你的个人地址。
```
genesis.block = {
  witnesses = [
    {
      address: GdQeizMsg6SQV6SjWMvR5k5EqPDuBRE5Pi。,
      url = "GSC",
      voteCount = 25
      },
    ]
  }
```
* 修改ip.list 代替个人的 ip list。
```
seed.node = {
  ip.list = [
     # [ip]:[port],
     "127.0.0.1:19999",
  ]
}
```
然后，在 IntelliJ IDEA 中运行
  * 项目构建完成之后，在 project structure view panel中查找 `Start` ，路径为 `gsc-core/src/main/java/org/gsc/program/Start`.
  * 选择 `Start`，点击并选择 `Run 'Start.main()'`，然后 `Start` 开始运行。

在终端中，运行
`./gradlew run -Pwitness`
