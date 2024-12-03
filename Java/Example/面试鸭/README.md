# 1 - 项目总览

## 一、项目介绍

面试鸭是一款基于 Next.js + Spring Boot + Redis + MySQL + Elasticsearch 的 **面试刷题平台**，运用 Druid + HotKey + Sa-Token + Sentinel 提高了系统的性能和安全性。

成品项目参考：[https://mianshiya.com](https://mianshiya.com/)

![img](./assets/202408231022356.png)

管理员可以创建题库、题目和题解；用户可以注册登录、分词检索题目、在线刷题并查看刷题记录日历图。

此外，系统使用数据库连接池、热 Key 探测、缓存、高级数据结构等来提升性能。通过流量控制、熔断、动态 IP 黑白名单过滤、同端登录冲突检测、分级反爬虫策略来提升系统和内容的安全性。从 0 到 1 的真实企业级项目设计开发，绝对让你收获满满！1792126029868675074_0.7193462892981979

### 项目三大阶段

为了帮大家循序渐进地学习，鱼皮将项目设计为三个阶段，可以根据自己的时间和水平按需学习。

1）第一阶段，开发基础的刷题平台，带大家熟悉项目开发流程，实战 Next.js 服务端渲染 + Spring Boot 应用的快速开发。1792126029868675074_0.34252407337973034

2）第二阶段，对项目功能进行扩展，精选 4 个真实业务场景，实战企业主流后端技术如 Redis 缓存和高级数据结构、Elasticsearch 搜索引擎、Druid 连接池、并发编程、热 key 探测的应用。

3）第三阶段，对项目安全性进行优化，比如基于 Sentinel 进行网站流量控制和熔断、基于 Nacos 实现动态的 IP 黑白名单、基于 Sa-Token 实现同端登录冲突检测、基于 Redis 实现分级反爬虫策略等。最终将项目上线并保证可用性。

## 二、项目优势

### 项目收获

本项目是线上刷题网站[《面试鸭》](https://mianshiya.com/)的教学版本，业务真实典型，基于主流的前端 Next.js 服务端渲染和后端经典技术栈实现。区别于增删改查的 “烂大街” 项目，本项目中鱼皮会带你实战大量新技术和企业级场景、掌握系统设计和优化方案，给你的简历大幅增加竞争力。

鱼皮给大家讲的都是 **通用的项目开发方法和架构设计套路**，从这个项目中你可以学到：

- 如何拆解复杂业务，从 0 开始设计实现系统？
- 如何快速构建 Next.js 服务端渲染网站和后端项目？
- 如何结合 Redis + Caffeine + Hotkey 构建高性能实时缓存？
- 如何利用 Elasticsearch 实现灵活高效的内容搜索？
- 如何巧用 Redisson 高级数据结构，实现高性能的接口？
- 如何实现流量控制和动态 IP 黑白名单，增强网站安全性？
- 如何实现登录冲突检测和分级反爬虫策略，保护网站内容？
- 如何快速上线项目并增强可用性？

此外，还能学会很多作图、思考问题、对比方案的方法，提升排查问题、自主解决 Bug 的能力。

## 三、核心业务流程

如下图：

![img](./assets/202408231022329.jpeg)

## 四、项目功能梳理

### 基础功能

- 用户模块
- - 用户注册
  - 用户登录（账号密码）
  - 【管理员】管理用户 - 增删改查
- 题库模块
- - 查看题库列表
  - 查看题库详情（展示题库下的题目）
  - 【管理员】管理题库 - 增删改查
- 题目模块
- - 题目搜索
  - 查看题目详情（进入刷题页面）
  - 【管理员】管理题目 - 增删改查（比如按照题库查询题目、修改题目所属题库等）

### 高级功能

- 题目批量管理
- - 【管理员】批量向题库添加题目
  - 【管理员】批量从题库移除题目
  - 【管理员】批量删除题目
- 分词题目搜索
- 用户刷题记录日历图
- 自动缓存热门题目
- 网站流量控制和熔断
- 动态 IP 黑白名单过滤
- 同端登录冲突检测
- 分级题目反爬虫策略

## 五、技术选型

### 前端

- React 18 框架
- ⭐️ Next.js 服务端渲染
- ⭐️ Redux 状态管理
- Ant Design 组件库
- 富文本编辑器组件
- ⭐️ 前端工程化：ESLint + Prettier + TypeScript
- ⭐️ OpenAPI 前端代码生成

### 后端

- Java Spring Boot 框架 + Maven 多模块构建
- MySQL 数据库 + MyBatis-Plus 框架 + MyBatis X
- Redis 分布式缓存 + Caffeine 本地缓存
- Redission 分布式锁 + BitMap + BloomFilter
- ⭐️ Elasticsearch 搜索引擎
- ⭐️ Druid 数据库连接池 + 并发编程
- ⭐️ Sa-Token 权限控制
- ⭐️ HotKey 热点探测
- ⭐️ Sentinel 流量控制
- ⭐️ Nacos 配置中心
- ⭐️ 多角度项目优化：性能、安全性、可用性

## 六、架构设计

![img](./assets/202408231022380.png)

## 环境准备

后端 JDK 版本需要使用 8、11 或 17，**不能超过 17！**

推荐使用 11 版本，因为 Caffeine 缓存要求使用 11 版本。

前端 Node.js 版本 >= 18.18。

## 新建代码仓库

搭建仓库，点 star 的都是精神股东

代码仓库：https://github.com/liyupi/mianshiya-next

## 教程计划

### 第一阶段 - 基础功能

第 1 期：项目介绍。包括介绍项目背景、项目优势、核心业务流程、项目功能、技术选型、架构设计、教程计划等。1792126029868675074_0.5940351310062546

第 2 期：平台后端开发

- 需求分析
- 库表设计
- 后端项目初始化（万用模板讲解）后端基础功能开发（增删改查）
- 后端核心业务流程开发

第 3 期：平台前端模板开发

- 需求分析
- Web 前端技术选型（服务端渲染讲解）
- 前端项目初始化（Next.js 前端万用模板开发）
- 前端基础页面开发
- - 用户模块
  - 管理页面

第 4 期：平台前端核心开发

- 核心页面开发
- - 主页
  - 题库列表页
  - 题库详情页
  - 题目详情页
  - 题目搜索页
- 前后端联调，跑通核心业务流程

### 第二阶段 - 功能扩展

第 5 期：面向用户的扩展功能

- 用户刷题记录日历：需求分析 + 方案设计 + 前后端开发 + 性能优化
- 分词题目搜索：需求分析 + 方案设计 + 前后端开发

第 6 期：面向管理的扩展功能

- 题目批量管理：需求分析 + 方案设计 + 前后端开发 + 性能优化
- 自动缓存热门题目：需求分析 + 方案设计 + 前后端开发

### 第三阶段 - 优化上线

第 7 期：流量安全性优化

- 网站流量控制和熔断
- 动态 IP 黑白名单过滤

第 8 期：内容安全性优化

- 同端登录冲突检测
- 分级题目反爬虫策略

第 9 期：部署上线

- 前后端部署
- 可用性优化



# 2 - 后端开发

[程序员鱼皮](https://www.code-nav.cn/user/1601072287388278786)

2024-08-25 13:04

阅读 4.6k

## 本节重点

开发面试刷题平台后端，包括：

- 需求分析
- 库表设计
- 后端项目初始化（万用模板讲解）
- 后端基础功能开发（增删改查）
- 后端核心业务流程开发

## 一、需求分析

目标是明确要做的需求，并且给需求设置优先级，从而明确开发计划。

### 项目功能梳理

#### 基础功能

- 用户模块
- - 用户注册
  - 用户登录（账号密码）
  - 【管理员】管理用户 - 增删改查
- 题库模块
- - 查看题库列表
  - 查看题库详情（展示题库下的题目）
  - 【管理员】管理题库 - 增删改查
- 题目模块
- - 题目搜索
  - 查看题目详情（进入刷题页面）
  - 【管理员】管理题目 - 增删改查（比如按照题库查询题目、修改题目所属题库等）

#### 高级功能

- 题目批量管理
- - 【管理员】批量向题库添加题目
  - 【管理员】批量从题库移除题目
  - 【管理员】批量删除题目
- 分词题目搜索
- 用户刷题记录日历图
- 自动缓存热门题目
- 网站流量控制和熔断
- 动态 IP 黑白名单过滤
- 同端登录冲突检测
- 分级题目反爬虫策略

### 核心业务流程

如下图：

![img](./assets/202408251304749.jpeg)

### 需求优先级

根据核心业务业务流程，明确需求开发的优先级。

- P0 为核心，非做不可
- P1 为重点功能，最好做
- P2 为实用功能，有空就做
- P3 可做可不做，时间充裕再做

排好优先级的需求列表如下，其实用表格的形式整理更好：

#### 基础功能（均为 P0）

- 用户模块
- - 用户注册
  - 用户登录（账号密码）
  - 【管理员】管理用户 - 增删改查
- 题库模块
- - 查看题库列表
  - 查看题库详情（展示题库下的题目）
  - 【管理员】管理题库 - 增删改查
- 题目模块
- - 题目搜索
  - 查看题目详情（进入刷题页面）
  - 【管理员】管理题目 - 增删改查（比如按照题库查询题目、修改题目所属题库等）

#### 高级功能（均为 P1 ~ P2）

- 题目批量管理 P1
- - 【管理员】批量向题库添加题目
  - 【管理员】批量从题库移除题目
  - 【管理员】批量删除题目
- 分词题目搜索 P1
- 用户刷题记录日历图 P1
- 自动缓存热门题目 P2
- 网站流量控制和熔断 P2
- 动态 IP 黑白名单过滤 P2
- 同端登录冲突检测 P2
- 分级题目反爬虫策略 P2

排好优先级后，后端和前端同学就可以根据优先级去设计接口和页面了。

企业中一般使用专业的系统或者表格来管理需求。下图仅为示例，使用腾讯文档的智能表实现：

![img](./assets/202408251304770.png)

## 二、库表设计

对应需求分析中的功能梳理的模块，有 4 张核心表。

库名：mianshiya

数据库初始化文件：见下方

每个表鱼皮都给出了基础版和可扩展字段，便于大家学习。

### 1、用户表

#### 核心设计

用户表的核心是用户登录凭证（账号密码）和个人信息，SQL 如下：

```sql
-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment '账号',
    userPassword varchar(512)                           not null comment '密码',
    unionId      varchar(256)                           null comment '微信开放平台id',
    mpOpenId     varchar(256)                           null comment '公众号openId',
    userName     varchar(256)                           null comment '用户昵称',
    userAvatar   varchar(1024)                          null comment '用户头像',
    userProfile  varchar(512)                           null comment '用户简介',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user/admin/ban',
    editTime     datetime     default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_unionId (unionId)
) comment '用户' collate = utf8mb4_unicode_ci;
```

其中，unionId、mpOpenId 是为了实现公众号登录的，也可以省略。每个微信用户在同一家公司（主体）的 unionId 是唯一的，在同一个公众号的 mpOpenId 是唯一的。

editTime 和 updateTime 的区别是：editTime 表示用户编辑个人信息的时间（需要业务代码来更新），而 updateTime 表示这条用户记录任何字段发生修改的时间（由数据库自动更新）。

#### 扩展设计

1）如果要实现会员功能，可以对表进行如下扩展：

1. 给 userRole 字段新增枚举值 `vip`，表示会员用户，可根据该值判断用户权限
2. 新增会员过期时间字段，可用于记录会员有效期
3. 新增会员兑换码字段，可用于记录会员的开通方式
4. 新增会员编号字段，可便于定位用户并提供额外服务，并增加会员归属感

对应的 SQL 如下：

```sql
vipExpireTime datetime     null comment '会员过期时间',
vipCode       varchar(128) null comment '会员兑换码',
vipNumber     bigint       null comment '会员编号'
```

2）如果要实现用户邀请功能，可以对表进行如下扩展：

1. 新增 shareCode 分享码字段，用于记录每个用户的唯一邀请标识，可拼接到邀请网址后面，比如 https://mianshiya.com/?shareCode=xxx
2. 新增 inviteUser 字段，用于记录该用户被哪个用户邀请了，可通过这个字段查询某用户邀请的用户列表。

对应的 SQL 如下：

```sql
shareCode     varchar(20)  DEFAULT NULL COMMENT '分享码',
inviteUser    bigint       DEFAULT NULL COMMENT '邀请用户 id'
```

### 2、题库表

#### 核心设计

题库表的核心是题库信息（标题、描述、图片），SQL 如下：

```sql
-- 题库表
create table if not exists question_bank
(
    id          bigint auto_increment comment 'id' primary key,
    title       varchar(256)                       null comment '标题',
    description text                               null comment '描述',
    picture     varchar(2048)                      null comment '图片',
    userId      bigint                             not null comment '创建用户 id',
    editTime    datetime default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint  default 0                 not null comment '是否删除',
    index idx_title (title)
) comment '题库' collate = utf8mb4_unicode_ci;
```

其中，picture 存储的是图片的 url 地址，而不是完整图片文件。通过 userId 和用户表关联，在本项目中只有管理员才能创建题库。

由于用户很可能按照标题搜索题库，所以给 title 字段增加索引。

#### 扩展设计

1）如果要实现题库审核功能，可以对表进行如下扩展：

1. 新增审核状态字段，用枚举值表示待审核、通过和拒绝
2. 新增审核信息字段，用于记录未过审的原因等
3. 新增审核人 id 字段，便于审计操作。比如出现了违规内容过审的情况，可以追责到审核人。
4. 新增审核时间字段，也是便于审计。

对应的 SQL 如下：

```sql
reviewStatus  int      default 0  not null comment '状态：0-待审核, 1-通过, 2-拒绝',
reviewMessage varchar(512)        null comment '审核信息',
reviewerId    bigint              null comment '审核人 id',
reviewTime    datetime            null comment '审核时间'
```

2）如果要实现题库排序功能，可以新增整型的优先级字段，并且根据该字段排序。

该字段还可以用于快速实现题库精选和置顶功能，比如优先级 = 1000 的题库表示精选，优先级 = 10000 的题库表示置顶。

对应的 SQL 如下：

```sql
priority  int  default 0  not null comment '优先级'
```

3）如果要实现题库浏览功能，可以新增题库浏览数字段，每次进入题目详情页时该字段的值 +1，还可以根据该字段对题库进行排序。

对应的 SQL 如下：

```sql
viewNum  int  default 0  not null comment '浏览量'
```

如果要实现用户浏览数（同一个用户浏览数最多 +1），还需要额外的题库浏览记录表。

### 3、题目表

题目表的核心是题目信息（标题、详细内容、标签），SQL 如下：

```sql
-- 题目表
create table if not exists question
(
    id         bigint auto_increment comment 'id' primary key,
    title      varchar(256)                       null comment '标题',
    content    text                               null comment '内容',
    tags       varchar(1024)                      null comment '标签列表（json 数组）',
    answer     text                               null comment '推荐答案',
    userId     bigint                             not null comment '创建用户 id',
    editTime   datetime default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete   tinyint  default 0                 not null comment '是否删除',
    index idx_title (title),
    index idx_userId (userId)
) comment '题目' collate = utf8mb4_unicode_ci;
```

几个重点：

1. 题目标题 title 和题目创建人 userId 是常用的题目搜索条件，所以添加索引提升查询性能。
2. 题目可能有多个标签，为了简化设计，没有采用关联表，而是以 JSON 数组字符串的方式存储，比如 `["Java", "Python"]`。
3. 题目内容（详情）和题目答案可能很长，所以使用 text 类型。

#### 扩展设计

题目表有很多可以扩展的方法，下面举一些例子。

1）如果要实现题目审核功能，可以参考上述题库审核功能，新增 4 个字段即可：

```sql
reviewStatus  int      default 0  not null comment '状态：0-待审核, 1-通过, 2-拒绝',
reviewMessage varchar(512)        null comment '审核信息',
reviewerId    bigint              null comment '审核人 id',
reviewTime    datetime            null comment '审核时间'
```

2）可能有很多评价题目的指标，比如浏览数、点赞数、收藏数，参考字段如下：

```sql
viewNum       int      default 0    not null comment '浏览量',
thumbNum      int      default 0    not null comment '点赞数',
favourNum     int      default 0    not null comment '收藏数'
```

3）如果要实现题目排序、精选和置顶功能，可以参考上述题库表的设计，新增整型的优先级字段，并且根据该字段排序。对应的 SQL 如下：

```sql
priority  int  default 0  not null comment '优先级'
```

4）如果题目是从其他网站或途径获取到的，担心有版权风险，可以增加题目来源字段。最简单的实现方式就是直接存来源名称：

```sql
source   varchar(512)  null comment '题目来源'
```

5）如果想设置部分题目仅会员可见，可以给题目表加上一个 “是否仅会员可见” 的字段，本质上是个布尔类型，用 1 表示仅会员可见。参考 SQL 如下：

```sql
needVip  tinyint  default 0  not null comment '仅会员可见（1 表示仅会员可见）'
```

### 4、题库题目关系表

#### 核心设计

由于一个题库可以有多个题目，一个题目可以属于多个题库，所以需要关联表来实现。

实现基础功能的 SQL 如下：

```sql
-- 题库题目表（硬删除）
create table if not exists question_bank_question
(
    id             bigint auto_increment comment 'id' primary key,
    questionBankId bigint                             not null comment '题库 id',
    questionId     bigint                             not null comment '题目 id',
    userId         bigint                             not null comment '创建用户 id',
    createTime     datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime     datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    UNIQUE (questionBankId, questionId)
) comment '题库题目' collate = utf8mb4_unicode_ci;
```

几个重点：

1. 上述代码中的 userId 表示添加题目到题库的用户 id，仅管理员可操作
2. 由于关联表中的数据记录并没有那么重要（一般由管理员维护），所以直接采用硬删除的方式，如果将题目移出题库，直接删掉对应的数据即可。按照这种设计，createTime 就是题目加入到题库的时间。
3. 通过给题库 id 和题目 id 添加 **联合唯一索引** ，防止题目被重复添加到同一个题库中。而且要注意，将 questionBankId 放到前面，因为数据库中的查询大多是基于 `questionBankId` 进行的，比如查找某个题库中的所有问题，或者在一个题库中查找特定问题，将 `questionBankId` 放在前面符合查询模式，会使得这些查询更加高效（索引的最左前缀原则）。

#### 扩展设计

1）如果要对题库内的题目进行排序，可以增加题目顺序字段（整型）。对应的 SQL 如下：

```sql
questionOrder  int  default 0  not null comment '题目顺序（题号）'
```

需要注意，如果要实现任意移动题目顺序的功能，可能每次要更新多条记录的顺序，比较影响性能。如果追求更高性能的话，可以先在内存中计算出要变更的题目顺序，以减少更新的记录数。比如将第 100 题移动到第 98 题，只需要修改几条记录的顺序，不影响前面的题目。

![img](./assets/202408251304803.png)

## 三、后端项目初始化

1）后端万用模板介绍，核心能力讲解

可以参考万用模板项目的 READMD.md 文件来了解模板的功能和启动方法。

后端万用模板介绍和源码下载：https://www.code-nav.cn/course/1826803928691945473/section/1826872096558985217?contentType=text&type=

2）准备依赖

- MySQL 必须准备 8.x 版本
- Redis 默认不开启（后续教程会用到）
- Elasticsearch 默认不开启（后续教程会用到）
- COS 对象存储，不影响运行

3）执行模板的初始化 SQL 脚本，创建数据库表：

![img](./assets/202408251304814.png)

然后可以尝试运行项目。

4）模板改造

1. 全局替换模块名，由 springboot-init 改为 mianshiya-next-backend（或者自定义）
2. 全局修改包名，重构 `com.yupi.springbootinit` + 全局替换 `springbootinit` 为 `mianshiya`
3. 按需移除不必要的模块，比如 Elasticsearch、微信开发、表格处理、定时任务相关代码。不移除也不影响项目运行。
4. 执行本项目的数据库初始化文件，修改 `application.yml` 配置，更改数据库等配置为自己的（比如将 my_db 改为 mianshiya）

自己做项目的话，一定要用 Git 进行托管，可以看到改动的文件记录。而且修改代码后可以提交一下代码，万一改错了也可以很方便地回滚。

5）启动项目，执行 MainApplication 主类文件即可。

推荐用 Debug 来启动项目，启动成功后，可以通过内置的 Swagger 接口文档来分析接口的请求参数和响应。

地址：http://localhost:8101/api/doc.html#/home

## 四、后端基础开发 - 增删改查

根据需求分析阶段整理好的项目功能，基础开发就是完成几张核心数据库表的增删改查，**先不包含任何复杂的业务逻辑**。

每个模块都要遵循如下的开发流程：

### 1、数据访问层代码生成

使用 MyBatisX 代码生成插件快速得到 mapper 和数据库实体类，生成后移动到项目对应位置（mapper 和 model.entity 包）。

![img](./assets/202408251304975.png) ![img](./assets/202408251304994.png)

然后更改生成的数据库实体类的字段配置，指定主键策略和逻辑删除。

比如题目表，id 默认是连续生成的，容易被爬虫抓取，所以更换策略为 `ASSIGN_ID` 雪花算法生成。示例代码：

```java
public class Question implements Serializable {
    /**
     * id（要指定主键策略）
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    // ...
    
    /**
     * 是否删除（逻辑删除）
     */
    @TableLogic
    private Integer isDelete;
}
```

使用框架的过程中，有任何疑问，都可以在官方文档查阅，比如了解 MyBatis Plus 的主键生成注解：https://baomidou.com/reference/annotation/#tableid

### 2、业务逻辑代码生成

使用万用模板的代码生成器工具（CodeGenerator）生成代码，包括：Controller、Service 接口和实现类、数据模型包装类。

修改生成参数即可使用（用户表可以不生成，因为万用模板已经自带了用户业务逻辑代码）：

![img](./assets/202408251304803.png)

比如修改配置代码如下，生成题库相关的业务逻辑代码：

```java
// 指定生成参数
String packageName = "com.yupi.mianshiya";
String dataName = "题库";
String dataKey = "questionBank";
// 注意，这里需要保持首字母大写
String upperDataKey = "QuestionBank";
```

生成之后，将生成的文件从 generator 包移动到对应的位置即可，包括 controller、service、model.dto、model.vo。

想了解生成代码的原理，自己也做一个生成器，可以学习鱼皮编程导航的 [代码生成器共享平台项目](https://www.code-nav.cn/course/1790980795074654209) 。

### 3、数据模型开发

需要编写数据模型包装类（dto 包的请求类和 vo 包的视图类）、JSON 结构对应的类、枚举类。

**其中，包装类需要根据前端实际传递的请求参数或需要的响应结果自行修改。**

以创建题目请求包装类 QuestionAddRequest 为例，需要保留前端需要的字段，并且将 JSON 字符串字段转换为前端更好理解的数据类型（比如 tags 由 String 转为 List），还有一些由后端自动生成的字段（比如 userId、createTime）就不用写到类里了。代码如下：

```java
@Data
public class QuestionAddRequest implements Serializable {

    /**
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 标签列表
     */
    private List<String> tags;

    /**
     * 推荐答案
     */
    private String answer;

    private static final long serialVersionUID = 1L;
}
```

其他的请求包装类同理，目前我们只实现基本的增删改查包装类，需要仔细地依次过一遍生成的代码，不需要用到的请求类可以移除。比如移除 QuestionBankQuestionEditRequest 类，因为不需要让用户编辑题库和题目的关系。

💡 小技巧：可以结合具体的业务、实体类（比如 Question）、以及创建表的 DDL 语句去编写请求包装类。

#### 扩展

目前的表设计不涉及枚举字段的编写。

如果需要给题目增加审核功能，那么审核状态就是一个枚举字段。作为示例，给大家提供审核状态枚举类代码：

```java
package com.yupi.yudada.model.enums;

import cn.hutool.core.util.ObjectUtil;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 审核状态枚举
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://www.code-nav.cn">编程导航学习圈</a>
 */
public enum ReviewStatusEnum {

    REVIEWING("待审核", 0),
    PASS("通过", 1),
    REJECT("拒绝", 2);

    private final String text;

    private final int value;

    ReviewStatusEnum(String text, int value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 根据 value 获取枚举
     *
     * @param value
     * @return
     */
    public static ReviewStatusEnum getEnumByValue(Integer value) {
        if (ObjectUtil.isEmpty(value)) {
            return null;
        }
        for (ReviewStatusEnum anEnum : ReviewStatusEnum.values()) {
            if (anEnum.value == value) {
                return anEnum;
            }
        }
        return null;
    }

    /**
     * 获取值列表
     *
     * @return
     */
    public static List<Integer> getValues() {
        return Arrays.stream(values()).map(item -> item.value).collect(Collectors.toList());
    }

    public int getValue() {
        return value;
    }

    public String getText() {
        return text;
    }
}
```

其中，getEnumByValue 是通过循环找到枚举值，可以用 Map 缓存所有枚举值来加速查找。

### 4、接口开发

修改生成的 Controller 接口，不需要包含业务逻辑，处理字段不一致的问题、并且将无用的接口移除掉，能跑通就行。

生成的 Controller 接口结构都是一致的，只需要理解一个 Controller，其他的都很简单。

### 5、服务开发

修改生成的 Service 接口和实现类，处理字段不一致的问题，略微调整数据校验、查询条件等代码，能跑通就行。

生成的 Service 结构都是一致的，只需要理解一个，其他的都很简单。

### 6、Swagger 接口文档测试

运行项目，通过访问 Swagger 接口文档来测试增删改查接口能否正常执行。

地址：http://localhost:8101/api/doc.html#/home

## 五、后端核心业务流程开发

### 核心业务接口梳理

根据之前整理的功能列表，分析核心业务流程需要调用的接口：

1）用户模块

- 用户注册：已完成 ✅ 万用模板自带
- 用户登录（账号密码）：已完成 ✅ 万用模板自带
- 【管理员】管理用户 - 增删改查：已完成 ✅ 万用模板自带

2）题库模块

- 查看题库列表：分页获取题库接口，⏰ 已通过生成器生成，需要确认
- 查看题库详情（展示题库下的题目）：⏰ 根据 id 获取题库详情接口，需要开发
- 【管理员】管理题库 - 增删改查：⏰ 已通过生成器生成，需要确认

3）题目模块

- 题目搜索：分页获取题目接口，⏰ 已通过生成器生成，需要确认
- 查看题目详情（进入刷题页面）：⏰ 根据 id 获取题目详情接口，需要确认
- 【管理员】管理题目 - 增删改查：⏰ 已通过生成器生成，需要确认
- 【管理员】按照题库查询题目：⏰ 根据题库 id 获取题目列表，需要开发
- 【管理员】修改题目所属题库等：⏰ 修改题目所属题库接口，需要开发

然后通过接口文档来完整测试一遍业务流程即可。

### 1、确认和完善接口

1）查看题库列表：分页获取题库接口

需要修改题库的校验规则（validQuestionBank）和查询条件（getQueryWrapper）

2）题目搜索：分页获取题目接口

需要修改题库的校验规则（validQuestion）和查询条件（getQueryWrapper）

3）【管理员】管理题库 - 增删改查

创建、删除、编辑接口需要补充仅管理员可用的注解

```java
@AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
```

4）【管理员】管理题目 - 增删改查

创建、删除、编辑接口需要补充仅管理员可用的注解

5）查看题目详情（进入刷题页面）：根据 id 获取题目详情接口

该接口正常，不用修改

### 2、根据题库查询题目列表接口

#### 分析

需求：根据题库 id 查询题目列表

分析：由于同一个题库内的题目不会很多，为了简化实现，可以直接获取全部题目。注意，这个功能要抽象成 service 方法，便于后续的获取题库详情接口复用。

由于题目和题库是通过关联表维护关系的，所以在查询时，要先通过查询关联表得到题目 id，再根据 id 从题目表查询到题目的完整信息。

有 2 种实现方式：

1）通过 SQL 的 join 联表查询

示例 SQL 如下：

```sql
SELECT 
    q.id,
    q.title,
    q.content,
    q.tags,
    q.answer,
    q.userId,
    q.createTime,
    q.updateTime
FROM 
    question_bank_question qbq
JOIN 
    question q 
ON 
    qbq.questionId = q.id
WHERE 
    qbq.questionBankId = ?;  -- 在这里替换 ? 为具体的题库 id
```

2）业务层分步查询

要先通过查询关联表得到题目 id，再把 id 放到集合中，根据 id 使用 in 查询从题目表查询到题目的完整信息。

此处选择第二种方式，因为关联逻辑并不复杂、数据量也不大，业务层实现更灵活，也便于组合其他条件去过滤题目列表。

注意，如果要对题目题库关联表和题目表同时进行过滤和分页查询，那么考虑使用 SQL 的 join 实现，因为业务层处理多表分页比较麻烦。

#### 开发

1）请求参数为 questionBankId，直接补充到题目查询请求类 QuestionQueryRequest：

```java
public class QuestionQueryRequest extends PageRequest implements Serializable {

    // 省略其他字段。。。
    
    /**
     * 题库 id
     */
    private Long questionBankId;
}
```

2）该接口本质上还是查询题目列表，可以把题库 id 当做一个过滤题目的查询条件，所以应该在 QuestionService 中编写一个通用的分页获取题目列表的方法。

代码如下：

```java
public Page<Question> listQuestionByPage(QuestionQueryRequest questionQueryRequest) {
    long current = questionQueryRequest.getCurrent();
    long size = questionQueryRequest.getPageSize();
    // 题目表的查询条件
    QueryWrapper<Question> queryWrapper = this.getQueryWrapper(questionQueryRequest);
    // 根据题库查询题目列表接口
    Long questionBankId = questionQueryRequest.getQuestionBankId();
    if (questionBankId != null) {
        // 查询题库内的题目 id
        LambdaQueryWrapper<QuestionBankQuestion> lambdaQueryWrapper = Wrappers.lambdaQuery(QuestionBankQuestion.class)
                .select(QuestionBankQuestion::getQuestionId)
                .eq(QuestionBankQuestion::getQuestionBankId, questionBankId);
        List<QuestionBankQuestion> questionList = questionBankQuestionService.list(lambdaQueryWrapper);
        if (CollUtil.isNotEmpty(questionList)) {
            // 取出题目 id 集合
            Set<Long> questionIdSet = questionList.stream()
                    .map(QuestionBankQuestion::getQuestionId)
                    .collect(Collectors.toSet());
            // 复用原有题目表的查询条件
            queryWrapper.in("id", questionIdSet);
        }
    }
    // 查询数据库
    Page<Question> questionPage = this.page(new Page<>(current, size), queryWrapper);
    return questionPage;
}
```

上述代码中，有几个学习重点：

1. 查询关联表的时候，不要 select 所有字段，只取 questionId 就够了，可以提升性能。
2. 注意判断通过关联表查询到的题目数量，如果为空，不用再作为查询条件。
3. 从关联表查到的虽然只有一个字段，但返回的还是对象，所以需要使用 Lambda 表达式转换成题目 id 集合。
4. 把题库 id 通过关联表转换为了多个题目 id，巧妙地复用了原有的题目过滤条件（QueryWrapper），可以同时支持按照题库 id 和标题等其他条件来搜索题目。

### 3、获取题库详情接口

#### 分析

需求：根据题库 id 获取题库详情，同时可能需要查询到题库内的题目列表。

分析：可以用一个字段来控制是否要关联查询题目列表，前端可以根据不同的场景，给该字段传入不同的值。这样一来，对于有些不需要关联查询题目列表的页面，就能减少性能损耗。

实现过程比较简单，先从题库表查询出题库信息，然后复用上一步中已开发好的“根据题库 id 获取题目列表”的 Service 获取到题目列表，再封装返回值即可。

#### 开发

1）因为获取题库详情接口其实也是对题库的查询，所以可以给 QuestionBankQueryRequest 增加字段 needQueryQuestionList，用于控制是否要关联查询题目列表。默认为 false，表示不查询。

代码如下：

```java
public class QuestionBankQueryRequest extends PageRequest implements Serializable {
    // 省略其他字段...
    
    /**
     * 是否要关联查询题目列表
     */
    private boolean needQueryQuestionList;

    private static final long serialVersionUID = 1L;
}
```

2）封装题库详情响应类，补充题目列表分页。代码如下：

```java
public class QuestionBankVO implements Serializable {
    // 省略其他字段...
    
    /**
     * 题库里的题目列表（分页）
     */
    Page<Question> questionPage;
}
```

此处也可以改为补充列表而不是分页，根据自己后续的实际需求调整即可。

3）在 QuestionBankController 中修改“根据 id 获取题库”封装类的接口，代码如下：

```java
@GetMapping("/get/vo")
public BaseResponse<QuestionBankVO> getQuestionBankVOById(QuestionBankQueryRequest questionBankQueryRequest, HttpServletRequest request) {
    ThrowUtils.throwIf(questionBankQueryRequest == null, ErrorCode.PARAMS_ERROR);
    Long id = questionBankQueryRequest.getId();
    ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
    // 查询数据库
    QuestionBank questionBank = questionBankService.getById(id);
    ThrowUtils.throwIf(questionBank == null, ErrorCode.NOT_FOUND_ERROR);
    // 查询题库封装类
    QuestionBankVO questionBankVO = questionBankService.getQuestionBankVO(questionBank, request);
    // 是否要关联查询题库下的题目列表
    boolean needQueryQuestionList = questionBankQueryRequest.isNeedQueryQuestionList();
    if (needQueryQuestionList) {
        QuestionQueryRequest questionQueryRequest = new QuestionQueryRequest();
        questionQueryRequest.setQuestionBankId(id);
        Page<Question> questionPage = questionService.listQuestionByPage(questionQueryRequest);
        questionBankVO.setQuestionPage(questionPage);
    }
    // 获取封装类
    return ResultUtils.success(questionBankVO);
}
```

注意，这段逻辑如果觉得过于复杂，也可以考虑封装到 getQuestionBankVO 方法中。

### 4、修改题目所属题库接口

#### 分析

需求：根据题目 id 和题库 id，修改题目所属题库。

分析：修改的本质是添加和删除，是两个动作。

- 如果题目未加入到该题库，则管理员可以添加题目到题库，在题库题目关联表中加一条记录。
- 如果题目已加入到该题库，则管理员可以从题库移除题目，需要将关联表已有的记录删除。

所以需要分别开发 2 个接口：创建题库题目关联、移除题库题目关联。

由于题库题目关联表已经添加了 `题库 id、题目 id` 的唯一性约束，不用担心重复添加脏数据，做好异常处理即可。

#### 创建题库题目关联

1）之前已经通过生成器得到了创建关联的 Controller 接口代码，只需要补充数据不存在的校验。修改 QuestionBankQuestionServiceImpl 的 validQuestionBankQuestion 方法，进行校验。代码如下：

```java
@Override
public void validQuestionBankQuestion(QuestionBankQuestion questionBankQuestion, boolean add) {
    ThrowUtils.throwIf(questionBankQuestion == null, ErrorCode.PARAMS_ERROR);
    // 题目和题库必须存在
    Long questionId = questionBankQuestion.getQuestionId();
    if (questionId != null) {
        Question question = questionService.getById(questionId);
        ThrowUtils.throwIf(question == null, ErrorCode.NOT_FOUND_ERROR, "题目不存在");
    }
    Long questionBankId = questionBankQuestion.getQuestionBankId();
    if (questionBankId != null) {
        QuestionBank questionBank = questionBankService.getById(questionBankId);
        ThrowUtils.throwIf(questionBank == null, ErrorCode.NOT_FOUND_ERROR, "题库不存在");
    }
}
```

因为 QuestionService 和 QuestionBankQuestionService 互相引用，会导致循环依赖问题，让项目无法启动。可以通过给 QuestionBankQuestionServiceImpl 中引用 QuestionService 的位置加上 `@Lazy` 注解解决。

```java
@Resource
@Lazy
private QuestionService questionService;
```

2）注意，需要给创建关联接口补充“仅管理员”的权限：

```java
@PostMapping("/add")
@AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
public BaseResponse<Long> addQuestionBankQuestion(
    @RequestBody QuestionBankQuestionAddRequest questionBankQuestionAddRequest,
    HttpServletRequest request) {}
```

#### 移除题库题目关联

1）编写请求类：

```java
/**
 * 删除题目题库关系请求
 */
@Data
public class QuestionBankQuestionRemoveRequest implements Serializable {
    /**
     * 题库 id
     */
    private Long questionBankId;

    /**
     * 题目 id
     */
    private Long questionId;

    private static final long serialVersionUID = 1L;
}
```

2）编写接口：

```java
@PostMapping("/remove")
@AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
public BaseResponse<Boolean> removeQuestionBankQuestion(
        @RequestBody QuestionBankQuestionRemoveRequest questionBankQuestionRemoveRequest
) {
    // 参数校验
    ThrowUtils.throwIf(questionBankQuestionRemoveRequest == null, ErrorCode.PARAMS_ERROR);
    Long questionBankId = questionBankQuestionRemoveRequest.getQuestionBankId();
    Long questionId = questionBankQuestionRemoveRequest.getQuestionId();
    ThrowUtils.throwIf(questionBankId == null || questionId == null, ErrorCode.PARAMS_ERROR);
    // 构造查询
    LambdaQueryWrapper<QuestionBankQuestion> lambdaQueryWrapper = Wrappers.lambdaQuery(QuestionBankQuestion.class)
            .eq(QuestionBankQuestion::getQuestionId, questionId)
            .eq(QuestionBankQuestion::getQuestionBankId, questionBankId);
    boolean result = questionBankQuestionService.remove(lambdaQueryWrapper);
    return ResultUtils.success(result);
}
```

逻辑并不复杂，所以就直接在 Controller 编写了。有时间的话，可以再移动到 Service 中。

#### 扩展

1）如果用同样的参数多次调用“创建题库题目关联接口”，会因为数据库的唯一性约束导致 `org.springframework.dao.DuplicateKeyException` 异常，然后会被全局异常处理器处理返回“系统错误”。可以针对这种情况进行异常捕获，并优化报错文案，比如“不能重复加入”。

2）如果给题库表增加题目总数字段，则修改题目所属题库时，要同时更新题库表的题目总数，涉及多表操作，需要使用事务实现。

------

开发完所有接口后，使用 Swagger 对整个流程进行测试即可。



# 3 - 前端模板开发

## 本节重点

学习前端服务端渲染网站模板的开发，并且完成面试刷题平台 Web 前端的部分基础页面，包括：

- 需求分析
- Web 前端技术选型
- Next.js 前端万用模板开发（Web 前端项目初始化）

## 一、需求分析

### 需求列表

#### 基础功能（均为 P0）

- 用户模块
- - 用户注册
  - 用户登录（账号密码）
  - 【管理员】管理用户 - 增删改查
- 题库模块
- - 查看题库列表
  - 查看题库详情（展示题库下的题目）
  - 【管理员】管理题库 - 增删改查
- 题目模块
- - 题目搜索
  - 查看题目详情（进入刷题页面）
  - 【管理员】管理题目 - 增删改查（比如按照题库查询题目、修改题目所属题库等）

#### 高级功能（均为 P1 ~ P2）

- 题目批量管理 P1
- - 【管理员】批量向题库添加题目
  - 【管理员】批量从题库移除题目
  - 【管理员】批量删除题目
- 分词题目搜索 P1
- 用户刷题记录日历图 P1
- 自动缓存热门题目 P2
- 网站流量控制和熔断 P2
- 动态 IP 黑白名单过滤 P2
- 同端登录冲突检测 P2
- 分级题目反爬虫策略 P2

### 本节预期完成的需求

不涉及复杂的业务，仅开发通用的用户注册登录和数据管理能力。

- 用户模块
- - 用户注册 ✅
  - 用户登录（账号密码）✅
  - 【管理员】管理用户 - 增删改查 ✅
- 题库模块
- - 【管理员】管理题库 - 增删改查 ✅
- 题目模块
- - 【管理员】管理题目 - 增删改查 ✅

## 二、Web 前端技术选型

### 本项目选型

- React 18 框架
- ⭐️ Next.js 服务端渲染
- ⭐️ Redux 状态管理
- Ant Design 组件库
- 富文本编辑器组件
- ⭐️ 前端工程化：ESLint + Prettier + TypeScript
- ⭐️ OpenAPI 前端代码生成

其中，Next.js 服务端渲染技术是本项目学习的重点，也是前端开发的技术亮点。

### 服务端渲染介绍

#### 1、什么是客户端和服务端渲染？

网站渲染可以在服务端和客户端两种环境下进行。

![img](./assets/202408311533171.png)

在客户端渲染（Client-Side Rendering，CSR）中，客户端（浏览器）会先向服务器请求 HTML 文件，服务器会返回一个基础的 HTML 文件，其中包含必要的 JavaScript 脚本。这些脚本在浏览器端运行，动态请求后端的数据、生成网页内容并渲染到页面上。

服务端渲染（Server-Side Rendering，SSR） 是一种将网页在 **服务器端** 生成并渲染为 HTML 内容的技术。在这种方式下，当用户请求一个网页时，服务器会提前调用后端能获取数据并生成完整的 HTML 文档，然后将其发送到客户端（浏览器）。浏览器接收到 HTML 后，直接展示页面内容，不用再动态地向后端发送请求来获取数据。

服务端渲染的工作流程通常如下：

1. 用户发送请求到服务器
2. 服务器处理请求，调用后端获取数据，并生成完整的 HTML 页面
3. 服务器将生成的 HTML 页面返回给客户端（浏览器）
4. 浏览器接收到 HTML 后，直接渲染页面

#### 2、客户端和服务端渲染的区别？

客户端渲染和服务端渲染的主要区别在于渲染过程发生的地点。

由于 Ajax、Vue、React 等新技术的崛起，大多数学前端的同学开发的网站都是基于客户端渲染实现的，客户端渲染的优点主要是：

1. 开发方便灵活：开发者不需要区分哪些数据要在服务端加载、哪些数据要在客户端加载，也不用担心哪些 API 无法在服务端使用。便于实现更加复杂和动态的用户界面，适合构建单页应用（SPA）和需要频繁交互的应用。
2. 减少服务器压力：由于渲染工作由客户端（用户自己的电脑）完成，因此服务器的负载相对较小，只需要提供静态资源（比如使用 Nginx 就能完成部署）。

以我们的 [编程导航网站](https://www.code-nav.cn/) 为例，就使用了客户端渲染，可以看到刚开始加载的 HTML 文档并不包含网站的数据，只有一个标题、以及一个 JS 脚本。

![img](./assets/202408311533199.png)

浏览器会执行该脚本，并触发后续的数据加载流程，逐渐加载显示整个页面，所以看到请求的过程是断断续续的。

![img](./assets/202408311533209.png)

而我们的 [面试刷题网站 - 面试鸭](https://www.mianshiya.com/) 使用的是服务端渲染，可以看到，服务端返回的 HTML 文档中，就已经有完整的网站数据和样式了：

![img](./assets/202408311533216.png)

服务端渲染的好处是：

1. 减少初始加载时间：SSR 页面可以在首次加载时展示完整内容，减少白屏时间，而 CSR 通常需要等待 JavaScript 加载和执行后才能展示内容。
2. SEO 友好：SSR 更有利于 SEO，因为搜索引擎爬虫能够直接抓取完整页面的内容，而不依赖于 JavaScript 执行。

但相应的，SSR 将渲染任务交给服务器，可能会增加服务器的负载和压力。所以 SSR 更适合追求性能和 SEO 的企业级项目。

能够实现服务端渲染的技术很多，以前有 Java 的 JSP、PHP 等等，现在有基于 React 的 Next.js 和基于 Vue 的 Nuxt.js 框架，可以让你直接用前端的语法开发服务端渲染项目。

#### 3、其他渲染方式 - 静态网站生成

静态网站生成（Static Site Generation，SSG）是一种在构建阶段生成静态 HTML 文件的技术。与服务端渲染不同，静态网站生成是在构建时（而不是用户请求时）生成页面，所有页面都以静态文件的形式存在。

这种方式本质上也是客户端渲染，但是不需要由客户端再动态地向后端发送请求来获取数据，这些静态文件可以直接由内容分发网络（CDN）或静态服务器提供。

优点：

1. 高性能：由于服务器仅需提供静态文件，性能极高；而且由于数据不变化，特别适合通过 CDN 缓存加速。
2. SEO 友好：搜索引擎最喜欢的就是静态 HTML 文件，可以轻松索引并提升 SEO 效果。
3. 简化基础设施：无需复杂的前后端交互逻辑，静态文件的部署和维护成本较低。

缺点：

1. 动态内容有限：SSG 适合内容变化不频繁的场景，对于需要实时更新内容的网站，生成静态页面可能不够灵活。
2. 构建时间：生成大量静态页面时，构建时间可能较长，特别是数据量大的时候。

基于这些优缺点，静态网站生成适合内容数量有限的、内容基本不变的网站，比如个人博客。像 VuePress、Hugo、Hexo、Astro 都是主流的静态网站生成器。

[鱼皮的编程宝典](https://www.codefather.cn/) 就是基于 VuePress 开发的，模板也开源到了 GitHub 上：https://github.com/liyupi/codefather

![img](./assets/202408311533225.png)

随着静态网站内容越来越多，每次构建会越来越慢，这种情况下，可以采用增量静态生成技术。

增量静态生成（Incremental Static Regeneration，ISR）允许部分页面在构建之后进行更新，而无需重新构建整个站点。这种技术适用于那些大多数内容不变、但某些部分需要动态更新的网站。

工作流程：

1. 在构建阶段，生成初始的静态页面。
2. 当页面内容更新时，通过配置的再生成间隔，静态页面可以增量更新，而不是重新生成整个站点，大幅减少构建时间。
3. 用户请求时，如果页面内容过期或更新，则后台自动生成新的静态页面并缓存。

这样一来，可以在享受静态网站高性能、SEO 友好特性的同时，及时更新网站的内容，并减少构建时间。

不过缺点就是架构更复杂、维护成本更高。但值得一提的是，很多大型网站为了做 SEO 优化，专门把动态网站转为静态 HTML（静态化）。

#### 4、结合使用（推荐）

实际情况下，前面讲到的几种方式可以结合使用。

比如 **部分预渲染**（Partial Prerendering，PPR）是一种将服务端渲染（或静态生成）与客户端渲染结合的技术。

工作流程：

1. 在构建阶段或请求阶段，页面的静态部分预先渲染（如导航栏、页脚等）。
2. 页面加载时，静态部分直接显示，动态部分由 JavaScript 在客户端加载并渲染。
3. 通过水合（Hydration）过程，客户端的 JavaScript 接管已经渲染的静态内容，并继续处理动态交互。

这样一来，兼具了 SSR 的 SEO 友好和快速初始加载、以及 CSR 灵活动态交互的优点。

![img](./assets/202408311533233.png)

还有一个跟部分预渲染相似的概念叫 **同构渲染** ，是指同一套代码可以在服务端和客户端运行，并在服务端渲染页面的初始内容，然后在客户端接管渲染和交互。

实际情况下鱼皮也更推荐用这种方式，本项目鱼皮也会带大家使用主流的、新版本的 Next.js 框架实现同构渲染。下面先从 0 开始带大家做一个基于 Next.js 的前端万用项目模板。

## 三、Next.js 前端万用模板开发

自主打造一套前端开发项目模板！

### 确认环境！！！

打开 Next.js 的官方文档：https://nextjs.org/docs/getting-started/installation （注意不要看成国内的文档了，不够新）

本次我们要使用的是 14 版本的 Next.js，可以看到 Node.js 的版本要求必须 >= 18.18，一定要注意！

检测命令：

```shell
node -v
```

切换和管理 node 版本的工具：https://github.com/nvm-sh/nvm

```shell
npm -v
```

Next.js 有 2 种开发模式，注意，本项目用的是新的开发模式 App Router，不要看错了文档：

![img](./assets/202408311533030.png)

### 创建项目

直接按照官方文档的指引，使用 Npm 自带的 Npx 脚手架工具 `create-next-app` 来自动安装 Next.js 初始化项目：https://nextjs.org/docs/getting-started/installation#automatic-installation

执行安装命令：

```shell
npx create-next-app@latest
```

其中，latest 表示当前脚手架的最新版本。鱼皮使用的 `create-next-app` 脚手架版本是 `14.2.6`，可以在 [npm 包管理器网站](https://www.npmjs.com/package/create-next-app?activeTab=versions) 查看版本情况。如果 latest 版本安装失败或者后续跟鱼皮的项目不一致，建议把命令中的 latest 替换为 `14.2.6`。

![img](./assets/202408311533090.png)

如果报了 “找不到命令” 错误，那么建议去 Node.js 官网重新安装 Npm，自动重新帮你配置环境变量。

脚手架可以帮我们自动整合 React、Next.js、TypeScript 语法、ESLint 校验等库，按下面的方式选择即可：

![img](./assets/202408311533111.png)

脚手架会自动生成代码并安装依赖，如果安装依赖卡住，可能需要更换 Npm 镜像为国内源：

```shell
npm config set registry https://registry.npmmirror.com/
```

然后用 WebStorm 打开项目，在终端执行 `npm run dev` 命令，能访问到网页就成功了。

![img](./assets/202408311533131.png)

运行效果如图：

![img](./assets/202408311533258.png)

生成的项目代码已经默认使用 Git 版本控制系统进行托管，建议大家在后续开发模板和项目的过程中，多分步骤提交，便于回顾开发进度、除了问题也能快速回滚。

### 前端工程化配置

脚手架已经帮我们配置了 ESLint 自动校验、TypeScript 类型校验，但一般情况下，我们还需要代码自动格式化插件 Prettier，需要手动整合。

整合多个工具时，很容易出现版本冲突的问题，尤其是 ESlint 和 Prettier 整合时，校验规则可能也会存在冲突。所以最好按照官方文档的指引，比如：https://nextjs.org/docs/app/building-your-application/configuring/eslint#prettier

先去官网安装 prettier（ https://prettier.io/docs/en/install ），执行命令：

```shell
npm install --save-dev --save-exact prettier
```

然后通过命令安装整合包 eslint-config-prettier：

![img](./assets/202408311533280.png)

然后修改项目文件 `.eslintrc.json` 的配置：

![img](./assets/202408311533725.png)

最后需要在 Webstorm 里开启代码美化插件：

![img](./assets/202408311533771.png)

在任意一个 tsx 文件中执行格式化快捷键（Ctrl + Alt + L），不报错，表示配置工程化成功。

修改 .eslintrc.json 文件可以改变校验规则，一般自己做项目不需要修改，具体可以到 ESLint 和 Prettier 的官方文档查看。

如果不使用脚手架，就需要自己按照下面这些文档整合这些工具：

- 代码规范：https://eslint.org/docs/latest/use/getting-started
- 代码美化：https://prettier.io/docs/en/install.html
- 直接整合：https://github.com/prettier/eslint-plugin-prettier#recommended-configuration （包括了 https://github.com/prettier/eslint-config-prettier#installation ）

### 引入组件库

1）Ant Design 是 React 项目主流的组件库，Ant Design Procomponents 是在此基础上进一步封装的高级业务组件库，一般的项目使用这两个就足够了，我们的 [面试鸭](https://www.mianshiya.com/) 用的就是这些，完全满足需求。

参考官方文档在 Next.js 项目中引入 Ant Design 5.x 版本的组件库：https://ant-design.antgroup.com/docs/react/use-with-next-cn

执行安装：

```shell
npm install antd --save
```

针对 App Router 模式的 Next.js，需要处理页面闪动的情况：

```shell
npm install @ant-design/nextjs-registry --save
```

修改页面全局布局文件 `app/layout.tsx`：

```tsx
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
```

测试一下，随便在 `app/page.tsx` 引入一个组件，如果显示出来，就表示引入成功。

![img](./assets/202408311533789.png)

效果如图：

![img](./assets/202408311533854.png)

注意，引入 Ant Design 后，个人不建议再引入 Tailwind CSS 了，可能会有样式冲突问题。

2）引入 Ant Design 后，我们还可以引入 Ant Design Procomponents，参考 [官方文档](https://procomponents.ant.design/docs) 执行下列命令即可：

```tsx
npm i @ant-design/pro-components --save
```

当前 ProComponents **每一个组件都是一个独立的包**，需要在你的项目中安装对应的 npm 包并使用。比如使用 ProTable 表格组件，还需要安装 `@ant-design/pro-table`。

3）引入组件库后，可以清理掉 `app/globals.css` 中的样式，减少样式冲突。

修改为如下样式，减少浏览器默认样式的影响：

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  max-height: 100vh;;
}
```

### Next.js 开发规范

对于一个新项目，定义统一的开发规范是至关重要的。一般我们可以通过使用的技术框架的官方文档找到官方推荐的 **最佳实践**。比如可以在 Next.js 官方文档搜索 “best practices”：

![img](./assets/202408311533042.png)

这种方式适合有一定水平和文档阅读能力的同学，下面鱼皮给大家分享一些开发规范。

#### 1、约定式路由

Next.js 使用 **约定式路由**，根据文件夹的结构和名称，自动将对应的 URL 地址映射到页面文件。

常见的几种路由规则如下：

1）基础规则：以 app 目录作为根路径，根据文件夹的名称和嵌套层级，自动映射为 URL 地址。注意，只有目录下直接包含 page 文件（js、jsx、ts、tsx 都支持），才会被识别为路由。

![img](./assets/202408311533070.png)

2）路由组：可以通过 `(xxx)` 语法，创建一个路由组，不会被转化为路径，可用于对路由进行分组管理，比如同组路由使用同一套布局。

![img](./assets/202408311533269.png)

3）动态路由：可以通过 `[xxx]` 语法，让多个不同参数的 URL 复用同一个页面，比如 `app/question/[questionId]/page.tsx` 中 questionId 就是动态路由参数，可以匹配 `/question/1`、`/question/2` 等 URL 地址，在页面中可以获取到 questionId 并加载不同的题目。

```tsx
export default function Page({ params }: { params: { questionId: string } }) {
  return <div>我的题目: {params.questionId}</div>
}
```

以上只是 Next.js 的几种常用路由规则，还有其他的规则，详情可以见 Next.js 的官方文档：https://nextjs.org/docs/app/building-your-application/routing

#### 2、静态资源

Next.js 约定在 `/public` 目录下存放静态资源。在其中新建 assets 目录，可以在里面存放图片等静态资源文件，比如网站的 Logo。

对应官方文档：https://nextjs.org/docs/app/building-your-application/optimizing/static-assets

![logo.png](./assets/tIzm1cZTBQg9oiwQ.png)

然后就可以用 Next.js 的 `Image` 组件加载静态资源，比如：

```tsx
<Image src={`/assets/logo.png`} alt={alt} width="64" height="64" />
```

Next.js 会针对该组件进行特定的图像优化，提升性能。

注意，某些特殊的、常用的元信息文件不是放在 public 目录下，而是应该根据特定规则放在 app 目录下！

对应官方文档：https://nextjs.org/docs/app/api-reference/file-conventions/metadata

比如将 favicon.ico 放到 app 的根目录下，可展示站点小图标：

![img](./assets/202408311533293.png)

[📎favicon.ico.zip](https://yuyuanweb.yuque.com/attachments/yuque/0/2024/zip/398476/1724944134674-94e22dc4-f7cc-4f78-b32a-94ddabf66520.zip)

将 robots.txt 放到 app 的根目录下，可用于告诉搜索引擎爬虫能否访问特定的页面、以及站点地图的地址，比如：

```tsx
User-Agent: *
Allow: /
Disallow: /private/

Sitemap: https://mianshiya.com/sitemap.xml
```

#### 3、文件组织形式

首先，项目中的每个页面和组件都是单独的文件夹。

基于 Next.js 的约定式路由，我们每个页面目录内需要添加 `page.tsx` 页面文件和 index.css 样式文件；每个组件目录内添加 `index.tsx` 页面文件和 index.css 样式文件。

对于项目中多页面公用的组件，放在 `src/components` 目录下；对于某个页面私有的组件，放在该页面的 components 目录下。

#### 4、页面开发规范

Next.js 支持 React 的语法，可以用函数的方式声明页面和组件。每个页面的根元素必须有 id、每个组件根元素必须有 className，用于控制样式和快速定位。

**为了区分服务端和客户端渲染，每个页面（或组件）都必须在开头显示编写 "use client" 或 "use server"**

比如定义一个客户端渲染的页面，代码如下：

```tsx
"use client";
// 引入样式
import "./index.css";

// 主页
export default function HomePage() {
  return (
    <main id="homePage">
      <div>
        程序员鱼皮x编程导航的项目教程
      </div>
    </main>
  );
}
```

2）定义组件的时候，需要使用 TypeScript 声明组件属性的类型，比如：

```tsx
"use client";
import { Viewer } from "@bytemd/react";
import "./index.css";

interface Props {
  value?: string;
}

const MdViewer = (props: Props) => {
  const { value = "" } = props;

  return (
    <div className="md-viewer">
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};

export default MdViewer;
```

#### 5、其他注意事项

1）开发时要严格注意 TypeScript 的类型和编辑器的错误提示，并且定期打包构建。因为 Next.js 的构建要求非常严格，稍有不慎就会报错。构建报错的话，注意查看和处理构建中的报错信息。

2）在项目中慎用 window 等浏览器环境才支持的对象，服务端无法使用。注意保证客户端渲染页面和服务端渲染页面的一致性，否则会出现水合错误。

### 全局通用布局

所谓的布局，是指在多个页面间复用的 UI 元素，比如导航栏。

Next.js 支持全局根布局（每个页面都会生效）以及嵌套布局（可以只对部分页面生效），详情可 [参考文档](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#layouts)。

![img](./assets/202408311533307.png)

#### 基础布局结构

在 src 下新建 layouts 目录，用于存放项目中的各种布局。在该目录下新建一个布局 `BasicLayout`， 是一个文件夹，包括 index.tsx 页面和 index.css 样式文件。

可以直接使用 [Ant Design Procomponents 的布局组件](https://procomponents.ant.design/components/layout) 快速实现包含导航栏、内容、底部栏的响应式布局。

找一个和自己预期最符合的组件 Demo，复制代码并按需修改即可，比如 [基础布局示例](https://procomponents.ant.design/components/layout?tab=api#packages-layout-src-components-layout-tab-api-demo-base)：

![img](./assets/202408311533364.png)

在 app 目录下的 layout.tsx 全局布局文件（可以理解为页面入口）中引入 BasicLayout：

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <BasicLayout>{children}</BasicLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
```

💡 可以将 lang="en" 改为 lang="zh"，适配国内用户访问。

然后按需精简和修改 BasicLayout 中复制来的布局代码，直到项目可以正常运行并符合预期。

整个过程中，需要注意下面这些事项：

1）页面开头添加 "use client" 声明，表示客户端渲染

2）移除 useState、将获取 pathname 改为使用 Next.js 的 usePathname 钩子获取

3）移除无用代码，比如 token、siderMenuType

4）定义布局的 children 属性：

```typescript
interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  // ...
}
```

5）修改菜单渲染函数：

```typescript
// 菜单渲染
menuItemRender={(item, dom) => (
  <Link href={item.path || "/"} target={item.target}>
    {dom}
  </Link>
)}
```

6）移除 window 对象的使用，解决服务端和客户端水合不一致的问题

#### 全局底部栏

在 src 下新建 components 目录，表示全局公用组件。

创建全局底部栏 GlobalFooter，通常用于展示版权信息，简单一点就好：

```tsx
import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 *
 * @author yupi
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>© {currentYear} 面试刷题平台</div>
      <div>
        <a href="https://www.code-nav.cn" target="_blank">
          作者：编程导航 - 程序员鱼皮
        </a>
      </div>
    </div>
  );
}
```

样式代码如下：

```css
.global-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #efefef;
  text-align: center;
  padding: 16px;
}
```

然后可以在 ProLayout 中渲染：

```tsx
footerRender={() => <GlobalFooter />}
```

需要在 BasicLayout 的样式文件中补充底部内边距，否则有些内容可能会被底部栏遮挡住。示例样式如下：

```css
.ant-pro-layout .ant-pro-layout-content {
  padding-bottom: 96px !important;
}
```

#### 全局顶部导航栏

可以直接利用 Ant Design Procomponents 的 ProLayout 组件实现，不用自己编写。

将 ProLayout 的 layout 属性设置为 top，可开启顶部导航栏：

```tsx
<ProLayout
  layout="top"
/>
```

ProLayout 将顶部导航栏从左到右分为几个区：标题区、菜单区、操作区、头像区

![img](./assets/202408311533575.png)

1）标题区：用于展示网站图标和标题

对应 ProLayout 的代码如下：

```tsx
// 标题渲染
headerTitleRender={(logo, title, _) => {
  return (
    <a href="https://www.mianshiya.com" target="_blank">
      {logo}
      {title}
    </a>
  );
}}
```

该渲染函数有 logo 和 title 参数，可以在 ProLayout 中添加对应的属性，以展示网站图标和标题。

```tsx
<ProLayout
  title="面试鸭刷题平台"
  logo={
    <Image
      src="/assets/logo.png"
      alt="面试鸭刷题网站"
      width={32}
      height={32}
    />
  }
>
```

效果如下：

![img](./assets/202408311533595.png)

2）菜单区：用于展示导航栏的菜单，供用户切换页面

对应 ProLayout 的代码如下：

```tsx
// 菜单项数据
menuDataRender={() => {
  return [
    {
      path: "/",
      name: "主页",
    },
    {
      path: "/banks",
      name: "题库",
    },
  ];
}}
// 菜单渲染
menuItemRender={(item, dom) => (
  <Link href={item.path || "/"}>{dom}</Link>
)}
```

上述代码提供了两个函数，分别用于指定菜单项数据、菜单的渲染元素。

效果如下：

![img](./assets/202408311533671.png)

3）操作区：可用于配置右侧的操作栏，比如搜索条、小按钮等。

移动端可以不展示操作，对应 ProLayout 的代码如下：

```tsx
// 操作渲染
actionsRender={(props) => {
  if (props.isMobile) return [];
  return [
    <SearchInput key="search" />,
    <a
      key="github"
      href="https://github.com/liyupi/mianshiya-next"
      target="_blank"
    >
      <GithubFilled key="GithubFilled" />
    </a>,
  ];
}}
```

效果如下：

![img](./assets/202408311533753.png)

4）头像区：用于展示登录用户头像、用户昵称，鼠标悬浮上去还可以展示更多用户有关的操作按钮

对应 ProLayout 的代码如下：

```tsx
avatarProps={{
  src: "/assets/logo.png",
  size: "small",
  title: "鱼皮鸭",
  render: (props, dom) => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "退出登录",
            },
          ],
        }}
      >
        {dom}
      </Dropdown>
    );
  },
}}
```

整个顶部栏的效果如图：

![img](./assets/202408311533761.png)

#### 导航菜单配置

可以通过独立的配置文件更方便地修改导航菜单项，不用每次都修改布局代码。

实现步骤如下：

1）在 `/config` 目录下编写通用配置文件 `menus.tsx`，核心是菜单项数组，可以用 ProLayout 提供的 TypeScript 类型来规范：

```tsx
import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";

// 菜单列表
const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    name: "面试鸭",
    path: "https://mianshiya.com",
    target: "_blank",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
      }
    ],
  },
] as MenuDataItem[];

// 导出
export default menus;
```

2）在全局布局的 ProLayout 中引入菜单数据：

```tsx
// 菜单项数据
menuDataRender={() => {
  return menus;
}}
```

可以看到如下效果：

![img](./assets/202408311533833.png)

3）同步路由的更新到菜单项高亮

同步高亮原理：可以使用 `usePathname` 客户端钩子函数获取到当前页面路径，然后传递给 ProLayout 的 location 属性即可自动匹配到对应 path 的菜单项。

代码如下：

```tsx
const pathname = usePathname();

<ProLayout
  layout="top"
  title="面试鸭刷题平台"
  location={{
    pathname,
  }}
/>
```

4）扩展能力：在 ProLayout 的菜单渲染函数中可以根据菜单项的属性来自定义菜单项渲染逻辑，比如支持配置超链接是否在新页面打开。

菜单项配置如下，target 的值为 `_blank` 表示在新页面打开：

```json
{
  name: "面试鸭",
  path: "https://mianshiya.com",
  target: "_blank",
}
```

修改菜单渲染函数，支持控制页面打开方式：

```tsx
// 菜单渲染
menuItemRender={(item, dom) => (
  <Link href={item.path || "/"} target={item.target}>{dom}</Link>
)}
```

💡 还可以按需补充更多能力，比如根据配置控制菜单的显隐，建议参考知名的菜单组件实现。

### 请求

前后端需要通过请求进行交互，本项目引入主流 Axios 请求库，并通过 OpenAPI 前端代码生成，大大提高开发效率。

注意，由于 Next.js 使用客户端和服务端同构渲染，需要选择一个同时支持 Node.js 和浏览器环境的请求库，而 Axios 是支持的。

#### 1、请求工具库

Axios 官方文档：https://axios-http.com/docs/intro

安装请求工具类 Axios，代码：

```shell
npm install axios
```

#### 2、全局自定义请求

需要自定义全局请求地址等，参考 Axios 官方文档，在 `/src/libs` 目录下编写请求配置文件 `request.ts`。包括全局接口请求地址、超时时间、自定义请求响应拦截器等。

比如可以在全局响应拦截器中，读取出结果中的 data，并校验 code 是否合法，如果是未登录状态，则自动登录。

示例代码如下，其中 `withCredentials: true` 一定要写，否则无法在发请求时携带 Cookie，就无法完成登录。

代码如下：

```typescript
import axios from "axios";

// 创建 Axios 示例
const myAxios = axios.create({
  baseURL: "http://localhost:8101",
  timeout: 10000,
  withCredentials: true,
});

// 创建请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 请求执行前执行
    return config;
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error);
  },
);

// 创建响应拦截器
myAxios.interceptors.response.use(
  // 2xx 响应触发
  function (response) {
    // 处理响应数据
    const { data } = response;
    // 未登录
    if (data.code === 40100) {
      // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    } else if (data.code !== 0) {
      // 其他错误
      throw new Error(data.message ?? "服务器错误");
    }
    return data;
  },
  // 非 2xx 响应触发
  function (error) {
    // 处理响应错误
    return Promise.reject(error);
  },
);

export default myAxios;
```

#### 3、自动生成请求代码

传统情况下，每个请求都要单独编写代码，很麻烦。

推荐使用 OpenAPI 工具，直接自动生成即可：https://www.npmjs.com/package/@umijs/openapi

按照官方文档的步骤，先安装：

```shell
npm i --save-dev @umijs/openapi
```

在 **项目根目录** 新建 `openapi.config.ts`，根据自己的需要定制生成的代码：

```typescript
const { generateService } = require("@umijs/openapi");

generateService({
  requestLibPath: "import request from '@/libs/request'",
  schemaPath: "http://localhost:8101/api/v2/api-docs",
  serversPath: "./src",
});
```

在 package.json 的 script 中添加 `"openapi": "ts-node openapi.config.ts"`

如果 ts-node 无法运行，改为 node

执行该命令，可以在 `/src/api` 目录看到生成的请求代码。

![img](./assets/202408311533023.png)

#### 4、测试请求代码

可以在 `app/page.tsx` 和 BasicLayout 中分别测试请求代码，分别在服务端和客户端执行请求：

```typescript
listQuestionBankVoByPageUsingPost({}).then((res) => {
    console.log(res);
});
```

查看编辑器控制台，可以看到 page.tsx 中服务端渲染执行的请求响应：

![img](./assets/202408311533044.png)

查看 F12 网络控制台，可以看到 BasicLayout 中客户端渲染执行的请求响应：

![img](./assets/202408311533079.png)

### 全局初始化逻辑

可以在 `app/layout.tsx` 中预留一个可以编写全局初始化逻辑的代码：

```tsx
/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = useCallback(() => {
  console.log("hello 欢迎来到我的项目");
}, []);

// 只执行一次
useEffect(() => {
  doInit();
}, []);
```

💡 注意，开发环境中可能会看到 useEffect 执行了 2 次，这是正常现象，生产环境不会出现这个问题。

可以封装出一层 InitLayout，而不要把初始化逻辑直接写到 RootLayout 中，可以更好地维护初始化逻辑，防止后续扩展代码时出现执行时机的冲突。（比如引入全局状态管理后，要先执行 RootLayout 的 Provider 组件，才能获取到 useDispatch）

```tsx
/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  /**
   * 全局初始化函数，有全局单次调用的代码，都可以写到这里
   */
  const doInit = useCallback(() => {
    console.log("hello 欢迎来到我的项目");
  }, []);
  
  // 只执行一次
  useEffect(() => {
    doInit();
  }, []);

  return <>{children}</>;
};
```

### 全局状态管理

#### 1、什么是全局状态管理？

是指多个页面需要共享或者跟踪变化的变量，可以放到全局来统一维护，而不是每个页面分别维护和获取。

适合作为全局状态的数据：已登录用户信息（每个页面几乎都要用）

在 Vue 中，主流的状态管理库有 Vuex 和 Pinia；在 React 项目中，主流的状态管理库是 Redux，本项目也将使用它。

#### 2、Redux 基本概念

React Redux 官方文档：https://react-redux.js.org/

Redux 中有一些常用的核心概念，不用理解，简单了解一下即可。

1）Store：整个应用状态（state）的容器，负责存储应用的状态，并提供访问状态、派发（dispatch）动作以及注册监听器等功能。

2）Action：一个普通的 JavaScript 对象，描述了状态变化的意图。每个 `action` 必须包含一个 `type` 字段，表示动作类型。

一般开发中，我们会用一个字符串常量（Action Types）来标识不同的动作类型。比如改变计数器需要的 increment 或 decrement：

```tsx
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
```

还会用 Action Creators 动作创建器函数来生成 action 对象，比如：

```tsx
const increment = () => ({
  type: INCREMENT,
});

const decrement = () => ({
  type: DECREMENT,
});
```

3）Dispatch：用于发送 action，触发状态更新。

4）Reducer：俗称状态处理器，根据当前状态和传入的 action 返回新的状态的函数。比如：

```tsx
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
```

可以通过一张图更好地理解这几个组件的关系：

![img](./assets/202408311533307.gif)

更多核心概念可以在官方文档了解：https://redux.js.org/tutorials/essentials/part-1-overview-concepts

#### 3、状态管理实战

React Redux 官方入门文档：https://react-redux.js.org/tutorials/quick-start

由于我们使用的是 TypeScript，还要参考 TypeScript 的快速启动文档：https://react-redux.js.org/tutorials/typescript-quick-start 。对于新手，上面两个文档最好按顺序阅读。

其实以前 Redux 的使用成本还是稍微有点高的，但官方提供了 Redux Toolkit，可以简化使用 Redux 的开发。

1）安装

```shell
npm install @reduxjs/toolkit react-redux
```

2）配置 Store

Store 是整个应用状态（state）的容器，负责存储应用的状态，并提供访问状态、派发（dispatch）动作以及注册监听器等功能。

在项目的 src 目录下新建 `stores` 目录，用于存放所有的状态。然后在 `stores` 目录下新建 `index.ts` 文件，创建一个空的 Redux Store：

```tsx
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // 在这里存放状态
  },
});

// 用于类型推断和提示
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
```

3）在项目中引入 Redux Store，修改 `app/layout.tsx` 项目全局入口文件即可：

```typescript
import store from '@/stores'
import { Provider } from 'react-redux'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <BasicLayout>{children}</BasicLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
```

4）定义 Slice

Slice 是 Redux Toolkit 中的概念，它将状态和相关的 reducer 逻辑组织在一起，便于模块化管理。每个 slice 通常代表应用中的一部分状态（如用户、产品、购物车等）。

💡 在没有 Redux Toolkit 和 Slice 之前，传统的 Redux 开发需要定义 action types、action creators 和 reducer 函数，所有这些通常需要在不同的文件中编写，增加了代码的复杂性和维护成本。

在 `stores` 目录下新建 `loginUser.ts`，创建一个 slice 用于存储当前登录用户的信息。代码如下：

```tsx
▼import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/stores/index";

// 默认用户
const DEFAULT_USER: API.LoginUserVO = {
  userName: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/notLoginUser.png",
  userRole: "guest",
};

/**
 * 登录用户全局状态
 */
export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
      return {
        ...action.payload,
      };
    },
  },
});

// 修改状态
export const { setLoginUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
```

上述代码中，我们需要提供给未登录用户一个头像，放到 `/public/assets` 目录下，名称为 `notLoginUser.png`。如图：

![img](./assets/202408311533426.png)

5）在 Store 中引入新创建的 Slice，写在 reducer 里：

```tsx
import loginUser from "./loginUser";

const store = configureStore({
  reducer: {
    loginUser,
  },
});
```

6）获取状态

注意，状态是维护在客户端的，可以在任意 **客户端渲染** 页面（或组件）中使用状态，服务端渲染无法使用。

使用下列语法获取状态：

```tsx
const loginUser = useSelector((state: RootState) => state.loginUser);
```

比如可以在 BasicLayout 中添加上述代码，然后在页面中直接展示：

```typescript
{ JSON.stringify(loginUser) }
```

能够看到状态的初始值：

![img](./assets/202408311533438.png)

顶部导航栏右侧展示登录状态。修改 BasicLayout 中 ProLayout 的 avatarProps 的值即可。

```tsx
avatarProps={{
  src: loginUser.userAvatar || "/assets/logo.png",
  size: "small",
  title: loginUser.userName || "鱼皮鸭",
}
```

效果如下：

![img](./assets/202408311533452.png)

7）修改状态

修改状态也很方便，可以在 **首次进入到页面** 时，尝试获取登录用户信息。修改 `app/layout.tsx` 的全局初始化逻辑，编写远程获取登录用户数据的代码：

```typescript
/**
 * 初始化布局（多封装一层，使得能调用 useDispatch）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    // 获取用户信息
    const res = await getLoginUserUsingGet();
    if (res.data) {
      dispatch(setLoginUser(res.data));
    } else {
      // todo 测试代码，实际可删除
      setTimeout(() => {
        const testUser = { userName: "测试登录", id: 1 };
        dispatch(setLoginUser(testUser));
      }, 3000);
    }
  }, []);

  useEffect(() => {
    doInitLoginUser();
  }, []);

  return <>{children}</>;
};
```

其中，通过 dispatch 触发全局状态的更新：

```typescript
// 先获取 dispatch
const dispatch = useDispatch<AppDispatch>();
// 触发更新
dispatch(setLoginUser({...}));
```

效果如下：

![img](./assets/202408311533493.png)

测试完成后可以移除登录按钮。

#### 扩展

有些页面可以不用获取全局初始化状态，比如用户登录和用户注册页，可以根据 pathname 判断：

```typescript
// 获取当前页面路径
const pathname = usePathname();

// 登录和注册页不用获取登录信息
if (
  !pathname.startsWith("/user/login") &&
  !pathname.startsWith("/user/register")
) {
  ...
}
```

### 全局权限管理

需求：能够灵活配置每个页面所需要的用户权限，由全局权限管理系统自动校验和拦截，而不需要在每个页面中编写权限校验代码，提高开发效率。

还要能够根据权限控制导航菜单的显隐，只有具有权限的菜单，才对用户可见。

#### 实现方案

1. 在路由配置文件， 定义某个路由的访问权限。由于 Next.js 项目是约定式路由，只有我们自定义的菜单配置文件，可以在菜单配置文件中定义权限。
2. 每次访问页面时，根据用户要访问页面的路由权限信息，判断用户是否有对应的访问权限，并进行相应的拦截处理。这是一个全局逻辑，可以在项目根布局 `app/layout.tsx` 中添加。
3. 导航栏展示菜单时，可以过滤掉登录用户没有权限的菜单项，从而实现根据权限控制导航菜单的显隐。

#### 开发实现

1）在 app 目录下新建 forbidden 无权限页面，内容随便写，比如：

```tsx
import { Result, Button } from "antd";
import React from "react";

/**
 * 无权限访问
 * @constructor
 */
const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问此页面。 "
      extra={
        <Button type="primary" href="/">
          返回主页
        </Button>
      }
    />
  );
};

export default Forbidden;
```

2）在 src 下新建 access 目录，所有权限管理相关的代码都放在该目录下，模块化。只要不引入，就不会生效。

先在目录中定义权限枚举文件 accessEnum.ts：

```typescript
/**
 * 权限定义
 */
const ACCESS_ENUM = {
  NOT_LOGIN: "notLogin",
  USER: "user",
  ADMIN: "admin",
};

export default ACCESS_ENUM;
```

有了枚举类后，可以将全局状态中的默认用户权限改为 “未登录”：

```typescript
const DEFAULT_USER: API.LoginUserVO = {
  userName: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/notLoginUser.png",
  userRole: AccessEnum.NOT_LOGIN,
};
```

3）在菜单配置文件 menus.tsx 中补充对于权限的配置。比如：

```typescript
{
  path: "/admin",
  name: "管理",
  icon: <CrownOutlined />,
  access: ACCESS_ENUM.ADMIN,
  children: [
    {
      path: "/admin/user",
      name: "用户管理",
      access: ACCESS_ENUM.ADMIN,
    },
  ],
},
```

4）编写通用的权限校验方法。

为什么？因为菜单组件中要判断权限、权限拦截也要用到权限判断功能，所以抽离成公共模块。

新建 checkAccess.ts 文件，代码如下：

```typescript
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: API.LoginUserVO, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前登录用户具有的权限（如果没有 loginUser，则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果用户没登录，那么表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 如果不为管理员，表示无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
```

可以根据自己的需要，修改判断权限的逻辑。

5）新增权限校验布局 AccessLayout.tsx，逻辑如下：

1. 获取到 pathname 和 loginUser
2. 根据 pathname 获取到对应的菜单项配置，并获取到所需的权限
3. 调用 checkAccess 函数检测是否具有权限。如果有，则正常返回内容；如果没有，返回到无权限页面。

可以先在 menus.tsx 中编写 “根据 pathname 获取到菜单项配置” 的函数，使用递归实现：

```tsx
// 根据路径查找所有菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

// 根据路径查找菜单
export const findMenuItemByPath = (
  menus: MenuDataItem[],
  path: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedMenuItem = findMenuItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  return null;
};
```

由于该文件导出了多个函数，需要将 export default menus 改为 export menus：

```tsx
// 修改菜单项导出方式为 export
export const menus = [...];
```

并且同时修改 BasicLayout 中的引入代码：

```tsx
import { menus } from "../../../config/menus";
```

然后就可以编写权限校验布局 AccessLayout.tsx，代码如下：

```tsx
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { usePathname } from "next/navigation";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";
import React from "react";
import { findAllMenuItemByPath } from "../../config/menus";
import AccessEnum from "@/access/accessEnum";

/**
 * 统一权限校验拦截器
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 权限校验
  const menu = findAllMenuItemByPath(pathname) || {};
  const needAccess = menu?.access ?? AccessEnum.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return <>{children}</>;
};

export default AccessLayout;
```

可以在 RootLayout 中引入，嵌入到 BasicLayout 中：

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
```

访问 /admin/user 页面，效果如下：

![img](./assets/202408311533607.png)

6）根据权限控制菜单显隐

新建 menuAccess.ts 文件，提供获取可访问菜单的函数：

```typescript
import checkAccess from "@/access/checkAccess";
import { menus } from "../../config/menus";

/**
 * 获取有权限、可访问的菜单
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (loginUser: API.LoginUserVO, menuItems = menus) => {
  return menuItems.filter((item) => {
    if (!checkAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getAccessibleMenus(loginUser, item.children);
    }
    return true;
  });
};

export default getAccessibleMenus;
```

#### 扩展

还有其他实现权限校验的方法，比如使用高阶组件（HOC）在客户端进行权限校验，这种方法会更灵活。

创建一个 HOC 组件：

```tsx
// components/withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'; // 或者使用其他全局状态管理库

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 获取用户登录状态

    useEffect(() => {
      if (!isAuthenticated) {
        // 如果未登录，重定向到登录页面
        router.push('/login');
      }
    }, [isAuthenticated]);

    // 如果未登录，不渲染组件
    if (!isAuthenticated) {
      return null;
    }

    // 如果已登录，渲染组件
    return <Component {...props} />;
  };
}
```

使用这个 HOC 包裹需要进行权限校验的页面：

```tsx
// pages/protected.js
import withAuth from '@/components/withAuth';

function ProtectedPage() {
  return <div>This is a protected page.</div>;
}

export default withAuth(ProtectedPage);
```

### 通用组件 - Markdown 编辑器组件

为什么用 Markdown？

一套通用的文本编辑语法，可以在各大网站上统一标准、渲染出统一的样式，比较简单易学。

推荐的 Md 编辑器：https://github.com/bytedance/bytemd

阅读官方文档，执行命令来安装编辑器主体、以及 gfm（表格支持）插件、highlight 代码高亮插件：

```shell
npm i @bytemd/react
npm i @bytemd/plugin-highlight @bytemd/plugin-gfm
```

在 `/src/components` 目录中新建 MdEditor 组件，编写代码：

```tsx
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}

const plugins = [gfm(), highlight()];

/**
 * Markdown 编辑器
 * @param props
 * @constructor
 */
const MdEditor = (props: Props) => {
  const { value = "", onChange, placeholder } = props;

  return (
    <div className="md-editor">
      <Editor
        value={value}
        placeholder={placeholder}
        mode="split"
        plugins={plugins}
        onChange={onChange}
      />
    </div>
  );
};

export default MdEditor;
```

上述代码中，我们要把 MdEditor 当前输入的值暴露给父组件，便于父组件去使用，同时也是提高组件的通用性，所以定义了属性和属性类型，把 value 和 onChange 事件交给父组件去管理。

可以按照官方文档对编辑器进行很多定制操作，比如切换语言为中文、切换主题样式、安装更多插件等等。如果发现官方给的操作无法满足定制需求和样式，可以使用覆盖 CSS、自己写 JS 的方式魔改。

比如隐藏编辑器中不需要的操作图标（像 GitHub 图标）：

```css
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
    display: none;
}
```

有编辑器就有浏览器，MdViewer 示例代码如下：

```tsx
import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";

interface Props {
  value?: string;
}

const plugins = [gfm(), highlight()];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer = (props: Props) => {
  const { value = "" } = props;

  return (
    <div className="md-viewer">
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};

export default MdViewer;
```

可以在任意客户端渲染页面（或组件）引入组件进行测试，这是因为该组件用到了 useRef 之类的仅客户端才支持的函数。比如在 BasicLayout 中引入：

```tsx
const [text, setText] = useState<string>('');

<MdEditor value={text} onChange={setText} />
<MdViewer value={text} />
```

效果如图：

![img](./assets/202408311533873.png)

### 清理无用文件

最后，可以再清理一些无用文件，比如没用到的 public 资源、模板自带的页面代码等。

我们的万用基础前端项目模板（和业务无关）就搞定啦！接下来正式进入开发。

## 四、扩展思路

#### 1、前端模板支持多套布局

需求：不是所有页面都能统一布局，比如用户登录注册页可以不需要导航栏，因此模板需要多套布局能力。

实现思路：现在 layouts 目录中新定义一套布局。然后修改 `app/layout.tsx`，将写死的 BasicLayout 布局改为一个 getLayout 函数，函数内根据当前路由地址，返回不同的 Layout 布局。

#### 2、前端模板支持嵌套菜单配置

完善前端项目模板的导航菜单，根据嵌套路由生成嵌套的子菜单，如下图：

![img](./assets/202408311533904.png)

#### 3、前端全局错误处理

前端页面出现任何致命错误时，不是白屏，而是返回一个错误提示页面。

可以参考 Next.js 的官方文档实现：https://nextjs.org/docs/app/api-reference/file-conventions/error



# 4 - 前端开发

## 本节重点

前端页面开发，跑通前后端核心业务流程，主要包括：

- 基础页面开发
- - 用户模块
  - 题库管理页面
  - 题目管理页面
- 核心页面开发
- - 主页
  - 题库列表页
  - 题目搜索页
  - 题库详情页
  - 题目详情页
- 题目题库绑定（管理员）
- - 按照题库查询题目
  - 修改题目所属题库

## 准备工作

在本章开始之前，可以先准备一些示例数据，便于前端开发时查看效果。

```sql

-- 用户表初始数据（密码是 12345678）
INSERT INTO user (id, userAccount, userPassword, unionId, mpOpenId, userName, userAvatar, userProfile, userRole)
VALUES (1, 'user1', 'b0dd3697a192885d7c055db46155b26a', 'unionId1', 'mpOpenId1', 'user1',
        'https://www.code-nav.cn/logo.png', '喜欢编程的小白', 'user'),
       (2, 'user2', 'b0dd3697a192885d7c055db46155b26a', 'unionId2', 'mpOpenId2', 'user2',
        'https://www.code-nav.cn/logo.png', '全栈开发工程师', 'user'),
       (3, 'user3', 'b0dd3697a192885d7c055db46155b26a', 'unionId3', 'mpOpenId3', 'user3',
        'https://www.code-nav.cn/logo.png', '前端爱好者', 'user'),
       (4, 'user4', 'b0dd3697a192885d7c055db46155b26a', 'unionId4', 'mpOpenId4', 'user4',
        'https://www.code-nav.cn/logo.png', '后端开发工程师', 'user'),
       (5, 'yupi', 'b0dd3697a192885d7c055db46155b26a', NULL, NULL, '程序员鱼皮', 'https://www.code-nav.cn/logo.png',
        '系统管理员', 'admin');

-- 题库表初始数据
INSERT INTO question_bank (title, description, picture, userId)
VALUES ('JavaScript 基础', '包含 JavaScript 的基础知识题目',
        'https://pic.code-nav.cn/mianshiya/question_bank_picture/1777886594896760834/JldkWf9w_JavaScript.png', 1),
       ('CSS 样式', '包含 CSS 相关的样式问题',
        'https://pic.code-nav.cn/mianshiya/question_bank_picture/1777886594896760834/QatnFmEN_CSS.png', 2),
       ('HTML 基础', 'HTML 标记语言的基本知识', 'https://www.mianshiya.com/logo.png', 3),
       ('前端框架', 'React, Vue, Angular 等框架相关的题目', 'https://www.mianshiya.com/logo.png', 1),
       ('算法与数据结构', '数据结构和算法题目', 'https://www.mianshiya.com/logo.png', 2),
       ('数据库原理', 'SQL 语句和数据库设计', 'https://www.mianshiya.com/logo.png', 3),
       ('操作系统', '操作系统的基本概念', 'https://www.mianshiya.com/logo.png', 1),
       ('网络协议', 'HTTP, TCP/IP 等网络协议题目', 'https://www.mianshiya.com/logo.png', 2),
       ('设计模式', '常见设计模式及其应用', 'https://www.mianshiya.com/logo.png', 3),
       ('编程语言概述', '多种编程语言的基础知识', 'https://www.mianshiya.com/logo.png', 1),
       ('版本控制', 'Git 和 SVN 的使用', 'https://www.mianshiya.com/logo.png', 2),
       ('安全与加密', '网络安全和加密技术', 'https://www.mianshiya.com/logo.png', 3),
       ('云计算', '云服务和架构', 'https://www.mianshiya.com/logo.png', 1),
       ('微服务架构', '微服务的设计与实现', 'https://www.mianshiya.com/logo.png', 2),
       ('容器技术', 'Docker 和 Kubernetes 相关知识', 'https://www.mianshiya.com/logo.png', 3),
       ('DevOps 实践', '持续集成与持续交付', 'https://www.mianshiya.com/logo.png', 1),
       ('数据分析', '数据分析和可视化', 'https://www.mianshiya.com/logo.png', 2),
       ('人工智能', '机器学习与深度学习基础', 'https://www.mianshiya.com/logo.png', 3),
       ('区块链技术', '区块链的基本原理和应用', 'https://www.mianshiya.com/logo.png', 1),
       ('项目管理', '软件开发项目的管理和执行', 'https://www.mianshiya.com/logo.png', 2);

-- 题目表初始数据
INSERT INTO question (title, content, tags, answer, userId)
VALUES ('JavaScript 变量提升', '请解释 JavaScript 中的变量提升现象。', '["JavaScript", "基础"]',
        '变量提升是指在 JavaScript 中，变量声明会被提升到作用域的顶部。', 1),
       ('CSS Flexbox 布局', '如何使用 CSS 实现一个水平居中的盒子？', '["CSS", "布局"]',
        '可以使用 Flexbox 布局，通过设置父容器 display 为 flex，并使用 justify-content: center; 对齐子元素。', 2),
       ('HTML 中的语义化', '什么是 HTML 的语义化？为什么重要？', '["HTML", "语义化"]',
        'HTML 语义化是使用正确的标签来描述内容的意义，能够提高可访问性和 SEO 效果。', 3),
       ('React 中的状态管理', '如何在 React 中管理组件状态？', '["React", "状态管理"]',
        '可以使用 React 的 useState 或 useReducer 钩子来管理组件状态，或使用 Redux 进行全局状态管理。', 1),
       ('算法：二分查找', '请实现一个二分查找算法。', '["算法", "数据结构"]',
        '二分查找是一种在有序数组中查找特定元素的算法，通过不断折半的方式缩小查找范围。', 2),
       ('数据库索引的作用', '什么是数据库索引？它的作用是什么？', '["数据库", "索引"]',
        '数据库索引是用于加快查询速度的数据结构，它通过优化查找路径减少查询时间。', 3),
       ('HTTP 与 HTTPS 的区别', '请解释 HTTP 和 HTTPS 之间的主要区别。', '["网络", "协议"]',
        'HTTPS 是加密的 HTTP，通过 SSL/TLS 提供更安全的数据传输。', 1),
       ('设计模式：单例模式', '请解释单例模式的实现及应用场景。', '["设计模式", "单例"]',
        '单例模式确保一个类只有一个实例，并提供全局访问点。常用于配置类等只需一个实例的场景。', 2),
       ('Git 中的分支管理', '如何在 Git 中管理分支？', '["版本控制", "Git"]',
        'Git 中通过 branch 命令创建分支，使用 checkout 切换分支，使用 merge 合并分支。', 3),
       ('Docker 的基本命令', '列举并解释几个常用的 Docker 命令。', '["容器技术", "Docker"]',
        '常用命令包括 docker run, docker build, docker ps, docker stop 等。', 1),
       ('前端性能优化', '列举几个前端性能优化的手段。', '["前端", "性能优化"]',
        '包括代码分割、资源压缩、缓存策略、懒加载等。', 2),
       ('JavaScript 闭包的应用', '什么是闭包？举例说明闭包的实际应用。', '["JavaScript", "高级"]',
        '闭包是指函数能够记住创建时的上下文环境，常用于数据隐藏和模块化编程。', 3),
       ('数据库事务的特性', '请解释数据库事务的 ACID 特性。', '["数据库", "事务"]',
        'ACID 代表原子性、一致性、隔离性和持久性，是事务处理的四大特性。', 1),
       ('CSS 的 BEM 命名规范', '什么是 BEM？如何使用 BEM 进行 CSS 命名？', '["CSS", "命名规范"]',
        'BEM 代表块（Block）、元素（Element）和修饰符（Modifier），是一种 CSS 命名规范。', 2),
       ('JavaScript 原型链', '请解释 JavaScript 中的原型链机制。', '["JavaScript", "原型链"]',
        '原型链是 JavaScript 实现继承的机制，对象通过原型链可以继承其他对象的属性和方法。', 3),
       ('React 生命周期', '请说明 React 组件的生命周期方法。', '["React", "生命周期"]',
        'React 组件的生命周期包括初始化、更新和卸载三个阶段，各阶段有不同的生命周期方法。', 1),
       ('HTTP 状态码 404 与 500 的区别', '请解释 HTTP 状态码 404 和 500 的含义。', '["网络", "HTTP"]',
        '404 表示未找到资源，500 表示服务器内部错误。', 2),
       ('Python 与 Java 的区别', '比较 Python 和 Java 的主要区别。', '["编程语言", "Python", "Java"]',
        'Python 是动态类型语言，语法简洁，而 Java 是静态类型语言，注重严谨性和性能。', 3),
       ('Vue 的双向数据绑定', '请解释 Vue.js 是如何实现双向数据绑定的。', '["Vue", "数据绑定"]',
        'Vue.js 通过数据劫持和发布-订阅模式实现了双向数据绑定。', 1),
       ('前端工程化的意义', '为什么需要前端工程化？', '["前端", "工程化"]',
        '前端工程化能够提高开发效率、代码质量和可维护性，规范开发流程。', 2);

-- 题库题目关联初始数据
INSERT INTO question_bank_question (questionBankId, questionId, userId)
VALUES (1, 1, 1),
       (1, 2, 1),
       (1, 3, 1),
       (1, 4, 1),
       (1, 5, 1),
       (1, 6, 1),
       (1, 7, 1),
       (1, 8, 1),
       (1, 9, 1),
       (1, 10, 1),
       (2, 2, 2),
       (2, 14, 2),
       (3, 3, 3),
       (3, 13, 3),
       (4, 4, 1),
       (4, 16, 1),
       (5, 5, 2),
       (5, 18, 2),
       (6, 6, 3),
       (6, 19, 3),
       (7, 7, 1),
       (7, 11, 1),
       (8, 8, 2),
       (8, 10, 2),
       (9, 9, 3),
       (9, 17, 3),
       (10, 12, 1),
       (10, 20, 1);
```

如果需要更多图标，可以在 [IconFont](https://www.iconfont.cn/) 获取。

## 一、基础页面开发

### 用户模块

各项目通用

在 app 下新建用户相关页面的目录，Next.js 会自动映射成路由：

- 用户登录页：/user/login
- 用户注册页：/user/register

![img](./assets/202409021759840.png)

#### 1、用户登录页面

该页面没有展示类内容，不需要 SEO，而且以动态交互（输入表单）为主，所以使用客户端渲染，跟开发传统的 React 项目一样。

可以使用 Ant Design ProComponents 的 ProForm 表单组件，先安装：

```vue
npm i @ant-design/pro-form
```

安装失败的话使用：

```vue
npm i @ant-design/pro-form --force
```

页面代码如下：

```vue
"use client";

import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userLoginUsingPost } from "@/api/userController";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { useDispatch } from "react-redux";
import "./index.css";

/**
 * 用户登录页面
 * @param props
 */
const UserLoginPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: any) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功！");
        // 保存用户登录态
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      }
    } catch (e: any) {
      message.error('登录失败，' + e.message);
    }
  };

  return (
    <div id="userLoginPage">
      <LoginForm<API.UserAddRequest>
        form={form}
        logo={
          <Image src="/assets/logo.png" alt="面试鸭" width={44} height={44} />
        }
        title="面试鸭 - 用户登录"
        subTitle="程序员面试刷题网站"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "登录",
          },
        }}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          还没有账号？
          <Link prefetch={false} href={"/user/register"}>
            去注册
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
```

上述代码中，当用户登录成功后，会将信息存放到全局状态管理中。

效果如图：

![img](./assets/202409021759929.png)

我们每次应用初始化（页面刷新）时，都需要调用后端获取当前登录用户信息，并且注意更新全局用户状态。

确保 InitLayout 的代码如下：

```tsx
▼// 初始化全局用户状态
const doInitLoginUser = useCallback(async () => {
  const res = await getLoginUserUsingGet();
  if (res.data) {
    // 更新全局用户状态
    dispatch(setLoginUser(res.data));
  }
}, []);
```

点击右上角导航栏的 “未登录” 时，应该要自动跳转到登录页。修改 BasicLayout 如下，根据用户 id 区分用户是否登录，展示出不同的内容：

```tsx
const loginUser = useSelector((state: RootState) => state.loginUser);
const router = useRouter();

avatarProps={{
  src: loginUser.userAvatar || "/assets/logo.png",
  size: "small",
  title: loginUser.userName || "鱼皮鸭",
  render: (props, dom) => {
    return loginUser.id ? (
      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "退出登录",
            },
          ],
        }}
        >
        {dom}
      </Dropdown>
    ) : (
      <div onClick={() => router.push("/user/login")}>{dom}</div>
    );
  },
}}
```

#### 2、用户注册页面

参考用户登录页面，也是客户端渲染，同样使用高级表单组件。注意，需要让注册和登录这两个页面之间能够相互跳转。

页面代码如下：

```tsx
"use client";

import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userRegisterUsingPost } from "@/api/userController";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./index.css";

/**
 * 用户注册页面
 * @param props
 */
const UserRegisterPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const router = useRouter();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: any) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功，请登录");
        // 前往登录页
        router.push("/user/login");
      }
    } catch (e) {
      message.error("注册失败，" + e.message);
    }
  };

  return (
    <div id="userRegisterPage">
      <LoginForm<API.UserAddRequest>
        form={form}
        logo={
          <Image src="/assets/logo.png" alt="面试鸭" width={44} height={44} />
        }
        title="面试鸭 - 用户注册"
        subTitle="程序员面试刷题网站"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
      >
        <ProFormText
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          name="userAccount"
          placeholder={"请输入用户名"}
          rules={[
            {
              required: true,
              message: "请输入用户名！",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"确认密码"}
          rules={[
            {
              required: true,
              message: "请再次输入密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有账号？
          <Link prefetch={false} href={"/user/login"}>
            去登录
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
```

效果如图：

![img](./assets/202409021759032.png)

#### 3、用户注销

编写退出登录逻辑，退出登录成功时，应该将全局状态重置为 “默认用户”，代码如下：

```tsx
▼/**
 * 用户注销
 */
const userLogout = async () => {
  try {
    await userLogoutUsingPost();
    message.success("已退出登录");
    dispatch(setLoginUser(DEFAULT_USER));
    router.push("/user/login");
  } catch (e) {
    message.error("操作失败，" + e.message);
  }
  return;
}
```

由于默认用户在多个位置使用，可以定义为常量，放在 `src/constants/user.ts` 中：

```tsx
import AccessEnum from "@/access/accessEnum";

export const DEFAULT_USER: API.LoginUserVO = {
    userName: "未登录",
    userProfile: "暂无简介",
    userAvatar: "/assets/notLoginUser.png",
    userRole: AccessEnum.NOT_LOGIN,
};
```

给用户头像下拉菜单绑定点击事件：

```tsx
<Dropdown
  menu={{
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "退出登录",
      },
    ],
    onClick: async (event: { key: React.Key }) => {
      const { key } = event;
      // 退出登录
      if (key === "logout") {
        userLogout();
      }
    },
  }}
>
  {dom}
</Dropdown>
```

#### 4、用户管理页面

需求：管理用户 - 增删改查（仅管理员可用）P1

页面预期效果：上方搜索栏，下方表格，是一个很标准的管理页面布局。如图：

![img](./assets/202409021759136.png)

当用户点击新建和修改按钮时，能够打开弹窗，让用户填写信息。

为了简化开发，可以使用 Ant Design ProComponents 的高级表格组件实现。参考文档：https://procomponents.ant.design/components/table

[编程导航](https://www.code-nav.cn/) 的万用前端模板也提供了现成的管理页面，可以直接在此基础上进行修改，效率会更高一些，没必要重复从 0 开发。

前端万用模板：https://www.code-nav.cn/course/1826803928691945473/section/1826872004326240257?type=

注意，管理员页面不需要 SEO、对性能也没有特别高的要求，使用客户端渲染就行，开发限制会少一些。

1）创建页面时，先新增路由：

![img](./assets/202409021759169.png)

新建菜单项配置，有管理员权限才可访问：

```typescript
{
  path: "/admin",
  name: "管理",
  icon: <CrownOutlined />,
  access: ACCESS_ENUM.ADMIN,
  children: [
    {
      path: "/admin/user",
      name: "用户管理",
      access: ACCESS_ENUM.ADMIN,
    },
  ],
}
```

2）安装表格组件依赖：

```typescript
npm i @ant-design/pro-table
```

安装失败的话，就在命令后加 `--force`：

```typescript
npm i @ant-design/pro-table --force
```

3）开发页面。先在页面开头增加 "use client" 声明，表示客户端渲染。

基于表格组件的开发规范，先定义要展示哪些表格列，可参考官方文档：[https://procomponents.ant.design/components/table#columns-%E5%88%97%E5%AE%9A%E4%B9%89](https://procomponents.ant.design/components/table#columns-列定义)

示例代码如下：

```typescript
▼const columns: ProColumns<API.User>[] = [
  {
    title: "id",
    dataIndex: "id",
    valueType: "text",
    hideInForm: true,
  },
  {
    title: "账号",
    dataIndex: "userAccount",
    valueType: "text",
  },
  {
    title: "用户名",
    dataIndex: "userName",
    valueType: "text",
  },
  {
    title: "头像",
    dataIndex: "userAvatar",
    valueType: "image",
    fieldProps: {
      width: 64,
    },
    hideInSearch: true,
  },
  {
    title: "简介",
    dataIndex: "userProfile",
    valueType: "textarea",
  },
  {
    title: "权限",
    dataIndex: "userRole",
    valueEnum: {
      user: {
        text: "用户",
      },
      admin: {
        text: "管理员",
      },
    },
  },
  {
    title: "创建时间",
    sorter: true,
    dataIndex: "createTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "更新时间",
    sorter: true,
    dataIndex: "updateTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "操作",
    dataIndex: "option",
    valueType: "option",
    render: (_, record) => (
      <Space size="middle">
        <Typography.Link
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          修改
        </Typography.Link>
        <Typography.Link type="danger" onClick={() => handleDelete(record)}>
          删除
        </Typography.Link>
      </Space>
    ),
  },
];
```

其中，我们自定义了操作列，提供修改和删除两个按钮。对于修改操作，我们需要 currentRow 变量来记录用户要修改哪条数据，便于修改的时候展示老数据。

```typescript
// 当前用户点击的数据
const [currentRow, setCurrentRow] = useState<API.User>();
```

4）使用高级表格组件，编写请求函数、新建操作工具栏等。

示例代码如下：

```typescript
<ProTable<API.User>
  headerTitle={"查询表格"}
  actionRef={actionRef}
  toolBarRender={() => [
    <Button
      type="primary"
      key="primary"
      onClick={() => {
        setCreateModalVisible(true);
      }}
    >
      <PlusOutlined /> 新建
    </Button>,
  ]}
  request={async (params, sort, filter) => {
    const sortField = Object.keys(sort)?.[0];
    const sortOrder = sort?.[sortField];

    const { data, code } = await listUserByPageUsingPost({
      ...params,
      sortField,
      sortOrder,
      ...filter,
    } as API.UserQueryRequest);

    return {
      success: code === 0,
      data: data.records || [],
      total: Number(data.total) || 0,
    };
  }}
  columns={columns}
/>
```

5）实现删除功能。主要是编写删除函数：

```tsx
const handleDelete = async (row: API.User) => {
  const hide = message.loading("正在删除");
  if (!row) return true;
  try {
    await deleteUserUsingPost({
      id: row.id as any,
    });
    hide();
    message.success("删除成功");
    // 删除成功后刷新表格
    actionRef?.current?.reload();
    return true;
  } catch (error: any) {
    hide();
    message.error("删除失败，" + error.message);
    return false;
  }
};
```

给删除按钮添加点击事件：

```tsx
<Typography.Link type="danger" onClick={() => handleDelete(record)}>
  删除
</Typography.Link>
```

效果如图：

![img](./assets/202409021759335.png)

6）开发创建数据弹窗组件。

💡 该组件由于只被用户管理页面使用，不用作为全局组件，而是放在 `admin/user` 目录下的 components 目录中即可：

![img](./assets/202409021759755.png)

首先定义属性，用于控制弹窗的显隐、以及成功提交或取消弹窗事件：

```tsx
interface Props {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}
```

基于高级表格自带的表单类型，传入管理表格页面已经定义好的 columns，能够自动生成表单项。

```tsx
<Modal
  destroyOnClose
  title={"创建"}
  open={visible}
  footer={null}
  onCancel={() => {
    onCancel?.();
  }}
>
  <ProTable
    type="form"
    columns={columns}
    onSubmit={async (values: API.UserAddRequest) => {
      const success = await handleAdd(values);
      if (success) {
        onSubmit?.(values);
      }
    }}
  />
</Modal>
```

最后编写提交函数，调用后端实现数据创建：

```tsx
const handleAdd = async (fields: API.UserAddRequest) => {
  const hide = message.loading("正在添加");
  try {
    await addUserUsingPost(fields);
    hide();
    message.success("创建成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("创建失败，" + error.message);
    return false;
  }
};
```

在用户管理页面引入该组件，通过定义 visible 状态来控制弹窗的显隐：

```tsx
▼// 是否显示新建窗口
const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
const actionRef = useRef<ActionType>();

<CreateModal
  visible={createModalVisible}
  columns={columns}
  onSubmit={() => {
    setCreateModalVisible(false);
    actionRef.current?.reload();
  }}
  onCancel={() => {
    setCreateModalVisible(false);
  }}
/>
```

点击工具栏上的新建按钮时，会打开弹窗（设置 visible 状态为 true）：

```tsx
<Button
  type="primary"
  key="primary"
  onClick={() => {
    setCreateModalVisible(true);
  }}
>
  <PlusOutlined /> 新建
</Button>
```

效果如图：

![img](./assets/202409021759295.png)

7）开发修改数据弹窗组件。

过程跟上一步类似，区别在于需要给组件多传入 “老数据”：

```tsx
interface Props {
  oldData?: API.User;
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserUpdateRequest) => void;
  onCancel: () => void;
}
```

需要给表单补充初始数据，并且在提交时，需要校验老数据是否存在：

```tsx
<ProTable
  type="form"
  columns={columns}
  form={{
    initialValues: oldData,
  }}
  onSubmit={async (values: API.UserUpdateRequest) => {
    if (!oldData?.id || !onSubmit) {
      return;
    }
    const success = await handleUpdate({
      ...values,
      id: oldData.id,
    });
    if (success) {
      onSubmit(values);
    }
  }}
/>
```

至此，用户模块开发完成。

#### 扩展

1）用户管理页面可以通过给删除增加二次确认，减少误操作概率。

使用 Popconfirm 组件可轻松实现：https://ant-design.antgroup.com/components/popconfirm-cn

2）用户管理页面实现多列排序功能

前端 ProTable 已经默认支持了，通过 request 函数的 sort 参数可以获取到排序条件，需要让后端支持处理多列排序。

### 题库管理页面

对应需求：【管理员】管理题库 - 增删改查

其他管理页面跟用户管理页面极其相似，没什么技术要点，复制用户管理页面后略做修改即可，请大家自行开发。

添加菜单项配置：

```tsx
{
  path: "/admin",
  name: "管理",
  icon: <CrownOutlined />,
  access: ACCESS_ENUM.ADMIN,
  children: [
    {
      path: "/admin/user",
      name: "用户管理",
      access: ACCESS_ENUM.ADMIN,
    },
    {
      path: "/admin/bank",
      name: "题库管理",
      access: ACCESS_ENUM.ADMIN,
    }
  ],
},
```

开发页面，关键是 columns 表格列配置：

```tsx
const columns: ProColumns<API.QuestionBank>[] = [
  {
    title: "id",
    dataIndex: "id",
    valueType: "text",
    hideInForm: true,
  },
  {
    title: "标题",
    dataIndex: "title",
    valueType: "text",
  },
  {
    title: "描述",
    dataIndex: "description",
    valueType: "text",
  },
  {
    title: "图片",
    dataIndex: "picture",
    valueType: "image",
    fieldProps: {
      width: 64,
    },
    hideInSearch: true,
  },
  {
    title: "创建时间",
    sorter: true,
    dataIndex: "createTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "编辑时间",
    sorter: true,
    dataIndex: "editTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "更新时间",
    sorter: true,
    dataIndex: "updateTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "操作",
    dataIndex: "option",
    valueType: "option",
    render: (_, record) => (
      <Space size="middle">
        <Typography.Link
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          修改
        </Typography.Link>
        <Typography.Link type="danger" onClick={() => handleDelete(record)}>
          删除
        </Typography.Link>
      </Space>
    ),
  },
];
```

效果如图：

![img](./assets/202409021759383.png)

### 题目管理页面

对应需求：【管理员】管理题目 - 增删改查

#### 1、基础表格开发

添加菜单项配置：

```javascript
{
  path: "/admin",
  name: "管理",
  icon: <CrownOutlined />,
  access: ACCESS_ENUM.ADMIN,
  children: [
    {
      path: "/admin/user",
      name: "用户管理",
      access: ACCESS_ENUM.ADMIN,
    },
    {
      path: "/admin/bank",
      name: "题库管理",
      access: ACCESS_ENUM.ADMIN,
    },
    {
      path: "/admin/question",
      name: "题目管理",
      access: ACCESS_ENUM.ADMIN,
    },
  ],
}
```

表格列配置：

```tsx
const columns: ProColumns<API.Question>[] = [
  {
    title: "id",
    dataIndex: "id",
    valueType: "text",
    hideInForm: true,
  },
  {
    title: "标题",
    dataIndex: "title",
    valueType: "text",
  },
  {
    title: "内容",
    dataIndex: "content",
    valueType: "text",
    hideInSearch: true,
    width: 240,
  },
  {
    title: "答案",
    dataIndex: "answer",
    valueType: "text",
    hideInSearch: true,
    width: 640,
  },
  {
    title: "标签",
    dataIndex: "tags",
    valueType: "select",
    fieldProps: {
      mode: "tags",
    }
  },
  {
    title: "创建用户",
    dataIndex: "userId",
    valueType: "text",
    hideInForm: true,
  },

  {
    title: "创建时间",
    sorter: true,
    dataIndex: "createTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "编辑时间",
    sorter: true,
    dataIndex: "editTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "更新时间",
    sorter: true,
    dataIndex: "updateTime",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: "操作",
    dataIndex: "option",
    valueType: "option",
    render: (_, record) => (
      <Space size="middle">
        <Typography.Link
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
          >
          修改
        </Typography.Link>
        <Typography.Link type="danger" onClick={() => handleDelete(record)}>
          删除
        </Typography.Link>
      </Space>
    ),
  },
];
```

#### 2、处理特殊逻辑

1）自定义标签渲染，把字符串转为标签列表：

```tsx
{
  title: "标签",
  dataIndex: "tags",
  valueType: "select",
  fieldProps: {
    mode: "tags",
  },
  render: (_, record) => {
    const tagList = JSON.parse(record.tags || "[]");
    return <TagList tagList={tagList} />;
  },
},
```

TagList 是用于渲染标签列表的组件：

```tsx
import { Tag } from "antd";
import "./index.css";

interface Props {
  tagList?: string[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
  const { tagList = [] } = props;

  return (
    <div className="tag-list">
      {tagList.map((tag) => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};

export default TagList;
```

2）需要修改题目内容和答案的输入框为我们封装的 MdEditor 编辑器，可参考 ProTable 官方文档的 [自定义表单项渲染](https://procomponents.ant.design/components/table?tab=api&current=1&pageSize=5#搜索表单自定义)。

```tsx
{
  title: "内容",
  dataIndex: "content",
  valueType: "text",
  hideInSearch: true,
  width: 240,
  renderFormItem: (
    _,
    { type, defaultRender, formItemProps, fieldProps, ...rest },
    form,
  ) => {
    return (
      // value 和 onchange 会通过 form 自动注入。
      <MdEditor
        // 组件的配置
        {...fieldProps}
      />
    );
  },
},
```

#### 3、问题修复（完善接口）

测试时，发现创建和更新题目的标签失败，这是因为后端接口没有补充 tags 字符串到 tagList 列表的转换，需要给 addQuestion 和 updateQuestion 接口补充转换逻辑。示例代码如下：

```java
Question question = new Question();
BeanUtils.copyProperties(questionAddRequest, question);
List<String> tags = questionAddRequest.getTags();
if (tags != null) {
    question.setTags(JSONUtil.toJsonStr(tags));
}
```

注意，更新数据时，需要将 tags 转换成数组后作为表单初始值，否则无法正常同步到表单。可以在 UpdateModal 中自己定义初始值对象：

```typescript
// 表单转换
let initValues = { ...oldData };
if (oldData.tags) {
  initValues.tags = JSON.parse(oldData.tags) || [];
}
```

然后在 ProTable 组件中使用初始值对象：

```tsx
<ProTable
  type="form"
  columns={columns}
  form={{
    initialValues: initValues,
  }}
/>
```

页面最终效果如图：

![img](./assets/202409021759411.png)

页面完整代码如下，仅供参考：

```tsx
"use client";

import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  deleteQuestionUsingPost,
  listQuestionByPageUsingPost,
} from "@/api/questionController";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import MdEditor from "@/components/MdEditor";

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前点击的数据
  const [currentRow, setCurrentRow] = useState<API.Question>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.Question) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteQuestionUsingPost({
        id: row.id as any,
      });
      hide();
      message.success("删除成功");
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "内容",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      width: 240,
      renderFormItem: (
        _,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          // value 和 onchange 会通过 form 自动注入。
          <MdEditor
            // 组件的配置
            {...fieldProps}
          />
        );
      },
    },
    {
      title: "答案",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
      width: 640,
      renderFormItem: (
        _,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          // value 和 onchange 会通过 form 自动注入。
          <MdEditor
            // 组件的配置
            {...fieldProps}
          />
        );
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <TagList tagList={tagList} />;
      },
    },
    {
      title: "创建用户",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
    },

    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "编辑时间",
      sorter: true,
      dataIndex: "editTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Question>
        headerTitle={"题目管理"}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];

          const { data, code } = await listQuestionByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          return {
            success: code === 0,
            data: data.records || [],
            total: Number(data.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default QuestionAdminPage;
```

## 二、核心页面开发

### 主页

需求：展示有吸引力的内容，比如展示部分最新题库、部分最新题目

页面结构：从上到下，依次是最新题库和最新题目板块，每个版块展示 12 条数据。

💡 分页条数尽量是 3、4 的倍数，比如 12 和 24，可以同时兼容 3 列、4 列。

#### 1、页面整体结构开发

1）先编写页面结构：

```tsx
▼"use server";
import Title from "antd/es/typography/Title";
import { Divider } from "antd";
import "./index.css";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  return <div id="homePage">
    <Title level={3}>
      最新题库
    </Title>
    <div>
      题库列表
    </div>
    <Divider />
    <Title level={3}>
      最新题目
    </Title>
    <div>
      题目列表
    </div>
  </div>;
}
```

2）使用 [Ant Design 的 Flex 组件](https://ant-design.antgroup.com/components/flex-cn#flex-demo-basic)，在标题右侧补充 “查看更多” 到题库列表页的跳转：

```tsx
<Flex justify="space-between" align="center">
  <Title level={3}>最新题库</Title>
  <Link href={"/banks"}>查看更多</Link>
</Flex>
```

3）请求题库和题目列表数据并展示：

```tsx
export default async function HomePage() {

  let questionBankList = [];
  let questionList = [];

  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: 'createTime',
      sortOrder: 'descend',
    })
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e) {
    console.error('获取题库列表失败，' + e.message);
  }

  try {
    const questionListRes = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: 'createTime',
      sortOrder: 'descend',
    })
    questionList = questionListRes.data.records ?? [];
  } catch (e) {
    console.error('获取题目列表失败，' + e.message);
  }
}
```

可以先在页面中展示获取到的数据，确保调用正常：

```tsx
{JSON.stringify(questionBankList)}
{JSON.stringify(questionList)}
```

#### 2、题目列表组件

新建题库列表和题目列表 2 个组件，展示获取到的数据，便于复用。

💡 注意，组件要使用客户端渲染，不然会报错：

![img](./assets/202409021759462.png)

开发题库列表组件的注意事项：

1. 使用 Ant Design 的 Card.Meta 展示单个题库，[参考文档](https://ant-design.antgroup.com/components/card-cn#card-demo-meta)
2. 由于题库有图片，名称不长，适合使用响应式栅格列表组件 List，通过编写 grid 实现响应式布局，[参考文档](https://ant-design.antgroup.com/components/list-cn#list-demo-grid)
3. 使用文本省略组件，让描述显示不超过一行，[参考文档](https://ant-design.antgroup.com/components/typography-cn#typography-demo-ellipsis，)
4. 点击题库后，可以跳转到题库详情页，使用 Next.js 的 Link 组件即可

代码如下：

```tsx
"use client";
import { Avatar, Card, List, Typography } from "antd";
import "./index.css";
import Link from "next/link";

interface Props {
  questionBankList: API.QuestionBankVO[];
}

/**
 * 题库列表组件
 * @param props
 * @constructor
 */
const QuestionBankList = (props: Props) => {
  const { questionBankList = [] } = props;

  return (
    <div className="question-bank-list">
      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
        }}
        dataSource={questionBankList}
        renderItem={(item: API.QuestionBankVO) => (
          <List.Item>
            <Card>
              <Link href={`/bank/${item.id}`}>
                <Card.Meta
                  avatar={<Avatar src={item.picture} />}
                  title={item.title}
                  description={
                    <Typography.Paragraph
                      type="secondary"
                      ellipsis={{ rows: 1 }}
                      style={{ marginBottom: 0 }}
                    >
                      {item.description}
                    </Typography.Paragraph>
                  }
                />
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionBankList;
```

#### 3、题目列表组件

开发题目列表组件的注意事项：

1. 题目没有图片，名称较长，适合使用水平基础列表组件 List，[参考文档](https://ant-design.antgroup.com/components/list-cn#list-demo-basic)
2. 点击题目后，可以跳转到题目详情页

代码如下：

```tsx
"use client";
import { Card, List, Tag } from "antd";
import "./index.css";
import Link from "next/link";

interface Props {
  questionList: API.QuestionVO[];
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [] } = props;

  const tagList = (tags: string[] = []) => {
    return tags.map((tag) => {
      return <Tag key={tag}>{tag}</Tag>;
    });
  };

  return (
    <Card className="question-list">
      <List
        dataSource={questionList}
        renderItem={(item: API.QuestionVO) => (
          <List.Item extra={tagList(item.tagList)}>
            <List.Item.Meta
              title={<Link href={`/question/${item.id}`}>{item.title}</Link>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
```

其中，TagList 可以单独封装为一个组件，便于复用（题目详情页也要用）。代码如下：

```tsx
import { Tag } from "antd";
import "./index.css";

interface Props {
  tagList?: string[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
  const { tagList = [] } = props;

  return (
    <div className="tag-list">
      {tagList.map((tag) => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};

export default TagList;
```

#### 4、其他优化

由于页面可视区域过宽，会让用户的视野过于分散：

![img](./assets/202409021759788.png)

可以限制下页面最大宽度，在 `app/globals.css` 中写一个限制宽度的通用类名：

```css
.max-width-content {
  max-width: 1200px;
  margin: 0 auto;
}
```

给需要限制宽度的页面增加该类名即可：

```tsx
<div id="homePage" className="max-width-content">
  ...
</div>
```

最终，主页效果如图：

![img](./assets/202409021759825.png)

#### 扩展

1）当题库和题目较多时，可以允许用户按照最新、热度、精选等方式对题库和题目进行排序。

2）可以给主页增加吸引人的 banner 图片，或者添加公告栏来通知用户活动信息

### 题库列表页

需求：展示所有题库列表

页面结构：跟主页的题库列表类似，复用题库列表组件即可轻松完成开发。

因为考虑到系统题库数量不多，可以不需要分页实现，减少开发成本，让后端支持返回更多题库即可。

1）修改后端获取题库列表接口，提升允许抓取的页面大小为 200：

```java
@PostMapping("/list/page/vo")
public BaseResponse<Page<QuestionBankVO>> listQuestionBankVOByPage(
    @RequestBody QuestionBankQueryRequest questionBankQueryRequest,
    HttpServletRequest request) {
    long current = questionBankQueryRequest.getCurrent();
    long size = questionBankQueryRequest.getPageSize();
    // 限制爬虫
    ThrowUtils.throwIf(size > 200, ErrorCode.PARAMS_ERROR);
    // ...
}
```

2）开发页面，基本直接复制主页代码就能完成。代码如下：

```tsx
"use server";
import Title from "antd/es/typography/Title";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import "./index.css";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BanksPage() {
  let questionBankList = [];
  // 题库数量不多，直接全量获取
  const pageSize = 200;

  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e) {
    console.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="banksPage" className="max-width-content">
      <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
```

题库列表页的效果如图：

![img](./assets/202409021759155.png)

### 题目搜索页

需求：题目搜索页和题目大全页本质上是同一个页面，都是能让用户通过各种条件搜索题目。为了降低开发成本，可以统一。

结构：可以用表格的形式展示题目列表，由于题目数较多，需要支持分页。

需要支持的搜索条件：

- 题目名称
- 标签

#### 1、页面整体结构开发

参考主页，开发基础页面结构，并获取到题目列表数据：

```tsx
import Title from "antd/es/typography/Title";
import QuestionTable from "@/components/QuestionTable";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import "./index.css";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage() {
  let questionList = [];
  let total = 0;

  try {
    const questionRes = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questionRes.data.records ?? [];
    total = questionRes.data.total ?? 0;
  } catch (e) {
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <div>题目内容</div>
    </div>
  );
}
```

#### 2、题目表格组件

可以封装 QuestionTable 题目表格组件，作为公共组件，便于后续复用。

跟管理页面开发类似，使用 [Ant Design ProComponents 的高级表格组件](https://procomponents.ant.design/components/table)，可以轻松完成。

首先要执行命令安装组件：

```shell
npm i @ant-design/pro-table --force
```

由于该组件涉及到分页（客户端交互），要使用客户端渲染，开发体验跟使用普通的 Vue、React 框架类似。

1）通过高级表单组件自己的规则，改写 request 请求函数，即可实现请求条件改变时自动触发查询，自动支持分页和筛选。代码如下：

```tsx
"use client";

interface Props {
}

/**
 * 题目表格组件
 * @constructor
 */
export default function QuestionTable(props: Props) {
  const actionRef = useRef<ActionType>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "题目",
      dataIndex: "title",
      render(_, record) {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags"
      },
      render: (_, record) => <TagList tagList={record.tagList} />,
    },
  ];

  return (
    <div className="question-table">
      <ProTable
        actionRef={actionRef}
        columns={columns}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];
          // 请求
          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);
          // 更新结果
          const newTotal = Number(data.total) || 0;
          const newData = data.records || [];
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        />
    </div>
  );
}
```

#### 3、使用表格组件

在题目列表页引入组件：

```css
<QuestionTable />
```

需要将页面宽度调整为 100%，否则表格宽度会动态变化。代码如下：

```css
#questionsPage {
  width: 100%;
}
```

效果如图：

![img](./assets/202409021759264.png)

#### 4、支持服务端渲染

需要支持服务端渲染，外层页面如果已经在服务端取得了数据，可以直接展示，而不用等到客户端渲染时再发起请求。

解决方案很简单，给题目表格组件新增默认题目列表、默认总数这 2 个属性，外层页面传递已获取到的数据，作为表格组件的初始数据状态即可。

```css
interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
}
```

在表格组件中，将 questionList 和 total 定义为状态，然后在 request 函数中改变状态，相当于将 ProTable 作为受控组件使用。

修改的代码如下：

```tsx
interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
}

/**
 * 题目表格组件
 * @constructor
 */
export default function QuestionTable(props: Props) {
  const { defaultQuestionList, defaultTotal } = props;
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);

  return (
    <div className="question-table">
      <ProTable
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 更新结果
          const newTotal = Number(data.total) || 0;
          setTotal(newTotal);
          const newData = data.records || [];
          setQuestionList(newData);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
      />
    </div>
  );
}
```

但还有个问题，首次服务端已经获得了数据，客户端就没必要再请求一次了，可以新增 init 变量进行判断。

代码如下：

```tsx
const [init, setInit] = useState<boolean>(true);
```

在 request 函数开头添加判断逻辑：

```tsx
// 首次请求
if (init) {
  setInit(false);
  // 如果已有外层传来的默认数据，无需再次查询
  if (defaultQuestionList && defaultTotal) {
    return;
  }
}
```

#### 5、和上方搜索条联动

1）修改 BasicLayout 的搜索输入框，搜索时携带搜索文本跳转到题目搜索页：

```tsx
/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  const router = useRouter();

  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
    >
      <Input.Search
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        placeholder="搜索题目"
        onSearch={(value) => {
          router.push(`/questions?q=${value}`);
        }}
      />
    </div>
  );
};
```

可以将搜索输入框抽象为独立组件，在 BasicLayout 下新建 components，因为该搜索组件目前只有该布局用到。

![img](./assets/202409021759070.png)

2）题目大全页面需要获取查询文本，进行操作。

在 Next.js 中，可以通过 searchParams 轻松获取到 url 的查询参数：

```tsx
export default async function QuestionsPage({ searchParams }) {
  const { q: searchText } = searchParams;
  // ...
}
```

然后要在 2 个地方使用搜索文本参数，一方面是根据搜索文本在服务端时查询到初始数据：

```tsx
try {
  const questionRes = await listQuestionVoByPageUsingPost({
    title: searchText,
    pageSize: 12,
    sortField: "createTime",
    sortOrder: "descend",
  });
  questionList = questionRes.data.records ?? [];
  total = questionRes.data.total ?? 0;
} catch (e) {
  console.error("获取题目列表失败，" + e.message);
}
```

另一方面需要将其传递给题目表格组件，作为默认搜索条件。为了通用性，定义 defaultSearchParams 对象类型的属性，可传递多个默认搜索条件字段。

题目表格组件的属性新增字段：

```tsx
interface Props {
  // ...
  // 默认搜索条件
  defaultSearchParams?: API.QuestionQueryRequest;
}
```

利用 ProTable 的初始值属性 initialValues，可以将默认搜索条件作为初始值传递给搜索表单：

```tsx
<ProTable
  actionRef={actionRef}
  columns={columns}
  form={{
    initialValues: defaultSearchParams,
  }}
/>
```

3）题目列表页面传入搜索条件：

```tsx
<QuestionTable defaultQuestionList={questionList} defaultTotal={total} defaultSearchParams={{
  title: searchText,
}} />
```

### 题库详情页

需求：从上到下展示题库信息、以及题库内的题目列表

#### 1、基础页面开发

新建动态路由页面：

![img](./assets/202409021759746.png)

在页面中可以通过 params 获取到动态参数：

```tsx
export default async function BankPage({ params }) {
  const { questionBankId } = params;
}
```

先请求题库详情数据，如果没有找到对应的数据，直接返回一段文案作为错误处理结果。

💡 也可以使用 Next.js 支持的全局错误处理 ErrorBoundary。

代码如下：

```tsx
let bank = undefined;

try {
  const bankRes = await getQuestionBankVoByIdUsingGet({
    id: questionBankId,
    needQueryQuestionList: true,
    pageSize: 200,
  });
  bank = bankRes.data;
} catch (e) {
  console.error("获取题库详情失败，" + e.message);
}

if (!bank) {
  return <div>获取题库详情失败，请刷新重试</div>;
}
```

💡 注意，服务端渲染无法使用 <AA.BB> 引入子包的组件，可以直接引入

有了数据后，就可以开发页面了，主要有以下几个注意事项：

1. 页面上方复用 Ant Design 的 Card.Meta 组件展示题库信息
2. 页面下方复用 QuestionList 题目列表组件，展示题目列表

此处是考虑到同一题库内的题目数量不多，所以暂时不需要分页，可以将 pageSize 调整大一些，直接使用题目列表组件即可。如果需要实现分页，可以使用之前封装的 QuestionTable 题目表格组件。

页面代码如下：

```tsx
import Title from "antd/es/typography/Title";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import QuestionList from "@/components/QuestionList";
import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css";

/**
 * 题库详情页面
 * @constructor
 */
export default async function BankPage({ params }) {
  const { questionBankId } = params;

  let bank = undefined;

  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data;
  } catch (e) {
    console.error("获取题库详情失败，" + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <Paragraph type="secondary">{bank.description}</Paragraph>
          }
        ></Meta>
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList
        questionList={bank.questionPage?.records || []}
      />
    </div>
  );
}
```

#### 2、问题修复和优化

调试过程中，可能会发现一些问题。

1）需要修复接口问题：在 getQuestionBankVOById 接口中，没有把查询请求的分页条件和其他过滤条件传递给 questionService.listQuestionByPage 方法，可以按需调整。

还要将该接口返回值的 questionPage 类型从 Question 改为 QuestionVO，跟主页获取题目分页列表接口保持一致。

修改后的接口代码如下：

```java
@GetMapping("/get/vo")
public BaseResponse<QuestionBankVO> getQuestionBankVOById(QuestionBankQueryRequest questionBankQueryRequest, HttpServletRequest request) {
    ThrowUtils.throwIf(questionBankQueryRequest == null, ErrorCode.PARAMS_ERROR);
    Long id = questionBankQueryRequest.getId();
    ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
    // 查询数据库
    QuestionBank questionBank = questionBankService.getById(id);
    ThrowUtils.throwIf(questionBank == null, ErrorCode.NOT_FOUND_ERROR);
    // 查询题库封装类
    QuestionBankVO questionBankVO = questionBankService.getQuestionBankVO(questionBank, request);
    // 是否要关联查询题库下的题目列表
    boolean needQueryQuestionList = questionBankQueryRequest.isNeedQueryQuestionList();
    if (needQueryQuestionList) {
        QuestionQueryRequest questionQueryRequest = new QuestionQueryRequest();
        questionQueryRequest.setQuestionBankId(id);
        // 可以按需传递更多参数
        questionQueryRequest.setPageSize(questionBankQueryRequest.getPageSize());
        questionQueryRequest.setCurrent(questionBankQueryRequest.getCurrent());
        // 封装 question => questionVO
        Page<Question> questionPage = questionService.listQuestionByPage(questionQueryRequest);
        questionBankVO.setQuestionPage(questionService.getQuestionVOPage(questionPage, request));
    }
    // 获取封装类
    return ResultUtils.success(questionBankVO);
}
```

2） 给 QuestionList 题目列表组件补充 cardTitle 属性，更优雅地展示标题。

```tsx
interface Props {
  cardTitle?: React.ReactNode;
  questionList: API.QuestionVO[];
}
```

应用到组件内 Card 的 title 属性：

```tsx
<Card className="question-list" title={cardTitle}>
```

然后可以在页面中使用属性，展示 “题目列表” 4 个字和当前题库下的题目总数：

```tsx
▼<QuestionList
  questionList={bank.questionPage?.records || []}
  cardTitle={`题目列表（${bank.questionPage?.total || 0}）`}
  questionBankId={questionBankId}
/>
```

3）如果题库为空，接口还是会返回所有题目数据。这是因为之前后端 service 中分页获取题目列表的 listQuestionByPage 方法有误。当查询不到题库题目关系时，应该直接返回空页面，而不是不限定 questionId in 的条件，导致了全量查询。

修改代码如下：

```java
if (CollUtil.isNotEmpty(questionList)) {
    // 取出题目 id 集合
    Set<Long> questionIdSet = questionList.stream()
            .map(QuestionBankQuestion::getQuestionId)
            .collect(Collectors.toSet());
    // 复用原有题目表的查询条件
    queryWrapper.in("id", questionIdSet);
} else {
    // 题库为空，则返回空列表
    return new Page<>(current, size, 0);
}
```

#### 3、超链接跳转

提供 2 种跳转到题目详情页进行刷题的方式。

1）补充开始刷题按钮，默认跳转到第一道题目，没有题目则禁用：

```tsx
// 获取第一道题目，用于 “开始刷题” 按钮跳转
let firstQuestionId;
if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
  firstQuestionId = bank.questionPage.records[0].id;
}
```

按钮代码如下：

```tsx
<Button
  type="primary"
  shape="round"
  disabled={!firstQuestionId}
  href={`/bank/${questionBankId}/question/${firstQuestionId}`}
  target="_blank"
>
  开始刷题
</Button>
```

2）之前的题目列表页跳转到的是单个题目详情，而从题库点开的题目应该是进到题库题目详情页，会额外在左侧展示题库内的其他题目。所以需要区分题库详情页中题目列表项的点击跳转地址。

给题目列表组件增加 questionBankId 属性：

```tsx
interface Props {
  questionBankId?: number;
  cardTitle?: React.ReactNode;
  questionList: API.QuestionVO[];
}
```

可以根据题库 id 是否存在，来区分跳转地址：

```tsx
<Link
  href={
    questionBankId
      ? `/bank/${questionBankId}/question/${item.id}`
      : `/question/${item.id}`
  }
>
  {item.title}
</Link>
```

题库详情页的效果如图：

![img](./assets/202409021759404.png)

#### 扩展

当题库过多时，可以采用滚动下拉分页加载。React 有现成的无限滚动加载组件。

### 题目详情页

需求：有两种不同的题目详情页

1. 从题库进入的题目详情页：左侧需要展示题库内的题目列表。路由：/bank/[bankId]/question/[questionId]
2. 从其他位置（比如主页、搜索页）进入的题目详情页，不需要展示题库列表。路由：/question/[questionId]

这两个页面极为相似，可以直接开发额外展示题目列表的题目详情页，另一个页面复制并删减即可。

#### 1、页面整体结构开发

1）选择 Flex 一行两列布局，左边 Sider 侧边栏展示题目列表、右边 Content 展示内容，可以 [参考官方文档](https://ant-design.antgroup.com/components/layout-cn#layout-demo-top-side-2) 实现布局。

```tsx
<div id="bankQuestionPage">
  <Flex gap={24}>
    <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
      <Title level={4} style={{ padding: "0 20px" }}>
        题库标题
      </Title>
      <Menu />
    </Sider>
    <Content>
      题目详情
    </Content>
  </Flex>
</div>
```

2）从 url 中获取题库 id 和题目 id，然后请求详情数据：

```tsx
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;

  let bank = undefined;
  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data;
  } catch (e) {
    console.error("获取题库详情失败，" + e.message);
  }
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  let question = undefined;
  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e) {
    console.error("获取题目详情失败，" + e.message);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
}
```

接下来就可以依次实现左侧菜单和右侧内容的展示了。

#### 2、题目列表菜单

菜单需要支持点击和高亮，可以使用 Ant Design 的 Menu 组件，参考 [官方文档](https://ant-design.antgroup.com/components/menu-cn)。

首先获取题目菜单列表，将题目列表数据转为 Menu 接受的数据格式即可：

```tsx
// 题目菜单列表
const questionMenuItemList = (bank.questionPage?.records || []).map(
  (q) => {
    return {
      label: q.title,
      key: q.id,
    };
  },
);
```

然后传递给 Menu 组件：

```tsx
<Menu items={questionMenuItemList} />
```

#### 3、题目详情组件

由于两种题目详情页都需要展示题目详情，所以封装为独立组件。

从上到下展示题目信息即可，注意展示题目内容和答案时使用 MdViewer 组件，代码如下：

```tsx
"use client";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import MdViewer from "@/components/MdViewer";
import "./index.css";
import TagList from "@/components/TagList";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题目卡片组件
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  return (
    <div className="question-card">
      <Card bordered={false}>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="推荐答案" bordered={false}>
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
```

#### 4、切换和高亮题目

点击菜单时，需要切换题目，给菜单组件增加超链接即可：

```tsx
// 题目菜单列表
const questionMenuItemList = (bank.questionPage?.records || []).map(
  (question) => {
    return {
      label: <Link href={`/bank/${bank.id}/question/${question.id}`} prefetch={false}>{question.title}</Link>,
      key: question.id,
    };
  },
);
```

还需要在菜单中高亮当前题目，可以通过 Menu 组件的 selectedKeys 属性实现选中高亮。根据 questionId 进行匹配，代码如下：

```tsx
<Menu items={questionMenuItemList} selectedKeys={[questionId]} />
```

#### 5、优化 MdViewer 展示效果

目前编辑器的展示效果不佳，可以参考 ByteMD 组件的指引，下载第三方主题，比如 GitHub 的主题：https://github.com/sindresorhus/github-markdown-css

参考上方文档安装之后，在 MdViewer 和 MdEditor 中引入样式文件：

```tsx
import 'github-markdown-css/github-markdown-light.css';
```

效果如图：

![img](./assets/202409021759216.png)

直接把开发好的 question 目录复制到 app 目录下，删除菜单栏和题库获取逻辑，即可得到单个题目详情页，代码如下：

```tsx
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { Flex } from "antd";
import React from "react";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import "./index.css";

/**
 * 题目详情页面
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;

  let question = undefined;
  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e) {
    console.error("获取题目详情失败，" + e.message);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  return (
    <div id="questionPage" className="max-width-content">
      <QuestionCard question={question} />
    </div>
  );
}
```

效果如图：

![img](./assets/202409021759692.png)

#### 扩展

1）支持折叠题目列表菜单：Ant Design 的 Menu 组件支持自定义菜单折叠触发器，[参考文档](https://ant-design.antgroup.com/components/menu-cn#menu-demo-inline-collapsed)。

2）题库和题目详情页的右侧可以展示目录、内容推荐等

3）题目详情页可以增加上一题、下一题的跳转

## 三、题目题库绑定

业务流程：直接复用已有的题目管理页面，管理员可以在该页面查询题目列表（比如根据题库查询），然后对这些题目进行操作，比如修改题目所属题库（添加或移除题目题库绑定关系）。

### 按照题库查询题目

在题目管理页面的 columns 中新增字段，要求表格中不可见，仅用于表单查询：

```tsx
{
  title: "所属题库",
  dataIndex: "questionBankId",
  hideInTable: true,
  hideInForm: true,
},
```

效果如图：

![img](./assets/202409021759740.png)

### 修改题目所属题库

可以参考修改题目信息的做法，在题目管理页面的目录下，新增一个弹窗表单组件。

#### 1、修改题库弹窗组件

直接复制题目修改弹窗组件，在此基础上进行修改即可。

应该如何让用户添加或移除题目绑定的题库呢？可以使用 [Ant Design 的 Select 多选组件](https://ant-design.antgroup.com/components/select-cn#select-methods)，来从题库列表中选择题库。选中时调用加入题库接口，取消选中时调用从题库移除接口。

💡 还有其他的实现方式，比如多选所属题库列表后，点击提交按钮，才提交到后端，由后端计算应该如何处理题库题目绑定关系。

组件属性如下：

```tsx
interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}
```

表单代码如下：

```tsx
<Form style={{ marginTop: 24 }}>
  <Form.Item label="所属题库">
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      defaultValue={["a10", "c12"]}
      onSelect={(value) => {
        alert("选中：" + value);
      }}
      onDeselect={(value) => {
        alert("取消选中：" + value);
      }}
      options={[]}
    />
  </Form.Item>
</Form>
```

#### 2、使用弹窗组件

1）在题目管理页面新增 visible 变量，用于控制弹窗是否显示：

```tsx
// 是否显示更新所属题库的弹窗
const [updateBankModalVisible, setUpdateBankModalVisible] = useState<boolean>(false);
```

2）新增操作按钮，触发打开弹窗：

```tsx
<Typography.Link
  onClick={() => {
    setCurrentRow(record);
    setUpdateBankModalVisible(true);
  }}
>
  修改所属题库
</Typography.Link>
```

3）引入弹窗组件，并传递属性：

```tsx
<UpdateBankModal
    visible={updateBankModalVisible}
    questionId={currentRow?.id}
    onCancel={() => {
      setCurrentRow(undefined);
      setUpdateBankModalVisible(false);
    }}
/>
```

#### 3、填充默认值 - 获取所属题库列表

如果题目已有所属题库，应该在修改表单中展示。

可以通过获取题库题目关系接口，获取到当前题目所属的题库列表，仅需获取一次，然后填充到表单中作为初始值。代码如下：

```tsx
const [form] = Form.useForm();

// 获取所属题库列表
const getCurrentQuestionBankIdList = async () => {
  try {
    const res = await listQuestionBankQuestionByPageUsingPost({
      questionId,
      pageSize: 20,
    });
    const list = (res.data.records ?? []).map((item) => item.questionBankId);
    form.setFieldValue("questionBankIdList" as any, list);
  } catch (e) {
    console.error("获取题目所属题库列表失败，" + e.message);
  }
};

useEffect(() => {
  if (questionId) {
    getCurrentQuestionBankIdList();
  }
}, [questionId]);
```

给表单组件添加 form 引用：

```tsx
<Form form={form} style={{ marginTop: 24 }}>
</Form>
```

#### 4、获取可选题库

题库很多，不可能让管理员手动输入 id 来选题库，应该显示可选题库列表和题库名称，提高选择效率。

由于题库数量不多，直接全量获取到题库列表即可：

```tsx
const [questionBankList, setQuestionBankList] = useState<
  API.QuestionBankVO[]
>([]);

// 获取题库列表
const getQuestionBankList = async () => {
  // 题库数量不多，直接全量获取
  const pageSize = 200;
  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    setQuestionBankList(questionBankRes.data.records ?? []);
  } catch (e) {
    console.error("获取题库列表失败，" + e.message);
  }
};

useEffect(() => {
  getQuestionBankList();
}, []);
```

然后计算出 Select 组件需要的选项：

```tsx
<Select
  mode="multiple"
  style={{ width: "100%" }}
  defaultValue={currentQuestionBankIdList}
  onSelect={(value) => {
    alert("选中：" + value);
  }}
  onDeselect={(value) => {
    alert("取消选中：" + value);
  }}
  options={questionBankList.map((questionBank) => {
    return {
      label: questionBank.title,
      value: questionBank.id,
    };
  })}
/>
```

#### 5、选中或取消选中题库

利用 Select 的选中和取消选中事件，调用接口实现题库绑定 / 解绑：

```tsx
▼onSelect={async (value) => {
  const hide = message.loading("正在更新");
  try {
    await addQuestionBankQuestionUsingPost({
      questionId,
      questionBankId: value,
    });
    hide();
    message.success("绑定题库成功");
  } catch (error: any) {
    hide();
    message.error("绑定题库失败，" + error.message);
  }
}}
onDeselect={async (value) => {
  const hide = message.loading("正在更新");
  try {
    await removeQuestionBankQuestionUsingPost({
      questionId,
      questionBankId: value,
    });
    hide();
    message.success("取消绑定题库成功");
  } catch (error: any) {
    hide();
    message.error("取消绑定题库失败，" + error.message);
  }
}}
```

效果如图：

![img](./assets/202409021759768.png)

#### 扩展

1）支持在题库管理页面直接搜索和添加题目到题库中，实现方式和上面类似。

2）题库数量较多时，可以根据用户的输入进行防抖搜索，而不是全量将题库列表加载到可选项。可参考 [官方文档](https://ant-design.antgroup.com/components/select-cn#select-demo-select-users)。

## 四、扩展思路

以下内容前端同学全都可写到简历上：

#### 1、预渲染

通过 [官方文档](https://nextjs.org/docs/app/api-reference/components/link#prefetch) 了解 Next.js 的 prefetch 预渲染机制，进行性能优化。

比如页面内的链接过多时，预渲染次数会很多，可以将 prefetch 关闭来减少预渲染：

```tsx
<Link href={`/question/${question.id}`} prefetch={false}>{question.title}</Link>
```

#### 2、Metadata

Next.js 支持通过 Metadata 设置页面的 TDK（标题、描述、关键词）等网页元信息。可参考官方文档：https://nextjs.org/docs/app/building-your-application/optimizing/metadata

```tsx
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: '...',
  description: '...',
}
 
export default function Page() {}
```

#### 3、请求缓存

Next.js 扩展了原生的 fetch，支持请求数据的服务端缓存，是提升性能、减少资源占用的好方法。

可以参考官方获取数据的文档：https://nextjs.org/docs/app/building-your-application/data-fetching

但是，我们项目中使用的 Axios 库是不支持缓存的！有其他的方式来实现缓存：

1）可以在 getStaticProps 或 getServerSideProps 中使用 Axios 来获取数据，然后通过 Next.js 的 revalidate 选项来控制页面或数据的重新生成时间。

参考代码如下：

```javascript
▼export async function getStaticProps() {
  const response = await axios.get('https://mianshiya.com/data', {
    headers: {
      'Cache-Control': 'no-store',
    },
  });

  return {
    props: {
      data: response.data,
    },
    revalidate: 10000, // 在 10,000 秒后重新生成页面
  };
}
```

2）切换其他请求库，比如原生的 fetch，或者官方推荐的请求库：https://swr.vercel.app/zh-CN

#### 4、并发请求

如果同一个页面要多次请求后端，串行可能会很慢，导致页面迟迟不返回。因此可以并发调用多个接口来获取数据，使用 promise.all 语法即可。



# 5 - 用户功能拓展

## 本节重点

面向用户的扩展功能

- 用户刷题记录日历：需求分析 + 方案设计 + 前后端开发 + 性能优化
- 分词题目搜索：需求分析 + 方案设计 + 前后端开发

## 一、用户刷题记录日历

### 需求分析

为了鼓励用户多在网站上刷题，并且能自主复盘学习情况，增加成就感，需要支持用户刷题记录日历功能。

每个用户有自己的签到记录，具体拆解为 2 个子需求：

1. 用户每日首次浏览题目，算作是签到，会记录在系统中。
2. 用户可以在前端以图表的形式查看自己在 **某个年份** 的刷题签到记录（每天是否有签到）。

### 方案设计

后端实现关键在于如何快速存储和获取刷题记录；前端实现关键在于如何展示刷题记录。

#### 后端方案 - 基于数据库

在数据库中设计一张签到表，记录用户每次签到的日期及其他相关信息。然后通过时间范围查询得到用户的签到记录。

示例表结构如下：

```sql
CREATE TABLE user_sign_in (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,  -- 主键，自动递增
  userId BIGINT NOT NULL,               -- 用户ID，关联用户表
  signDate DATE NOT NULL,            -- 签到日期
  createdTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 记录创建时间
  UNIQUE KEY uq_user_date (userId, signDate)  -- 用户ID和签到日期的唯一性约束
);
```

通过唯一索引，可以确保同一用户在同一天内只能签到一次。

通过下面的 SQL 即可查询用户的签到记录：

```sql
SELECT signDate FROM user_sign_in 
WHERE userId = ? AND signDate BETWEEN ？AND ?;
```

优点：原理简单，容易实现，适用于用户量较小的系统。

缺点：随着用户量和数据量增大，对数据库的压力增大，直接查询数据库性能较差。除了单接口的响应会增加，可能整个系统都会被其拖垮。

💡 试想一下，每天 1 万个用户签到，1 个月就 30 万条数据，3 个月就接近百万的数据量了，占用硬盘空间大概 50 MB。**存储 100 万个用户 365 天的签到记录，需要 17.52 GB 左右。**

#### 后端方案 - 基于缓存 Redis Set

可以利用内存缓存加速读写，常用的本地缓存是 Caffeine，分布式缓存是 Redis。

由于每个用户会有多个签到记录，很适合使用 Redis 的 Set 类型存储，每个用户对应一个键，Set 内的每个元素为签到的具体日期。

Redis Key 的设计为：`user:signins:{userId}`

其中：

- user 是业务领域前缀
- signins 是具体操作或功能
- {userId} 表示每个用户，是动态值

如果 Redis 被多个项目公用，还可以在开头增加项目前缀区分，比如 `mianshiya:user:signins:{userId}`。

💡 扩展知识：Redis 键设计规范

- 明确性：键名称应明确表示数据的含义和结构。例如，通过使用 `signins` 可以清楚地知道这个键与用户的签到记录有关。
- 层次结构：使用冒号 `:` 分隔不同的部分，可以使键结构化，便于管理和查询。
- 唯一性：确保键的唯一性，避免不同数据使用相同的键前缀。
- 一致性：在整个系统中保持键设计的一致性，使得管理和维护变得更加简单。
- 长度：避免过长的键名称，以防影响性能和存储效率。

具体示例如下，可以使用 Redis 命令行工具添加值到集合中：

```shell
SADD user:signins:123 "2024-09-01"
SADD user:signins:123 "2024-09-02"
```

使用命令查找集合中的值：

```java
SMEMBERS user:signins:123
```

可以利用可视化工具查看和管理 Redis，比如 IDEA 自带的、或者 [RESP](https://github.com/RedisInsight/RedisDesktopManager)：

![img](./assets/202409061424237.png)

该方案的优点：Set 数据结构天然支持去重，适合存储和检索打卡记录。

缺点：上述设计显然存储了很多重复的字符串，针对海量数据场景，需要考虑内存的占用量。

比如下列数据：

```shell
key = user:signins:123
value = ["2024-09-01", "2024-09-02", "2024-10-01", "2024-10-02"]
```

其中，年份被重复存储。

为了减少内存占用，还可以在 key 中增加更多日期层级，比如 `user:signins:{year}:{userId}`。示例命令如下：

```shell
SADD user:signins:2024:123 "09-01"
SADD user:signins:2024:123 "10-01"
```

这样一来，不仅节约了内存，也便于管理，可以轻松查询某个用户在某个年份的签到情况。

💡 存储 **100 万个用户** 的 **365 天** 签到记录，使用 Redis 集合类型来存储每个用户的签到信息，每个用户需要大约 **1880 字节** 的空间，总共需要大约 **1.88GB** 的内存空间，相比数据库节约了 10 倍左右。

有没有更节约内存的方式呢？

#### 后端方案 - Bitmap 位图

Bitmap 位图，是一种使用位（bit）来表示数据的 **紧凑** 数据结构。每个位可以存储两个值：0 或 1，常用于表示某种状态或标志。因为每个位仅占用 1 位内存，Bitmap 在大规模存储二值数据（如布尔值）时，非常高效且节约空间。

核心思想：与其存储用户签到的具体日期，不如存储用户在今年的第 N 天是否签到。

```java
2024-01-01 => 1（第一天）
2024-01-03 => 3（第三天）
```

使用位图类型存储，每个用户对应一个键，Bitmap 的 **每一位** 来表示用户在 **某一天** 是否打卡。

举个例子，我们签到的状态可以用 0 和 1 表示，0 代表未签到，1 代表签到。

```java
0101 表示第 1 天和第 3 天已签到
1010 表示第 2 天和第 4 天已签到
```

如果不用 Bitmap，最传统的方式，我们可以先试着用 int 类型来存储签到状态：

```java
int status = 0; // 未签到
int status = 1; // 已签到
```

而 int 类型占用的空间为 4 个字节（byte），一个字节占 8 位（bit），即一个 int 占 32 位。

在这种仅存储二值（0 或 1）的场景，就可以使用 Bitmap 位图来优化存储，因为一个 bit 就可以表示 0 和 1。

把 int 优化成用 bit 存储，那么占用的空间可以优化 32 倍！假设原先占用的大小需要 32 G，那么改造后仅需 1 G。如图：

![img](./assets/202409061424257.png)

这里需要注意：现代计算机体系结构通常以字节（8位）作为最小寻址单位，那么上述的 bit 是如何存储的呢？

答案就是 **打包**。

通过将多个 bit 打包到一个字节（或者其他更大的数据类型，如 int、long）中来实现的。每个字节（或数据类型）被视为一个桶，里面可以存放若干个布尔值（0 或 1）。

对每一位操作时，要使用位运算进行访问，所以上述的图实际应该改成：

![img](./assets/202409061424258.png)

💡 对于刷题签到记录场景，一个用户存储一年的数据仅需占用 46 字节，因为 46 * 8 = 368，能覆盖 365 天的记录。那一百万用户也才占用 43.8 MB，相比于 Redis Set 结构节约了 40 多倍存储空间！

1000w 个用户也才占用 438 MB！恭喜你，设计出了一个低成本支持千万用户的系统！

![img](./assets/202409061424261.png)

当然，我们没必要自己通过 int 等类型实现 Bitmap，JDK 自带了 BitSet 类、Redis 也支持 Bitmap 高级数据结构。考虑到项目的分布式、可扩展性，采用 Redis 的 Bitmap 实现。

Redis Key 的设计为：`user:signins:{年份}:{userId}`

设置某一个 bit 值的命令如下：

```shell
-- 表示用户在第 240 天打卡
SETBIT user:signins:2024:123 240 1
-- 表示用户在第 241 天打卡
SETBIT user:signins:2024:123 241 1
```

查询某一个 bit 值的命令：

```shell
GETBIT user:signins:2024:123 240
```

在 Java 程序中，还可以使用 Redisson 库提供的现成的 RBitSet，开发成本也很低。

这种方案的优点：内存占用极小，适合大规模用户和日期的场景。

缺点：需要熟悉位图操作，不够直观。

![img](./assets/202409061424262.png)

但这个缺点无关痛痒，因此本项目采用这种方案实现。

总结一下：

- 基于性能的考虑，我们选用 Redis 中间件来存储用户的签到记录。
- 基于空间的考虑，我们选用 Bitmap 数据结构来存储用户的签到记录。

#### 前端方案

要明确前端展示签到记录日历所需的数据类型，后端才好设计接口的返回值，因此方案设计阶段要考虑全面。

复杂的展示组件肯定不用自己开发，只要是图表（可视化），就可以优先考虑使用 Apache ECharts 前端可视化库，有 3 种可行的组件：

1. 基础日历图：https://echarts.apache.org/examples/zh/editor.html?c=calendar-simple
2. 日历热力图：https://echarts.apache.org/examples/zh/editor.html?c=calendar-heatmap，跟上一个图的区别就是鼠标放上去可以展示具体的热力值，热力值越高，图块的颜色越深。
3. 日历图：https://echarts.apache.org/examples/zh/editor.html?c=calendar-charts

本项目选择基础日历图即可，不涉及热力数值的区分（只有 0 和 1 签到 / 未签到的区别）：

![img](./assets/202409061424011.png)

可以通过官方的 Demo 观察所需的数据格式，官方生成数据的循环代码如下：

```javascript
▼ for (let time = date; time <= end; time += dayTime) {
  data.push([
    echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
    Math.floor(Math.random() * 10000)
  ]);
}
```

显然，得到的数据是一个二维数组，每个元素表示一个日期和对应的数值：

```javascript
▼ [
  ['2017-01-01', 3456],
  ['2017-01-02', 8975],
  ...
]
```

但回归我们的项目，用 Bitmap 每天最多只有一次记录，相当于只有 0 和 1。因此可以调整 Apache ECharts 图表的配置来调整热力值的范围，从而控制颜色深浅。还支持调整颜色：

```javascript
▼ visualMap: {
  show: false,
    min: 0,
    max: 1,
    inRange: {
    color: ['#efefef', 'lightgreen']  // 颜色从灰色到浅绿色
  },
},
```

效果如图：

![img](./assets/202409061424144.png)

因此，后端只需要返回下列结构即可：

```javascript
▼ [
  ['2024-01-01', 0],
  ['2024-01-02', 1],
  ...
]
```

### 后端开发

需要开发 2 个接口：

1. 添加刷题签到记录
2. 查询刷题签到记录

在此之前，需要先引入 Redisson 依赖，以实现 Bitmap 存储。

#### 1、引入 Redisson

[Redisson](https://github.com/redisson/redisson) 是一个基于 Redis 的开源分布式 Java 数据库客户端，提供了类似 Java 标准库的数据结构（如 Map、Set、List、BitSet 等）在分布式环境下的实现。它不仅支持基本的 Redis 操作，还提供了高级功能，如分布式锁、同步器、限流器、缓存等，简化了在分布式系统中使用 Redis 进行数据共享和并发控制的复杂性。

![img](./assets/202409061424370.png)

1）在 pom.xml 文件中引入 Redisson：

```xml
 <dependency>
  <groupId>org.redisson</groupId>
  <artifactId>redisson</artifactId>
  <version>3.21.0</version>
</dependency>
```

2）在 config 目录下编写 Redisson 客户端配置类，会自动读取项目中的 Redis 配置，初始化客户端 Bean。代码如下：

```java
@Configuration
@ConfigurationProperties(prefix = "spring.redis")
@Data
public class RedissonConfig {

    private String host;

    private Integer port;

    private Integer database;

    private String password;

    @Bean
    public RedissonClient redissonClient() {
        Config config = new Config();
        config.useSingleServer()
        .setAddress("redis://" + host + ":" + port)
        .setDatabase(database)
        .setPassword(password);
        return Redisson.create(config);
    }
}
```

3）项目的 yml 配置文件中补充 Redis 配置，没有密码就可以注释掉：

```java
# Redis 配置
spring:
  redis:
    database: 0
    host: xxxx
    port: xxx
    timeout: 2000
    password: xxx
```

然后尝试启动项目。如果用的是编程导航的万用后端模板，**记得取消启动类对 Redis 的移除**。

#### 2、添加刷题签到记录接口

触发时机：已登录用户进入题目详情页时，调用接口，触发签到。

接口逻辑：判断目前用户当天是否签到

- 如果已签到，则忽略
- 如果未签到，则在 Bitmap 中设置记录

1）因为读写 Redis 使用的是相同的 key，可以将所有 Redis 的 key 单独定义成常量，放在 constant 目录下，还可以提供拼接完整 key 的方法。代码如下：

```java
public interface RedisConstant {

    /**
     * 用户签到记录的 Redis Key 前缀
     */
    String USER_SIGN_IN_REDIS_KEY_PREFIX = "user:signins";

    /**
     * 获取用户签到记录的 Redis Key
     * @param year 年份
     * @param userId 用户 id
     * @return 拼接好的 Redis Key
     */
    static String getUserSignInRedisKey(int year, long userId) {
        return String.format("%s:%s:%s", USER_SIGN_IN_REDIS_KEY_PREFIX, year, userId);
    }

}
```

2）在 UserService 中编写接口：

```java
/**
 * 添加用户签到记录
 *
 * @param userId 用户 id
 * @return 当前是否已签到成功
 */
boolean addUserSignIn(long userId);
```

编写实现类：

```java
/**
 * 添加用户签到记录
 *
 * @param userId 用户签到
 * @return 当前是否已签到成功
 */
public boolean addUserSignIn(long userId) {
    LocalDate date = LocalDate.now();
    String key = RedisConstant.getUserSignInRedisKey(date.getYear(), userId);
    RBitSet signInBitSet = redissonClient.getBitSet(key);
    // 获取当前日期是一年中的第几天，作为偏移量（从 1 开始计数）
    int offset = date.getDayOfYear();
    // 检查当天是否已经签到
    if (!signInBitSet.get(offset)) {
        // 如果当天还未签到，则设置
        return signInBitSet.set(offset, true);
    }
    // 当天已签到
    return true;
}
```

3）在 Controller 中编写 API 接口：

```java
/**
 * 添加用户签到记录
 *
 * @param request
 * @return 当前是否已签到成功
 */
@PostMapping("/add/sign_in")
public BaseResponse<Boolean> addUserSignIn(HttpServletRequest request) {
    // 必须要登录才能签到
    User loginUser = userService.getLoginUser(request);
    boolean result = userService.addUserSignIn(loginUser.getId());
    return ResultUtils.success(result);
}
```

💡 思考：这个接口的签到操作能否异步执行呢？

#### 3、查询刷题签到记录接口

实现思路：

1. 通过 userId 和当前年份从 Redis 中获取对应的 Bitmap
2. 获取当前年份的总天数
3. 循环天数拼接日期，根据日期去 Bitmap 中判断是否有签到记录，并记录到数组中
4. 最后，将拼接好的、一年的签到记录返回给前端

1）在 UserService 中定义接口：

```java
/**
 * 获取用户某个年份的签到记录
 *
 * @param userId 用户 id
 * @param year   年份（为空表示当前年份）
 * @return 签到记录映射
 */
Map<LocalDate, Boolean> getUserSignInRecord(long userId, Integer year);
```

为什么使用 Map 而不是 List 呢？下面会揭晓答案。

2）编写实现类，依次获取每一天的签到状态：

```java
@Override
public Map<LocalDate, Boolean> getUserSignInRecord(long userId, Integer year) {
    if (year == null) {
        LocalDate date = LocalDate.now();
        year = date.getYear();
    }
    String key = RedisConstant.getUserSignInRedisKey(year, userId);
    RBitSet signInBitSet = redissonClient.getBitSet(key);
    // LinkedHashMap 保证有序
    Map<LocalDate, Boolean> result = new LinkedHashMap<>();
    // 获取当前年份的总天数
    int totalDays = Year.of(year).length();
    // 依次获取每一天的签到状态
    for (int dayOfYear = 1; dayOfYear <= totalDays; dayOfYear++) {
        // 获取 key：当前日期
        LocalDate currentDate = LocalDate.ofYearDay(year, dayOfYear);
        // 获取 value：当天是否有刷题
        boolean hasRecord = signInBitSet.get(dayOfYear);
        // 将结果放入 map
        result.put(currentDate, hasRecord);
    }
    return result;
}
```

注意，我们使用了 LinkedHashMap 来保证了键值对映射的有序性，相当于直接得到了映射列表，符合前端要求的返回值格式。

3）编写 Controller 接口代码：

```java
/**
 * 获取用户签到记录
 *
 * @param year    年份（为空表示当前年份）
 * @param request
 * @return 签到记录映射
 */
@GetMapping("/get/sign_in")
public BaseResponse<Map<LocalDate, Boolean>> getUserSignInRecord(Integer year, HttpServletRequest request) {
    // 必须要登录才能获取
    User loginUser = userService.getLoginUser(request);
    Map<LocalDate, Boolean> userSignInRecord = userService.getUserSignInRecord(loginUser.getId(), year);
    return ResultUtils.success(userSignInRecord);
}
```

4）通过 Swagger 接口文档调用接口进行测试，得到的示例结果如下：

```java
{2024-01-01=false, 2024-01-02=false, 2024-01-03=false, 2024-01-04=false, 2024-01-05=false, 2024-01-06=false, 2024-01-07=false, 2024-01-08=false, 2024-01-09=false, 2024-01-10=false, 2024-01-11=false, 2024-01-12=false, 2024-01-13=false, 2024-01-14=false, 2024-01-15=false, 2024-01-16=false, 2024-01-17=false, 2024-01-18=false, 2024-01-19=false, 2024-01-20=false, 2024-01-21=false, 2024-01-22=false, 2024-01-23=false, 2024-01-24=false, 2024-01-25=false, 2024-01-26=false, 2024-01-27=false, 2024-01-28=false, 2024-01-29=false,
 2024-01-30=false, 2024-01-31=false, 2024-02-01=false, 2024-02-02=false, 2024-02-03=false, 2024-02-04=false, 2024-02-05=false, 2024-02-06=false, 2024-02-07=false, 2024-02-08=false, 2024-02-09=false, 2024-02-10=false, 2024-02-11=false, 2024-02-12=false, 2024-02-13=false, 2024-02-14=false, 2024-02-15=false, 2024-02-16=false, 2024-02-17=false, 2024-02-18=false, 2024-02-19=false, 2024-02-20=false, 2024-02-21=false, 2024-02-22=false, 2024-02-23=false, 2024-02-24=false, 2024-02-25=false, 2024-02-26=false, 2024-02-27=false, 
 2024-02-28=false, 2024-02-29=false, 2024-03-01=false, 2024-03-02=false, 2024-03-03=false, 2024-03-04=false, 2024-03-05=false, 2024-03-06=false, 2024-03-07=false, 2024-03-08=false, 2024-03-09=false, 2024-03-10=false, 2024-03-11=false, 2024-03-12=false, 2024-03-13=false, 2024-03-14=false, 2024-03-15=false, 2024-03-16=false, 2024-03-17=false, 2024-03-18=false, 2024-03-19=false, 2024-03-20=false, 2024-03-21=false, 2024-03-22=false, 2024-03-23=false, 2024-03-24=false, 2024-03-25=false, 2024-03-26=false, 2024-03-27=false, 
 2024-03-28=false, 2024-03-29=false, 2024-03-30=false, 2024-03-31=false, 2024-04-01=false, 2024-04-02=false, 2024-04-03=false, 2024-04-04=false, 2024-04-05=false, 2024-04-06=false, 2024-04-07=false, 2024-04-08=false, 2024-04-09=false, 2024-04-10=false, 2024-04-11=false, 2024-04-12=false, 2024-04-13=false, 2024-04-14=false, 2024-04-15=false, 2024-04-16=false, 2024-04-17=false, 2024-04-18=false, 2024-04-19=false, 2024-04-20=false, 2024-04-21=false, 2024-04-22=false, 2024-04-23=false, 2024-04-24=false, 2024-04-25=false, 
 2024-04-26=false, 2024-04-27=false, 2024-04-28=false, 2024-04-29=false, 2024-04-30=false, 2024-05-01=false, 2024-05-02=false, 2024-05-03=false, 2024-05-04=false, 2024-05-05=false, 2024-05-06=false, 2024-05-07=false, 2024-05-08=false, 2024-05-09=false, 2024-05-10=false, 2024-05-11=false, 2024-05-12=false, 2024-05-13=false, 2024-05-14=false, 2024-05-15=false, 2024-05-16=false, 2024-05-17=false, 2024-05-18=false, 2024-05-19=false, 2024-05-20=false, 2024-05-21=false, 2024-05-22=false, 2024-05-23=false, 2024-05-24=false, 
 2024-05-25=false, 2024-05-26=false, 2024-05-27=false, 2024-05-28=false, 2024-05-29=false, 2024-05-30=false, 2024-05-31=false, 2024-06-01=false, 2024-06-02=false, 2024-06-03=false, 2024-06-04=false, 2024-06-05=false, 2024-06-06=false, 2024-06-07=false, 2024-06-08=false, 2024-06-09=false, 2024-06-10=false, 2024-06-11=false, 2024-06-12=false, 2024-06-13=false, 2024-06-14=false, 2024-06-15=false, 2024-06-16=false, 2024-06-17=false, 2024-06-18=false, 2024-06-19=false, 2024-06-20=false, 2024-06-21=false, 2024-06-22=false, 
2024-06-23=false, 2024-06-24=false, 2024-06-25=false, 2024-06-26=false, 2024-06-27=false, 2024-06-28=false, 2024-06-29=false, 2024-06-30=false, 2024-07-01=false, 2024-07-02=false, 2024-07-03=false, 2024-07-04=false, 2024-07-05=false, 2024-07-06=false, 2024-07-07=false, 2024-07-08=false, 2024-07-09=false, 2024-07-10=false, 2024-07-11=false, 2024-07-12=false, 2024-07-13=false, 2024-07-14=false, 2024-07-15=false, 2024-07-16=false, 2024-07-17=false, 2024-07-18=false, 2024-07-19=false, 2024-07-20=false, 2024-07-21=false, 
2024-07-22=false, 2024-07-23=false, 2024-07-24=false, 2024-07-25=false, 2024-07-26=false, 2024-07-27=false, 2024-07-28=false, 2024-07-29=false, 2024-07-30=false, 2024-07-31=false, 2024-08-01=false, 2024-08-02=false, 2024-08-03=false, 2024-08-04=false, 2024-08-05=false, 2024-08-06=false, 2024-08-07=false, 2024-08-08=false, 2024-08-09=false, 2024-08-10=false, 2024-08-11=false, 2024-08-12=false, 2024-08-13=true, 2024-08-14=true, 2024-08-15=false, 2024-08-16=false, 2024-08-17=false, 2024-08-18=false, 2024-08-19=false, 
2024-08-20=false, 2024-08-21=false, 2024-08-22=false, 2024-08-23=false, 2024-08-24=false, 2024-08-25=false, 2024-08-26=false, 2024-08-27=false, 2024-08-28=false, 2024-08-29=false, 2024-08-30=false, 2024-08-31=false, 2024-09-01=false, 2024-09-02=false, 2024-09-03=false, 2024-09-04=false, 2024-09-05=false, 2024-09-06=false, 2024-09-07=false, 2024-09-08=false, 2024-09-09=false, 2024-09-10=false, 2024-09-11=false, 2024-09-12=false, 2024-09-13=false, 2024-09-14=false, 2024-09-15=false, 2024-09-16=false, 2024-09-17=false, 
2024-09-18=false, 2024-09-19=false, 2024-09-20=false, 2024-09-21=false, 2024-09-22=false, 2024-09-23=false, 2024-09-24=false, 2024-09-25=false, 2024-09-26=false, 2024-09-27=false, 2024-09-28=false, 2024-09-29=false, 2024-09-30=false, 2024-10-01=false, 2024-10-02=false, 2024-10-03=false, 2024-10-04=false, 2024-10-05=false, 2024-10-06=false, 2024-10-07=false, 2024-10-08=false, 2024-10-09=false, 2024-10-10=false, 2024-10-11=false, 2024-10-12=false, 2024-10-13=false, 2024-10-14=false, 2024-10-15=false, 2024-10-16=false,
2024-10-17=false, 2024-10-18=false, 2024-10-19=false, 2024-10-20=false, 2024-10-21=false, 2024-10-22=false, 2024-10-23=false, 2024-10-24=false, 2024-10-25=false, 2024-10-26=false, 2024-10-27=false, 2024-10-28=false, 2024-10-29=false, 2024-10-30=false, 2024-10-31=false, 2024-11-01=false, 2024-11-02=false, 2024-11-03=false, 2024-11-04=false, 2024-11-05=false, 2024-11-06=false, 2024-11-07=false, 2024-11-08=false, 2024-11-09=false, 2024-11-10=false, 2024-11-11=false, 2024-11-12=false, 2024-11-13=false, 2024-11-14=false, 
2024-11-15=false, 2024-11-16=false, 2024-11-17=false, 2024-11-18=false, 2024-11-19=false, 2024-11-20=false, 2024-11-21=false, 2024-11-22=false, 2024-11-23=false, 2024-11-24=false, 2024-11-25=false, 2024-11-26=false, 2024-11-27=false, 2024-11-28=false, 2024-11-29=false, 2024-11-30=false, 2024-12-01=false, 2024-12-02=false, 2024-12-03=false, 2024-12-04=false, 2024-12-05=false, 2024-12-06=false, 2024-12-07=false, 2024-12-08=false, 2024-12-09=false, 2024-12-10=false, 2024-12-11=false, 2024-12-12=false, 2024-12-13=false, 
2024-12-14=false, 2024-12-15=false, 2024-12-16=false, 2024-12-17=false, 2024-12-18=false, 2024-12-19=false, 2024-12-20=false, 2024-12-21=false, 2024-12-22=false, 2024-12-23=false, 2024-12-24=false, 2024-12-25=false, 2024-12-26=false, 2024-12-27=false, 2024-12-28=false, 2024-12-29=false, 2024-12-30=false, 2024-12-31=false}
```

### 性能优化

目前的代码逻辑虽然看起来很简单，但是存在很大的优化空间！

#### 1、判断每天是否刷题逻辑优化

不知道大家对上面这段代码是否敏感？循环内部需要判断当天是否有刷题，实际上每次判断都会去与 Redis 交互，一个循环需要交互 365 次 Redis，效率极低！

```java
// 依次获取每一天的签到状态
for (int dayOfYear = 1; dayOfYear <= totalDays; dayOfYear++) {
    // 获取 key：当前日期
    LocalDate currentDate = LocalDate.ofYearDay(year, dayOfYear);
    // 获取 value：当天是否有刷题
    boolean hasRecord = signInBitSet.get(dayOfYear);
    // 将结果放入 map
    result.put(currentDate, hasRecord);
}
```

具体来说，`signInBitSet` 是通过 Redisson 客户端与 Redis 交互的 `RBitSet` 对象，而 `RBitSet.get(int bitIndex)` 这个方法会触发一次 Redis 请求来获取对应位的值，并没有在本地做缓存。

通过 WireShark 等抓包工具可以看到，客户端发了一大堆请求给 redis 实例。仔细观察右下角的抓包数据，可以看到执行的操作：

![img](./assets/202409061424838.png)

因此，我们在循环外缓存一下 Bitmap 的数据，即可大大提升这个方法的效率：

```java
// 加载 BitSet 到内存中，避免后续读取时发送多次请求
BitSet bitSet = signInBitSet.asBitSet();
```

循环内部使用 `bitSet.get` 即可：

```java
// 获取 value：当天是否有刷题
boolean hasRecord = bitSet.get(dayOfYear);
```

#### 2、刷题记录返回值优化

从示例结果我们可以看到 **传输的数据较多、计算时间耗时、带宽占用多、效率低**。

实际上没必要完全组装好数据传输给前端，仅需告诉前端哪天有刷题就行（大部分同学不可能一年 365 天每天都刷题），这样能大大减少传输的数据量以及后端服务的 CPU 占用，将部分计算压力均摊到用户的客户端（浏览器身上）。

修改代码如下：

```tsx
 @Override
public List<Integer> getUserSignInRecord(long userId, Integer year) {
    if (year == null) {
        LocalDate date = LocalDate.now();
        year = date.getYear();
    }
    String key = RedisConstant.getUserSignInRedisKey(year, userId);
    RBitSet signInBitSet = redissonClient.getBitSet(key);
    // 加载 BitSet 到内存中，避免后续读取时发送多次请求
    BitSet bitSet = signInBitSet.asBitSet();
    // 统计签到的日期
    List<Integer> dayList = new ArrayList<>();
    // 获取当前年份的总天数
    int totalDays = Year.of(year).length();
    // 依次获取每一天的签到状态
    for (int dayOfYear = 1; dayOfYear <= totalDays; dayOfYear++) {
        // 获取 value：当天是否有刷题
        boolean hasRecord = bitSet.get(dayOfYear);
        if (hasRecord) {
          dayList.add(dayOfYear);
        }
    }
    return dayList;
}
```

#### 3、计算优化

上述代码中，我们使用循环来遍历所有年份，而循环是需要消耗 CPU 计算资源的。

在 Java 中的 `BitSet` 类中，可以使用 `nextSetBit(int fromIndex)` 和 `nextClearBit(int fromIndex)` 方法来获取从指定索引开始的下一个 **已设置（即为 1）** 或 **未设置（即为 0）** 的位。

主要是 2 个方法：

- `nextSetBit(int fromIndex)`：从 `fromIndex` 开始（包括 `fromIndex` 本身）寻找下一个被设置为 1 的位。如果找到了，返回该位的索引；如果没有找到，返回 -1。
- `nextClearBit(int fromIndex)`：从 `fromIndex` 开始（包括 `fromIndex` 本身）寻找下一个为 0 的位。如果找到了，返回该位的索引；如果没有找到，返回一个大的整数值。

使用 nextSetBit，可以跳过无意义的循环检查，通过位运算来获取被设置为 1 的位置，性能更高。

修改后的代码如下：

```java
@Override
public List<Integer> getUserSignInRecord(long userId, Integer year) {
    if (year == null) {
        LocalDate date = LocalDate.now();
        year = date.getYear();
    }
    String key = RedisConstant.getUserSignInRedisKey(year, userId);
    RBitSet signInBitSet = redissonClient.getBitSet(key);
    // 加载 BitSet 到内存中，避免后续读取时发送多次请求
    BitSet bitSet = signInBitSet.asBitSet();
    // 统计签到的日期
    List<Integer> dayList = new ArrayList<>();
    // 从索引 0 开始查找下一个被设置为 1 的位
    int index = bitSet.nextSetBit(0);
    while (index >= 0) {
        dayList.add(index);
        // 查找下一个被设置为 1 的位
        index = bitSet.nextSetBit(index + 1);
    }
    return dayList;
}
```

得到结果示例如下：

```java
[1, 226]
```

注意，需要同步修改 Controller 接口返回值。

#### 优化小结

本功能的性能优化也是有代表性的，总结出来几个实用优化思路：

1. 减少网络请求或调用次数
2. 减少接口传输数据的体积
3. 减少循环和计算
4. 通过客户端计算减少服务端的压力

#### 扩展

大家可以通过 JMeter 压测工具来测试下性能优化前后的接口 QPS 和平均响应时长，应该会有意外之喜。

### 前端开发

#### 1、引入 ECharts 组件库

安装 ECharts：https://echarts.apache.org/zh/index.html

和 React ECharts 可视化库：https://github.com/hustcc/echarts-for-react

```shell
npm install --save echarts
npm install --save echarts-for-react
```

安装失败的话，在命令后加 `--force`。

#### 2、用户中心页面开发

在 app 目录下新建 `user/center` 页面。该页面依赖用户登录态来展示登录用户信息和签到记录，所以应该声明为客户端组件。

在导航栏右侧的下拉菜单中补充到该页面的跳转：

```tsx
 <Dropdown
  menu={{
    items: [
      {
        key: "userCenter",
        icon: <UserOutlined />,
        label: "个人中心",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "退出登录",
      },
    ],
    onClick: async (event: { key: React.Key }) => {
      const { key } = event;
      if (key === "logout") {
        userLogout();
      } else if (key === "userCenter") {
        router.push("/user/center");
      }
    },
  }}
>
  {dom}
</Dropdown>
```

页面结构可以通过如下组件快速完成：

- 栅格响应式布局：https://ant-design.antgroup.com/components/grid-cn#grid-demo-responsive
- 左侧用户信息，Card.Meta 组件：https://ant-design.antgroup.com/components/card-cn#card-demo-meta
- 右侧内容区域，带页签的卡片：https://ant-design.antgroup.com/components/card-cn#card-demo-tabs

页面代码如下：

```tsx
 "use client";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useState } from "react";
import "./index.css";

/**
 * 用户中心页面
 * @constructor
 */
export default function UserCenterPage() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 便于复用，新起一个变量
  const user = loginUser;
  // 控制菜单栏 Tab
  const [activeTabKey, setActiveTabKey] = useState<string>("record");

  return (
    <div id="userCenterPage" className="max-width-content">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar src={user.userAvatar} size={72} />
            <div style={{ marginBottom: 16 }} />
            <Meta
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  {user.userName}
                </Title>
              }
              description={
                <>
                  <Paragraph type="secondary">{user.userProfile}</Paragraph>
                </>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "others",
                label: "其他",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          >
            {activeTabKey === "record" && <>aaa</>}
            {activeTabKey === "others" && <>bbb</>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
```

效果如图：

![img](./assets/202409061424871.png)

#### 3、封装日历图组件

在用户中心页面的 components 目录下新增日历图组件，因为不需要复用：

![img](./assets/202409061424949.png)

1）参考 React ECharts 的 [官方文档](https://git.hust.cc/echarts-for-react/) 来使用 ECharts 组件，把 Demo 代码复制到新建的组件文件中。

2）在用户中心页面中引入组件，便于查看效果：

```tsx
 {activeTabKey === "record" && <>
    <CalendarChart />
</>}
```

3）定义签到日期数组变量，将数组转换为图表需要的数据。其中，对日期的处理需要用到 dayjs 库：

```tsx
 // 签到日期列表（[1, 200]，表示第 1 和第 200 天有签到记录）
const [dataList, setDataList] = useState<number[]>([]);

// 计算图表需要的数据
const year = new Date().getFullYear();
const optionsData = dataList.map((dayOfYear, index) => {
  // 计算日期字符串
  const dateStr = dayjs(`${year}-01-01`)
    .add(dayOfYear - 1, "day")
    .format("YYYY-MM-DD");
  return [dateStr, 1];
});
```

4）参考 Echarts 的官方 Demo 开发前端日历图：https://echarts.apache.org/examples/zh/editor.html?c=calendar-simple

先在 Demo 页面里调整好效果，得到 options 选项。

💡 小技巧：可以通过配置项或者询问 AI 得到需要的配置

![img](./assets/202409061424950.png)

调整好的图表配置如下：

```tsx
 // 图表配置
const options = {
  visualMap: {
    show: false,
    min: 0,
    max: 1,
    inRange: {
      // 颜色从灰色到浅绿色
      color: ["#efefef", "lightgreen"],
    },
  },
  calendar: {
    range: year,
    left: 20,
    // 单元格自动宽度，高度为 16 像素
    cellSize: ['auto', 16],
    yearLabel: {
      position: "top",
      formatter: `${year} 年刷题记录`,
    }
  },
  series: {
    type: "heatmap",
    coordinateSystem: "calendar",
    data: optionsData,
  },
};
```

效果如下：

![img](./assets/202409061424428.png)

5）获取数据：前端调用 OpenAPI 生成新的刷题签到记录相关接口，调用并得到 dataList 即可。

代码如下：

```tsx
 // 请求后端获取数据
const fetchDataList = async () => {
  try {
    const res = await getUserSignInRecordUsingGet({
      year,
    });
    setDataList(res.data || []);
  } catch (e) {
    message.error("获取刷题签到记录失败，" + e.message);
  }
};

useEffect(() => {
  fetchDataList();
}, []);
```

#### 4、执行签到

由于获取题目详情接口是在服务端渲染，拿不到用户登录态，所以建议在客户端额外发送请求来执行签到。

编写一个 hooks 钩子，便于在多个题目详情页中复用：

```tsx
import { useEffect, useState } from "react";
import { message } from "antd";
import { addUserSignInUsingPost } from "@/api/userController";

/**
 * 添加用户签到记录钩子
 */
const useAddUserSignInRecord = () => {
  const [loading, setLoading] = useState(false);

  // 请求后端执行签到
  const doFetch = async () => {
    setLoading(true);
    try {
      await addUserSignInUsingPost();
    } catch (e) {
      message.error("添加刷题签到记录失败，" + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doFetch();
  }, []);

  return { loading };
};

export default useAddUserSignInRecord;
```

注意，该钩子需要在客户端组件中执行，因为用到了 useEffect 防止重复请求、并且还需要获取到用户登录态。

可以在题目详情卡片 QuestionCard 这一客户端组件里使用钩子，这样所有题目详情页都会触发签到。代码如下：

```tsx
 const QuestionCard = (props: Props) => {
  const { question } = props;
  
  // 签到
  useAddUserSignInRecord();

  // ...
}
```

#### 前端扩展

1）用户中心是否需要实现服务端渲染？如何实现服务端渲染？

思路：先通过 userId 获取基础信息（未登录也可获取），再到客户端携带 Cookie 获取登录用户可见的信息。

2）用户中心页面添加权限校验

思路：可以通过 menu 菜单项配置，利用全局权限校验实现仅登录用户可见。

3）优化：如果前端签到成功，可以保存到 LocalStorage 等位置，防止每次刷题都重复发送签到请求。

### 扩展

#### 1、过期时间

问：Redis 中的 Bitmap 如何设置过期时间？需要设置一年的过期时间吗？

答：如果用户有看往年记录的需求，可以用单次任务（或定时任务）将往年 Redis 数据落库，确保入库成功后，清理 Redis 即可。

比如 2025 年 1 月 1 号，就可以将 2024 年的签到记录入库了。

除非是非常重要的数据，否则最好还是设置下过期时间，一年多即可。

再问：Bitmap 一年落库一次吗？不怕数据丢失吗？

答：Redis 本身有持久化机制，虽然无法完全保证数据不丢失，但是至少数据不会全部丢失。根据我们的刷题逻辑，即使 Redis 意外宕机，丢失前几秒的部分签到，但是用户当天刷题后又会补回来。

如果想保证数据完全不丢失，那么需要在获取题目详情的时候，同步将刷题记录落库，这样性能相对而言就比较差，在一些重要的数据场景需要这样设计。或者再加一个消息队列来提高性能，但架构复杂度和系统维护成本就更高了。

#### 2、按月份查看记录

如果要实现按月份查看签到记录，后端可以给 Redis BitMap 的 key 多加个月份层级，前端可以改为使用 [Ant Design 的日历组件](https://ant-design.antgroup.com/components/calendar-cn#calendar-demo-notice-calendar) 。

Ant Design 的日历组件适用于展示更多内容、需要切换月份和年份的场景：

![img](./assets/202409061424464.png)

#### 3、更详细的刷题记录

如果要实现详细的刷题记录，比如什么时候刷题，可以用数据库或者 Redis 的 Set 方式实现，因为 BitMap 只能用于判断，不适用于记录额外的信息。

参考效果：

![img](./assets/202409061424521.png)

## 二、分词题目搜索

### 需求分析

用户能够更灵活地搜索出题目，分词搜索

### 方案设计

使用 Elasticsearch 实现题目数据的存储和分词搜索，需要将数据库的数据同步到 Elasticsearch。

### Elasticsearch 入门

可参考 [编程导航 - 聚合搜索项目](https://www.code-nav.cn/course/1790979621621641217/section/1790981171370831874) 的笔记，该项目系统讲解过 Elasticsearch。

#### 1、什么是 Elasticsearch？

Elasticsearch 是一个分布式、开源的搜索引擎，专门用于处理大规模的数据搜索和分析。它基于 Apache Lucene 构建，具有实时搜索、分布式计算和高可扩展性，广泛用于 **全文检索、日志分析、监控数据分析** 等场景。

官方文档：https://www.elastic.co/docs，建议入门后阅读一遍，了解更多它的特性。

#### 2、Elasticsearch 生态

Elasticsearch 生态系统非常丰富，包含了一系列工具和功能，帮助用户处理、分析和可视化数据，Elastic Stack 是其核心组成部分。

Elastic Stack（也称为 ELK Stack）由以下几部分组成：

- Elasticsearch：核心搜索引擎，负责存储、索引和搜索数据。
- Kibana：可视化平台，用于查询、分析和展示 Elasticsearch 中的数据。
- Logstash：数据处理管道，负责数据收集、过滤、增强和传输到 Elasticsearch。
- Beats：轻量级的数据传输工具，收集和发送数据到 Logstash 或 Elasticsearch。

Kibana 是 Elastic Stack 的可视化组件，允许用户通过图表、地图和仪表盘来展示存储在 Elasticsearch 中的数据。它提供了简单的查询接口、数据分析和实时监控功能。

![img](./assets/202409061424297.png)

Logstash 是一个强大的数据收集管道工具，能够从多个来源收集、过滤、转换数据，然后将数据发送到 Elasticsearch。Logstash 支持丰富的输入、过滤和输出插件。

![img](./assets/202409061424329.png)

Beats 是一组轻量级的数据采集代理，负责从不同来源收集数据并发送到 Elasticsearch 或 Logstash。常见的 Beats 包括：

- Filebeat：收集日志文件。
- Metricbeat：收集系统和服务的指标。
- Packetbeat：监控网络流量。

![img](./assets/202409061424343.png)

上面这张图，也是标准的 Elastic Stack 技术栈的交互图。

#### 3、Elasticsearch 的核心概念

索引（Index）：类似于关系型数据库中的表，索引是数据存储和搜索的 **基本单位**。每个索引可以存储多条文档数据。

文档（Document）：索引中的每条记录，类似于数据库中的行。文档以 JSON 格式存储。

字段（Field）：文档中的每个键值对，类似于数据库中的列。

映射（Mapping）：用于定义 Elasticsearch 索引中文档字段的数据类型及其处理方式，类似于关系型数据库中的 Schema 表结构，帮助控制字段的存储、索引和查询行为。

集群（Cluster）：多个节点组成的群集，用于存储数据并提供搜索功能。集群中的每个节点都可以处理数据。

分片（Shard）：为了实现横向扩展，ES 将索引拆分成多个分片，每个分片可以分布在不同节点上。

副本（Replica）：分片的复制品，用于提高可用性和容错性。

![img](./assets/202409061424373.jpeg)

和数据库类比：

| **Elasticsearch 概念** | **关系型数据库类比** |
| ---------------------- | -------------------- |
| Index                  | Table                |
| Document               | Row                  |
| Field                  | Column               |
| Mapping                | Schema               |
| Shard                  | Partition            |
| Replica                | Backup               |

#### 4、Elasticsearch 实现全文检索的原理

1）分词：Elasticsearch 的分词器会将输入文本拆解成独立的词条（tokens），方便进行索引和搜索。分词的具体过程包括以下几步：

- 字符过滤：去除特殊字符、HTML 标签或进行其他文本清理。
- 分词：根据指定的分词器（analyzer），将文本按规则拆分成一个个词条。例如，英文可以按空格拆分，中文使用专门的分词器处理。
- 词汇过滤：对分词结果进行过滤，如去掉停用词（常见但无意义的词，如 "the"、"is" 等）或进行词形归并（如将动词变为原形）。

Elasticsearch 内置了很多分词器，比如按照空格分词等，默认只支持英文，可以在 [官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-analyzers.html) 了解。

2）倒排索引：

倒排索引是 Elasticsearch 实现高效搜索的核心数据结构。它将文档中的词条映射到文档 ID，实现快速查找。

工作原理：

- 每个文档在被索引时，分词器会将文档内容拆解为多个词条。
- 然后，Elasticsearch 为每个词条生成一个倒排索引，记录该词条在哪些文档中出现。

举个例子，假设有两个文档：

- 文档 1：鱼皮是帅锅
- 文档 2：鱼皮是好人

中文分词后，生成的倒排索引大致如下：

| 词条 | 文档 ID |
| ---- | ------- |
| 鱼皮 | 1, 2    |
| 是   | 1, 2    |
| 帅锅 | 1       |
| 好人 | 2       |

通过这种结构，查询某个词时，可以快速找到包含该词的所有文档。

#### 5、Elasticsearch 打分规则

实际应用 Elasticsearch 来实现搜索功能时，我们不仅要求能搜到内容，而且还要把和用户搜索最相关的内容展示在前面。这就需要我们了解 Elasticsearch 的打分规则。

打分规则（_Score）是用于衡量每个文档与查询条件的匹配度的评分机制。搜索结果的默认排序方式是按相关性得分（_score）从高到低。Elasticsearch 使用 **BM25 算法** 来计算每个文档的得分，它是基于词频、反向文档频率、文档长度等因素来评估文档和查询的相关性。

打分的主要因素：

1. 词频（TF, Term Frequency）：查询词在文档中出现的次数，出现次数越多，得分越高。
2. 反向文档频率（IDF, Inverse Document Frequency）：查询词在所有文档中出现的频率。词在越少的文档中出现，IDF 值越高，得分越高。
3. 文档长度：较短的文档往往被认为更相关，因为查询词在短文档中占的比例更大。

下面举一个例子：假设要在 Elasticsearch 中查询 `鱼皮` 这个关键词，索引中有以下三个文档：

文档 1：

```plain
鱼皮是个帅小伙，鱼皮非常聪明，鱼皮很喜欢编程。
```

分析：

- 查询词 `鱼皮` 出现了 3 次。
- 该文档较短，查询词 `鱼皮` 的密度很高。

由于 `鱼皮` 在文档中多次出现且文档较短，因此得分较高，相关性较强。

文档 2：

```plain
鱼皮是个帅小伙。
```

分析：

- 查询词 `鱼皮` 出现了 1 次。
- 文档非常短

尽管文档短，但是查询词出现的次数少，因此得分中等，相关性较普通。

文档 3：

```plain
鱼皮是个帅小伙，他喜欢写代码。他的朋友们也很喜欢编程和技术讨论，大家经常一起参与各种技术会议，讨论分布式系统、机器学习和人工智能等主题。
```

分析：

- 查询词 `鱼皮` 出现了 1 次。
- 文档较长，且 `鱼皮` 只在文档开头出现，词条密度较低。

由于文档很长，`鱼皮` 出现的次数少，密度也低，因此得分较低，相关性不强。

再举个例子，什么是反向文档频率？

假如说 ES 中有 10 个文档，都包含了“鱼皮”这个关键词；只有 1 个文档包含了“帅锅”这个关键词。

现在用户搜索“鱼皮帅锅”，大概率会把后面这条文档搜出来，因为更稀有。

当然，以上只是简单举例，实际上 ES 计算打分规则时，会有一套较为复杂的公式，感兴趣的同学可以阅读下面资料来了解：

- 鱼皮文章：https://liyupi.blog.csdn.net/article/details/119176943
- 官方文章：https://www.elastic.co/guide/en/elasticsearch/guide/master/controlling-relevance.html

#### 6、Elasticsearch 查询语法

Elasticsearch 支持多种查询语法，用于不同的场景和需求，主要包括查询 DSL、EQL、SQL 等。

**1）DSL 查询（\**\*\*Domain Specific Language\*\**\*）**

一种基于 JSON 的查询语言，它是 Elasticsearch 中最常用的查询方式。

示例：

```json
 {
  "query": {
    "match": {
      "message": "Elasticsearch 是强大的"
    }
  }
}
```

这个查询会对 `message` 字段进行分词，并查找包含 "Elasticsearch" 和 "强大" 词条的文档。

**2）EQL**

EQL 全称 Event Query Language，是一种用于检测和检索时间序列 **事件** 的查询语言，常用于日志和安全监控场景。

示例：查找特定事件

```plain
process where process.name == "malware.exe"
```

这个查询会查找 `process.name` 为 "malware.exe" 的所有进程事件，常用于安全检测中的恶意软件分析。

**3）SQL 查询**

Elasticsearch 提供了类似于传统数据库的 SQL 查询语法，允许用户以 SQL 的形式查询 Elasticsearch 中的数据，对熟悉 SQL 的用户来说非常方便。

示例 SQL 查询：

```sql
SELECT name, age FROM users WHERE age > 30 ORDER BY age DESC
```

这个查询会返回 `users` 索引中 `age` 大于 30 的所有用户，并按年龄降序排序。

------

以下几种简单了解即可：

**4）Lucene 查询语法**

Lucene 是 Elasticsearch 底层的搜索引擎，Elasticsearch 支持直接使用 Lucene 的查询语法，适合简单的字符串查询。

示例 Lucene 查询：

```plain
name:Elasticsearch AND age:[30 TO 40]
```

这个查询会查找 `name` 字段为 "Elasticsearch" 且 `age` 在 30 到 40 之间的文档。

**5）Kuery（KQL: Kibana Query Language）**

KQL 是 Kibana 的查询语言，专门用于在 Kibana 界面上执行搜索查询，常用于仪表盘和数据探索中。

示例 KQL 查询：

name: "Elasticsearch" and age > 30

这个查询会查找 `name` 为 "Elasticsearch" 且 `age` 大于 30 的文档。

**6）Painless 脚本查询**

Painless 是 Elasticsearch 的内置脚本语言，用于执行自定义的脚本操作，常用于排序、聚合或复杂计算场景。

示例 Painless 脚本：

```json
 {
  "query": {
    "script_score": {
      "query": {
        "match": { "message": "Elasticsearch" }
      },
      "script": {
        "source": "doc['popularity'].value * 2"
      }
    }
  }
}
```

这个查询会基于 `popularity` 字段的值进行动态评分，将其乘以 2。

总结一下，DSL 是最通用的，EQL 和 KQL 则适用于特定场景，如日志分析和 Kibana 查询，而 SQL 则便于数据库开发人员上手。

#### 7、Elasticsearch 查询条件

如何利用 Elasticsearch 实现数据筛选呢？需要了解其查询条件，以 ES 的 DSL 语法为例：

| **查询条件**   | **介绍**                                                     | **示例**                                                     | **用途**                                           |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------- |
| `match`        | 用于全文检索，将查询字符串进行分词并匹配文档中对应的字段。   | `{ "match": { "content": "鱼皮是帅小伙" } }`                 | 适用于全文检索，分词后匹配文档内容。               |
| `term`         | 精确匹配查询，不进行分词。通常用于结构化数据的精确匹配，如数字、日期、关键词等。 | `{ "term": { "status": "active" } }`                         | 适用于字段的精确匹配，如状态、ID、布尔值等。       |
| `terms`        | 匹配多个值中的任意一个，相当于多个 `term` 查询的组合。       | `{ "terms": { "status": ["active", "pending"] } }`           | 适用于多值匹配的场景。                             |
| `range`        | 范围查询，常用于数字、日期字段，支持大于、小于、区间等查询。 | `{ "range": { "age": { "gte": 18, "lte": 30 } } }`           | 适用于数值或日期的范围查询。                       |
| `bool`         | 组合查询，通过 `must`、`should`、`must_not` 等组合多个查询条件。 | `{ "bool": { "must": [ { "term": { "status": "active" } }, { "range": { "age": { "gte": 18 } } } ] } }` | 适用于复杂的多条件查询，可以灵活组合。             |
| `wildcard`     | 通配符查询，支持 `*` 和 `?`，前者匹配任意字符，后者匹配单个字符。 | `{ "wildcard": { "name": "鱼*" } }`                          | 适用于部分匹配的查询，如模糊搜索。                 |
| `prefix`       | 前缀查询，匹配以指定前缀开头的字段内容。                     | `{ "prefix": { "name": "鱼" } }`                             | 适用于查找以指定字符串开头的内容。                 |
| `fuzzy`        | 模糊查询，允许指定程度的拼写错误或字符替换。                 | `{ "fuzzy": { "name": "yupi~2" } }`                          | 适用于处理拼写错误或不完全匹配的查询。             |
| `exists`       | 查询某字段是否存在。                                         | `{ "exists": { "field": "name" } }`                          | 适用于查找字段存在或缺失的文档。                   |
| `match_phrase` | 短语匹配查询，要求查询的词语按顺序完全匹配。                 | `{ "match_phrase": { "content": "鱼皮 帅小伙" } }`           | 适用于严格的短语匹配，词语顺序和距离都严格控制。   |
| `match_all`    | 匹配所有文档。                                               | `{ "match_all": {} }`                                        | 适用于查询所有文档，通常与分页配合使用。           |
| `ids`          | 基于文档 ID 查询，支持查询特定 ID 的文档。                   | `{ "ids": { "values": ["1", "2", "3"] } }`                   | 适用于根据文档 ID 查找特定文档。                   |
| `geo_distance` | 地理位置查询，基于地理坐标和指定距离查询。                   | `{ "geo_distance": { "distance": "12km", "location": { "lat": 40.73, "lon": -74.1 } } }` | 适用于根据距离计算查找地理位置附近的文档。         |
| `aggregations` | 聚合查询，用于统计、计算和分组查询，类似 SQL 中的 `GROUP BY`。 | `{ "aggs": { "age_stats": { "stats": { "field": "age" } } } }` | 适用于统计和分析数据，比如求和、平均值、最大值等。 |

其中的几个关键：

1. 精确匹配 vs. 全文检索：`term` 是精确匹配，不分词；`match` 用于全文检索，会对查询词进行分词。
2. 组合查询：`bool` 查询可以灵活组合多个条件，适用于复杂的查询需求。
3. 模糊查询：`fuzzy` 和 `wildcard` 提供了灵活的模糊匹配方式，适用于拼写错误或不完全匹配的场景。

了解上面这些一般就足够了，更多可以随用随查，参考 [官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl.html) 。

#### 8、Elasticsearch 客户端

前面了解了 Elasticsearch 的概念和查询语法，但是如何执行 Elasticsearch 操作呢？还需要了解下 ES 的客户端，列举一些常用的：

1）HTTP API：Elasticsearch 提供了 RESTful HTTP API，用户可以通过直接发送 HTTP 请求来执行索引、搜索和管理集群的操作。[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/rest-apis.html)

2）Kibana：Kibana 是 Elasticsearch 官方提供的可视化工具，用户可以通过 Kibana 控制台使用查询语法（如 DSL、KQL）来执行搜索、分析和数据可视化。

3）Java REST Client：Elasticsearch 官方提供的 Java 高级 REST 客户端库，用于 Java 程序中与 Elasticsearch 进行通信，支持索引、查询、集群管理等操作。[官方文档](https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/7.17/introduction.html)

4）Spring Data Elasticsearch：Spring 全家桶的一员，用于将 Elasticsearch 与 Spring 框架集成，通过简化的 Repository 方式进行索引、查询和数据管理操作。[官方文档](https://spring.io/projects/spring-data-elasticsearch)

5）Elasticsearch SQL CLI：命令行工具，允许通过类 SQL 语法直接在命令行中查询 Elasticsearch 数据，适用于熟悉 SQL 的用户。

此外，Elasticsearch 当然不只有 Java 的客户端，Python、PHP、Node.js、Go 的客户端都是支持的。

💡 在选择客户端时，要格外注意版本号！！！要跟 Elasticsearch 的版本保持兼容。

#### 9、ES 数据同步方案

一般情况下，如果做查询搜索功能，使用 ES 来模糊搜索，但是数据是存放在数据库 MySQL 里的，所以说我们需要把 MySQL 中的数据和 ES 进行同步，保证数据一致（以 MySQL 为主）。

数据流向：MySQL => ES （单向）

数据同步一般有 2 个过程：全量同步（首次）+ 增量同步（新数据）

总共有 4 种主流方案：

**1）定时任务**

比如 1 分钟 1 次，找到 MySQL 中过去几分钟内（至少是定时周期的 2 倍）发生改变的数据，然后更新到 ES。

优点：

- 简单易懂，开发、部署、维护相对容易。
- 占用资源少，不需要引入复杂的第三方中间件。
- 不用处理复杂的并发和实时性问题。

缺点：

- **有时间差**：无法做到实时同步，数据存在滞后。
- 数据频繁变化时，无法确保数据完全同步，容易出现错过更新的情况。
- 对大数据量的更新处理不够高效，可能会引入重复更新逻辑。

应用场景：

- 数据实时性要求不高：适合数据短时间内不同步不会带来重大影响的场景。
- 数据基本不发生修改：适合数据几乎不修改、修改不频繁的场景。
- 数据容忍丢失

**2）双写**

写数据的时候，必须也去写 ES；更新删除数据库同理。

可以通过事务保证数据一致性，使用事务时，要先保证 MySQL 写成功，因为如果 ES 写入失败了，不会触发回滚，但是可以通过定时任务 + 日志 + 告警进行检测和修复（补偿）。

优点：

- 方案简单易懂，业务逻辑直接控制数据同步。
- 可以利用事务部分保证 MySQL 和 ES 的数据一致性。
- 同步的时延较短，理论上可以接近实时更新 ES。

缺点：

- **影响性能**：每次写 MySQL 时，需要同时操作 ES，增加了业务写入延迟，影响性能。
- **一致性问题**：如果 ES 写入失败，MySQL 事务提交成功后，ES 可能会丢失数据；或者 ES 写入成功，MySQL 事务提交失败，ES 无法回滚。因此必须额外设计监控、补偿机制来检测同步失败的情况（如通过定时任务、日志和告警修复）。
- 代码复杂度增加，需要对每个写操作都进行双写处理。

应用场景：

- 实时性要求较高
- 业务写入频率较低：适合写操作不频繁的场景，这样对性能的影响较小。

**3）用 Logstash 数据同步管道**

一般要配合 kafka 消息队列 + beats 采集器：

![img](./assets/202409061424396.png)

优点：

- **配置驱动**：基于配置文件，减少了手动编码，数据同步逻辑和业务代码解耦。
- **扩展性好**：可以灵活引入 Kafka 等消息队列实现异步数据同步，并可处理高吞吐量数据。
- 支持多种数据源：Logstash 支持丰富的数据源，方便扩展其他同步需求。

缺点：

- **灵活性差**：需要通过配置文件进行同步，复杂的业务逻辑可能难以在配置中实现，无法处理细粒度的定制化需求。
- 引入额外组件，维护成本高：通常需要引入 Kafka、Beats 等第三方组件，增加了系统的复杂性和运维成本。

应用场景：

- **大数据同步**：适合大规模、分布式数据同步场景。
- **对实时性要求不高**：适合数据流处理或延迟容忍较大的系统。
- 系统已有 Kafka 或类似的消息队列架构：如果系统中已经使用了 Kafka 等中间件，使用 Logstash 管道会变得很方便。

**4）监听 MySQL Binlog**

有任何数据变更时都能够实时监听到，并且同步到 Elasticsearch。一般不需要自己监听，可以使用现成的技术，比如 [Canal](https://github.com/alibaba/canal/) 。

![img](./assets/202409061424844.png)

💡 Canal 的核心原理：数据库每次修改时，会修改 binlog 文件，只要监听该文件的修改，就能第一时间得到消息并处理

优点：

- **实时性强**：能够在 MySQL 数据发生变更的第一时间同步到 ES，做到真正的实时同步。
- 轻量级：Binlog 是数据库自带的日志功能，不需要修改核心业务代码，只需要新增监听逻辑。

缺点：

- 引入外部依赖：需要引入像 Canal 这样的中间件，增加了系统的复杂性和维护成本。
- 运维难度增加：需要确保 Canal 或者其他 Binlog 监听器的稳定运行，并且对 MySQL 的 Binlog 配置要求较高。
- 一致性问题：如果 Canal 服务出现问题或暂停，数据可能会滞后或丢失，必须设计补偿机制。

应用场景：

- **实时同步要求高**：适合需要实时数据同步的场景，通常用于高并发、高数据一致性要求的系统。
- **数据频繁变化**：适合数据变更频繁且需要高效增量同步的场景。

最终方案：对于本项目，由于数据量不大，题目更新也不频繁，容忍丢失和不一致，所以选用方案一，实现成本最低。

### 后端开发（ES 实战）

#### 1、Elasticsearch 搭建

目标：安装 Elasticsearch 和 Kibana，能够在 Kibana 查看到 Elasticsearch 存储的数据。

💡 也可以直接使用云 Elasticsearch 服务，省去自主搭建的时间，推荐使用 Serverless 版本，学完关掉就行。

**Elasticsearch 更新迭代非常快，所以安装时，一定要注意慎重选择版本号！**

由于我们自己的项目用的 Spring Boot 2.x 版本，对应的 [Spring Data Elasticsearch](https://spring.io/projects/spring-data-elasticsearch) 客户端版本是 4.x，支持的 Elasticsearch 是 7.x，所以建议 Elasticsearch 使用 7.x 的版本。

鱼皮教程中使用的是 7.17 版本，这是 7.x 系列的最后一个版本，包含了该系列所有的 bug 修复和改进，被广泛认为是最稳定的。

💡 可以在 [官方文档](https://docs.spring.io/spring-data/elasticsearch/reference/elasticsearch/versions.html) 了解到版本兼容情况：比如 Spring 6 才支持 Elasticsearch 8.x

1）安装 Elasticsearch

参考官方文档：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/setup.html

Windows 解压安装：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/zip-windows.html

其他操作系统安装：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/targz.html

如果官网下不动，可以用鱼皮已经下载好的：https://pan.baidu.com/s/1u73-Nlolrs8Rzb1_b6X6HA ，提取码：c2sd

**注意，安装路径不要包含中文！**

安装完成后进入 es 目录并执行启动命令：

```plain
▼.\bin\elasticsearch.bat
```

可以用 CURL 测试是否启动成功：

```shell
curl -X GET "localhost:9200/?pretty"
```

正常输出如图：

![img](./assets/202409061424872.png)

在 Windows 系统上，你还可以选择是否安装为服务，方便启动和管理。

```plain
.\bin\elasticsearch-service.bat

Usage: elasticsearch-service.bat install|remove|start|stop|manager [SERVICE_ID]
```

2）安装 Kibana

**注意，只要是同一套技术，所有版本必须一致！此处都用 7.17 版本！**

参考官方文档：https://www.elastic.co/guide/en/kibana/7.17/introduction.html

安装 Kibana：https://www.elastic.co/guide/en/kibana/7.17/install.html

安装完成后进入 kibana 目录并执行启动命令：

```plain
.\bin\kibana.bat
```

正常输出如图：

![img](./assets/202409061424995.png)

访问 http://localhost:5601/，即可开始使用。

![img](./assets/202409061424225.png)

但 kibana 默认是英文，不变阅读，可以修改 `config/kibana.yml` 中的国际化配置：

![img](./assets/202409061424257.png)

然后重启 kibana 即可。

**注意，目前 Kibana 面板没有增加权限校验，所有人都能访问，所以请勿在线上直接部署！**

3）测试

尝试利用 Kibana 的开发工具来操作 Elasticsearch 的数据，比如查询：

![img](./assets/202409061424414.png)

验证下分词器的效果，比如使用标准分词器：

```json
 POST /_analyze
{
  "analyzer": "standard", 
  "text": "鱼皮是个帅小伙，非常喜欢编程"
}
```

效果如图，英文被识别为了一个词，但中文未被识别：

![img](./assets/202409061424518.png)

默认支持的分词器如下：

- standard：标准分词器。
- simple：简单分词器。
- whitespace：按空格分词。
- stop：带停用词的分词器。
- keyword：不分词，将整个字段作为一个词条。
- pattern：基于正则表达式的分词器。
- ngram 和 edge_ngram：n-gram 分词器。

由于这些分词器都不支持中文，所以需要安装 IK 中文分词器，以满足我们的业务需要。

4）安装 IK 中文分词器（ES 插件）

开源地址：https://github.com/medcl/elasticsearch-analysis-ik

直接按照官方指引安装即可，注意下载和我们 Elasticsearch 一致的版本，可以在这里找到各版本的插件包：https://release.infinilabs.com/analysis-ik/stable/

在 ES 安装目录下执行：

```plain
.\bin\elasticsearch-plugin.bat install https://release.infinilabs.com/analysis-ik/stable/elasticsearch-analysis-ik-7.17.23.zip
```

安装成功，需要重启 ES：

![img](./assets/202409061424525.png)

IK 分词器插件为我们提供了两个分词器：`ik_smart` 和 `ik_max_word`。

- ik_smart 是智能分词，尽量选择最像一个词的拆分方式，比如“好学生”会被识别为一个词
- ik_max_word 尽可能地分词，可以包括组合词，比如“好学生”会被识别为 3 个词：好学生、好学、学生

测试一下：

```plain
 POST /_analyze
{
  "analyzer": "ik_smart", 
  "text": "鱼皮是好学生"
}
```

如图：

![img](./assets/202409061424557.png) ![img](./assets/202409061424627.png)

这两种分词器如何选用呢？其实可以结合：

- `ik_smart`：适用于 **搜索分词**，即在查询时使用，保证性能的同时提供合理的分词精度。
- `ik_max_word`：适用于 **底层索引分词**，确保在建立索引时尽可能多地分词，提高查询时的匹配度和覆盖面。

下面就来实战下 ES 索引的设计吧~

💡 思考：有些时候 IK 识别词汇不准，比如不认识“程序员鱼皮”，怎么样让 IK 按自己的规则分词？

解决方案：插件支持自定义词典。可以按照 [官方文档](https://github.com/infinilabs/analysis-ik/tree/v7.17.18?tab=readme-ov-file#dictionary-configuration) 配置。

#### 2、设计 ES 索引

为了将 MySQL 题目表数据导入到 Elasticsearch 中并实现分词搜索，需要为 ES 索引定义 `mapping`。ES 的 `mapping` 用于定义字段的类型、分词器及其索引方式。

相当于数据库的建表，数据库建表时我们要考虑索引，同样 Elasticsearch 建立索引时，要考虑到字段选取、分词器、字段格式等问题。

基于我们数据库的表结构和需求，我们可以定义 title、content、answer 等字段使用分词搜索，同时为其他字段指定适当的类型。以下是本项目的 `mapping` 定义：

```json
 {
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "content": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      },
      "tags": {
        "type": "keyword"
      },
      "answer": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      },
      "userId": {
        "type": "long"
      },
      "editTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "createTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "updateTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "isDelete": {
        "type": "keyword"
      }
    }
  }
}
```

**各字段的类型选择和考虑：**

1）title、content、answer：

这些字段被定义为 `text` 类型，适合存储较长的、需要全文搜索的内容。由于会有中文内容，所以使用了 IK 中文分词器进行分词处理，以提高查询的灵活性和匹配度。

- `analyzer: ik_max_word`：用于索引时进行最大粒度的分词，生成较多词语，适合在查询时提高召回率。
- `search_analyzer: ik_smart`：用于搜索时进行较智能的分词，生成较少的词语，通常用于提高搜索精度。

2）title.keyword：为 `title` 字段增加了一个子字段 `keyword`，用于存储未分词的标题，支持精确匹配。它还配置了 `ignore_above: 256`，表示如果 title 字段的长度超过 256 个字符，将不会为 keyword 字段进行索引。因为题目的标题一般不会很长，很少会对过长的标题进行精确匹配，所以用这一设置来避免过长文本导致的性能问题。

3）tags：标签通常是预定义的、用于分类或标签筛选的关键字，通常不需要分词。设置为 `keyword` 类型以便支持精确匹配和聚合操作（例如统计某标签的出现频次）。`keyword` 不进行分词，因此适合存储不变的、结构化的数据。

4）userId：用来唯一标识用户的数值字段。在 Elasticsearch 中，数值类型（如 `long`）非常适合用于精确查询、排序和范围过滤。与字符串相比，数值类型的查询和存储效率更高，尤其是对于大量用户数据的查询。

5）editTime、createTime、updateTime：时间字段被定义为 `date` 类型，并指定了格式 `"yyyy-MM-dd HH:mm:ss"`。这样做的好处是 Elasticsearch 可以基于这些字段进行时间范围查询、排序和聚合操作，如按时间过滤或统计某时间段的数据。

6）isDelete：使用 keyword 类型，表示是否被删除。 因为 keyword 是为精确匹配设计的，适用于枚举值精确查询的场景，性能好且清晰。

为什么不用 boolean 类型呢？因为 MySQL 数据库存储的是 0 和 1，写入 ES 时需要转换类型。

**为什么不显示指定 id 字段？**

在 Elasticsearch 中，每个文档都有一个唯一的 `_id` 字段来标识文档，该字段用于文档的主键索引和唯一标识。通常，开发者并不需要显式定义 `id` 字段，因为 Elasticsearch 会自动生成 `_id`，或者在插入数据时，你可以手动指定 `_id`。

由于 `_id` 是 Elasticsearch 内部的系统字段，它默认存在并作为主键使用，因此在 mappings 中通常不需要显式定义。如果你想让某个字段（如 userId 或其他唯一标识）作为 `_id`，可以在插入文档时指定该字段的值作为 `_id`。比如：

```bash
PUT /index/_doc/<custom_id>
{
  "userId": 1001,
  "title": "Example"
}
```

**日期字段为什么要格式化？**

日期字段的格式化（`format: "yyyy-MM-dd HH:mm:ss"`）有以下几个考虑：

1. 一致性：定义日期字段的格式可以确保所有插入的日期数据都是一致的，避免因不同的日期格式导致解析错误。例如，Elasticsearch 默认可以支持多种日期格式，但如果不定义明确的格式，可能会导致不一致的日期解析。
2. 优化查询：格式化日期后，Elasticsearch 知道该如何存储和索引这些时间数据，从而可以高效地执行基于日期的范围查询、过滤和排序操作。明确的格式定义还可以帮助 Elasticsearch 进行更优化的存储和压缩。
3. 避免歧义：没有明确格式的日期可能导致歧义，比如 `"2023-09-03"` 是日期，还是年份？加上时间部分（如 `"yyyy-MM-dd HH:mm:ss"`）可以更明确地表明时间的精度，便于进行更精确的查询。

**tags 支持数组么？为什么**

在 Elasticsearch 中，所有的字段类型（包括 `keyword` 和 `text`）默认都支持数组。你可以直接插入一个包含多个值的数组，Elasticsearch 会自动将其视为多个值的集合。例如，以下文档中，tags 字段是一个数组：

```json
 {
  "title": "How to learn Elasticsearch",
  "tags": ["Elasticsearch", "Search", "Database"]
}
```

在查询时，Elasticsearch 会将数组中的每个值视为独立的 `keyword`，可以进行精确匹配。

#### 3、新建 ES 索引

可以通过如下命令创建索引，在 Kibana 开发者工具中执行、或者用 CURL 调用 Elasticsearch 执行均可：

```bash
PUT /question_v1
{
  "mappings": {
    "properties": {
      ...
    }
  }
}
```

但是有一点要注意，推荐在创建索引时添加 alias（别名） ，因为它提供了灵活性和简化索引管理的能力。具体原因如下：

1. 零停机切换索引：在更新索引或重新索引数据时，你可以创建一个新索引并使用 alias 切换到新索引，而不需要修改客户端查询代码，避免停机或中断服务。
2. 简化查询：通过 alias，可以使用一个统一的名称进行查询，而不需要记住具体的索引名称（尤其当索引有版本号或时间戳时）。
3. 索引分组：alias 可以指向多个索引，方便对多个索引进行联合查询，例如用于跨时间段的日志查询或数据归档。

其中，第一个是重点，举个例子，在创建索引时添加 alias：

```json
 PUT /my_index_v1
{
  "aliases": {
    "my_index": {}
  }
}
```

这个 alias 可以在后续版本中指向新的索引（如 my_index_v2），无需更改查询逻辑，查询时仍然使用 my_index。

所以，我们要执行的完整命令如下，可以放到后端项目目录中进行备份：

```json
 PUT /msy_question_v1
{
  "aliases": {
    "msy_question": {}
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "content": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      },
      "tags": {
        "type": "keyword"
      },
      "answer": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      },
      "userId": {
        "type": "long"
      },
      "editTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "createTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "updateTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "isDelete": {
        "type": "keyword"
      }
    }
  }
}
```

创建索引成功：

![img](./assets/202409061424000.png)

#### 4、引入 ES 客户端

在 Spring Boot 项目中，可以通过 Starter 快速引入 Elasticsearch，非常方便：

1）在 pom.xml 中引入：

```xml
 <!-- elasticsearch-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

2）修改项目 yml 配置：

```yaml
spring:
  elasticsearch:
    uris: http://xxx:9200
    username: elastic
    password: coder_yupi_swag
```

3）使用 Spring Data Elasticsearch 提供的 Bean 即可操作 Elasticsearch，可以直接通过 @Resource 注解引入：

```java
@Resource
private ElasticsearchRestTemplate elasticsearchRestTemplate;
```

4）编写一个单元测试文件，验证对于 Elasticsearch 的增删改查基本操作。像鱼皮是使用了 AI 工具来自动生成了单元测试文件：

```java
package com.yupi.mianshiya.es;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.document.Document;
import org.springframework.data.elasticsearch.core.query.*;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ElasticsearchRestTemplateTest {

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;

    private final String INDEX_NAME = "test_index";

    // Index (Create) a document
    @Test
    public void indexDocument() {
        Map<String, Object> doc = new HashMap<>();
        doc.put("title", "Elasticsearch Introduction");
        doc.put("content", "Learn Elasticsearch basics and advanced usage.");
        doc.put("tags", "elasticsearch,search");
        doc.put("answer", "Yes");
        doc.put("userId", 1L);
        doc.put("editTime", "2023-09-01 10:00:00");
        doc.put("createTime", "2023-09-01 09:00:00");
        doc.put("updateTime", "2023-09-01 09:10:00");
        doc.put("isDelete", false);

        IndexQuery indexQuery = new IndexQueryBuilder().withId("1").withObject(doc).build();
        String documentId = elasticsearchRestTemplate.index(indexQuery, IndexCoordinates.of(INDEX_NAME));

        assertThat(documentId).isNotNull();
    }

    // Get (Retrieve) a document by ID
    @Test
    public void getDocument() {
        String documentId = "1";  // Replace with the actual ID of an indexed document

        Map<String, Object> document = elasticsearchRestTemplate.get(documentId, Map.class, IndexCoordinates.of(INDEX_NAME));

        assertThat(document).isNotNull();
        assertThat(document.get("title")).isEqualTo("Elasticsearch Introduction");
    }

    // Update a document
    @Test
    public void updateDocument() {
        String documentId = "1";  // Replace with the actual ID of an indexed document

        Map<String, Object> updates = new HashMap<>();
        updates.put("title", "Updated Elasticsearch Title");
        updates.put("updateTime", "2023-09-01 10:30:00");

        UpdateQuery updateQuery = UpdateQuery.builder(documentId)
                .withDocument(Document.from(updates))
                .build();

        elasticsearchRestTemplate.update(updateQuery, IndexCoordinates.of(INDEX_NAME));

        Map<String, Object> updatedDocument = elasticsearchRestTemplate.get(documentId, Map.class, IndexCoordinates.of(INDEX_NAME));
        assertThat(updatedDocument.get("title")).isEqualTo("Updated Elasticsearch Title");
    }

    // Delete a document
    @Test
    public void deleteDocument() {
        String documentId = "1";  // Replace with the actual ID of an indexed document

        String result = elasticsearchRestTemplate.delete(documentId, IndexCoordinates.of(INDEX_NAME));
        assertThat(result).isNotNull();
    }

    // Delete the entire index
    @Test
    public void deleteIndex() {
        IndexOperations indexOps = elasticsearchRestTemplate.indexOps(IndexCoordinates.of(INDEX_NAME));
        boolean deleted = indexOps.delete();
        assertThat(deleted).isTrue();
    }
}
```

由于单元测试的执行顺序问题，批量执行时，可能会有部分报错，是正常现象，也可以一个一个手动执行测试。

![img](./assets/202409061424060.png)

可以使用 Kibana 开发者工具来查看数据情况：

![img](./assets/202409061424095.png)

几个注意事项：

1. 当你向一个不存在的索引中插入数据时，Elasticsearch 会根据文档内容自动推断字段类型，并为这些字段创建映射。这就是 ES 的 **动态映射**（Dynamic Mapping）功能。然而，这种自动生成的映射有一些局限性，可能导致字段类型不够规范。
2. ES 中，_开头的字段表示系统默认字段，比如 _id，如果系统不指定，会自动生成。但是不会在 _source 字段中补充 id 的值，所以建议大家手动指定，让数据更完整。
3. ES 插入和更新数据没有 MySQL 那么严格，尤其是在动态 Mapping 模式下，只要指定了相同的文档 id，ES 允许动态添加字段和更新文档。

------

通过这个单元测试，我们也能基本了解 Spring Data Elasticsearch 操作 ES 的方法：

1. 构造一个 Query 对象，比如插入数据使用 IndexQuery，更新数据使用 UpdateQuery
2. 调用 elasticsearchRestTemplate 的增删改查方法，传入 Query 对象和要操作的索引作为参数
3. 对返回值进行处理

示例代码如下：

```java
Map<String, Object> updates = new HashMap<>();
updates.put("title", "Updated Elasticsearch Title");
updates.put("updateTime", "2023-09-01 10:30:00");

UpdateQuery updateQuery = UpdateQuery.builder(documentId)
        .withDocument(Document.from(updates))
        .build();

elasticsearchRestTemplate.update(updateQuery, IndexCoordinates.of(INDEX_NAME));

Map<String, Object> updatedDocument = elasticsearchRestTemplate.get(documentId, Map.class, IndexCoordinates.of(INDEX_NAME));
```

但是有个问题，我们上述代码都是用 Map 来传递数据。记得之前使用 MyBatis 操作数据库的时候，都要定义一个数据库实体类，然后把参数传给这个实体类的对象就可以了，会更方便和规范。

没错，Spring Data Elasticsearch 也是支持这种标准 Dao 层开发方式的，下面就来使用一下。

#### 5、编写 ES Dao 层

1）在 `model.dto.question` 包中定义和 ES 对应的实体类：

```java
@Document(indexName = "question")
@Data
public class QuestionEsDTO implements Serializable {

    private static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

    /**
     * id
     */
    @Id
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 答案
     */
    private String answer;

    /**
     * 标签列表
     */
    private List<String> tags;

    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 创建时间
     */
    @Field(type = FieldType.Date, format = {}, pattern = DATE_TIME_PATTERN)
    private Date createTime;

    /**
     * 更新时间
     */
    @Field(type = FieldType.Date, format = {}, pattern = DATE_TIME_PATTERN)
    private Date updateTime;

    /**
     * 是否删除
     */
    private Integer isDelete;

    private static final long serialVersionUID = 1L;

    /**
     * 对象转包装类
     *
     * @param question
     * @return
     */
    public static QuestionEsDTO objToDto(Question question) {
        if (question == null) {
            return null;
        }
        QuestionEsDTO questionEsDTO = new QuestionEsDTO();
        BeanUtils.copyProperties(question, questionEsDTO);
        String tagsStr = question.getTags();
        if (StringUtils.isNotBlank(tagsStr)) {
            questionEsDTO.setTags(JSONUtil.toList(tagsStr, String.class));
        }
        return questionEsDTO;
    }

    /**
     * 包装类转对象
     *
     * @param questionEsDTO
     * @return
     */
    public static Question dtoToObj(QuestionEsDTO questionEsDTO) {
        if (questionEsDTO == null) {
            return null;
        }
        Question question = new Question();
        BeanUtils.copyProperties(questionEsDTO, question);
        List<String> tagList = questionEsDTO.getTags();
        if (CollUtil.isNotEmpty(tagList)) {
            question.setTags(JSONUtil.toJsonStr(tagList));
        }
        return question;
    }
}
```

2）定义 Dao 层

可以在 esdao 包中统一存放对 Elasticsearch 的操作，只需要继承 ElasticsearchRepository 类即可。

代码如下：

```java
/**
 * 题目 ES 操作
 */
public interface QuestionEsDao 
    extends ElasticsearchRepository<QuestionEsDTO, Long> {

}
```

ElasticsearchRepository 类为我们提供了大量现成的 CRUD 操作：

![img](./assets/202409061424110.png)

而且还支持根据方法名自动映射为查询操作，比如在 QuestionEsDao 中定义下列方法，就会自动根据 userId 查询数据。

```java
/**
 * 根据用户 id 查询
 * @param userId
 * @return
 */
List<QuestionEsDTO> findByUserId(Long userId);
```

可以编写一个单元测试来验证：

```java
@SpringBootTest
class QuestionEsDaoTest {

    @Resource
    private QuestionEsDao questionEsDao;

    @Test
    void findByUserId() {
        questionEsDao.findByUserId(1L);
    }
}
```

具体的方法名和查询条件的映射规则见 [官方文档](https://docs.spring.io/spring-data/elasticsearch/docs/4.4.2/reference/html/#repositories)。

------

目前我们学到了 2 种 Spring Data Elasticsearch 的使用方法，应该如何选择呢？

- 第 1 种方式：Spring 默认给我们提供的操作 es 的客户端对象 ElasticsearchRestTemplate，也提供了增删改查，它的增删改查更灵活，**适用于更复杂的操作**，返回结果更完整，但需要自己解析。
- 第 2 种方式：ElasticsearchRepository<Entity, IdType>，默认提供了更简单易用的增删改查，返回结果也更直接。**适用于可预期的、相对简单的操作** 。

#### 6、向 ES 全量写入数据

可以通过编写单次执行的任务，将 MySQL 中题目表的数据，全量写入到 Elasticsearch。

可以通过实现 CommandLineRunner 接口定义单次任务，也可以编写一个仅管理员可用的接口，根据需要选择就好。

在 `job/once` 目录下编写任务：

```java
// todo 取消注释开启任务
@Component
@Slf4j
public class FullSyncQuestionToEs implements CommandLineRunner {

    @Resource
    private QuestionService questionService;

    @Resource
    private QuestionEsDao questionEsDao;

    @Override
    public void run(String... args) {
        // 全量获取题目（数据量不大的情况下使用）
        List<Question> questionList = questionService.list();
        if (CollUtil.isEmpty(questionList)) {
            return;
        }
        // 转为 ES 实体类
        List<QuestionEsDTO> questionEsDTOList = questionList.stream()
                .map(QuestionEsDTO::objToDto)
                .collect(Collectors.toList());
        // 分页批量插入到 ES
        final int pageSize = 500;
        int total = questionEsDTOList.size();
        log.info("FullSyncQuestionToEs start, total {}", total);
        for (int i = 0; i < total; i += pageSize) {
            // 注意同步的数据下标不能超过总数据量
            int end = Math.min(i + pageSize, total);
            log.info("sync from {} to {}", i, end);
            questionEsDao.saveAll(questionEsDTOList.subList(i, end));
        }
        log.info("FullSyncQuestionToEs end, total {}", total);
    }
}
```

启动项目，然后用 Kibana 开发工具查看所有数据，发现写入成功：

![img](./assets/202409061424122.png)

#### 7、开发 ES 搜索

1）QuestionService 新增查询接口：

```java
/**
 * 从 ES 查询题目
 *
 * @param questionQueryRequest
 * @return
 */
Page<Question> searchFromEs(QuestionQueryRequest questionQueryRequest);
```

2）编写实现方法

由于查询逻辑较为复杂，为了保证灵活性，选用 ElasticsearchRestTemplate 开发。

需要支持现有的题目查询条件，搜索方法代码如下：

```java
@Override
public Page<Question> searchFromEs(QuestionQueryRequest questionQueryRequest) {
    // 获取参数
    Long id = questionQueryRequest.getId();
    Long notId = questionQueryRequest.getNotId();
    String searchText = questionQueryRequest.getSearchText();
    List<String> tags = questionQueryRequest.getTags();
    Long questionBankId = questionQueryRequest.getQuestionBankId();
    Long userId = questionQueryRequest.getUserId();
    // 注意，ES 的起始页为 0
    int current = questionQueryRequest.getCurrent() - 1;
    int pageSize = questionQueryRequest.getPageSize();
    String sortField = questionQueryRequest.getSortField();
    String sortOrder = questionQueryRequest.getSortOrder();

    // 构造查询条件
    BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
    // 过滤
    boolQueryBuilder.filter(QueryBuilders.termQuery("isDelete", 0));
    if (id != null) {
        boolQueryBuilder.filter(QueryBuilders.termQuery("id", id));
    }
    if (notId != null) {
        boolQueryBuilder.mustNot(QueryBuilders.termQuery("id", notId));
    }
    if (userId != null) {
        boolQueryBuilder.filter(QueryBuilders.termQuery("userId", userId));
    }
    if (questionBankId != null) {
        boolQueryBuilder.filter(QueryBuilders.termQuery("questionBankId", questionBankId));
    }
    // 必须包含所有标签
    if (CollUtil.isNotEmpty(tags)) {
        for (String tag : tags) {
            boolQueryBuilder.filter(QueryBuilders.termQuery("tags", tag));
        }
    }
    // 按关键词检索
    if (StringUtils.isNotBlank(searchText)) {
        boolQueryBuilder.should(QueryBuilders.matchQuery("title", searchText));
        boolQueryBuilder.should(QueryBuilders.matchQuery("content", searchText));
        boolQueryBuilder.should(QueryBuilders.matchQuery("answer", searchText));
        boolQueryBuilder.minimumShouldMatch(1);
    }
    // 排序
    SortBuilder<?> sortBuilder = SortBuilders.scoreSort();
    if (StringUtils.isNotBlank(sortField)) {
        sortBuilder = SortBuilders.fieldSort(sortField);
        sortBuilder.order(CommonConstant.SORT_ORDER_ASC.equals(sortOrder) ? SortOrder.ASC : SortOrder.DESC);
    }
    // 分页
    PageRequest pageRequest = PageRequest.of(current, pageSize);
    // 构造查询
    NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(boolQueryBuilder)
            .withPageable(pageRequest)
            .withSorts(sortBuilder)
            .build();
    SearchHits<QuestionEsDTO> searchHits = elasticsearchRestTemplate.search(searchQuery, QuestionEsDTO.class);
    // 复用 MySQL 的分页对象，封装返回结果
    Page<Question> page = new Page<>();
    page.setTotal(searchHits.getTotalHits());
    List<Question> resourceList = new ArrayList<>();
    if (searchHits.hasSearchHits()) {
        List<SearchHit<QuestionEsDTO>> searchHitList = searchHits.getSearchHits();
        for (SearchHit<QuestionEsDTO> questionEsDTOSearchHit : searchHitList) {
            resourceList.add(QuestionEsDTO.dtoToObj(questionEsDTOSearchHit.getContent()));
        }
    }
    page.setRecords(resourceList);
    return page;
}
```

虽然看上去复杂，但不涉及什么逻辑，根据查询需求选择合适的搜索方法，不断构造搜索条件即可。

3）在 QuestionController 编写新的搜索接口：

```java
@PostMapping("/search/page/vo")
public BaseResponse<Page<QuestionVO>> searchQuestionVOByPage(@RequestBody QuestionQueryRequest questionQueryRequest,
                                                     HttpServletRequest request) {
    long size = questionQueryRequest.getPageSize();
    // 限制爬虫
    ThrowUtils.throwIf(size > 200, ErrorCode.PARAMS_ERROR);
    Page<Question> questionPage = questionService.searchFromEs(questionQueryRequest);
    return ResultUtils.success(questionService.getQuestionVOPage(questionPage, request));
}
```

4）然后可以通过 Swagger 接口文档进行测试。

#### 8、数据同步

根据之前的方案设计，通过定时任务进行增量同步，每分钟同步过去 5 分钟内数据库发生修改的题目数据。

注意，如果使用 MyBatis Plus 提供的 mapper 方法，查询时会默认过滤掉 isDelete = 1（逻辑已删除）的数据，而我们的需求是让 ES 和 MySQL 完全同步，所以需要在 QuestionMapper 中编写一个能查询出 isDelete = 1 数据的方法。

1）编写查询某个时间后更新的所有题目的方法：

```java
public interface QuestionMapper extends BaseMapper<Question> {

    /**
     * 查询题目列表（包括已被删除的数据）
     */
    @Select("select * from question where updateTime >= #{minUpdateTime}")
    List<Question> listQuestionWithDelete(Date minUpdateTime);
}
```

2）在 `job/cycle` 下编写增量同步到 ES 的定时任务：

```java
// todo 取消注释开启任务
//@Component
@Slf4j
public class IncSyncQuestionToEs {

    @Resource
    private QuestionMapper questionMapper;

    @Resource
    private QuestionEsDao questionEsDao;

    /**
     * 每分钟执行一次
     */
    @Scheduled(fixedRate = 60 * 1000)
    public void run() {
        // 查询近 5 分钟内的数据
        long FIVE_MINUTES = 5 * 60 * 1000L;
        Date fiveMinutesAgoDate = new Date(new Date().getTime() - FIVE_MINUTES);
        List<Question> questionList = questionMapper.listQuestionWithDelete(fiveMinutesAgoDate);
        if (CollUtil.isEmpty(questionList)) {
            log.info("no inc question");
            return;
        }
        List<QuestionEsDTO> questionEsDTOList = questionList.stream()
                .map(QuestionEsDTO::objToDto)
                .collect(Collectors.toList());
        final int pageSize = 500;
        int total = questionEsDTOList.size();
        log.info("IncSyncQuestionToEs start, total {}", total);
        for (int i = 0; i < total; i += pageSize) {
            int end = Math.min(i + pageSize, total);
            log.info("sync from {} to {}", i, end);
            questionEsDao.saveAll(questionEsDTOList.subList(i, end));
        }
        log.info("IncSyncQuestionToEs end, total {}", total);
    }
}
```

3）尝试修改部分数据，通过日志查看定时任务同步是否生效：

![img](./assets/202409061424143.png)

### 前端开发

由于新增了接口，需要调用 OpenAPI 重新生成请求代码。

修改题目列表页（questions）和题目表格组件（QuestionTable）请求的接口为新增的搜索接口：

```tsx
 const res = await searchQuestionVoByPageUsingPost({
  searchText,
  pageSize: 12,
  sortField: "createTime",
  sortOrder: "descend",
});
```

还要修改题目表格的列配置，搜索框的字段索引改为使用 searchText 而不是 title：

```tsx
 {
  title: "搜索",
  dataIndex: "searchText",
  valueType: "text",
  hideInTable: true,
},
{
  title: "标题",
  dataIndex: "title",
  valueType: "text",
  hideInSearch: true,
  render: (_, record) => {
    return <Link href={`/question/${record.id}`}>{record.title}</Link>;
  },
},
```

### 测试

验证分词效果：

![img](./assets/202409061424710.png)

Elasticsearch 支持按照分数（_score）排序，直接修改 sortField 传递的值即可。

### 扩展

#### 1、根据业务自定义 ES 词典，提高分词准确度

思路：可以参考 IK 分词插件的官方文档：https://github.com/infinilabs/analysis-ik/tree/v7.17.18?tab=readme-ov-file#dictionary-configuration

#### 2、使用 ES 查询时，关联获取题目的动态数据

思路：先查 ES，再从 DB 查询其他的数据

#### 3、ES 接口支持降级

需求：ES 挂了、或者未搭建 ES 环境时，照样能把项目跑起来。

思路：ES 如果查询报错，改为调用数据库查询；还可以根据 ES 客户端是否正确初始化来判断是否应该使用 ES。

#### 4、防止重复执行定时任务

可以自定义实现一个分布式锁注解，以下仅供参考：

1）创建一个自定义注解 @DistributedLock

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DistributedLock {

    /**
     * 锁的名称
     */
    String key();

    /**
     * 持锁时间，默认30秒
     */
    long leaseTime() default 30000;

    /**
     * 等待时间，默认10秒
     */
    long waitTime() default 10000;

    /**
     * 时间单位，默认为毫秒
     */
    TimeUnit timeUnit() default java.util.concurrent.TimeUnit.MILLISECONDS;
}
```

2）创建一个切面类，用来处理 @DistributedLock 注解

```java
@Aspect
@Component
public class DistributedLockAspect {

    @Resource
    private RedissonClient redissonClient;

    @Around("@annotation(distributedLock)")
    public Object around(ProceedingJoinPoint joinPoint, DistributedLock distributedLock) throws Exception {
        String lockKey = distributedLock.key();
        long waitTime = distributedLock.waitTime();
        long leaseTime = distributedLock.leaseTime();
        TimeUnit timeUnit = distributedLock.timeUnit();

        RLock lock = redissonClient.getLock(lockKey);

        boolean acquired = false;
        try {
            // 尝试获取锁
            acquired = lock.tryLock(waitTime, leaseTime, timeUnit);
            if (acquired) {
                // 获取锁成功，执行目标方法
                return joinPoint.proceed();
            } else {
                // 获取锁失败，抛出异常或处理逻辑
                throw new RuntimeException("Could not acquire lock: " + lockKey);
            }
        } catch (Throwable e) {
            throw new Exception(e);
        } finally {
            if (acquired) {
                // 释放锁
                lock.unlock();
            }
        }
    }
}
```

3）在需要加锁的方法上使用 @DistributedLock 注解即可，例如：

```java
@Override
@DistributedLock(key = "testLock", leaseTime = 20000, waitTime = 5000)
public void testLock() throws InterruptedException {
    System.out.println("print print");
    Thread.sleep(5000L);
}
```



# 6 - 管理能力拓展

## 本节重点

面向管理的扩展功能

- 题目批量管理：需求分析 + 方案设计 + 前后端开发 + 功能优化
- 自动缓存热门题库：需求分析 + 方案设计 + 开发实现

## 一、题目批量管理

### 需求分析

为了提高管理效率，管理端需要提供批量操作功能，例如：

- 【管理员】批量向题库添加题目
- 【管理员】批量从题库移除题目
- 【管理员】批量删除题目

### 基础方案设计

上述功能的基本实现并不难，本质上都是批量操作。

#### 前端设计

前端需要允许用户多选内容，并且向后端传递要批量操作的数据 id 列表。

前端具体交互流程：

1）批量向题库添加题目：在题目管理页，选中多条题目后，点击操作按钮，弹窗让用户选择要添加的题库。

2）批量从题库移除题目：在题目管理页，选中多条题目后，点击操作按钮，弹窗让用户选择要移除的题库。

3）批量删除题目：在题目管理页，选中多条题目后，点击操作按钮，触发二次确认，并执行删除。

#### 后端设计

后端通过 **循环** 依次调用数据库完成操作。注意，由于是批量操作，需要使用事务，有任何失败都会抛出异常并回滚。

### 基础后端开发

#### 1、批量向题库添加题目

添加前需要校验题目和题库是否存在，只添加合法的题目：

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void batchAddQuestionsToBank(List<Long> questionIdList, Long questionBankId, User loginUser) {
    // 参数校验
    ThrowUtils.throwIf(CollUtil.isEmpty(questionIdList), ErrorCode.PARAMS_ERROR, "题目列表为空");
    ThrowUtils.throwIf(questionBankId == null || questionBankId <= 0, ErrorCode.PARAMS_ERROR, "题库非法");
    ThrowUtils.throwIf(loginUser == null, ErrorCode.NOT_LOGIN_ERROR);
    // 检查题目 id 是否存在
    List<Question> questionList = questionService.listByIds(questionIdList);
    // 合法的题目 id
    List<Long> validQuestionIdList = questionList.stream()
            .map(Question::getId)
            .collect(Collectors.toList());
    ThrowUtils.throwIf(CollUtil.isEmpty(validQuestionIdList), ErrorCode.PARAMS_ERROR, "合法的题目列表为空");
    // 检查题库 id 是否存在
    QuestionBank questionBank = questionBankService.getById(questionBankId);
    ThrowUtils.throwIf(questionBank == null, ErrorCode.NOT_FOUND_ERROR, "题库不存在");
    // 执行插入
    for (Long questionId : validQuestionIdList) {
        QuestionBankQuestion questionBankQuestion = new QuestionBankQuestion();
        questionBankQuestion.setQuestionBankId(questionBankId);
        questionBankQuestion.setQuestionId(questionId);
        questionBankQuestion.setUserId(loginUser.getId());
        boolean result = this.save(questionBankQuestion);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "向题库添加题目失败");
        }
    }
}
```

请求对象：

```java
@Data
public class QuestionBankQuestionBatchAddRequest implements Serializable {

    /**
     * 题库 id
     */
    private Long questionBankId;

    /**
     * 题目 id 列表
     */
    private List<Long> questionIdList;

    private static final long serialVersionUID = 1L;
}
```

QuestionController 新增接口：

```java
@PostMapping("/add/batch")
@AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
public BaseResponse<Boolean> batchAddQuestionsToBank(
        @RequestBody QuestionBankQuestionBatchAddRequest questionBankQuestionBatchAddRequest,
        HttpServletRequest request
) {
    // 参数校验
    ThrowUtils.throwIf(questionBankQuestionBatchAddRequest == null, ErrorCode.PARAMS_ERROR);
    User loginUser = userService.getLoginUser(request);
    Long questionBankId = questionBankQuestionBatchAddRequest.getQuestionBankId();
    List<Long> questionIdList = questionBankQuestionBatchAddRequest.getQuestionIdList();
    questionBankQuestionService.batchAddQuestionsToBank(questionIdList, questionBankId, loginUser);
    return ResultUtils.success(true);
}
```

#### 2、批量从题库移除题目

删除时的校验可以相对宽松一些，直接执行删除操作即可。代码如下：

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void batchRemoveQuestionsFromBank(List<Long> questionIdList, Long questionBankId) {
    // 参数校验
    ThrowUtils.throwIf(CollUtil.isEmpty(questionIdList), ErrorCode.PARAMS_ERROR, "题目列表为空");
    ThrowUtils.throwIf(questionBankId == null || questionBankId <= 0, ErrorCode.PARAMS_ERROR, "题库非法");
    // 执行删除关联
    for (Long questionId : questionIdList) {
        // 构造查询
        LambdaQueryWrapper<QuestionBankQuestion> lambdaQueryWrapper = Wrappers.lambdaQuery(QuestionBankQuestion.class)
                .eq(QuestionBankQuestion::getQuestionId, questionId)
                .eq(QuestionBankQuestion::getQuestionBankId, questionBankId);
        boolean result = this.remove(lambdaQueryWrapper);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "从题库移除题目失败");
        }
    }
}
```

请求对象：

```java
@Data
public class QuestionBankQuestionBatchRemoveRequest implements Serializable {

    /**
     * 题库 id
     */
    private Long questionBankId;

    /**
     * 题目 id 列表
     */
    private List<Long> questionIdList;

    private static final long serialVersionUID = 1L;
}
```

QuestionBankQuestionController 新增接口：

```java
@PostMapping("/remove/batch")
@AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
public BaseResponse<Boolean> batchRemoveQuestionsFromBank(
        @RequestBody QuestionBankQuestionBatchRemoveRequest questionBankQuestionBatchRemoveRequest,
        HttpServletRequest request
) {
    // 参数校验
    ThrowUtils.throwIf(questionBankQuestionBatchRemoveRequest == null, ErrorCode.PARAMS_ERROR);
    Long questionBankId = questionBankQuestionBatchRemoveRequest.getQuestionBankId();
    List<Long> questionIdList = questionBankQuestionBatchRemoveRequest.getQuestionIdList();
    questionBankQuestionService.batchRemoveQuestionsFromBank(questionIdList, questionBankId);
    return ResultUtils.success(true);
}
```

#### 3、批量删除题目

对于批量删除题目功能，需要在删除题目时，移除题目题库关系。代码如下：

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void batchDeleteQuestions(List<Long> questionIdList) {
    if (CollUtil.isEmpty(questionIdList)) {
        throw new BusinessException(ErrorCode.PARAMS_ERROR, "要删除的题目列表为空");
    }
    for (Long questionId : questionIdList) {
        boolean result = this.removeById(questionId);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "删除题目失败");
        }
        // 移除题目题库关系
        LambdaQueryWrapper<QuestionBankQuestion> lambdaQueryWrapper = Wrappers.lambdaQuery(QuestionBankQuestion.class)
                .eq(QuestionBankQuestion::getQuestionId, questionId);
        result = questionBankQuestionService.remove(lambdaQueryWrapper);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "删除题目题库关联失败");
        }
    }
}
```

请求对象：

```java
@Data
public class QuestionBatchDeleteRequest implements Serializable {

    /**
     * 题目 id 列表
     */
    private List<Long> questionIdList;

    private static final long serialVersionUID = 1L;
}
```

QuestionBankQuestionController 新增接口：

```java
@PostMapping("/delete/batch")
@AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
public BaseResponse<Boolean> batchDeleteQuestions(@RequestBody QuestionBatchDeleteRequest questionBatchDeleteRequest,
                                                  HttpServletRequest request) {
    ThrowUtils.throwIf(questionBatchDeleteRequest == null, ErrorCode.PARAMS_ERROR);
    questionService.batchDeleteQuestions(questionBatchDeleteRequest.getQuestionIdList());
    return ResultUtils.success(true);
}
```

### 前端开发

主要是修改题目管理页面，增加批量操作能力。

#### 1、批量操作

Ant Design ProComponents 的 ProTable 组件自带批量操作功能，可以参考 [官方文档](https://procomponents.ant.design/components/table?tab=api&current=1&pageSize=5#packages-table-src-components-table-tab-api-demo-batchoption) 。

给 ProTable 组件增加如下属性，要重点注意修改 ProTable 组件的 rowKey="id"，作为多选行的唯一标识。

```tsx
<ProTable<API.Question>
  rowKey="id"
  rowSelection={{
    // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
    // 注释该行则默认不显示下拉选项
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
  }}
  tableAlertRender={({
    selectedRowKeys,
    selectedRows,
    onCleanSelected,
  }) => {
    return (
      <Space size={24}>
        <span>
          已选 {selectedRowKeys.length} 项
          <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
            取消选择
          </a>
        </span>
      </Space>
    );
  }}
  tableAlertOptionRender={({
    selectedRowKeys,
    selectedRows,
    onCleanSelected,
  }) => {
    return (
      <Space size={16}>
        <Button
          onClick={() => {
            // 打开弹窗
          }}
        >
          批量向题库添加题目
        </Button>
        <Button
          onClick={() => {
            // 打开弹窗
          }}
        >
          批量从题库移除题目
        </Button>
        <Popconfirm
          title="确认删除"
          description="你确定要删除这些题目么？"
          onConfirm={() => {
            // 批量删除题目
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>批量删除题目</Button>
        </Popconfirm>
      </Space>
    );
  }}
/>
```

注意，上述代码中，考虑到批量删除题目需要二次确认，使用 [Popconfirm 组件](https://ant-design.antgroup.com/components/popconfirm-cn)。

#### 2、操作弹窗

参考更新题目所属题库弹窗组件 UpdateBankModal，编写批量向题库添加题目弹窗、批量从题库移除题目弹窗。二者写法基本一致，都接受 questionIdList 选中的题目 id 列表参数、都需要获取到题库列表供选择。

1）批量向题库添加题目弹窗：

```tsx
import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { batchAddQuestionsToBankUsingPost } from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量向题库添加题目弹窗
 * @param props
 * @constructor
 */
const BatchAddQuestionsToBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
    >([]);

  // 获取题库列表
  const getQuestionBankList = async () => {
    // 题库数量不多，直接全量获取
    const pageSize = 200;

    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(res.data?.records ?? []);
    } catch (e) {
      message.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  /**
   * 提交
   * @param fields
   */
  const doSubmit = async (fields: API.QuestionBankQuestionBatchAddRequest) => {
    const hide = message.loading("正在操作");
    const questionBankId = fields.questionBankId;
    try {
      await batchAddQuestionsToBankUsingPost({
        questionIdList,
        questionBankId,
      });
      hide();
      message.success("操作成功");
      onSubmit?.();
    } catch (error: any) {
      hide();
      message.error("操作失败，" + error.message);
    }
  };

  return (
    <Modal
      destroyOnClose
      title={"批量向题库添加题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
      >
      <Form
        form={form}
        style={{ marginTop: 24 }}
        onFinish={doSubmit}
        >
        <Form.Item label="选择题库" name="questionBankId">
          <Select
            style={{ width: "100%" }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
            />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BatchAddQuestionsToBankModal;
```

2）批量从题库移除题目弹窗：

```tsx
import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import {
  batchRemoveQuestionsFromBankUsingPost,
} from "@/api/questionBankQuestionController";

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量从题库移除题目弹窗
 * @param props
 * @constructor
 */
const BatchRemoveQuestionsToBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

  /**
   * 提交
   *
   * @param values
   */
  const doSubmit = async (
    values: API.QuestionBankQuestionBatchRemoveRequest,
  ) => {
    const hide = message.loading("正在操作");
    const questionBankId = values.questionBankId;
    if (!questionBankId) {
      return;
    }
    try {
      await batchRemoveQuestionsFromBankUsingPost({
        questionBankId,
        questionIdList,
      });
      hide();
      message.success("操作成功");
      onSubmit?.();
    } catch (error: any) {
      hide();
      message.error("操作失败，" + error.message);
    }
  };

  // 获取题库列表
  const getQuestionBankList = async () => {
    // 题库数量不多，直接全量获取
    const pageSize = 200;

    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(res.data?.records ?? []);
    } catch (e) {
      message.error("获取题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      destroyOnClose
      title={"批量从题库移除题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }} onFinish={doSubmit}>
        <Form.Item label="选择题库" name="questionBankId">
          <Select
            style={{ width: "100%" }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BatchRemoveQuestionsToBankModal;
```

#### 3、题目管理页面使用弹窗

1）需要在题目管理页面定义一些变量，包括弹窗是否可见、选中的题目 id 列表。代码如下：

```tsx
// 是否显示批量向题库添加题目弹窗
const [
  batchAddQuestionsToBankModalVisible,
  setBatchAddQuestionsToBankModalVisible,
] = useState<boolean>(false);
// 是否显示批量从题库移除题目弹窗
const [
  batchRemoveQuestionsFromBankModalVisible,
  setBatchRemoveQuestionsFromBankModalVisible,
] = useState<boolean>(false);
// 当前选中的题目 id 列表
const [selectedQuestionIdList, setSelectedQuestionIdList] = useState<
  number[]
>([]);
```

2）给批量操作按钮绑定事件，点击时触发弹窗打开：

```tsx
<Button
  onClick={() => {
    // 打开弹窗
    setSelectedQuestionIdList(selectedRowKeys as number[]);
    setBatchAddQuestionsToBankModalVisible(true);
  }}
  >
  批量向题库添加题目
</Button>
<Button
onClick={() => {
  // 打开弹窗
  setSelectedQuestionIdList(selectedRowKeys as number[]);
  setBatchRemoveQuestionsFromBankModalVisible(true);
}}
>
批量从题库移除题目
</Button>
```

3）引入弹窗组件，并且绑定事件，弹窗内的操作成功或取消时，都需要关闭弹窗：

```tsx
<BatchAddQuestionsToBankModal
  visible={batchAddQuestionsToBankModalVisible}
  questionIdList={selectedQuestionIdList}
  onSubmit={() => {
    setBatchAddQuestionsToBankModalVisible(false);
  }}
  onCancel={() => {
    setBatchAddQuestionsToBankModalVisible(false);
  }}
/>
<BatchRemoveQuestionsFromBankModal
  visible={batchRemoveQuestionsFromBankModalVisible}
  questionIdList={selectedQuestionIdList}
  onSubmit={() => {
    setBatchRemoveQuestionsFromBankModalVisible(false);
  }}
  onCancel={() => {
    setBatchRemoveQuestionsFromBankModalVisible(false);
  }}
/>
```

#### 4、批量删除题目

先定义批量删除函数：

```tsx
/**
 * 批量删除
 * @param questionIdList
 */
const handleBatchDelete = async (questionIdList: number[]) => {
  const hide = message.loading("正在操作");
  try {
    await batchDeleteQuestionsUsingPost({
      questionIdList,
    });
    hide();
    message.success("操作成功");
    actionRef?.current?.reload();
  } catch (error: any) {
    hide();
    message.error("操作失败，" + error.message);
  }
};
```

然后给批量删除按钮绑定事件：

```tsx
<Popconfirm
  title="确认删除"
  description="你确定要删除这些题目么？"
  onConfirm={() => {
    // 批量删除题目
    handleBatchDelete(selectedRowKeys as number[]);
  }}
  okText="Yes"
  cancelText="No"
>
  <Button danger>批量删除题目</Button>
</Popconfirm>
```

------

几个功能的开发就完成了，效果如图：

![img](./assets/202409091445583.png) ![img](./assets/202409091445634.png)

### 测试验证（发现问题）

通过测试，可以发现一些明显的功能问题，比如：

1）已添加到题库的题目，重复添加就会报错

![img](./assets/202409091445657.png)

查看后端日志，因为重复添加了记录：

![img](./assets/202409091445660.png)

2）未添加到题库的题目，解除绑定关系失败就会报错

![img](./assets/202409091445671.png)

因为不存在题目关联，抛出我们自定义的业务异常：

![img](./assets/202409091445673.png)

3）删除题目时，如果没有关联，也会报错。因为不存在题目关联，抛出我们自定义的业务异常。

![img](./assets/202409091445511.png)

此外，我们上述的代码还有一些其他的问题，比如：

- 稳定性低，有一道题目报错，就全部出错了
- 性能较低，同时操作的题目较多时，执行时间会很长

下面我们以这些功能为例，来学习一些通用的 **批处理操作** 的优化方案。

## 二、批处理操作优化

一般情况下，我们可以从以下多个角度对批处理任务进行优化。

- 健壮性
- 稳定性
- 性能
- 数据一致性
- 可观测性

### 健壮性

健壮性是指系统在面对 **异常情况或不合法输入** 时仍能表现出合理的行为。一个健壮的系统能够 **预见和处理异常**，并且即使发生错误，也不会崩溃或产生不可预期的行为。

#### 1、参数校验提前

可以在调用数据库之前就对参数进行校验，这样可以减少不必要的数据库操作开销，不用等到数据库操作时再抛出异常。

在现有的添加题目到题库的代码中，我们已经提前对参数进行了非空校验，并且会提前检查题目和题库是否存在，这是很好的。但是我们还没有校验哪些题目已经添加到题库中，对于这些题目，不必再执行插入关联记录的数据库操作。

需要补充的代码如下：

```java
// 检查题库 id 是否存在
// ...

// 检查哪些题目还不存在于题库中，避免重复插入
LambdaQueryWrapper<QuestionBankQuestion> lambdaQueryWrapper = Wrappers.lambdaQuery(QuestionBankQuestion.class)
        .eq(QuestionBankQuestion::getQuestionBankId, questionBankId)
        .in(QuestionBankQuestion::getQuestionId, validQuestionIdList);
List<QuestionBankQuestion> existQuestionList = this.list(lambdaQueryWrapper);
// 已存在于题库中的题目 id
Set<Long> existQuestionIdSet = existQuestionList.stream()
        .map(QuestionBankQuestion::getId)
        .collect(Collectors.toSet());
// 已存在于题库中的题目 id，不需要再次添加
validQuestionIdList = validQuestionIdList.stream().filter(questionId -> {
    return !existQuestionIdSet.contains(questionId);
}).collect(Collectors.toList());
ThrowUtils.throwIf(CollUtil.isEmpty(validQuestionIdList), ErrorCode.PARAMS_ERROR, "所有题目都已存在于题库中");

// 执行插入
// ...
```

#### 2、异常处理

目前虽然已经对每一次插入操作的结果都进行了判断，并且抛出自定义异常，但是有些特殊的异常并没有被捕获。

可以进一步细化异常处理策略，考虑更细粒度的异常分类，不同的异常类型可以通过不同的方式处理，例如：

- 数据唯一键重复插入问题，会抛出 `DataIntegrityViolationException`。
- 数据库连接问题、事务问题等导致操作失败时抛出 `DataAccessException`。
- 其他的异常可以通过日志记录详细错误信息，便于后期追踪（全局异常处理器也有这个能力）。

示例代码如下：

```java
try {
    boolean result = this.save(questionBankQuestion);
    if (!result) {
        throw new BusinessException(ErrorCode.OPERATION_ERROR, "向题库添加题目失败");
    }
} catch (DataIntegrityViolationException e) {
    log.error("数据库唯一键冲突或违反其他完整性约束，题目 id: {}, 题库 id: {}, 错误信息: {}",
            questionId, questionBankId, e.getMessage());
    throw new BusinessException(ErrorCode.OPERATION_ERROR, "题目已存在于该题库，无法重复添加");
} catch (DataAccessException e) {
    log.error("数据库连接问题、事务问题等导致操作失败，题目 id: {}, 题库 id: {}, 错误信息: {}",
            questionId, questionBankId, e.getMessage());
    throw new BusinessException(ErrorCode.OPERATION_ERROR, "数据库操作失败");
} catch (Exception e) {
    // 捕获其他异常，做通用处理
    log.error("添加题目到题库时发生未知错误，题目 id: {}, 题库 id: {}, 错误信息: {}",
            questionId, questionBankId, e.getMessage());
    throw new BusinessException(ErrorCode.OPERATION_ERROR, "向题库添加题目失败");
}
```

### 稳定性

#### 1、避免长事务问题

批量操作中，一次性处理过多数据会导致事务过长，影响数据库性能。可以通过 分批处理 来避免长事务问题，确保部分数据异常不会影响整个批次的数据保存。

假设操作 10w 条数据，其中有 1 条数据操作异常，如果是长事务，那么修改的 10w 条数据都需要回滚，而分批事务仅需回滚一批既可，降低长事务带来的资源消耗，同时也提升了稳定性。

编写一个新的方法，用于对某一批操作进行事务管理：

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void batchAddQuestionsToBankInner(List<QuestionBankQuestion> questionBankQuestions) {
    for (QuestionBankQuestion questionBankQuestion : questionBankQuestions) {
        long questionId = questionBankQuestion.getQuestionId();
        long questionBankId = questionBankQuestion.getQuestionBankId();
        try {
            boolean result = this.save(questionBankQuestion);
            ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "向题库添加题目失败");
        } catch (DataIntegrityViolationException e) {
            log.error("数据库唯一键冲突或违反其他完整性约束，题目 id: {}, 题库 id: {}, 错误信息: {}",
                    questionId, questionBankId, e.getMessage());
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "题目已存在于该题库，无法重复添加");
        } catch (DataAccessException e) {
            log.error("数据库连接问题、事务问题等导致操作失败，题目 id: {}, 题库 id: {}, 错误信息: {}",
                    questionId, questionBankId, e.getMessage());
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "数据库操作失败");
        } catch (Exception e) {
            // 捕获其他异常，做通用处理
            log.error("添加题目到题库时发生未知错误，题目 id: {}, 题库 id: {}, 错误信息: {}",
                    questionId, questionBankId, e.getMessage());
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "向题库添加题目失败");
        }
    }
}
```

在原方法中批量生成题目，并且调用上述事务方法：

```java
// 分批处理避免长事务，假设每次处理 1000 条数据
int batchSize = 1000;
int totalQuestionListSize = validQuestionIdList.size();
for (int i = 0; i < totalQuestionListSize; i += batchSize) {
    // 生成每批次的数据
    List<Long> subList = validQuestionIdList.subList(i, Math.min(i + batchSize, totalQuestionListSize));
    List<QuestionBankQuestion> questionBankQuestions = subList.stream().map(questionId -> {
        QuestionBankQuestion questionBankQuestion = new QuestionBankQuestion();
        questionBankQuestion.setQuestionBankId(questionBankId);
        questionBankQuestion.setQuestionId(questionId);
        questionBankQuestion.setUserId(loginUser.getId());
        return questionBankQuestion;
    }).collect(Collectors.toList());
    // 使用事务处理每批数据
    QuestionBankQuestionService questionBankQuestionService = (QuestionBankQuestionServiceImpl) AopContext.currentProxy();
    questionBankQuestionService.batchAddQuestionsToBankInner(questionBankQuestions);
}
```

需要注意的是，上述代码中，我们通过 `AopContext.currentProxy()` 方法获取到了当前实现类的代理对象，来调用事务方法。

为什么要这么做呢？ 因为 **Spring 事务依赖于代理机制**，而内部调用通过 `this` 直接调用方法，不会通过 Spring 的代理，因此不会触发事务。

注意，使用 `AopContext.currentProxy()` 方法时必须要在启动类添加下面的注解开启切面自动代理：

```java
@EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true)
```

#### 2、重试

对于可能由于网络不稳定等临时原因偶发失败的操作，可以设计 **重试机制** 提高系统的稳定性，适用于执行时间很长的任务。

注意，重试的过程中要记录日志，**并且重试次数要有一个上限** 。示例代码如下：

```java
int retryCount = 3;
for (int i = 0; i < retryCount; i++) {
    try {
        // 执行插入操作
        // 成功则跳出重试循环
        break; 
    } catch (Exception e) {
        log.warn("插入失败，重试次数: {}", i + 1);
        if (i == retryCount - 1) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "多次重试后操作仍然失败");
        }
    }
}
```

💡当然，除了手动编写重试代码外，我会更推荐 Guava Retrying 库，可以看 [鱼皮的这篇文章](https://cloud.tencent.com/developer/article/1752086) 学习。

但对于我们目前的题目管理功能，执行时间不会特别长，增加重试反而一定程度上增加了系统的不确定性和复杂度，可以不用添加。

#### 3、中断恢复

如果在批量插入过程中由于某种原因（如数据库宕机、服务器重启）导致批处理中断，建议设计一种机制来进行 **增量恢复**。比如可以为每次操作打上批次标记，在操作未完成时记录操作状态（如部分题目成功添加），并在恢复时继续执行未完成的操作。

可以设计一个数据库表存储批次的状态：

```sql
create table question_batch_status (
  batch_id bigint primary key,
  question_bank_id bigint,
  total_questions int,
  processed_questions int,
  status varchar(20) -- running, completed, failed
);
```

通过该表可以跟踪每次批处理的进度，并在失败时根据批次继续处理。

但对于我们的题目管理功能，不用那么复杂，可以直接通过判断数据是否已经满足要求来对要新处理的数据进行过滤。比如添加题目到题库前，先查一下是否已经添加到题库里了，如果已添加就不用重复添加了。（前面 `参数校验提前` 就已经实现了这个功能）

### 性能优化

#### 1、批量操作

当前代码中，每个题目是单独插入数据库的，这会产生频繁的数据库交互。

大多数 ORM 框架和数据库驱动都支持批量插入，可以通过批量插入来优化性能，比如 MyBatis Plus 提供了 saveBatch 方法。

优化后的代码如下：

```java
@Override
@Transactional(rollbackFor = Exception.class)
public void batchAddQuestionsToBankInner(List<QuestionBankQuestion> questionBankQuestions) {
    try {
        boolean result = this.saveBatch(questionBankQuestions);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "向题库添加题目失败");
    } catch (DataIntegrityViolationException e) {
        log.error("数据库唯一键冲突或违反其他完整性约束, 错误信息: {}", e.getMessage());
        throw new BusinessException(ErrorCode.OPERATION_ERROR, "题目已存在于该题库，无法重复添加");
    } catch (DataAccessException e) {
        log.error("数据库连接问题、事务问题等导致操作失败, 错误信息: {}", e.getMessage());
        throw new BusinessException(ErrorCode.OPERATION_ERROR, "数据库操作失败");
    } catch (Exception e) {
        // 捕获其他异常，做通用处理
        log.error("添加题目到题库时发生未知错误，错误信息: {}", e.getMessage());
        throw new BusinessException(ErrorCode.OPERATION_ERROR, "向题库添加题目失败");
    }
}
```

批量操作的好处：

- 降低了数据库连接和提交的频率。
- 避免频繁的数据库交互，减少 I/O 操作，显著提高性能。

💡类似的，Redis 也提供了批处理方法，比如 Pipeline。

#### 2、SQL 优化

我们在操作数据库时，可以使用一些 SQL 优化的技巧。

如何优化 SQL？这也是一道经典的面试题，可以 [看文章](https://www.mianshiya.com/question/1780933295521951745) 了解。

其中，有一个最基本的 SQL 优化原则，不要使用 `select *` 来查询数据，只查出需要的字段即可。由于框架封装地太好了，可能大多数同学都不会注意这点，其实我们上述的代码就需要对此进行优化，来减少查询的数据量。

比如：

```java
// 检查题目 id 是否存在
LambdaQueryWrapper<Question> questionLambdaQueryWrapper = Wrappers.lambdaQuery(Question.class)
        .select(Question::getId)
        .in(Question::getId, questionIdList);
List<Question> questionList = questionService.list(questionLambdaQueryWrapper);
```

由于返回的值只有 id 一列，还可以直接转为 Long 列表，不需要让框架封装结果为 Question 对象了，减少内存占用：

```java
// 合法的题目 id
List<Long> validQuestionIdList = questionService.listObjs(questionLambdaQueryWrapper, obj -> (Long) obj);
ThrowUtils.throwIf(CollUtil.isEmpty(validQuestionIdList), ErrorCode.PARAMS_ERROR, "合法的题目列表为空");
```

#### 3、并发编程

由于我们已经将操作分批处理，在操作较多、追求处理时间的情况下，可以通过并发编程让每批操作同时执行，而不是一批处理完再执行下一批，能够大幅提升性能。

Java 中，可以利用并发包中的 **CompletableFuture + 线程池** 来并发处理多个任务。

CompletableFuture 是 Java 8 中引入的一个类，用于表示异步操作的结果。它是 Future 的增强版本，不仅可以表示一个异步计算，还可以对异步计算的结果进行组合、转换和处理，**实现异步任务的编排**。

比如下列代码，将任务拆分为多个子任务，并发执行，最后通过 `CompletableFuture.allOf` 方法阻塞等待，只有所有的子任务都完成，才会执行后续代码：

```java
List<CompletableFuture<Void>> futures = new ArrayList<>();

for (List<Long> subList : splitList(validQuestionIdList, 1000)) {
    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
        processBatch(subList, questionBankId, loginUser);
    });
    futures.add(future);
}

// 等待所有任务完成
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
```

CompletableFuture 默认使用 Java 7 引入的 ForkJoinPool 线程池来并发执行任务。该线程池特别适合需要分治法来处理的大量并发任务，支持递归任务拆分。Java 8 中的并行流默认也是使用了 ForkJoinPool 进行并发处理

ForkJoinPool 的主要特性：

- 工作窃取算法（Work-Stealing）：线程可以从其他线程的工作队列中“窃取”任务，以提高 CPU 的使用率和程序的并行性。
- 递归任务处理：支持将大任务拆分为多个小任务并行执行，然后再将结果合并。

💡 但是要注意，CompletableFuture 默认使用的是 `ForkJoinPool.commonPool()` 方法得到的线程池，这是一个全局共享的线程池，如果有多种不同的任务都依赖该线程池进行处理，可能会导致资源争抢、代码阻塞等不确定的问题。**所以建议针对每种任务，自定义线程池来处理，实现线程池资源的隔离。**

Java 内置了很多种不同的线程池，比如单线程的线程池、固定线程的线程池、自定义线程池等等，一般情况下我们会根据业务和资源情况 **自定义线程池**。下面是一个示例：

```java
// 自定义线程池
ThreadPoolExecutor customExecutor = new ThreadPoolExecutor(
        4,                         // 核心线程数
        10,                        // 最大线程数
        60L,                       // 线程空闲存活时间
        TimeUnit.SECONDS,           // 存活时间单位
        new LinkedBlockingQueue<>(1000),  // 阻塞队列容量
        new ThreadPoolExecutor.CallerRunsPolicy() // 拒绝策略：由调用线程处理任务
);
```

自定义线程池里有那么多参数，应该如何设置呢？

这也是一道经典的面试题，可以看 [这篇文章](https://www.mianshiya.com/question/1771004113190924290) 学习。

![img](./assets/202409091445555.png)

此处画个重点，大家只要记住一个公式：

1. 对于计算密集型任务（消耗 CPU 资源）， 设置核心线程数为 `n+1` 或者 `n`（n 是 CPU 核心数），可以充分利用 CPU， 多一个线程是为了可以在某些线程短暂阻塞或执行调度时，确保有足够的线程保持 CPU 繁忙，最大化 CPU 的利用率。
2. 对于 IO 密集型任务（消耗 IO 资源），可以增大核心线程数为 CPU 核心数的 2 - 4 倍，可以提升并发执行任务的数量。

对于批量添加题目功能，和数据库交互频繁，属于 IO 密集型任务，可以给自定义线程池更大的核心线程数。引入并发编程后的代码：

```java
// 自定义线程池
ThreadPoolExecutor customExecutor = new ThreadPoolExecutor(
        20,                         // 核心线程数
        50,                        // 最大线程数
        60L,                       // 线程空闲存活时间
        TimeUnit.SECONDS,           // 存活时间单位
        new LinkedBlockingQueue<>(10000),  // 阻塞队列容量
        new ThreadPoolExecutor.CallerRunsPolicy() // 拒绝策略：由调用线程处理任务
);

// 用于保存所有批次的 CompletableFuture
List<CompletableFuture<Void>> futures = new ArrayList<>();

// 分批处理避免长事务，假设每次处理 1000 条数据
int batchSize = 1000;
int totalQuestionListSize = validQuestionIdList.size();
for (int i = 0; i < totalQuestionListSize; i += batchSize) {
    // 生成每批次的数据
    List<Long> subList = validQuestionIdList.subList(i, Math.min(i + batchSize, totalQuestionListSize));
    List<QuestionBankQuestion> questionBankQuestions = subList.stream().map(questionId -> {
        QuestionBankQuestion questionBankQuestion = new QuestionBankQuestion();
        questionBankQuestion.setQuestionBankId(questionBankId);
        questionBankQuestion.setQuestionId(questionId);
        questionBankQuestion.setUserId(loginUser.getId());
        return questionBankQuestion;
    }).collect(Collectors.toList());

    QuestionBankQuestionService questionBankQuestionService = (QuestionBankQuestionServiceImpl) AopContext.currentProxy();
    // 异步处理每批数据并添加到 futures 列表
    CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
        questionBankQuestionService.batchAddQuestionsToBankInner(questionBankQuestions);
    }, customExecutor);
    futures.add(future);
}

// 等待所有批次操作完成
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

// 关闭线程池
customExecutor.shutdown();
```

注意，虽然并发编程能够提升性能，但也会占用更多的资源，并且给系统引入更多的不确定性。比如某个任务出现异常时，其他任务可能正在执行，产生不确定的影响。对此，可以根据情况给异步任务补充异常处理行为，通过 `exceptionally` 方法就能实现，示例代码如下：

```java
CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
    questionBankQuestionService.batchAddQuestionsToBankInner(questionBankQuestions);
}, customExecutor).exceptionally(ex -> {
    log.error("批处理任务执行失败", ex);
    return null;
});
```

#### 4、异步任务优化

将批量操作的处理变成提交一个后台任务，提交后台任务后，接口可以直接给前端返回已提交的任务 id。后台可以根据情况选择时机去执行之前提交的后台任务（比如通过定时任务或者消息队列）。

业务流程对应的示例代码如下：

```java
@PostMapping("/start")
public String startTask() {
    // 生成唯一任务 id
    String taskId = UUID.randomUUID().toString();
    
    // 异步提交或执行任务
    executeLongRunningTask(taskId);
    
    // 返回任务 id
    return taskId;
}
```

前端可以通过轮询调用接口、WebSocket、SSE 等方式得知任务的执行进度。比如后端提供一个根据任务 id 查询状态的接口：

```java
// 查询任务状态
public TaskStatus queryTaskStatus(String taskId) {
    return taskService.getTaskStatus(taskId);
}
```

注意，这种方案相当于改造了业务流程，成本较大，适合需要较长执行时间、或者需要对任务状态进行记录复盘的场景。

**怎么实现异步任务呢？**

1）立即执行异步任务

可以直接给要异步执行的方法加上 Spring 提供的 `@Async` 注解，或者手动使用 `CompletableFuture` 来异步执行任务。

```java
@Async
@Override
@Transactional(rollbackFor = Exception.class)
public void batchAddQuestionsToBankInner(List<QuestionBankQuestion> questionBankQuestions) {
    // ...
}
```

2）定时执行

可以将任务信息保存到数据库中，通过 Spring Scheduler 定时任务持续扫描数据库中 **未执行的任务** 来执行。

3）通过消息队列进行任务分发

对于长时间的批量任务，还可以考虑使用 **消息队列**（如 RabbitMQ、Kafka）来异步处理任务。将任务放入消息队列，由消费者（后台服务）异步执行任务。

示例任务提交代码：

```java
@PostMapping("/start")
public String startTask() {
    // 生成唯一任务 id
    String taskId = UUID.randomUUID().toString();
    
    // 将任务发送到消息队列
    messageQueueService.sendMessage(new TaskMessage(taskId));

    // 返回任务 id
    return taskId;
}
```

后台消费者接收到消息后处理任务：

```java
@RabbitListener(queues = "batch-task-queue")
public void processBatchTask(TaskMessage taskMessage) {
    Long taskId = taskMessage.getTaskId();

    // 查询数据库，根据 taskId 获取任务信息
    Task task = getById(taskId);

    // 执行任务
    doSomething(task);

    // 执行完成后，记得更新任务的状态
}
```

💡[编程导航的智能 BI 项目](https://www.code-nav.cn/course/1790980531403927553) 中，就是通过 RabbitMQ 消息队列实现了异步任务，感兴趣的同学可以学习。

#### **5、数据库连接池调优**

数据库连接池是用于管理与数据库之间连接的资源池，它能够 **复用** 现有的数据库连接，而不是在每次请求时都新建和销毁连接，从而提升系统的性能和响应速度。

常见的数据库连接池有 2 种：

1）HikariCP：被认为是市场上最快的数据库连接池之一，具有非常低的延迟和高效的性能。它以其轻量级和简洁的设计闻名，占用较少的内存和 CPU 资源。

Spring Boot 2.x 版本及以上默认使用 HikariCP 作为数据库连接池。

2）[Druid](https://github.com/alibaba/druid)：由阿里巴巴开发的开源数据库连接池，提供了丰富的监控和管理功能，包括 SQL 分析、性能监控和慢查询日志等。适合需要深度定制和监控的企业级应用。

在使用 Spring Boot 2.x 的情况下，默认 HikariCP 连接池大小是 10，当前请求量大起来之后，如果数据库执行的不够快，那么请求都会被阻塞等待获取连接池的连接上。

比如鱼皮自己业务中出现的情况，获取数据库连接等待时间花了 17.43s，这就是典型的数据库连接不够用。如果项目的数据库连接池较小，此时应该调大数据库连接池的大小：

![img](./assets/202409091445591.png)

如何进行数据库连接池调优呢？肯定不是凭感觉猜测，而是要通过监控或测试进行分析。

所以本项目会带大家使用 Druid 来做数据库连接池，因为它提供了丰富的监控和管理功能，更适合学习上手数据库连接池调优。

##### 引入 Druid 连接池

可以参考 [官方文档](https://github.com/alibaba/druid/wiki) 引入（虽然也没什么好参考的）。

1）通过 Maven 引入 Druid，并且排除默认引入的 HikariCP：

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.23</version>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
    <exclusions>
        <!-- 排除默认的 HikariCP -->
        <exclusion>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

2）修改 application.yml 文件配置。

由于参数较多，建议直接拷贝以下配置即可，部分参数可以根据注释自行调整：

```yaml
spring:
  # 数据源配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mianshiya
    username: root
    password: 123456
    # 指定数据源类型
    type: com.alibaba.druid.pool.DruidDataSource
    # Druid 配置
    druid:
      # 配置初始化大小、最小、最大
      initial-size: 10
      minIdle: 10
      max-active: 10
      # 配置获取连接等待超时的时间(单位：毫秒)
      max-wait: 60000
      # 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
      time-between-eviction-runs-millis: 2000
      # 配置一个连接在池中最小生存的时间，单位是毫秒
      min-evictable-idle-time-millis: 600000
      max-evictable-idle-time-millis: 900000
      # 用来测试连接是否可用的SQL语句,默认值每种数据库都不相同,这是mysql
      validationQuery: select 1
      # 应用向连接池申请连接，并且testOnBorrow为false时，连接池将会判断连接是否处于空闲状态，如果是，则验证这条连接是否可用
      testWhileIdle: true
      # 如果为true，默认是false，应用向连接池申请连接时，连接池会判断这条连接是否是可用的
      testOnBorrow: false
      # 如果为true（默认false），当应用使用完连接，连接池回收连接的时候会判断该连接是否还可用
      testOnReturn: false
      # 是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle
      poolPreparedStatements: true
      # 要启用PSCache，必须配置大于0，当大于0时， poolPreparedStatements自动触发修改为true，
      # 在Druid中，不会存在Oracle下PSCache占用内存过多的问题，
      # 可以把这个数值配置大一些，比如说100
      maxOpenPreparedStatements: 20
      # 连接池中的minIdle数量以内的连接，空闲时间超过minEvictableIdleTimeMillis，则会执行keepAlive操作
      keepAlive: true
      # Spring 监控，利用aop 对指定接口的执行时间，jdbc数进行记录
      aop-patterns: "com.springboot.template.dao.*"
      ########### 启用内置过滤器（第一个 stat 必须，否则监控不到SQL）##########
      filters: stat,wall,log4j2
      # 自己配置监控统计拦截的filter
      filter:
        # 开启druiddatasource的状态监控
        stat:
          enabled: true
          db-type: mysql
          # 开启慢sql监控，超过2s 就认为是慢sql，记录到日志中
          log-slow-sql: true
          slow-sql-millis: 2000
        # 日志监控，使用slf4j 进行日志输出
        slf4j:
          enabled: true
          statement-log-error-enabled: true
          statement-create-after-log-enabled: false
          statement-close-after-log-enabled: false
          result-set-open-after-log-enabled: false
          result-set-close-after-log-enabled: false
      ########## 配置WebStatFilter，用于采集web关联监控的数据 ##########
      web-stat-filter:
        enabled: true                   # 启动 StatFilter
        url-pattern: /* # 过滤所有url
        exclusions: "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*" # 排除一些不必要的url
        session-stat-enable: true       # 开启session统计功能
        session-stat-max-count: 1000 # session的最大个数,默认100
      ########## 配置StatViewServlet（监控页面），用于展示Druid的统计信息 ##########
      stat-view-servlet:
        enabled: true                   # 启用StatViewServlet
        url-pattern: /druid/* # 访问内置监控页面的路径，内置监控页面的首页是/druid/index.html
        reset-enable: false              # 不允许清空统计数据,重新计算
        login-username: root # 配置监控页面访问密码
        login-password: 123
        allow: 127.0.0.1 # 允许访问的地址，如果allow没有配置或者为空，则允许所有访问
        deny: # 拒绝访问的地址，deny优先于allow，如果在deny列表中，就算在allow列表中，也会被拒绝
```

3）启动后访问监控面板：http://localhost:8101/api/druid/index.html

输入上述配置中的用户名和密码登录：

![img](./assets/202409091445624.png)

💡扩展知识：想去除底部广告，可以在项目中添加下面的代码：

```java
import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceAutoConfigure;
import com.alibaba.druid.spring.boot.autoconfigure.properties.DruidStatProperties;
import com.alibaba.druid.util.Utils;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import java.io.IOException;

@Configuration
@ConditionalOnWebApplication
@AutoConfigureAfter(DruidDataSourceAutoConfigure.class)
@ConditionalOnProperty(name = "spring.datasource.druid.stat-view-servlet.enabled",
        havingValue = "true", matchIfMissing = true)
public class RemoveDruidAdConfig {

    /**
     * 方法名: removeDruidAdFilterRegistrationBean
     * 方法描述 除去页面底部的广告
     * @param properties com.alibaba.druid.spring.boot.autoconfigure.properties.DruidStatProperties
     * @return org.springframework.boot.web.servlet.FilterRegistrationBean
     */
    @Bean
    public FilterRegistrationBean removeDruidAdFilterRegistrationBean(DruidStatProperties properties) {

        // 获取web监控页面的参数
        DruidStatProperties.StatViewServlet config = properties.getStatViewServlet();
        // 提取common.js的配置路径
        String pattern = config.getUrlPattern() != null ? config.getUrlPattern() : "/druid/*";
        String commonJsPattern = pattern.replaceAll("\\*", "js/common.js");

        final String filePath = "support/http/resources/js/common.js";

        //创建filter进行过滤
        Filter filter = new Filter() {
            @Override
            public void init(FilterConfig filterConfig) throws ServletException {}

            @Override
            public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
                chain.doFilter(request, response);
                // 重置缓冲区，响应头不会被重置
                response.resetBuffer();
                // 获取common.js
                String text = Utils.readFromResource(filePath);
                // 正则替换banner, 除去底部的广告信息
                text = text.replaceAll("<a.*?banner\"></a><br/>", "");
                text = text.replaceAll("powered.*?shrek.wang</a>", "");
                response.getWriter().write(text);
            }

            @Override
            public void destroy() {}
        };

        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns(commonJsPattern);
        return registrationBean;
    }
}
```

##### 使用 Druid 监控

下面我们测试一下因为数据库连接池不足导致的性能问题，并借此带大家熟悉 Druid 监控的使用。

1）将配置中的连接池大小改为 1，且获取连接等待时间超时为 2s：

```yaml
druid:
  # 配置初始化大小、最小、最大
  initial-size: 1
  minIdle: 1
  max-active: 1
  # 配置获取连接等待超时的时间(单位：毫秒)
  max-wait: 2000
```

然后任意执行一次对数据库的批量操作，比如插入 20 条数据，每批 2 条，一共 10 批，会随机报错：

![img](./assets/202409091445673.png)

查看 Druid 监控，可以看到最大并发为 1，因为连接池的连接数量只有 1：

![img](./assets/202409091445703.png)

除了 SQL 的监控，还有 URI 的监控，可以看到是哪个接口调用了数据库，执行了多少时间。以后出现线上数据库卡死的问题时，很快就能定位到是哪个接口、哪个 SQL 出现了问题（或者访问频率过高）。

![img](./assets/202409091445000.png)

💡 Druid 的 URI 监控是怎么实现的？

核心实现方法如下：

1. 通过基于 Servlet 的过滤器 `WebStatFilter` 来拦截请求，该过滤器会收集关于请求的相关信息，比如请求的 URI、执行时长、请求期间执行的 SQL 语句数等。
2. 统计 URI 和 SQL 执行情况是怎么关联起来的呢？ 每次执行 SQL 时，Druid 会在内部统计该 SQL 的执行情况，而 `WebStatFilter` 会把 SQL 执行信息与当前的 HTTP 请求 URI 关联起来。

2）将配置中的连接池大小改为 10，且获取连接等待时间超时为 2s：

```yaml
druid:
  # 配置初始化大小、最小、最大
  initial-size: 10
  minIdle: 10
  max-active: 10
  # 配置获取连接等待超时的时间(单位：毫秒)
  max-wait: 2000
```

可以看到，SQL 的并发直接变成了 10：

![img](./assets/202409091445139.png)

URI 接口调用的耗时，直接缩小的 10 倍，符合我们提升了 10 倍并发的优化情况：

![img](./assets/202409091445515.png)

有的时候，即使我们服务器 JVM 的内存和 CPU 占用都非常低，其他的中间件比如 MySQL 和 Redis 的占用也非常低，但系统依然会出现响应慢、卡死的情况。这可能就是因为一些配置错误，所以了解这些知识还是非常有必要的。

### **数据一致性**

#### 1、事务管理

我们目前已经使用了 `@Transactional(rollbackFor = Exception.class)` 来保证数据一致性。如果任意一步操作失败，整个事务会回滚，确保数据一致性。

#### 2、并发管理

在高并发场景下，如果多个管理员同时向同一个题库添加题目，可能会导致冲突或性能问题。为了解决并发问题，确保数据一致性和稳定性，可以有 2 种常见的策略：

1）增加 **分布式锁** 来防止同一个接口（或方法）在同一时间被多个管理员同时操作，比如使用 Redis + Redisson 实现分布式锁。

2）如果要精细地对某个数据进行并发控制，可以选用 **乐观锁**。比如通过给 `QuestionBank` 表增加一个 `version` 字段，在更新时检查版本号是否一致，确保对同一个题库的并发操作不会相互干扰。

伪代码示例：

```java
// 更新题库前，先查询版本号
QuestionBank questionBank = questionBankService.getById(questionBankId);
Long currentVersion = questionBank.getVersion();

// 更新时，检查版本号是否一致
int rowsAffected = questionBankService.updateVersionById(questionBankId, currentVersion);
if (rowsAffected == 0) {
    throw new BusinessException(ErrorCode.CONCURRENT_MODIFICATION, "数据已被其他用户修改");
}
```

💡 在 MySQL 中，还可以采用 `SELECT ... FOR UPDATE` 来强行锁定某一行数据，直到当前事务提交或回滚之前，防止其他事务对这行数据进行修改。

本项目中，由于关联表有唯一键约束，保证不会重复，所以不需要用这种方案。

### 可观测性

可观测性的关键在于以下三个方面：

1. 可见性：系统需要能够报告它的内部状态。这个优化方案通过返回 `BatchAddResult` 提供了丰富的状态反馈。
2. 追踪性：通过详细的错误原因和具体失败项，可以轻松地追踪问题源头。
3. 诊断性：明确的反馈信息有助于快速诊断问题，而不仅仅是提供一个简单的 "成功" 或 "失败"。

#### 1、日志记录

在高并发场景下，批量操作可能会出现一些难以预料的问题，建议多记录操作日志：包括成功、失败的题目，便于排查问题。

比如：

```java
log.error("数据库唯一键冲突或违反其他完整性约束, 错误信息: {}", e.getMessage());
```

#### 2、监控

监控是实现可观测性的主流手段，你可以对服务器、JVM、请求、以及项目中引入的各种组件进行监控。

常用的监控工具有 Grafana，如果你给项目引入了某个技术组件，一般都会自带监控，比如项目调用数据库的情况可以通过 Druid 监控、Elasticsearch 可以通过 Kibana 监控等等、Spring Boot 内置了 Spring Boot Actuator 来监控应用运行状态等。

💡 如果你使用的是第三方云服务，比如 XX 云的云数据库，一般都会自带成熟的监控面板，有时间建议大家多去逛逛云服务平台，能看到很多业界成熟的监控方案。

#### 3、返回值优化

目前我们的方法返回的是 `void`，这意味着在执行过程中没有明确反馈操作的结果。为了提升可观测性，我们可以根据任务的执行状态返回更加详细的结果，帮助调用者了解任务的执行情况。

可以定义一个返回结果对象，包含每个题目的处理状态、成功和失败的数量，以及失败的原因。

```java
public class BatchAddResult {
    private int total;
    private int successCount;
    private int failureCount;
    private List<String> failureReasons;
}
```

在批量操作中出现问题时，可以不抛出异常并中断其他的操作，只是记录部分失败的操作情况。这样一来，管理员可以知道哪些题目操作成功、哪些失败，更好地进行后续处理。

以下为示例代码：

```java
public BatchAddResult batchAddQuestionsToBank(List<Long> questionIdList, Long questionBankId, User loginUser) {
    BatchAddResult result = new BatchAddResult();
    result.setTotal(questionIdList.size());

    // 执行批量插入逻辑
    for (Long questionId : questionIdList) {
        try {
            // 插入操作
            saveQuestionToBank(questionId, questionBankId, loginUser);
            result.setSuccessCount(result.getSuccessCount() + 1);
        } catch (Exception e) {
            result.setFailureCount(result.getFailureCount() + 1);
            result.getFailureReasons().add("题目ID " + questionId + " 插入失败：" + e.getMessage());
        }
    }

    return result; // 返回批量处理的结果
}
```

------

OK，学到了这么多优化方法，大家可以自己根据情况选用。

## 扩展

1）按照上述优化方法，自主完善管理员批处理操作接口。

2）可以通过 Apache JMeter 压测一下使用并发编程后的性能提升效果。

## 三、自动缓存热门题库

### 需求分析

对于线上项目，用户的访问量日益增长，对系统性能和稳定性的要求也越来越高。

对于我们的面试刷题平台，为了减少用户加载网页和题目的时间，可以对经常访问的数据（比如首页数据和题目）进行缓存，而不是每次都从数据库进行查询。

常用的缓存就是分布式缓存 Redis 和本地缓存 Caffeine（适用于 Java 项目），由于它们将数据存储在内存中，读写效率都比数据库更高，能够让系统支持更大的并发，并且减小数据库的压力。

相信很多同学之前学过 Redis 缓存，[编程导航的伙伴匹配系统](https://www.code-nav.cn/course) 等项目中有过讲解。

但是，怎么知道哪些数据该缓存呢？

对于我们的面试刷题平台，鱼皮推广的时候可能会重点宣传某一个题库或题目，大家可以直接点链接进入特定的内容，这个内容就会成为 **热点数据** 。我们如果能够预判到热点数据，可以提前人工给数据加缓存，也就是 **缓存预热** 。

但是有些时候，我们无法预料到哪些数据是热点。如果某个数据没来得及缓存，突然被大量访问，系统不就故障了么？

这里我们就要引出一个新的概念：热点问题。

很多企业级项目都会有热点问题，例如微博，一个明星出了某些花边新闻，那么这条微博就会成为热点，此时系统需要 **自动发现** 这个热点，将其做多级缓存来顶住大流量访问的压力。

面试刷题平台场景也有热点问题，例如默认面试题都是从数据库访问，如果一道面试题访问的频率特别高（可能是被其他人推广、也可能是被攻击了），此时可以将其自动缓存在本地或者 Redis 中，提高访问性能的同时，降低数据库的压力，也减轻后端服务的压力。

为什么需要 **自动发现** 热点？

因为热点的瞬时流量大，需要及时发现与缓存。如果靠人为来手动设置，可能刚打开后台页面，系统就已经崩溃了，一般要求秒级发现热点且自动缓存。

------

那么回归到本项目的需求，我们希望自动为频繁访问的题库增加缓存。

具体的规则是：对于获取题库详情的请求，如果 5 秒内访问 >= 10 次，就要使用本地缓存将题库详情缓存 10 分钟，之后都从本地缓存读取。

### 方案设计

自动缓存热门题库需要以下五个步骤：

1、记录访问：用户每访问一次题库，统计次数 +1

2、访问统计：统计一段时间内题库的访问次数。**这是最难实现的一部分。**

3、阈值判断：访问频率超过一定的阈值，变为热点数据。

4、缓存数据：缓存热点数据

5、获取数据：后续访问时，从缓存中获取数据

当然，还有很多注意事项，比如热点数据如何更新？如何恢复为正常数据等等。

让你自己实现的话，你能搞定么？

反正我是不太行，或者说完全没必要自己实现。本期我们不自己重复造轮子，而是基于一个企业级热点 key 探测框架 `京东 hotkey` 来实现自动缓存热门题库。

### hotkey 入门

京东提供了一个轻量级通用的热 key 探测中间件 [hotkey](https://gitee.com/jd-platform-opensource/hotkey)。

根据官方仓库描述：hotkey 是京东APP后台热数据探测框架，历经多次高压压测和京东 618、双 11 大促考验。

在上线运行的这段时间内，**每天探测的 key 数量数十亿计**，精准捕获了大量爬虫、刷子用户，另准确探测大量热门商品并毫秒级推送到各个服务端内存，大幅降低了热数据对数据层的查询压力，提升了应用性能。**在大促期间，hotkey 的 worker 集群秒级吞吐量达到 1500 万级别。**

根据官方压测：一台 8 核 8G 的机器，每秒可以处理来自于数千台服务器发来的高达 16 万个的待测 key，8 核单机吞吐量在 16 万，16 核机器每秒可达 30 万以上探测量，所以仅采用 10 台机器，即可完成每秒近 300 万次的 key 探测任务。

这是一个真正经历过实战的高性能热点 key 探测框架，整体架构如下：

![img](./assets/202409091445533.png)

#### 核心组件

它的主要核心组件如下：

1）Etcd 集群

Etcd 作为一个高性能的配置中心，可以以极小的资源占用，提供高效的监听订阅服务。主要用于存放规则配置，各 worker 的 ip 地址，以及探测出的热 key、手工添加的热 key 等。

Etcd 常用于配置中心和注册中心，鱼皮在 [编程导航的手写 RPC 项目](https://www.code-nav.cn/course/1768543954720022530) 中讲解过。

2）client 端 jar 包

就是在服务中添加的引用 jar，引入后，就可以便捷地去判断某 key 是否热 key。同时，该 jar 完成了 key 上报、监听 Etcd 里的 rule 变化、worker 信息变化、热 key 变化，对热 key 进行本地 Caffeine 缓存等。

3）worker 端集群

worker 端是一个独立部署的 Java 程序，启动后会连接 Etcd，并定期上报自己的 ip 信息，供 client 端获取地址并进行长连接。之后，主要就是对各个 client 发来的待测 key 进行 **累加计算**，当达到 Etcd 里设定的 rule 阈值后，将热 key 推送到各个 client。

4）dashboard 控制台

控制台是一个带可视化界面的 Java 程序，也是连接到 Etcd，之后在控制台设置各个 APP 的 key 规则，譬如 2 秒出现 20 次算热 key。然后当 worker 探测出来热 key 后，会将 key 发往 etcd，dashboard 也会监听热 key 信息，进行入库保存记录。同时，dashboard 也可以手工添加、删除热 key，供各个 client 端监听。

更详细的内容，可见京东技术团队 [官方的文章](https://mp.weixin.qq.com/s/xOzEj5HtCeh_ezHDPHw6Jw)，最具可信度。

### 后端开发（hotkey 实战）

hotkey 搭建可以直接参考 [官方的安装教程](https://gitee.com/jd-platform-opensource/hotkey#安装教程)。

#### 1、安装 Etcd

直接从[ github](https://github.com/etcd-io/etcd/releases) 上下载最新版本的 Etcd 即可，选择对应的操作系统版本：

![img](./assets/202409091445564.png)

或直接通过本教程提供的软件包下载：https://pan.baidu.com/s/1u73-Nlolrs8Rzb1_b6X6HA

提取码：c2sd

下载后解压压缩包，会得到 3 个脚本：

- etcd：etcd 服务本身
- etcdctl：客户端，用于操作 etcd，比如读写数据
- etcdutl：备份恢复工具

![img](./assets/202409091445614.png)

执行 etcd 脚本后，可以启动 etcd 服务，服务默认占用 2379 和 2380 端口，作用分别如下：

- 2379：提供 HTTP API 服务，和 etcdctl 交互
- 2380：集群中节点间通讯

![img](./assets/202409091445687.png)

#### 2、安装 hotkey worker

从 [hotkey 官方仓库](https://gitee.com/jd-platform-opensource/hotkey) 下载源码，注意，本教程使用的是 hotkey v0.0.4 版本，**JDK 的版本必须小于 17！否则会报找不到类的错误！**

项目导入 IDEA 后，打开 worker 模块。worker 是一个 Spring Boot 项目，启动前需要先修改 applicaiton.yml 中的配置。比如端口配置（本教程使用 8111）：

![img](./assets/202409091445987.png)

修改完配置后，直接点击 WorkerApplication 启动即可。

如下图，此时 worker 就已经正常启动，并且连接上 Etcd 了：

![img](./assets/202409091445352.png)

后续如果要打包部署，可以通过 Maven 打包得到 worker 的 jar 包，比如在整个 hotkey 项目根目录执行 mvn package，会依次对各模块打包。

![img](./assets/202409091445683.png)

也可以直接下载已经打包好的 jar，本教程为大家提供了软件包：https://pan.baidu.com/s/1u73-Nlolrs8Rzb1_b6X6HA ，提取码：c2sd

然后可以通过命令启动 worker，可以携带参数来修改配置：

```shell
java -jar worker-0.0.4-SNAPSHOT.jar --etcd.server=127.0.0.1:2379
```

#### 3、启动 hotkey 控制台

接着打开 dashboard 项目，执行 resource 目录下的 db.sql 文件，创建 dashboard 所需的库表。hotkey 依赖 MySQL 来存储用户账号信息、热点阈值规则等。

在执行脚本前，记得先配置好 MySQL 连接，并且在 SQL 脚本文件中创建和指定数据库：

```sql
create database hotkey_db;
use hotkey_db;
```

执行脚本过程如图：

![img](./assets/202409091445191.png)

从 db.sql 中可以看到内置了 admin 账号， 密码为 123456

![img](./assets/202409091445499.png)

然后修改下 application.yml 配置文件，包括 dashboard 占用端口号（本教程使用 8121）、数据库配置和 etcdServer 地址等：

```yaml
server:
  port: 8121
spring:
  datasource:
    username: ${MYSQL_USER:root}
    password: ${MYSQL_PASS:123456}
    url: jdbc:mysql://${MYSQL_HOST:localhost}:3306/hotkey_db?useUnicode=true&characterEncoding=utf-8&useSSL=true&serverTimezone=UTC&useTimezone=true&serverTimezone=GMT
    driver-class-name: com.mysql.cj.jdbc.Driver
etcd:
  server: ${etcdServer:http://127.0.0.1:2379}
```

dashboard 也是一个 SpringBoot 项目，直接在 IDEA 内执行 DashboardApplication 启动即可。

访问 [http://127.0.0.1:8121，即可看到界面：](http://127.0.0.1:8121，即可看到界面：/)

![img](./assets/202409091445542.png)

输入管理员的账号密码（admin，123456）后，即可成功登录：

![img](./assets/202409091445580.png)

初次使用时需要先添加 APP。建议先在用户管理菜单中，添加一个新用户，设置昵称为 APP 名称、并填写所属 APP，如 mianshiya，密码此处就设置为 123456。之后就可以登录这个新建的用户来给应用设置规则了 (当然也可以使用 admin 账户添加)，而且系统会自动创建一个 APP。

![img](./assets/202409091445601.png)

随后，在规则配置中，选择对应的 APP，新增对应的热点探测规则：

![img](./assets/202409091445631.png)

如下图就是一组规则：

![img](./assets/202409091446034.png)

我们解析下其中的第二条 rule： as__ 开头的热 key 的规则就是 interval-2 秒内出现了 threshold-10 次就认为它是热 key，它就会被推送到 jvm 内存中，并缓存 60 秒，prefix-true 代表前缀匹配。那么在应用中，就可以把一组 key，都用 as__ 开头，用来探测。

#### 4、引入 hotkey client

有 2 种引入 hotkey client 的方式：

1. 手动源码打包
2. 通过 [Maven 远程仓库](https://mvnrepository.com/artifact/io.github.ck-jesse/jd-hotkey-client) 引入

由于 Maven 远程仓库的包引用量过少，而且不具备官方权威性，所以更推荐通过 hotkey 源码手动打包。（经过鱼皮踩坑测试，果然引入远程仓库的包后出现了客户端和 worker 之间心跳失败的问题）

所以选择方式 1，手动将 hotkey 源码中的 client 模块通过 Maven 打成 jar 包：

![img](./assets/202409091446142.png)

从生成的 target 中找到 `with-dependencies` 的 jar 包，可以修改名称为 `hotkey-client-0.0.4-SNAPSHOT.jar`：

![img](./assets/202409091446188.png)

也可以直接下载已经打包好的 jar，本教程为大家提供了软件包：https://pan.baidu.com/s/1u73-Nlolrs8Rzb1_b6X6HA ，提取码：c2sd

接着在要引入 hotkey client 的项目中创建 lib 文件夹，放入 client 的 jar 包。注意要把该 jar 包添加到 Git 仓库中，否则其他人无法正常运行你的项目。

![img](./assets/202409091446238.png)

然后通过 Maven 引入即可：

```xml
<dependency>
  <artifactId>hotkey-client</artifactId>
  <groupId>com.jd.platform.hotkey</groupId>
  <version>0.0.4-SNAPSHOT</version>
  <scope>system</scope>
  <systemPath>${project.basedir}/lib/hotkey-client-0.0.4-SNAPSHOT.jar</systemPath>
</dependency>
```

但是在本项目中引入该依赖后，项目无法运行，因为 Hutool 依赖库版本冲突了。

💡 注意，使用 `system` 作用域并不是最佳实践，原因是 `system` 作用域的依赖具有 **最高优先级**。它会跳过 Maven 的依赖解析机制，直接使用你指定的本地 JAR 文件，因此它的优先级会高于其他任何来自依赖树中的传递依赖或外层依赖声明。

具体来说：

1. 跳过依赖管理：`system` 作用域会跳过 Maven 的依赖管理和版本解析。你必须手动管理依赖版本和路径，Maven 无法帮你解析冲突、升级版本或使用传递依赖。
2. 无法排除依赖：由于 `system` 作用域是强制性的，任何试图通过 `exclusions` 排除这个依赖的尝试都会失败。其他模块或依赖项中的冲突问题也无法通过正常的 `dependencyManagement` 或 `exclusions` 机制来解决。
3. 不可传递：`system` 作用域的依赖不会传递给其他模块。也就是说，如果你的项目被其他项目依赖，`system` 作用域的依赖不会自动传递给依赖你的项目。这可能导致构建或运行时的依赖问题。
4. 路径硬编码：`system` 作用域的依赖路径是硬编码的，并且指定为本地文件系统的绝对路径或相对路径。这使得项目在不同开发环境中变得难以移植，也不符合 Maven 的通用依赖管理原则。

所以一般建议将依赖包通过 Maven 安装（install）到本地仓库，或者上传包到 Maven 官方库，或者在团队内部使用 Maven 私服来管理依赖。

但这里我们不这么做，考虑到教程项目，要让开发者更容易地使用项目。所以还是直接拷贝 jar，开发者就不用自己 mvn install 来安装包了，否则还可能出现报错。

其实还有更粗暴的方法，直接爆改源码中使用的 hutool 版本，但是一般不建议这么做，毕竟你不了解别人的项目，还是该自己的方便一些。

所以我们的做法是，降低项目的 hutool 版本，改动点也不多，所以还好。

比如：

```java
if (StrUtil.isNotBlank(tagsStr)) {
    questionEsDTO.setTags(JSONUtil.toList(JSONUtil.parseArray(tagsStr), String.class));
}
String fileSuffix = FileNameUtil.getSuffix(multipartFile.getOriginalFilename());
```

引入依赖后，在代码中编写初始化 client 的配置类，会读取配置文件并执行初始化逻辑：

```java
@Configuration
@ConfigurationProperties(prefix = "hotkey")
@Data
public class HotKeyConfig {

    /**
     * Etcd 服务器完整地址
     */
    private String etcdServer = "http://127.0.0.1:2379";

    /**
     * 应用名称
     */
    private String appName = "app";

    /**
     * 本地缓存最大数量
     */
    private int caffeineSize = 10000;

    /**
     * 批量推送 key 的间隔时间
     */
    private long pushPeriod = 1000L;

    /**
     * 初始化 hotkey
     */
    @Bean
    public void initHotkey() {
        ClientStarter.Builder builder = new ClientStarter.Builder();
        ClientStarter starter = builder.setAppName(appName)
                .setCaffeineSize(caffeineSize)
                .setPushPeriod(pushPeriod)
                .setEtcdServer(etcdServer)
                .build();
        starter.startPipeline();
    }
}
```

💡 如何在 Spring Boot 启动时执行初始化代码？可以参考这道面试题：https://www.mianshiya.com/question/1800329866123747329

更改 application.yml 配置，注意应用名称必须和控制台创建的一致：

```yaml
# 热 key 探测
hotkey:
  app-name: mianshiya
  caffeine-size: 10000
  push-period: 1000
  etcd-server: http://localhost:2379
```

启动，能够看到 1 个客户端连接：

![img](./assets/202409091446254.png)

这样在项目中就能正常使用了。

#### 5、了解开发模式

只要使用 JdHotKeyStore 这个类即可非常方便地判断 key 是否成为热点和获取热点 key 对应的本地缓存。

这个类主要有如下 4 个方法可供使用：

```java
boolean JdHotKeyStore.isHotKey(String key)
Object JdHotKeyStore.get(String key)
void JdHotKeyStore.smartSet(String key, Object value)
Object JdHotKeyStore.getValue(String key)
```

1）boolean isHotKey(String key)

该方法会返回该 key 是否是热 key，如果是返回 true，如果不是返回 false，并且会将 key 上报到探测集群进行数量计算。该方法通常用于判断只需要判断 key 是否热、不需要缓存 value 的场景，如刷子用户、接口访问频率等。

2）Object get(String key)

该方法返回该 key 本地缓存的 value 值，可用于判断是热 key 后，再去获取本地缓存的 value 值，通常用于 redis 热 key 缓存。

3）void smartSet(String key, Object value)

方法给热 key 赋值 value，如果是热 key，该方法才会赋值，非热 key，什么也不做

4）Object getValue(String key)

该方法是一个整合方法，相当于 isHotKey 和 get 两个方法的整合，该方法直接返回本地缓存的 value。 如果是热 key，则存在两种情况

1. 是返回 value
2. 是返回 null

返回 null 是因为尚未给它 set 真正的 value，返回非 null 说明已经调用过 set 方法了，本地缓存 value 有值了。 如果不是热 key，则返回 null，并且将 key 上报到探测集群进行数量探测。

**官方推荐的最佳实践**

1）判断用户是否是刷子：

```java
if (JdHotKeyStore.isHotKey(“pin__” + thePin)) {
    // 进行限流
}
```

2）判断商品 id 是否是热点：

```java
Object skuInfo = JdHotKeyStore.getValue("skuId__" + skuId);
if(skuInfo == null) {
    JdHotKeyStore.smartSet("skuId__" + skuId, theSkuInfo);
} else {
    // 使用缓存好的 value 即可
}
```

个人更推荐这种写法，更加清晰：

```java
if (JdHotKeyStore.isHotKey(key)) {
    //注意是get，不是getValue。getValue会获取并上报，get是纯粹的本地获取
    Object skuInfo = JdHotKeyStore.get("skuId__" + skuId);
    if(skuInfo == null) {
        JdHotKeyStore.smartSet("skuId__" + skuId, theSkuInfo);
    } else {
        //使用缓存好的value即可
    }
}
```

#### 6、配置 hotkey 规则

根据我们的需求，判断 `bank_detail_` 开头的 key，如果 5 秒访问 10 次，就会被推送到 jvm 内存中，将这个热 key 缓存 10 分钟。

对应的规则配置如下：

```json
[
    {
        "duration": 600,
        "key": "bank_detail_",
        "prefix": true,
        "interval": 5,
        "threshold": 10,
        "desc": "热门题库缓存"
    }
]
```

在控制台新增规则：

![img](./assets/202409091446299.png)

#### 7、项目应用 hotkey

获取题库接口 getQuestionBankVOById，先通过 isHotKey 判断当前题目是否是热点题目，如果是，则从数据库获取后放入本地缓存；之后直接从本地缓存获取即可。

```java
@GetMapping("/get/vo")
public BaseResponse<QuestionBankVO> getQuestionBankVOById(QuestionBankQueryRequest questionBankQueryRequest, HttpServletRequest request) {
    ThrowUtils.throwIf(questionBankQueryRequest == null, ErrorCode.PARAMS_ERROR);
    Long id = questionBankQueryRequest.getId();
    ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);

    // 生成 key
    String key = "bank_detail_" + id;
    // 如果是热 key
    if (JdHotKeyStore.isHotKey(key)) {
        // 从本地缓存中获取缓存值
        Object cachedQuestionBankVO = JdHotKeyStore.get(key);
        if (cachedQuestionBankVO != null) {
            // 如果缓存中有值，直接返回缓存的值
            return ResultUtils.success((QuestionBankVO) cachedQuestionBankVO);
        }
    }

    // 原本查询数据的逻辑（查数据库）

    // 设置本地缓存
    JdHotKeyStore.smartSet(key, questionBankVO);
    
    // 获取封装类
    return ResultUtils.success(questionBankVO);
}
```

#### 8、测试验证

不设置规则的话，是不会判断为热 key 的：

![img](./assets/202409091446572.png)

通过接口文档 5 秒内先访问 10 次，能够看到实时热点：

![img](./assets/202409091446597.png) ![img](./assets/202409091446683.png)

debug 程序，第 11 次请求的时候虽然会判断为 hotkey，但还是不会走缓存，本次请求会设置缓存。后续就能查询缓存了。

### 扩展知识

#### 1、如何更新本地缓存

需要有一个入口让缓存失效，进行人工干预。

hotkey 提供了 `JdHotKeyStore.remove()` 方法，可以手动删除本地缓存并移除热点 key。

还可以利用控制台手动删除：

![img](./assets/202409091446363.png)

不过一般情况下，热点信息一般都是不太会变更的数据，过期时间设置短一点即可。

#### 2、是否能够和 redis 分布式缓存结合？

当然可以，热 key 探测 = 热 key 发现 + 本地缓存。可以只利用热 key 的判断方法，不利用热 key 的存储方法即可。

1. 不是热 key，就查数据库。对于热 key，写缓存时，再判断一下是否为热 key，是热 key 才设置 Redis 分布式缓存。后续的热 key 就可以从分布式缓存中获取值。（缓存存储的技术或者位置变了）
2. 利用热 key 探测的本地缓存，将原本查数据库的逻辑改为查 Redis，Redis 查不到才查询数据库，形成多级缓存。（获取原始数据的方法改变了）

#### 3、热 key 会自动续期么？否则可能出现缓存雪崩的问题？

可以先自己测试一下。比如针对某个热点 key 再多次发送请求查询缓存，发现在热 key 生效（缓存生效）期间，如果该 key 仍然被不断访问，并不会刷新缓存时间，直到过期。

然后看下源码，就知道为什么了。源码中的逻辑是，如果已经是热 key 则不会再 push，离过期还有 2 秒内的时候，会再次 push，这样这个 key 可能被继续设置为热 key。

```java
public static boolean isHotKey(String key) {
    try {
        if (!inRule(key)) {
            return false;
        } else {
            boolean isHot = isHot(key);
            if (!isHot) {
                HotKeyPusher.push(key, (KeyType)null);
            } else {
                ValueModel valueModel = getValueSimple(key);
                if (isNearExpire(valueModel)) {
                    HotKeyPusher.push(key, (KeyType)null);
                }
            }

            KeyHandlerFactory.getCounter().collect(new KeyHotModel(key, isHot));
            return isHot;
        }
    } catch (Exception var3) {
        return false;
    }
}

private static boolean isNearExpire(ValueModel valueModel) {
    if (valueModel == null) {
        return true;
    } else {
        return valueModel.getCreateTime() + (long)valueModel.getDuration() - System.currentTimeMillis() <= 2000L;
    }
}
```

也就是说，如果一个 key 持续被访问，很有可能在过期前一直被设置为热点，减少了出现雪崩问题的可能性。

### 扩展

1）热点题目增加自动缓存

思路：跟本教程演示的热点题库完全一致。

2）编写一个注解，自动对该方法进行热 key 探测，并将返回值作为本地缓存

思路：参考 Spring Data Redis 提供的 @Cacheable 注解，可以利用 AOP 扫描注解实现。



# 7 - 流量安全优化

## 本节重点

流量安全性优化

- 网站流量控制和熔断（基于 Sentinel）
- 动态 IP 黑白名单过滤（基于 Nacos）

## 一、网站流量控制和熔断

流量安全优化的目标可以简单概括为：确保数据在传输过程中的机密性、完整性和可用性，防止未经授权的访问、篡改、泄露和攻击，同时提升网络传输效率与性能。

而从流量控制和熔断的角度来看，流量安全优化的目标又可以概括为：防止系统过载、保障服务可用性、抵御恶意流量，并确保系统能够快速从故障中恢复。这也是本期教程中我们追求的目标。

### 核心概念

随着网站的发展，用户量逐渐增大，特别是互联网公司，用户量更是呈指数型增长，此时一旦出现促销活动，网站的流量会大大超越平均水平，在高并发请求下系统很可能会崩溃。

对应到我们的面试刷题平台，在金三银四或金九银十面试高峰期，网站流量会变大，还可能会有各种爬虫和恶意攻击。为了避免系统崩溃和保护服务稳定性，我们需要对网站做一定的防护措施。

常见的防护措施就是 **流量控制**：限制系统进入的请求数量，防止过载。

除此之外，为了进一步隔离和保护系统，防止某些组件异常时影响系统的稳定性，还会采用 **熔断机制 + 降级策略** 进行兜底处理，提升系统的健壮性和可用性。

下面分别对流量控制、熔断和降级进行解释：

#### 1、流量控制

流量控制是为了 **防止系统被过多的请求压垮**，确保资源合理分配并保持服务的可用性，比如对请求数量的限制。

流量控制的 3 个主要优势：

1. 防止过载：当瞬间涌入的请求量超出系统处理能力时，会导致资源枯竭，如 CPU 和内存耗尽。流量控制通过限制系统能处理的请求数，确保不会发生过载。
2. 避免雪崩效应：高负载下某个服务崩溃可能引发其他依赖服务的崩溃，形成连锁反应。流量控制可以有效预防这种连锁故障，避免系统雪崩。
3. 优化用户体验：即便部分请求被拒绝或延迟处理，流量控制也能确保大部分用户的请求能够正常响应，避免全局响应时间过长的情况。

常见的实现流量控制方法有 2 种：

- 限流：通过固定窗口、令牌桶或漏桶等算法限制单位时间内的请求数量。
- 排队：当请求量超出处理能力时，部分请求进入等待队列，防止立即超载。

如果大家使用过一些云服务，会更容易理解流量控制，主要有以下常见的流量控制类型：

1）请求频率限制：限制单位时间内单用户、单 IP 的请求数（如每秒最多 100 次请求）。

![img](./assets/202409131712877.png)

2）带宽限制：控制访问系统时消耗的带宽量或者下载速度。

![img](./assets/202409131712936.png)

3）总流量限制：限制用户或系统整体的数据传输量。

![img](./assets/202409131712954.png)

4）细粒度控制：根据接口、用户等特定维度进行组合限流。比如限制访问特定接口时，每个用户每分钟只能访问 60 次。

#### 2、熔断机制

可以参考：https://sentinelguard.io/zh-cn/docs/circuit-breaking.html

熔断机制的目的是 **避免当下游服务发生异常时，整个系统继续耗费资源重复发起失败请求**，从而防止连锁故障。

这类似于电路中的断路器，当检测到异常情况时，熔断器会自动切断对故障服务的调用，防止问题扩大。

工作机制：

1. 监控服务健康状态：系统会实时监控服务的调用情况，例如请求成功率、响应时间等，判断服务的健康状况。
2. 进入熔断状态：当某个服务的错误率达到设定阈值（如响应时间过长或出错率过高）时，系统会 **激活熔断器**，暂时停止对该服务的调用，避免消耗不必要的资源和让错误进一步扩散。
3. 快速失败：在熔断状态下，系统不会再等待超时，而是直接返回失败响应，减少系统资源占用，并避免因长时间等待导致用户体验的恶化。（也可以降级处理）
4. 熔断恢复机制：熔断并非永久状态。在一段时间后，熔断器会进入 **半开状态**，允许少量请求测试服务的健康情况。如果恢复正常，熔断器将关闭，恢复正常服务调用；如果仍有问题，则继续保持熔断。

熔断流程：

![img](./assets/202409131712997.jpeg)

举个例子，一个支付服务由于高负载频繁超时，此时熔断器会检测到支付服务的健康状况恶化，暂时切断对它的调用，防止前端系统继续发出请求。如果不采取熔断措施，支付服务的异常可能会拖垮整个系统，甚至影响其他依赖的服务模块或系统资源（比如请求连接）。

#### 3、降级机制

降级的目的是在某个服务的响应能力下降、或该服务不可用时，提供简化版的功能或返回默认值作为 **兜底**，保持系统的部分功能可用，确保用户体验的连续性，避免系统频繁报错。

降级可以是手动配置，也可以根据系统负载自动触发。系统可能由于多种原因（如高负载、外部依赖不可用等）触发降级，返回简化的响应或默认值。

降级机制的好处：

1. 优雅地处理故障：在降级状态下，系统不会直接返回错误信息，而是提供一个替代方案。例如，某个数据查询服务不可用时，系统可以返回缓存数据，确保用户看到的是有效信息，而非错误页面。
2. 降低服务压力：降级有助于减轻系统对非核心服务的依赖，确保核心功能的稳定运行。例如，当推荐系统或广告服务出现故障时，降级可以减少对这些服务的调用，保护系统的整体稳定性。

举个例子，在一个电商网站上，如果商品推荐系统由于外部服务故障无法正常运行，可以触发降级机制，显示一组静态的推荐商品列表。这确保用户仍然能够顺利浏览商品页面，而不是直接看到错误信息。

是不是有点 try...catch... 的感觉？但降级这个概念显然比异常处理要更“高大上”一些，不一定是出了异常才降级，响应较慢或者受到其他服务影响可能也会触发降级。

#### 4、熔断和降级的区别

初学者很容易把这两个概念搞混，二者是完全不同的概念，只不过经常结合使用罢了。

熔断不一定要降级，只是切断调用；降级也不一定需要熔断，单次调用失败也可以降级（比如数据库查询失败返回内存的数据）。

具体来说：

- 熔断是当服务健康状况恶化时，通过 **切断调用** 避免系统资源浪费或服务间故障扩散。
- 降级是在系统压力过大或某个服务不可用时，通过 **提供简化的替代方案** ，保持系统的可用性和用户体验。

两者经常结合使用，先触发熔断后再进行降级。

#### 扩展知识 - 有损服务

有损服务指的是在系统资源有限或负载较高的情况下，系统 **有意识地** 舍弃部分非核心服务或数据，来保证系统整体的稳定性和核心功能的可用性。简单来说，就是“丢车保帅”。

举些例子：

- 视频流媒体：在网络带宽不足时，流媒体平台会动态降低视频质量（如从高清降到标清），以避免中断视频播放。这就是典型的“有损”策略，牺牲画质来保证视频的流畅播放。
- 实时数据采集：在高并发环境下，系统可以通过丢弃部分非重要的日志或监控数据，减少数据处理压力，优先保证核心业务流程。

什么时候使用有损服务和降级？

- 有损服务：适用于需要在性能和质量之间做出平衡的场景，特别是 **当系统资源不足** 时，选择牺牲某些服务的质量来保证整体稳定。
- 降级：适用于需要保证系统核心功能在高负载或部分服务不可用的情况下仍能继续提供的场景。降级更多是 **在功能层面进行简化** ，而非直接丢弃数据或服务。

可以这么理解：有损服务更倾向于 **整体视角** 上资源的取舍，降级更倾向于保证 **某个功能** 的可用。

### 需求分析（限流熔断规则）

回归到本项目的具体需求：要对什么资源进行限流熔断？规则是怎么样的？

我们来完成两个有代表性的需求：

1. 对单个接口整体限流
2. 对单个 IP 访问单个接口限流

#### 1、查看题库列表接口限流熔断

资源：listQuestionBankVOByPage 接口

目的：控制对耗时较长的、经常访问的接口的请求频率，防止过多请求导致系统过载。

限流规则：

- 策略：整个接口每秒钟不超过 10 次请求
- 阻塞操作：提示“系统压力过大，请耐心等待”

熔断规则：

- 熔断条件：如果接口异常率超过 10%，或者慢调用（响应时长 > 3 秒）的比例大于 20%，触发 60 秒熔断。
- 熔断操作：直接返回本地数据（缓存或空数据）

#### **2、单 IP 查看题目列表限流熔断**

资源：listQuestionVoByPage 接口

限流规则：

- 策略：每个 IP 地址每分钟允许查看题目列表的次数不能超过 60 次。
- 阻塞操作：提示“访问过于频繁，请稍后再试”

熔断规则：

- 熔断条件：如果接口异常率超过 10%，或者慢调用（响应时长 > 3 秒）的比例大于 20%，触发 60 秒熔断。
- 熔断操作：直接返回本地数据（缓存或空数据）

#### 扩展知识 - 更多规则

以下规则感兴趣的同学可自主实现：

1）题目搜索

限流规则：每个 IP 地址每分钟允许进行的题目搜索次数，例如 100 次。

熔断操作：直接返回本地数据（缓存或空数据）

2）用户注册

限流规则：每个 IP 地址每分钟允许注册的次数，例如 5 次。超过阈值则返回用户注册频繁的错误提示，防止恶意注册。

熔断规则：如果用户注册服务出现异常率高于 5%（例如连续 5 分钟内的失败请求占总请求的比例），则触发熔断，给用户一个友好的错误提示。

3）用户登录

限流规则：每个 IP 地址每分钟允许尝试登录的次数，例如 10 次。对于频繁的失败登录尝试，可以限制登录尝试次数，防止暴力破解攻击。

熔断规则：如果登录服务的失败率超过 10% 或登录尝试次数过多（例如每分钟超过 1000 次），则触发熔断，给用户一个友好的错误提示。

### 实现方案（技术选型）

除了网关层（Nginx 等）实现的限流，在 Java 项目中常用来实现限流熔断相关的技术主要有以下几种：

#### 1、Sentinel

[Sentinel](https://sentinelguard.io/zh-cn/index.html) 是阿里巴巴开源的限流、熔断、降级组件，旨在为分布式系统提供可靠的保护机制。它设计用于解决高并发流量下的稳定性问题，并且支持与 Dubbo、Spring Cloud 等多种框架集成。

它的功能：

- 限流：支持基于 QPS、并发数量等条件的限流，支持滑动窗口、预热、漏桶等算法。
- 熔断降级：支持失败率、慢调用比例等指标触发熔断，并提供自动恢复机制。
- 热点参数限流：可以基于特定的参数进行限流，如限制特定用户 ID 的请求频率。
- 系统负载保护：可以根据系统的实际负载（如 CPU、内存）动态调整流量。
- 丰富的规则配置：通过配置中心或控制台动态调整限流和熔断规则。

优势：功能丰富、提供控制台、更新较频繁、社区活跃、文档清晰，能够快速入门上手。

#### 2、Hystrix

[Hystrix](https://github.com/Netflix/Hystrix) 是 Netflix 开源的一个限流、熔断和降级库。它通过熔断器模式在检测到下游服务失败率过高时中断请求，以防止系统资源耗尽。

它的功能：

- 熔断：当调用失败或响应超时时，触发熔断，停止调用失败的服务。
- 降级：在触发熔断后，调用备用逻辑或默认返回值。
- 隔离：Hystrix 使用线程池或信号量来隔离服务调用，防止单个服务的资源消耗影响全局。
- 熔断恢复：当下游服务恢复时，逐步恢复调用。

还提供了丰富的监控和告警功能，可以通过 Hystrix Dashboard 进行实时监控。

但是 **它目前已经进入维护状态，不再进行新的功能更新**，所以新项目就没必要使用了：

![img](./assets/202409131712009.png)

#### 3、Resilience4j

[Resilience4j](https://github.com/resilience4j/resilience4j) 是一个轻量级的熔断、限流、隔离、重试库，它设计灵感来源于 Netflix 的 Hystrix 框架，专门设计为响应式编程和 Java 8+ 风格下的熔断库。

优点：它很轻量级，没有外部依赖，特别适合响应式编程风格。

缺点：相比 Sentinel，功能相对较少，尤其在限流功能上不够丰富。

#### 4、Guava RateLimiter

RateLimiter 是 [Guava](https://github.com/google/guava) 提供的一个限流工具，基于令牌桶算法实现，主要用于对系统的流量进行控制。

缺点：它仅支持限流，且功能相对单一，不能处理熔断等复杂场景。适合不需要复杂熔断或隔离功能的小型项目，主要用于 **单机系统** 的流量控制。

示例代码如下：

```java
// 每秒允许 2 个请求
RateLimiter rateLimiter = RateLimiter.create(2.0);

for (int i = 0; i < 10; i++) {
    // 阻塞直到可以获取到许可
    rateLimiter.acquire();
    System.out.println("请求 " + i + " 在 " + System.currentTimeMillis() + " 执行");
}
```

#### 5、Redisson RRateLimiter

Redisson 是一个基于 Redis 的 Java 驱动程序，它提供了丰富的分布式工具和数据结构，其中包括分布式锁、计数器、队列、信号量，以及限流（Rate Limiter）等功能。

Redisson 提供了 `RRateLimiter` 接口来支持限流操作。你可以定义时间窗口内允许的最大请求数，超出限制的请求将被阻塞或拒绝。它的限流基于 Redis 的计数器来控制访问频率，确保即使在多台服务器之间，也能有效地限制请求速率。

示例代码如下：

```java
// 初始化Redisson客户端
RedissonClient redisson = Redisson.create(config);

// 获取限流器对象
RRateLimiter rateLimiter = redisson.getRateLimiter("myRateLimiter");

// 初始化限流器，设置速率：每1秒钟最多3个请求
rateLimiter.trySetRate(RRateLimiter.RateType.OVERALL, 3, 1, RRateLimiter.IntervalUnit.SECONDS);

// 请求限流器获取许可
for (int i = 0; i < 10; i++) {
    boolean acquired = rateLimiter.tryAcquire(1);
    System.out.println("Request " + (i + 1) + " is allowed: " + acquired);
}
```

💡[编程导航的智能 BI 项目](https://www.code-nav.cn/course/1790980531403927553) 中，就是通过 Redisson RRateLimiter 实现了限流，感兴趣的同学可以学习。

#### 选型策略

1）从功能全面、生态成熟角度：如果需要全面的熔断、限流、降级、监控功能，同时兼容 Spring Cloud、Spring Boot、Dubbo 等微服务架构，Sentinel 是最佳选择，在我们国内公司中有较广泛应用。

2）从轻量级、响应式编程角度：如果项目采用响应式编程模型，或希望使用轻量级的熔断限流组件，Resilience4j 是非常好的选择。

3）已有 Hystrix 集成的系统：如果现有系统已经集成了 Hystrix，可以继续使用，但需要考虑未来的技术更新，推荐逐渐过渡到 Sentinel。

4）单机限流需求：对于不需要复杂熔断功能的小型应用，Guava RateLimiter 可以快速实现简单的限流。

5）分布式限流需求：对于不需要复杂熔断功能的分布式应用，Redisson 的 RRateLimiter 可以快速实现简单的限流。

**本项目中，我们选择使用 Sentinel**，带大家学习一个功能强大，支持多种限流、熔断策略，支持多种框架集成的网站流量控制和熔断组件。

Sentinel 官方给出的组件对比：

![img](./assets/202409131712023.png)

### Sentinel 入门

https://sentinelguard.io/zh-cn/index.html

#### 1、核心概念

1）资源：表示要保护的业务逻辑或代码块。我们说的资源，可以是任何东西，服务、服务里的方法、甚至是一段代码。

使用 Sentinel 来进行资源保护，主要分为几个步骤:

1. 定义资源
2. 定义规则
3. 检验规则是否生效

**先把可能需要保护的资源定义好，之后再配置规则。**也可以理解为，只要有了资源，我们就可以在任何时候灵活地定义各种流量控制规则。在编码的时候，只需要考虑这个代码是否需要保护，如果需要保护，就将之定义为一个资源。

有多种定义资源的方法，比如编程式和注解式，[参考官方文档](https://sentinelguard.io/zh-cn/docs/basic-api-resource-rule.html) 。

2）规则：Sentinel 使用规则来定义对资源的保护策略。

可以 [参考官方文档](https://sentinelguard.io/zh-cn/docs/basic-api-resource-rule.html) 来了解规则，比如：

- 限流规则：用于控制流量的规则，设置 QPS（每秒查询量）等参数，防止系统过载。
- 熔断规则：用于实现熔断降级的规则，当某个资源的异常比例或响应时间超过阈值时，触发熔断，短时间内不再访问该资源。
- 系统规则：根据系统的整体负载（如 CPU 使用率、内存使用率等）进行保护，适合在系统级别进行流量控制。
- 热点参数规则：用于限制某个方法的某些热点参数的访问频率，避免某些参数导致流量过大。
- 授权规则：用于定义黑白名单的授权规则，控制资源访问的权限。

3）控制台： Sentinel 控制台是一个可视化的管理工具，主要用于监控、管理和配置 Sentinel 的流控规则、熔断规则等。它提供了一个友好的界面，让用户可以轻松地操作。这是 Sentinel 的核心优势，可以提升可观测性，没有 Sentinel 控制台，感觉就失去了使用它的灵魂。

4）客户端：是指集成了 Sentinel 的应用程序，通常是通过引入 Sentinel 的依赖来接入。客户端负责在本地对资源进行监控、限流、熔断，并将 **数据上报** 给控制台。

#### 2、架构设计

[参考官方文档的基本原理](https://sentinelguard.io/zh-cn/docs/basic-implementation.html)，总体架构设计如下：

![img](./assets/202409131712131.png)

Sentinel 将 `ProcessorSlot` 作为 SPI 接口进行扩展，使得 Slot Chain 具备了扩展的能力。您可以自行加入自定义的 slot 并编排 slot 间的顺序，从而可以给 Sentinel 添加自定义的功能。

![img](./assets/202409131712234.png)

对于限流系统，指标的统计依然是实现关键，Sentinel 中使用高性能的环形计数器（滑动窗口）来实现：

![img](./assets/202409131712285.png)

下面我们来安装和使用 Sentinel。

#### 3、Sentinel 入门 Demo

可以 [参考官网编写入门 Demo](https://sentinelguard.io/zh-cn/docs/quick-start.html)，在本地通过 Main 方法运行一个 Sentinel 客户端程序。

运行成功后，可以在当前用户根目录下（~/logs/csp/${appName}-metrics.log.xxx）看到输出：

![img](./assets/202409131712315.png)

#### 4、下载并启动 Sentinel 控制台

可以 [参考官方文档](https://sentinelguard.io/zh-cn/docs/dashboard.html) 进行安装。

1）下载控制台 jar 包并在本地启动，可以访问从 [github](https://github.com/alibaba/Sentinel/releases) 上下载 release的 jar 包。

本教程为大家提供了软件包：https://pan.baidu.com/s/1u73-Nlolrs8Rzb1_b6X6HA ，提取码：c2sd

2）直接在命令行窗口启动 Sentinel 控制台：

注意：启动 Sentinel 控制台需要 JDK 版本为 1.8 及以上版本。

命令：

```java
java -Dserver.port=8131 -jar sentinel-dashboard-1.8.6.jar
```

启动成功：

![img](./assets/202409131712402.png)

本地访问 http://localhost:8131/（你填的端口），即可访问控制台，**默认账号和密码都是 sentinel**

![img](./assets/202409131712701.png)

4）客户端接入控制台

引入 Maven 依赖，用于和 Sentinel 控制台通讯：

```xml
<dependency>
  <groupId>com.alibaba.csp</groupId>
  <artifactId>sentinel-transport-simple-http</artifactId>
  <version>1.8.6</version>
</dependency>
```

程序启动时需要加入 JVM 参数 `-Dcsp.sentinel.dashboard.server=consoleIp:port` 指定控制台地址和端口。若启动多个应用，则需要通过 `-Dcsp.sentinel.api.port=xxxx` 指定客户端监控 API 的端口（默认是 8719）。

Sentinel 非常贴心，提供了很多框架整合的依赖，便于开发，比如 Spring Web 项目支持将所有的接口自动识别为资源：

![img](./assets/202409131712858.png)

可以根据使用的框架引入适配依赖，[参考官方文档](https://sentinelguard.io/zh-cn/docs/open-source-framework-integrations.html)。

此处直接运行 Main 方法来演示效果，JVM 参数为：`-Dcsp.sentinel.dashboard.server=localhost:8131`

![img](./assets/202409131712884.png)

还有更多的配置，比如更改日志目录等，可以看 [官方文档](https://sentinelguard.io/zh-cn/docs/startup-configuration.html) 了解。

**确保客户端有访问量**，Sentinel 会在 **客户端首次调用的时候** 进行初始化，开始向控制台发送心跳包。通过控制台可以查看到实时访问情况：

![img](./assets/202409131712906.png)

查看机器列表和健康情况：

![img](./assets/202409131712922.png)

簇点链路（单机调用链路）页面实时的去拉取指定客户端资源的运行情况。它一共提供两种展示模式：一种用树状结构展示资源的调用链路，另外一种则不区分调用链路展示资源的运行情况。如图：

![img](./assets/202409131713463.png)

#### 5、规则管理和推送

问题：Sentinel 的规则存储在哪里呢？又是如何通过控制台修改规则之后，将规则同步给客户端进行限流熔断的呢？

[官方文档](https://sentinelguard.io/zh-cn/docs/dashboard.html) 有详细地介绍：Sentinel 控制台同时提供简单的规则管理以及推送的功能。规则推送分为 3 种模式，包括 "原始模式"、"Pull 模式" 和 "Push 模式"。

![img](./assets/202409131713501.png)

目前控制台的规则推送也是通过 [规则查询更改 HTTP API](https://github.com/alibaba/Sentinel/wiki/如何使用#查询更改规则) 来更改规则。**这也意味着这些规则仅在内存态生效，应用重启之后，该规则会丢失。**

以上是原始模式。当了解了原始模式之后，官方建议通过 [动态规则](https://sentinelguard.io/zh-cn/docs/dynamic-rule-configuration.html) 并结合各种外部存储来定制自己的规则源。我们推荐通过动态配置源的控制台来进行规则写入和推送，而不是通过 Sentinel 客户端直接写入到动态配置源中。

在生产环境中，官方推荐 push 模式，支持自定义存储规则的配置中心，控制台改变规则后，会 push 到配置中心。

![img](./assets/202409131713519.png)

更多规则管理和推送规则可以阅读：[在生产环境使用 Sentinel](https://github.com/alibaba/Sentinel/wiki/在生产环境中使用-Sentinel)。

![img](./assets/202409131713532.png)

#### 6、整合 Spring Boot

基于 Spring Boot Starter + 注解模式开发 + 原始规则推送模式开发

Spring Boot 项目可以轻松和 Sentinel 集成，直接引入一个 starter，使用 [Spring Cloud Alibaba Sentinel](https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel) 即可。

**在引入整合依赖时，一定要注意版本号！**

建议 [参考官方文档选择版本](https://github.com/alibaba/spring-cloud-alibaba/wiki/版本说明)。由于 Spring Boot 3.0，Spring Boot 2.7~2.4 和 2.4 以下版本之间变化较大，目前企业级客户老项目相关 Spring Boot 版本仍停留在 Spring Boot 2.4 以下，为了同时满足存量用户和新用户不同需求，社区以 Spring Boot 3.0 和 2.4 分别为分界线，同时维护 2022.x、2021.x、2.2.x 三个分支迭代。

![img](./assets/202409131713550.png)

本项目 Spring Boot 用的是 2.7，因此使用 Sentinel Starter 的版本 2021.0.5.0。在项目中引入依赖：

```xml
<!-- https://mvnrepository.com/artifact/com.alibaba.cloud/spring-cloud-starter-alibaba-sentinel -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    <version>2021.0.5.0</version>
</dependency>
```

可以看到，该依赖自动整合了 Sentinel 的 core 包、客户端通讯包、注解开发包、webmvc 适配包、热点参数限流包等：

![img](./assets/202409131713569.png)

整合包支持自动将所有的接口根据 url 路径识别为资源。启动项目后，通过接口文档测试就能看到监控效果：

![img](./assets/202409131713993.png)

![img](./assets/202409131713080.png)

#### 7、开发模式

Sentinel 的开发主要包括定义资源和定义规则。

**1）定义资源**：支持通过代码、引入框架适配、[注解方式](https://sentinelguard.io/zh-cn/docs/annotation-support.html) 定义资源。

通过代码定义资源，更灵活：

```java
Entry entry = null;
// 务必保证finally会被执行
try {
  // 资源名可使用任意有业务语义的字符串
  entry = SphU.entry("自定义资源名");
  // 被保护的业务逻辑
  // do something...
} catch (BlockException e1) {
  // 资源访问阻止，被限流或被降级
  // 进行相应的处理操作
} finally {
  if (entry != null) {
    entry.exit();
  }
}
```

通过注解定义资源，更快捷可读：

```java
public class TestService {

    // 对应的 `handleException` 函数需要位于 `ExceptionUtil` 类中，并且必须为 static 函数.
    @SentinelResource(value = "test", blockHandler = "handleException", blockHandlerClass = {ExceptionUtil.class})
    public void test() {
        System.out.println("Test");
    }

    // 原函数
    @SentinelResource(value = "hello", blockHandler = "exceptionHandler", fallback = "helloFallback")
    public String hello(long s) {
        return String.format("Hello at %d", s);
    }
    
    // Fallback 函数，函数签名与原函数一致或加一个 Throwable 类型的参数.
    public String helloFallback(long s) {
        return String.format("Halooooo %d", s);
    }

    // Block 异常处理函数，参数最后多一个 BlockException，其余与原函数一致.
    public String exceptionHandler(long s, BlockException ex) {
        // Do some log here.
        ex.printStackTrace();
        return "Oops, error occurred at " + s;
    }
}
```

`@SentinelResource` 注解的配置优先于自动识别的配置。这意味着，如果注解中定义了特定的限流或熔断策略，这些策略将覆盖默认的或自动识别的配置。

推荐开发模式：优先使用适配包来自动识别资源，然后能运用注解尽量运用注解，最后再选择主动编码定义资源。

**2）定义规则：**支持通过代码、控制台（推荐）、配置文件来定义规则。

比如通过代码定义一个限流规则，更灵活：

```java
private static void initFlowQpsRule() {
    List<FlowRule> rules = new ArrayList<>();
    FlowRule rule1 = new FlowRule();
    rule1.setResource(resource);
    // Set max qps to 20
    rule1.setCount(20);
    rule1.setGrade(RuleConstant.FLOW_GRADE_QPS);
    rule1.setLimitApp("default");
    rules.add(rule1);
    FlowRuleManager.loadRules(rules);
}
```

通过控制台配置，更高效：

![img](./assets/202409131713120.png)

一般推荐使用控制台来配置规则，但如果希望开发者更快启动和学习项目，可以通过编码定义规则，这样不用搭建控制台、而且每次启动项目都会确保规则被创建。

#### 8、其他特性

除了限流外，Sentinel 还提供了多种规则，都可以通过官方文档来了解。

1. [熔断降级](https://sentinelguard.io/zh-cn/docs/circuit-breaking.html)：用于实现熔断降级的规则，当某个资源的异常比例或响应时间超过阈值时，触发熔断，短时间内不再访问该资源。
2. [系统自适应保护](https://sentinelguard.io/zh-cn/docs/system-adaptive-protection.html)：根据系统的整体负载（如 CPU 使用率、内存使用率等）进行保护，适合在系统级别进行流量控制。
3. [热点参数限流](https://sentinelguard.io/zh-cn/docs/parameter-flow-control.html)：用于限制某个方法的某些热点参数的访问频率，避免某些参数导致流量过大。
4. [来源访问控制](https://sentinelguard.io/zh-cn/docs/origin-authority-control.html)：用于定义黑白名单的授权规则，控制资源访问的权限。

接下来，我们通过本项目的需求实现，带大家实战 Sentinel 开发。

### 后端开发（Sentinel 实战）

#### 1、查看题库列表接口限流熔断

资源：listQuestionBankVOByPage 接口

目的：控制对耗时较长的、经常访问的接口的请求频率，防止过多请求导致系统过载。

限流规则：

- 策略：整个接口每秒钟不超过 10 次请求
- 阻塞操作：提示“系统压力过大，请耐心等待”

熔断规则：

- 熔断条件：如果接口异常率超过 10%，或者慢调用（响应时长 > 3 秒）的比例大于 20%，触发 60 秒熔断。
- 熔断操作：直接返回本地数据（缓存或空数据）

**开发模式：用注解定义资源 + 基于控制台定义规则**

1）定义资源。给需要限流的接口添加 @SentinelResource 注解：

```java
@PostMapping("/list/page/vo")
@SentinelResource(value = "listQuestionBankVOByPage",
        blockHandler = "handleBlockException",
        fallback = "handleFallback")
public BaseResponse<Page<QuestionBankVO>> listQuestionBankVOByPage(
    @RequestBody QuestionBankQueryRequest questionBankQueryRequest,
    HttpServletRequest request) {
}
```

上述代码中，参考 [注解使用官方文档](https://sentinelguard.io/zh-cn/docs/annotation-support.html) 指定了资源名称、阻塞处理器和降级处理器。

启动项目，注意需加入 JVM 参数 `-Dcsp.sentinel.dashboard.server=consoleIp:port` 指定控制台地址和端口。

![img](./assets/202409131713132.png)

启动项目成功并且访问接口后，可以在控制台看到刚定义的资源：

![img](./assets/202409131713164.png)

2）实现限流阻塞和熔断降级方法。注意遵循 [官方文档的方法定义规则](https://sentinelguard.io/zh-cn/docs/annotation-support.html)：

![img](./assets/202409131713182.png)

为了实现方便，尽快验证效果，我们先在接口相同的 Controller 中编写限流阻塞和降级方法：

```java
/**
 * listQuestionBankVOByPage 降级操作：直接返回本地数据
 */
public BaseResponse<Page<QuestionBankVO>> handleFallback(@RequestBody QuestionBankQueryRequest questionBankQueryRequest,
                                                         HttpServletRequest request, Throwable ex) {
    // 可以返回本地数据或空数据
    return ResultUtils.success(null);
}

/**
 * listQuestionBankVOByPage 流控操作
 * 限流：提示“系统压力过大，请耐心等待”
 */
public BaseResponse<Page<QuestionBankVO>> handleBlockException(@RequestBody QuestionBankQueryRequest questionBankQueryRequest,
                                                               HttpServletRequest request, BlockException ex) {
    // 限流操作
    return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "系统压力过大，请耐心等待");
}
```

3）通过控制台定义规则

限流规则：根据需求配置即可

![img](./assets/202409131713648.png)

![img](./assets/202409131713692.png)

熔断规则：新增两条熔断规则，注意设置最小请求数、统计时长

![img](./assets/202409131713708.png)

![img](./assets/202409131713727.png)

4）测试

为便于测试，可以先将限流熔断规则调整到容易触发的值，然后通过接口文档测试调用，查看效果。

连续快速发送多次请求，触发限流，执行了 `blockHandler` 处理器的逻辑：

![img](./assets/202409131713779.png)

注意，只有业务异常（比如请求参数错误、或者数据库操作失败等问题），才会算到熔断条件中，限流熔断本身的异常 BlockException 是不计算的。

测试熔断的时候，可以故意给 sortField 请求参数传一个不存在的字段，触发业务异常。可以尝试下熔断的触发和恢复：

1. 先通过传错业务参数触发异常，导致熔断
2. 等待熔断结束后，再触发一次异常，还会继续熔断
3. 过一段时间，再触发一次正常请求，则熔断解除

测试发现，任何业务异常（不仅仅是被熔断了），都会触发 `fallbackHandler`，该方法可作为一个通用的降级逻辑处理器。

测试发现，如果 `blockHandler` 和 `fallbackHandler` 同时配置，当熔断器打开后，仍然会进入 `blockHandler` 进行处理，因此需要在该方法中处理因为熔断触发的降级逻辑：

```java
/**
 * listQuestionBankVOByPage 流控操作
 * 限流：提示“系统压力过大，请耐心等待”
 * 熔断：执行降级操作
 */
public BaseResponse<Page<QuestionBankVO>> handleBlockException(@RequestBody QuestionBankQueryRequest questionBankQueryRequest,
                                                               HttpServletRequest request, BlockException ex) {
    // 降级操作
    if (ex instanceof DegradeException) {
        return handleFallback(questionBankQueryRequest, request, ex);
    }
    // 限流操作
    return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "系统压力过大，请耐心等待");
}
```

Sentinel 的 `blockHandler` 处理的是`BlockException`，该异常表示系统受到流量控制限制（如限流或熔断），这些不是业务逻辑中的异常，因此 `fallback` 不会处理这些异常。如果不配置 `blockHandler`，才会在熔断时，进入到 `fallbackHandler` 中进行兜底。

![img](./assets/202409131713830.png)

总结一下：

- `blockHandler` 处理 Sentinel 流量控制异常，如 `BlockException`。
- `fallback` 处理业务逻辑中的异常，比如我们自己的 `BusinessException`。

可以根据自己的实际情况配置。

#### **2、单 IP 查看题目列表限流熔断**

资源：listQuestionVoByPage 接口

限流规则：

- 策略：每个 IP 地址每分钟允许查看题目列表的次数不能超过 60 次。
- 阻塞操作：提示“访问过于频繁，请稍后再试”

熔断规则：

- 熔断条件：如果接口异常率超过 10%，或者慢调用（响应时长 > 3 秒）的比例大于 20%，触发 60 秒熔断。
- 熔断操作：直接返回本地数据（缓存或空数据）

由于需要针对每个用户进一步精细化限流，而不是整体接口限流，可以采用 [热点参数限流机制](https://sentinelguard.io/zh-cn/docs/parameter-flow-control.html)，允许根据参数控制限流触发条件。

![img](./assets/202409131713355.png)

对于我们的需求，可以将 IP 地址作为热点参数。

1）定义资源

对于 `@SentinelResource` 注解方式定义的资源，若注解作用的方法上有参数，Sentinel 会将它们作为参数传入 `SphU.entry(res, args)`。比如以下的方法里面 `uid` 和 `type` 会分别作为第一个和第二个参数传入 Sentinel API，从而可以用于热点规则判断：

```java
@SentinelResource("myMethod")
public Result doSomething(String uid, int type) {
  // some logic here...
}
```

由于 Controller 接口参数较杂乱，使用编程式定义资源的方法。

💡 这里建议新写一个接口，不要污染原有接口，等测试稳定后，再进行切换。

代码如下：

```java
// 基于 IP 限流
String remoteAddr = request.getRemoteAddr();
Entry entry = null;
try  {
    entry = SphU.entry("listQuestionVOByPage", EntryType.IN, 1, remoteAddr);
    // 被保护的业务逻辑
    // 查询数据库
    Page<Question> questionPage = questionService.listQuestionByPage(questionQueryRequest);
    // 获取封装类
    return ResultUtils.success(questionService.getQuestionVOPage(questionPage, request));
} catch (BlockException ex) {
    // 资源访问阻止，被限流或被降级
    if (ex instanceof DegradeException) {
        return handleFallback(questionQueryRequest, request, ex);
    }
    // 限流操作
    return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "访问过于频繁，请稍后再试");
} finally {
    if (entry != null) {
        entry.exit(1, remoteAddr);
    }
}
```

💡需要特别注意！

1. 若 entry 的时候传入了热点参数，那么 exit 的时候也一定要带上对应的参数（`exit(count, args)`），否则可能会有统计错误。**这个时候不能使用 try-with-resources 的方式。**
2. `SphU.entry(xxx)` 需要与 `entry.exit()` 方法成对出现，匹配调用，否则会导致调用链记录异常，抛出 `ErrorEntryFreeException` 异常。

注意 Sentinel 的降级仅针对业务异常，对 Sentinel 限流降级本身的异常 `BlockException` 不生效。为了统计异常比例或异常数，需要手动通过 `Tracer.trace(ex)` 记录业务异常。示例：

```java
Entry entry = null;
try {
  entry = SphU.entry(resource);

  // Write your biz code here.
  // <<BIZ CODE>>
} catch (Throwable t) {
  if (!BlockException.isBlockException(t)) {
    Tracer.trace(t);
  }
} finally {
  if (entry != null) {
    entry.exit();
  }
}
```

注意，通过 `Tracer.trace(ex)` 来统计异常信息时，由于 try-with-resources 语法中 catch 调用顺序的问题，会导致无法正确统计异常数，因此统计异常信息时也不能在 try-with-resources 的 catch 块中调用 `Tracer.trace(ex)`。

💡 为什么上一个需求中，我们不用手动调用 Tracer 上报异常呢？因为使用 Sentinel 的开源整合模块，如 Sentinel Dubbo Adapter, Sentinel Web Servlet Filter 或 `@SentinelResource` 注解会自动统计业务异常，无需手动调用。

需要给我们的资源定义增加异常统计代码：

```java
catch (Throwable ex) {
    // 业务异常
    if (!BlockException.isBlockException(ex)) {
        Tracer.trace(ex);
        return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "系统错误");
    }
    // 降级操作
    if (ex instanceof DegradeException) {
        return handleFallback(questionQueryRequest, request, ex);
    }
    // 限流操作
    return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "访问过于频繁，请稍后再试");
}
```

2）编写阻塞和降级操作代码

```java
try {
    entry = SphU.entry("listQuestionVOByPage", EntryType.IN, 1, remoteAddr);
    // 被保护的业务逻辑
    // 查询数据库
    Page<Question> questionPage = questionService.listQuestionByPage(questionQueryRequest);
    // 获取封装类
    return ResultUtils.success(questionService.getQuestionVOPage(questionPage, request));
} catch (Throwable ex) {
    // 业务异常
    if (!BlockException.isBlockException(ex)) {
        Tracer.trace(ex);
        return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "系统错误");
    }
    // 降级操作
    if (ex instanceof DegradeException) {
        return handleFallback(questionQueryRequest, request, ex);
    }
    // 限流操作
    return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "访问过于频繁，请稍后再试");
} finally {
    if (entry != null) {
        entry.exit(1, remoteAddr);
    }
}

/**
 * listQuestionVOByPage 降级操作：直接返回本地数据
 */
public BaseResponse<Page<QuestionVO>> handleFallback(QuestionQueryRequest questionQueryRequest,
                                                         HttpServletRequest request, Throwable ex) {
    // 可以返回本地数据或空数据
    return ResultUtils.success(null);
}
```

3）通过编码方式定义规则。可以新建 `sentinel` 包并定义一个单独的 Manager 作为 Bean，利用 @PostConstruct 注解，在 Bean 加载后创建规则。代码如下：

```java
@Component
public class SentinelRulesManager {

    @PostConstruct
    public void initRules() {
        initFlowRules();
        initDegradeRules();
    }

    // 限流规则
    public void initFlowRules() {
        // 单 IP 查看题目列表限流规则
        ParamFlowRule rule = new ParamFlowRule("listQuestionVOByPage")
                .setParamIdx(0) // 对第 0 个参数限流，即 IP 地址
                .setCount(60) // 每分钟最多 60 次
                .setDurationInSec(60); // 规则的统计周期为 60 秒
        ParamFlowRuleManager.loadRules(Collections.singletonList(rule));
    }

    // 降级规则
    public void initDegradeRules() {
        // 单 IP 查看题目列表熔断规则
        DegradeRule slowCallRule = new DegradeRule("listQuestionVOByPage")
                .setGrade(CircuitBreakerStrategy.SLOW_REQUEST_RATIO.getType())
                .setCount(0.2) // 慢调用比例大于 20%
                .setTimeWindow(60) // 熔断持续时间 60 秒
                .setStatIntervalMs(30 * 1000) // 统计时长 30 秒
                .setMinRequestAmount(10) // 最小请求数
                .setSlowRatioThreshold(3); // 响应时间超过 3 秒

        DegradeRule errorRateRule = new DegradeRule("listQuestionVOByPage")
                .setGrade(CircuitBreakerStrategy.ERROR_RATIO.getType())
                .setCount(0.1) // 异常率大于 10%
                .setTimeWindow(60) // 熔断持续时间 60 秒
                .setStatIntervalMs(30 * 1000) // 统计时长 30 秒
                .setMinRequestAmount(10); // 最小请求数

        // 加载规则
        DegradeRuleManager.loadRules(Arrays.asList(slowCallRule, errorRateRule));
    }
}
```

4）测试

启动项目就能看到规则：

![img](./assets/202409131713487.png)

为了测试方便，可以先将规则的阈值调整小一点，然后通过接口文档验证效果。

限流效果：

![img](./assets/202409131713613.png)

测试降级效果的时候，可以故意将 sortField 传一个不存在的字段。效果如图，触发了 DegradeException：

![img](./assets/202409131713637.png)

### 扩展知识

#### 1、仅对部分 URL 进行统计（性能优化）

参考：[https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel#%E9%85%8D%E7%BD%AE](https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel#配置)‘

可以修改监听的 URL 规则配置：

```xml
spring.cloud.sentinel.filter.url-patterns=/*
```

#### 2、规则配置本地持久化

参考官方文档的配置：https://sentinelguard.io/zh-cn/docs/dynamic-rule-configuration.html

官方提供了 Demo，可以用文件来本地持久化配置，这样重启项目后配置就不会丢失了。

- [读写本地文件 Demo](https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-dynamic-file-rule/src/main/java/com/alibaba/csp/sentinel/demo/file/rule/FileDataSourceInit.java)（先看这个）
- [读本地文件 Demo](https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-dynamic-file-rule/src/main/java/com/alibaba/csp/sentinel/demo/file/rule/FileDataSourceDemo.java)

![img](./assets/202409131713649.png)

示例代码如下，可以在 SentinelManager 的初始化逻辑中调用：

```java
/**
 * 持久化配置为本地文件
 */
public void listenRules() throws Exception {
    // 获取项目根目录
    String rootPath = System.getProperty("user.dir");
    // sentinel 目录路径
    File sentinelDir = new File(rootPath, "sentinel");
    // 目录不存在则创建
    if (!FileUtil.exist(sentinelDir)) {
        FileUtil.mkdir(sentinelDir);
    }
    // 规则文件路径
    String flowRulePath = new File(sentinelDir, "FlowRule.json").getAbsolutePath();
    String degradeRulePath = new File(sentinelDir, "DegradeRule.json").getAbsolutePath();

    // Data source for FlowRule
    ReadableDataSource<String, List<FlowRule>> flowRuleDataSource = new FileRefreshableDataSource<>(flowRulePath, flowRuleListParser);
    // Register to flow rule manager.
    FlowRuleManager.register2Property(flowRuleDataSource.getProperty());
    WritableDataSource<List<FlowRule>> flowWds = new FileWritableDataSource<>(flowRulePath, this::encodeJson);
    // Register to writable data source registry so that rules can be updated to file
    WritableDataSourceRegistry.registerFlowDataSource(flowWds);

    // Data source for DegradeRule
    FileRefreshableDataSource<List<DegradeRule>> degradeRuleDataSource
            = new FileRefreshableDataSource<>(
            degradeRulePath, degradeRuleListParser);
    DegradeRuleManager.register2Property(degradeRuleDataSource.getProperty());
    WritableDataSource<List<DegradeRule>> degradeWds = new FileWritableDataSource<>(degradeRulePath, this::encodeJson);
    // Register to writable data source registry so that rules can be updated to file
    WritableDataSourceRegistry.registerDegradeDataSource(degradeWds);
}

private Converter<String, List<FlowRule>> flowRuleListParser = source -> JSON.parseObject(source,
        new TypeReference<List<FlowRule>>() {
        });
private Converter<String, List<DegradeRule>> degradeRuleListParser = source -> JSON.parseObject(source,
        new TypeReference<List<DegradeRule>>() {
        });

private <T> String encodeJson(T t) {
    return JSON.toJSONString(t);
}
```

然后可以测试读写效果。

#### 3、代码组织结构优化

限流阻塞和降级方法可以单独抽成独立的类，Sentinel 的资源名称也可以单独定义为常量，统一放到 sentinel 包中，更模块化。

常量类：

```java
/**
 * Sentinel 限流熔断常量
 */
public interface SentinelConstant {

    /**
     * 分页获取题库列表接口限流
     */
    String listQuestionBankVOByPage = "listQuestionBankVOByPage";

    /**
     * 分页获取题目列表接口限流
     */
    String listQuestionVOByPage = "listQuestionVOByPage";
}
```

#### 4、封装限流组件为 Spring Boot Starter

为了简化项目的配置和依赖管理，减少限流组件的接入成本，我们通过 Starter 封装限流组件，将多个相关的依赖打包成一个 Maven 依赖，用户只需引入一个依赖即可完成配置，而不需要手动引入每个模块的依赖。

1）创建一个 spring boot 项目

将无用的默认依赖都移除，例如默认的配置文件、启动文件、test 相关等。

2）引入需要的依赖。完整 pom 文件如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.yupi</groupId>
    <artifactId>limit-spring-boot-starter</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>limit-spring-boot-starter</name>
    <description>limit-spring-boot-starter</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-core</artifactId>
            <version>1.8.6</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-transport-simple-http</artifactId>
            <version>1.8.6</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-annotation-aspectj</artifactId>
            <version>1.8.6</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-parameter-flow-control</artifactId>
            <version>1.8.6</version>
        </dependency>
    </dependencies>
</project>
```

3）创建配置文件

```java
@ConfigurationProperties(prefix = "spring")
public class LimitProperties {
    private String sentinelDashboard;
    private List<LimitRule> limitRules;

    public List<LimitRule> getLimitRules() {
        return limitRules;
    }

    public void setLimitRules(List<LimitRule> limitRules) {
        this.limitRules = limitRules;
    }

    public String getSentinelDashboard() {
        return sentinelDashboard;
    }

    public void setSentinelDashboard(String sentinelDashboard) {
        this.sentinelDashboard = sentinelDashboard;
    }

    public static class LimitRule {
        private String resource;
        private int grade;
        private int count;

        public String getResource() {
            return resource;
        }

        public void setResource(String resource) {
            this.resource = resource;
        }

        public int getGrade() {
            return grade;
        }

        public void setGrade(int grade) {
            this.grade = grade;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }
    }

}
```

4）创建自动配置类

```java
@Configuration
@EnableConfigurationProperties(LimitProperties.class)
public class LimitAutoConfiguration {

    @Resource
    private LimitProperties properties;

    @Bean
    @ConditionalOnMissingBean
    public SentinelResourceAspect sentinelResourceAspect() {
        return new SentinelResourceAspect();
    }

    @PostConstruct
    public void initLimit() {
        initDefaultRule();
        initDashboard();
    }


    private void initDefaultRule() {
        List<LimitProperties.LimitRule> limitRules = properties.getLimitRules();
        if (CollectionUtils.isEmpty(limitRules)) {
            return;
        }

        List<FlowRule> rules = new ArrayList<>();
        for (LimitProperties.LimitRule limitRule : limitRules) {
            FlowRule rule = new FlowRule();
            rule.setResource(limitRule.getResource());
            rule.setGrade(limitRule.getGrade());
            rule.setCount(limitRule.getCount());
            rules.add(rule);
        }
        FlowRuleManager.loadRules(rules);
    }

    private void initDashboard() {
        SentinelConfig.setConfig("csp.sentinel.dashboard.server", properties.getSentinelDashboard());
    }
}
```

5）创建 spring.factories 文件。

在 src/main/resources/META-INF 目录下创建 spring.factories 文件，并在其中定义自动配置类。

![img](./assets/202409131713667.png)

文件内容：

```plain
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.yupi.limitspringbootstarter.LimitAutoConfiguration
```

6）本地 install

![img](./assets/202409131713778.png)

这样本地仓库就有了当前的 starter。

7）使用。后端项目引入此 starter：

```xml
  <dependency>
      <artifactId>limit-spring-boot-starter</artifactId>
      <groupId>com.yupi</groupId>
      <version>0.0.1-SNAPSHOT</version>
  </dependency>
```

application.yml 文件中填写对应限流配置：

```yaml
spring:
  # sentinel 控制台地址
  sentinelDashboard: localhost:7878 
  # 限流规则
  limitRules:
    - resource: "QuestionBank"
      count: 5
      grade: 1
```

项目中同样还是使用 `@SentinelResource`注解，也可以通过控制台动态配置限流。

### 自主扩展

1）自主实现 push 规则推送模式，定义自己的持久化规则

参考文档：

- https://sentinelguard.io/zh-cn/docs/basic-api-resource-rule.html（结尾提到）
- https://sentinelguard.io/zh-cn/docs/dynamic-rule-configuration.html

![img](./assets/202409131713258.png)

2）自主实现更多限流功能，比如本文需求分析部分提到的用户登录和用户注册的保护

## 二、动态 IP 黑名单过滤

### 需求分析

一些恶意用户（可能是黑客、爬虫、DDoS 攻击者）可能频繁请求服务器资源，导致资源占用过高。因此我们需要一定的手段实时阻止可疑或恶意的用户，减少攻击风险。

通过 IP 封禁，可以有效拉黑攻击者，防止资源被滥用，保障合法用户的正常访问。

对于我们的需求，不让拉进黑名单的 IP 访问任何接口。

### 方案设计

#### 1、设计过程

其实前面讲到的 Sentinel 本身就支持请求来源的 [黑白名单判断](https://github.com/alibaba/Sentinel/wiki/黑白名单控制)，但默认是对应用级别进行判断，需要改造来源的获取方式为获取请求客户端的 IP，可参考 [这篇文章](https://blog.csdn.net/qq_37128815/article/details/131942363) 自定义来源。

但其实引入 Sentinel 是需要一定成本的，本节主要分享更轻量的动态 IP 黑白名单过滤的常用设计和实现方法。

想要自主实现动态 IP 黑名单，主要考虑以下几点：

1. IP 黑名单存储在哪里？
2. 如何便捷地动态修改 IP 黑名单？
3. 黑白名单的判断逻辑应在哪里处理？
4. 使用何种数据结构保存黑名单？如何快速匹配用户请求的 IP 是否在黑名单中？

下面分别设计：

1）IP 黑名单存储在哪里？

最简单的方式就是存储在内存中，但一般 IP 黑名单是动态增加的、需要持久化保存。常见的持久化方式包括数据库、配置文件或分布式存储系统（如 Redis），可以根据需要选择。

2）如何便捷地动态修改 IP 黑名单？

为了方便动态修改 IP 黑名单，通常会提供一个管理页面，供管理员进行增删改查操作。

许多企业会将配置统一放入 **配置中心**，通过配置中心的管理页面，开发人员可以便捷地动态修改黑名单规则。Java 项目中，常用的配置中心是 Nacos。

3）黑白名单的判断逻辑应在哪里处理？

黑白名单逻辑通常部署在高性能的网关或 CDN 上，**能够更早地拦截非法请求**，减轻后端压力。在小型项目中，也可以直接在应用程序的过滤器中处理。

4）使用何种结构保存黑名单？如何快速匹配？

为了高效判断每个用户请求的 IP 是否在黑名单中，首先建议将 IP 黑名单从持久化存储同步到本地缓存中，避免频繁查询远程数据源。对于黑名单数据较小的场景，可以使用简单的 `Set` 数据结构存储。而对于大规模黑名单，推荐使用 **布隆过滤器或 DFA** 来存储和过滤黑名单，可以节约内存空间、提高检测效率。

#### 2、最终方案

总结一下最终方案：

1）使用 Nacos 配置中心存储和管理 IP 黑名单

2）后端服务利用 Web 过滤器判断每个用户请求的 IP

3）后端服务利用布隆过滤器过滤 IP 黑名单

#### 3、扩展知识 - 布隆过滤器

Bloom Filter 是一种高效的、基于概率的数据结构，用于判断一个元素是否存在于集合中。

原理是利用多个哈希函数将元素映射到固定的点位上（位数组中），因此面对海量数据它占据的空间也非常小。

例如某个 key 通过 hash-1 和 hash-2 两个哈希函数，定位到数组中的值都为 1，则说明它存在。

![img](./assets/202409131713296.png)

如果布隆过滤器判断一个元素不存在集合中，那么这个元素一定不在集合中，如果判断元素存在集合中则不一定是真的，因为哈希可能会存在冲突。因此布隆过滤器 **有误判的概率** 。

![img](./assets/202409131713737.png)

而且它不好删除元素，只能新增，如果想要删除，只能重建。

显然，它的主要特点包括：

1. 空间效率高：相比于传统的数据结构（如哈希表），Bloom Filter 能用较少的空间存储大量的数据。
2. 时间复杂度低：查询操作非常快速，通常是常数时间复杂度 `O(1)`。
3. 允许误判：Bloom Filter 允许假阳性，即有时候会错误地判断某个元素在集合中，而实际该元素并不在集合中。不过，它不允许假阴性，也就是说，如果 Bloom Filter 判断某个元素不存在，那么它一定是不存在的。比如对于我们的需求，Bloom Filter **可能错误地判断一个不在黑名单中的元素为在黑名单中**，导致误封。

Bloom Filter 的误判率与以下因素有关：

- 位数组的大小：位数组越大，误判率越低，但空间开销会增大。（值会更离散）
- 哈希函数的个数：哈希函数越多，误判率越低，但计算成本会增加。（Hash 一次冲突，那我就多 Hash 几次，减少冲突概率）
- 元素数量：存入的元素越多，误判率会增加。

通过 **合理设计位数组的大小和哈希函数的个数**，可以控制 Bloom Filter 的误判率在一个可接受的范围内。例如，在很多实际场景中，可以将误判率控制在 **1%** 或更低。

- 假设场景 1：存储 1000 个元素，位数组大小为 10000 位，哈希函数数量为 7。误判率大约为 0.8%。
- 假设场景 2：存储 100000 个元素，位数组大小为 1,000,000 位，哈希函数数量为 7。误判率大约为 1%。
- 假设场景 3：存储 1,000,000 个元素，位数组大小为 10,000,000 位，哈希函数数量为 7。误判率大约为 1%。

如果误判的代价较高，但仍想使用 Bloom Filter，可以采取一些补救措施：

- 双层验证：在 Bloom Filter 判断元素在黑名单中后，进一步查验实际的黑名单（例如，查数据库中的黑名单详细记录）。
- 结合其他数据结构：可以使用 Bloom Filter 进行初步筛选，如果 Bloom Filter 判断为在黑名单中，再用哈希表等精确的数据结构进行最终确认。

但这两种方式都无法处理攻击 IP 的大量请求，个人也不建议采用。

因此，布隆过滤器适用于对准确性要求不高的、大规模数据量匹配的场景，比如垃圾邮件过滤、爬虫 URL 去重、缓存穿透防护等。

### 配置中心

#### 为什么需要配置中心？

在分布式系统中，应用的配置管理变得越来越复杂，特别是当系统规模和组件数量增加时。传统的手动配置（写固定配置文件）往往难以应对这些复杂的需求。

而配置中心的出现就是为了实现分布式系统中配置的 **集中化管理，**还提供动态更新、配置分组、版本控制、灰度发布、安全管理，简化了多环境和多实例的配置运维，确保系统的灵活性和稳定性。

一句话，专业的技术做专业的事。

#### 配置中心支持的功能

1）集中化配置管理：所有服务的配置可以在一个地方集中管理，运维人员和开发人员可以通过统一的接口修改和获取配置，避免了在每个实例中重复配置。

2）动态配置：配置中心允许在不重启应用的情况下动态更新配置，应用可以实时收到配置的修改，进行运行时的调整。

3）多环境配置管理：配置中心，可以为不同的环境配置不同的配置集，按需加载相应的环境配置文件，避免了环境间配置的混淆和出错。

4）配置的版本控制：配置中心一般都会提供版本管理功能，可以查看和回滚到之前的配置版本，这提高了系统的容错性和可恢复性。

5）配置的安全管理：配置中心一般会提供加密存储和权限控制功能，可以对敏感信息（如数据库密码、API 密钥等）进行加密处理，并限制访问权限，确保敏感配置信息的安全性。

#### 常见的配置中心

1）Spring Cloud Config：Spring Cloud 提供的配置中心解决方案，支持 Git 等版本管理系统存储配置，适合与 Spring Cloud 系统集成使用。

2）Nacos：阿里巴巴开源的服务注册中心和配置中心，支持动态配置、服务治理，适合微服务架构和 Dubbo、Spring Cloud 的深度集成。

3）Apollo：由携程开源的配置中心，支持多环境、多集群的配置管理，配置实时生效且具有权限控制，适合大规模分布式系统。

4）Consul：由 HashiCorp 提供的服务注册与配置中心，具有强一致性和健康检查功能，适用于服务网格和容器化应用。

一般业务上，我们会选择使用 Nacos 或 Apollo 来作为配置中心，因为这两个提供了比较丰富的控制台管理页面，便于我们修改维护配置。

**本项目使用 Nacos 作为配置中心的实现。**

### Nacos 入门

#### 什么是 Nacos？

[Nacos](https://nacos.io/) 是 Dynamic Naming and Configuration Service 的首字母简称，一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

它提供了一组简单易用的特性集，帮助我们快速实现动态服务发现、服务配置、服务元数据及流量管理。

实际上，Nacos 不仅支持配置管理，它还支持服务发现（作为注册中心），以下是官网总结的 Nacos 地图：

![img](./assets/202409131713795.png)

我们当前的项目主要使用它的配置管理功能。

#### Nacos 配置管理的核心概念

1、Namespace（命名空间）

命名空间用于隔离不同的配置集。它允许在同一个 Nacos 集群中将不同的环境（如开发、测试、生产）或者不同的业务线的配置进行隔离。（默认提供了一个 public 命名空间） 使用场景：在多租户系统中，或者需要区分不同的环境时，可以使用命名空间。例如，开发环境的配置和生产环境的配置完全隔离，可以通过不同的命名空间来管理。

2、Group（组）

配置组是用于将多个相关的配置项进行分类管理的逻辑分组机制。每个配置项可以属于不同的组，以便于配置管理。 使用场景：当一个应用有多个模块，且不同模块之间共享部分配置时，可以用组来对这些模块的配置进行分类和管理。例如，一个系统中的“支付服务”和“订单服务”可能需要用不同的组来存储各自的配置。

3、Data ID

Data ID 是一个唯一的配置标识符，通常与具体的应用程序相关。通过 Data ID，Nacos 知道如何获取特定应用的某个具体配置。 使用场景：每个应用的配置都会有一个独特的 Data ID。例如，一个支付系统可能有一个配置文件叫 `com.payment.pay-service.yaml`，这就是它的 Data ID。

4、Config Listener（配置监听器）

配置监听器用于让客户端实时监听 Nacos 配置中心中的配置变化，可以自动感知配置的更新并做出相应的处理。 使用场景：在需要动态调整配置的场景下使用，例如调整缓存大小、切换不同的服务端点等，应用可以通过监听器及时感知这些变化并应用新的配置。

#### 推送和监听

推送方法：

1. Nacos 控制台（推荐）
2. 应用程序 SDK。Nacos 支持和 Spring Boot 快速整合，可以参考 [官方文档](https://nacos.io/zh-cn/docs/quick-start-spring-boot.html)
3. [Open API](https://nacos.io/zh-cn/docs/open-api.html)

监听方法：使用 SDK 配置 Config Listener，[参考官方文档](https://nacos.io/zh-cn/docs/sdk.html) 。示例代码如下：

```java
String serverAddr = "{serverAddr}";
String dataId = "{dataId}";
String group = "{group}";
Properties properties = new Properties();
properties.put("serverAddr", serverAddr);
ConfigService configService = NacosFactory.createConfigService(properties);
String content = configService.getConfig(dataId, group, 5000);
System.out.println(content);
configService.addListener(dataId, group, new Listener() {
	@Override
	public void receiveConfigInfo(String configInfo) {
		System.out.println("recieve1:" + configInfo);
	}
	@Override
	public Executor getExecutor() {
		return null;
	}
});

// 测试让主线程不退出，因为订阅配置是守护线程，主线程退出守护线程就会退出。 正式代码中无需下面代码
while (true) {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```

或者直接通过注解读取 value，能够实时获取到最新的配置值：

```java
@Controller
@RequestMapping("config")
public class ConfigController {

    @NacosValue(value = "${useLocalCache:false}", autoRefreshed = true)
    private boolean useLocalCache;

    @RequestMapping(value = "/get", method = GET)
    @ResponseBody
    public boolean get() {
        return useLocalCache;
    }
}
```

#### 扩展知识 - Nacos 性能

在企业中，做技术选型时，性能是必不可少的考虑因素。

可以参考 Nacos 的 [官方文档](https://nacos.io/zh-cn/docs/nacos-config-benchmark.html) 了解。

写性能：

| **单机** | **3节点** | **10节点** | **100节点** |
| -------- | --------- | ---------- | ----------- |
| 1400     | 4214      | 6863       | 8626        |

读性能：

| **单机** | **3节点** | **10节点** | **100节点** |
| -------- | --------- | ---------- | ----------- |
| 15000    | 23013     | 45000      | 161099      |

对 Nacos 有初步了解后，下面我们基于 Nacos 实现 IP 黑名单需求。

### 后端开发

#### 1、下载 Nacos Server

可以在 Nacos 官网下载对应版本的 Nacos 应用包，**此处使用和 Sentinel 兼容的 2.2.0 版本，一定不要使用其他版本！否则除了问题不好解决！**

可以在官方下载：https://nacos.io/download/release-history/

本教程为大家提供了软件包：https://pan.baidu.com/s/1u73-Nlolrs8Rzb1_b6X6HA ，提取码：c2sd

#### 2、启动 Nacos Server

解压下载好的压缩包：

![img](./assets/202409131713822.png)

Linux/Unix/Mac 启动命令如下（standalone 代表着单机模式运行，非集群模式）：

```bash
sh startup.sh -m standalone
```

Windows 启动命令：

```bash
startup.cmd -m standalone
```

启动成功，如图：

![img](./assets/202409131713847.png)

如果报找不到 Java，那就配置 JAVA_HOME、环境变量或者安装 Java：https://www.oracle.com/java/technologies/downloads/#java8

如何使用 Nacos 呢？其实比较简单，直接看教程和示例代码，拿来就能用！

- 文档：https://nacos.io/zh-cn/docs/quick-start.html
- 教程：https://sca.aliyun.com/zh-cn/docs/2021.0.5.0/user-guide/nacos/quick-start
- 示例代码：https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example

#### 3、通过 Nacos 控制台添加配置

1）访问：http://127.0.0.1:8848/nacos ，默认用户名和密码都是 nacos

![img](./assets/202409131713256.png)

2）点击创建配置：

![img](./assets/202409131713680.png)

填写配置，推荐 yaml 格式：

```yaml
blackIpList:
    - "1.1.1.1"
    - "2.2.2.2"
```

如图：

![img](./assets/202409131713735.png)

#### 4、项目引入 Nacos 依赖

可以直接使用 Spring Boot Starter 快速引入 Nacos，[参考文档](https://nacos.io/zh-cn/docs/quick-start-spring-boot.html)。

1）在项目 pom.xml 文件中，引入以下依赖配置：

```xml
<dependency>
    <groupId>com.alibaba.boot</groupId>
    <artifactId>nacos-config-spring-boot-starter</artifactId>
    <version>0.2.12</version>
</dependency>
```

注意：版本 0.2.x.RELEASE 对应的是 Spring Boot 2.x 版本，版本 0.1.x.RELEASE 对应的是 Spring Boot 1.x 版本。（经测试，本项目可使用 0.2.12 版本）

2）修改 application.yml 配置文件，添加 Nacos Server 地址等配置：

```yaml
# 配置中心
nacos:
  config:
    server-addr: 127.0.0.1:8848  # nacos 地址
    bootstrap:
      enable: true  # 预加载
    data-id: mianshiya # 控制台填写的 Data ID
    group: DEFAULT_GROUP # 控制台填写的 group
    type: yaml  # 选择的文件格式
    auto-refresh: true # 开启自动刷新
```

#### 5、创建黑名单过滤工具类

新建 blackfilter 包，黑名单过滤相关的代码都放到该包下，模块化。

可以用 Hutool 或 Guava 库自带的 bloomfilter，[参考文章](https://blog.csdn.net/asd051377305/article/details/139684962)，如果是分布式，还可以考虑 Redisson。

此处由于项目已经使用了 Hutool 工具库，就用其自带的 BitMapBloomFilter 即可。

示例代码如下：

```java
@Slf4j
public class BlackIpUtils {

    private static BitMapBloomFilter bloomFilter;

    // 判断 ip 是否在黑名单内
    public static boolean isBlackIp(String ip) {
        return bloomFilter.contains(ip);
    }

    // 重建 ip 黑名单
    public static void rebuildBlackIp(String configInfo) {
        if (StrUtil.isBlank(configInfo)) {
            configInfo = "{}";
        }
        // 解析 yaml 文件
        Yaml yaml = new Yaml();
        Map map = yaml.loadAs(configInfo, Map.class);
        // 获取 ip 黑名单
        List<String> blackIpList = (List<String>) map.get("blackIpList");
        // 加锁防止并发
        synchronized (BlackIpUtils.class) {
            if (CollectionUtil.isNotEmpty(blackIpList)) {
                // 注意构造参数的设置
                BitMapBloomFilter bitMapBloomFilter = new BitMapBloomFilter(958506);
                for (String ip : blackIpList) {
                    bitMapBloomFilter.add(ip);
                }
                bloomFilter = bitMapBloomFilter;
            } else {
                bloomFilter = new BitMapBloomFilter(100);
            }
        }
    }
}
```

注意，BitMapBloomFilter 接受的参数比较特殊，关于如何计算 BloomFilter 参数值，鱼皮在 GitHub 找到了一个说法，可以自行测试：https://github.com/dromara/hutool/issues/3356。

💡 注意，因为 Nacos 配置文件的监听的粒度比较粗，只能知晓配置有变更，无法知晓是新增、删除还是修改，因此不论是选择布隆过滤器还是 HashSet 最方便的处理逻辑就是重建。

#### 6、创建 Nacos 配置监听类

可以直接通过 Nacos 控制台获取示例代码：

![img](./assets/202409131713845.png)

在 blackfilter 包中新增监听器代码，追求性能的话可以自定义线程池：

```java
@Slf4j
@Component
public class NacosListener implements InitializingBean {

    @NacosInjected
    private ConfigService configService;

    @Value("${nacos.config.data-id}")
    private String dataId;

    @Value("${nacos.config.group}")
    private String group;

    @Override
    public void afterPropertiesSet() throws Exception {
        log.info("nacos 监听器启动");

        String config = configService.getConfigAndSignListener(dataId, group, 3000L, new Listener() {
            final ThreadFactory threadFactory = new ThreadFactory() {
                private final AtomicInteger poolNumber = new AtomicInteger(1);
                @Override
                public Thread newThread(@NotNull Runnable r) {
                    Thread thread = new Thread(r);
                    thread.setName("refresh-ThreadPool" + poolNumber.getAndIncrement());
                    return thread;
                }
            };
            final ExecutorService executorService = Executors.newFixedThreadPool(1, threadFactory);

            // 通过线程池异步处理黑名单变化的逻辑
            @Override
            public Executor getExecutor() {
                return executorService;
            }

            // 监听后续黑名单变化
            @Override
            public void receiveConfigInfo(String configInfo) {
                log.info("监听到配置信息变化：{}", configInfo);
                BlackIpUtils.rebuildBlackIp(configInfo);
            }
        });
        // 初始化黑名单
        BlackIpUtils.rebuildBlackIp(config);
    }
}
```

#### 7、创建黑名单过滤器

黑名单应该对所有请求生效（不止是 Controller 的接口），所以基于 WebFilter 实现而不是 AOP 切面。WebFilter 的优先级高于 @Aspect 切面，因为它在整个 Web 请求生命周期中更早进行处理。

请求进入时的顺序：

- WebFilter：首先，WebFilter 拦截 HTTP 请求，并可以根据逻辑决定是否继续执行请求。
- Spring AOP 切面（@Aspect）：如果请求经过过滤器并进入 Spring 管理的 Bean（例如 Controller 层），此时切面生效，对匹配的 Bean 方法进行拦截。
- Controller 层：如果 @Aspect 没有阻止执行，最终请求到达 @Controller 或 @RestController 的方法。

代码如下：

```java
@WebFilter(urlPatterns = "/*", filterName = "blackIpFilter")
public class BlackIpFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        String ipAddress = NetUtils.getIpAddress((HttpServletRequest) servletRequest);
        if (BlackIpUtils.isBlackIp(ipAddress)) {
            servletResponse.setContentType("text/json;charset=UTF-8");
            servletResponse.getWriter().write("{\"errorCode\":\"-1\",\"errorMsg\":\"黑名单IP，禁止访问\"}");
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

}
```

需要在启动类上加上 `@ServletComponentScan`，这样过滤器才会被扫描到。

```java
@SpringBootApplication(exclude = {RedisAutoConfiguration.class})
@MapperScan("com.yupi.mianshiya.mapper")
@EnableScheduling
@EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true)
@ServletComponentScan
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

}
```

#### 8、测试效果

通过 Nacos 控制台修改配置，本地测试的话直接加入本机 IP 即可：

```java
blackIpList:
    - "1.1.1.1"
    - "2.2.2.2"
    - "0:0:0:0:0:0:0:1"
```

如图：

![img](./assets/202409131713243.png)

Nacos 控制台能看到改动记录：

![img](./assets/202409131713315.png)

在应用中可以实时接受到配置的修改，使得黑名单实时生效：

![img](./assets/202409131713370.png)

通过 Swagger 测试黑名单效果：

![img](./assets/202409131713816.png)

### 扩展

1）基于 DFA 实现黑名单过滤

思路：可以自主了解 DFA 算法，通过 Hutool 工具类等现成的库轻松实现，不建议自己写算法。由于有多种黑名单过滤算法，还可以基于策略模式优化代码。

2）配置降级

思路：验证如果从 Nacos 获取配置失败后，应用程序会有什么表现？思考如何防止配置拉取失败的情况，提升应用的稳定性。



# 8 - 内容安全优化

## 本节重点

内容安全性优化

- 同端登录冲突检测（基于 Sa-Token）
- 分级题目反爬虫策略（基于 Redis）

## 一、同端登录冲突检测

### 需求分析

在多用户系统中，如电商平台、企业办公系统或社交应用，用户的账户安全和系统的正常使用至关重要。

如果同一个账户同时在多个设备上登录，可能由于之前在别的地方临时登录后忘记退出账号，导致数据泄露或账户被滥用等问题。此外，还有可能会导致数据不一致问题，例如重复提交订单、聊天记录不同步等。

针对我们会员制的刷题网站，若会员账户被不法分子售卖或多人共享，将会损害公司利益。

为了防止这些情况，我们的系统需要能够实时监控和检测同一账户在多个设备上的登录情况，在检测到冲突时，及时通知用户并采取相应的安全措施（如强制下线或警告）。

### 方案设计

#### 1、账号冲突检测策略

常见业务上有 3 种冲突检测策略：

**1）单点登录模式**

同一时间，只允许同一账户在一个设备上登录。即每次新设备登录时，检测当前账户是否已经在其他设备上登录，若已登录则将其他设备强制下线。

一般应用于企业内部系统或包含敏感数据的系统中。

**2）多设备登录限制**

允许同一账户在多个设备上登录，但需限制设备数量（如最多两台）。即每次登录时，检测当前账户已登录设备数量，若超过限制，系统阻止登录或强制最早登录设备下线。

这种模式常见于视频网站、买断制 / 订阅制软件。

一个软件激活码只能同时在 X 台设备使用，也是类似的机制。

**3）同设备类型限制**

允许同一账户在不同设备类型（如手机和 PC）上同时登录，但同一类型设备只能登录一个。例如，用户可同时在电脑和 iPad 上使用我们的平台，但不能在两台手机上登录在线。（QQ 就是这样）

要想实现这种策略，需要记录账户登录设备的类型，每次登录时检查是否有同类设备已登录，如果有则强制下线相同设备类型的旧登录。

这种策略常应用于一些需兼顾多端体验的应用。比如我们的面试刷题平台用户，经常有 iPad 和电脑端同时刷题的需求，因此我们采用第 3 种策略 **同设备类型限制（同端互斥登录）。**

#### 2、实现思路

如何实现同端互斥登录呢？

1. 用户登录时获取当前设备信息（通过 User-Agent 获取）
2. 将用户登录信息与设备信息一起保存（本地或三方缓存中）
3. 用户登录时判断同设备是否已经登录（本地或缓存中是否已存在）
4. 如果检测到冲突，可以直接顶号（将前一个设备下线，也就是移除登录态）

其实自主实现这个需求也并不难，但涉及到登录这样的核心业务场景，经验不足的情况下，更建议使用一些成熟的第三方框架。比如轻量级 Java 权限认证框架 `Sa-Token` 内置了 [同端互斥登录功能](https://sa-token.cc/doc.html#/up/mutex-login)，可以更快更稳地实现。

以下为 Sa-Token 同端互斥示意图：

![img](./assets/202409231710017.gif)

借这个场景，带大家学习下 Sa-Token 框架。

### Sa-Token 入门

[Sa-Token](https://sa-token.cc/) 是一个轻量级 Java 权限认证框架，主要解决：登录认证、权限认证、单点登录、OAuth2.0、分布式Session会话、微服务网关鉴权等一系列权限相关问题。

Sa-Token 功能一览：

![img](./assets/202409231710092.png)

Sa-Token 旨在以简单、优雅的方式完成系统的权限认证部分，以登录认证为例，只需要一行代码：

```java
// 会话登录，参数填登录人的账号id 
StpUtil.login(10001);
```

无需实现任何接口、无需创建任何配置文件，只需要这一句静态代码的调用，便可以完成会话登录认证！

如果一个接口需要登录后才能访问，我们只需调用以下代码来检测该用户是否已经登录：

```java
// 校验当前客户端是否已经登录，如果未登录则抛出 `NotLoginException` 异常
StpUtil.checkLogin();
```

由于是国人开发，它的 [官方文档](https://sa-token.cc/doc.html#/) 写得非常通俗易懂，是纯天然的教程，基本上按照文档的顺序阅读一遍，就能够上手了。下面我们就先试着 [参考文档](https://sa-token.cc/doc.html#/start/example) 来运行下官方的 Demo。

#### 入门 Demo

在 Spring Boot 项目中，可以通过 `sa-token-spring-boot-starter` 快速引入 Sa-Token。注意版本：

```xml
<!-- Sa-Token 权限认证 -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.39.0</version>
</dependency>
```

Sa-Token 支持通过配置定制框架的行为，比如登录态过期时间、不活跃自动下线等：

```yaml
server:
    # 端口
    port: 8081
    
############## Sa-Token 配置 (文档: https://sa-token.cc) ##############
sa-token: 
    # token 名称（同时也是 cookie 名称）
    token-name: satoken
    # token 有效期（单位：秒） 默认30天，-1 代表永久有效
    timeout: 2592000
    # token 最低活跃频率（单位：秒），如果 token 超过此时间没有访问系统就会被冻结，默认-1 代表不限制，永不冻结
    active-timeout: -1
    # 是否允许同一账号多地同时登录 （为 true 时允许一起登录, 为 false 时新登录挤掉旧登录）
    is-concurrent: true
    # 在多人登录同一账号时，是否共用一个 token （为 true 时所有登录共用一个 token, 为 false 时每次登录新建一个 token）
    is-share: true
    # token 风格（默认可取值：uuid、simple-uuid、random-32、random-64、random-128、tik）
    token-style: uuid
    # 是否输出操作日志 
    is-log: true
```

对于入门 Demo，我们可以不写配置，直接零配置启动项目。

然后我们编写 2 个测试接口，一个用于登录，一个用于检测是否已登录：

```java
/**
 * 测试 Sa-Token 框架实现用户登录
 */
@RestController
@RequestMapping("/test/user/")
public class TestSaTokenLoginController {

    // 测试登录，浏览器访问： http://localhost:8101/api/test/user/doLogin?username=zhang&password=123456
    @RequestMapping("doLogin")
    public String doLogin(String username, String password) {
        // 此处仅作模拟示例，真实项目需要从数据库中查询数据进行比对
        if ("zhang".equals(username) && "123456".equals(password)) {
            StpUtil.login(10001);
            return "登录成功";
        }
        return "登录失败";
    }

    // 查询登录状态，浏览器访问： http://localhost:8101/api/test/user/isLogin
    @RequestMapping("isLogin")
    public String isLogin() {
        return "当前会话是否登录：" + StpUtil.isLogin();
    }
}
```

然后可以通过直接访问接口地址来验证。

![img](./assets/202409231710088.png)

#### Sa-Token 实用功能

按顺序阅读 [官方文档](https://sa-token.cc/doc.html#/use/login-auth) 学习即可，重点学习下图中红圈里的内容，其他的作为可选学习项：

![img](./assets/202409231710128.png)

#### Sa-Token 原理

推荐阅读 Sa-Token 文档的 [附录部分](https://sa-token.cc/doc.html#/fun/session-model)，尤其是对前后端分离的登录模式不太熟悉的同学。重点阅读以下红圈部分：

![img](./assets/202409231710154.png)

Sa-Token 认证流程图，要重点掌握。如果让你自己设计一个权限校验框架，就是按这个流程来：

![img](./assets/202409231710183.png)

要理解 Sa-Token 的 [Session 模型](https://sa-token.cc/doc.html#/fun/session-model)，区别于 Servlet 的 HttpSession，Sa-Token 维护了自己的 Session，共有 3 种 Session 创建时机：

- `Account-Session`: 指的是框架为每个 账号 id 分配的 Session。是分配给账号id的，而不是分配给指定客户端的，也就是说在 PC、APP 上登录的同一账号所得到的 Session 也是同一个，所以两端可以非常轻松的同步数据。
- `Token-Session`: 指的是框架为每个 token 分配的 Session。不同的设备端，哪怕登录了同一账号，只要它们得到的 token 不一致，它们对应的 `Token-Session` 就不一致，这就为我们不同端的独立数据读写提供了支持。比如实现“指定客户端超过两小时无操作就自动下线，如果两小时内有操作，就再续期两小时，直到新的两小时无操作”。
- `Custom-Session`: 指的是以一个特定的值作为 SessionId，来分配的 Session。不依赖特定的账号id 或者 token，当成一个 Map 去使用即可，比如可以为一个团队的用户指定相同的 SessionId，让一个团队最多 N 个用户同时在线等。

![img](./assets/202409231710030.png)

### 后端开发（Sa-Token 实战）

下面，带大家实战如何使用 Sa-Token 实现同端登录冲突检测功能，并且基于 Sa-Token 改造我们现有项目的鉴权方式。

#### 1、引入 Sa-Token

在项目中添加下列依赖：

```xml
<!-- Sa-Token 权限认证 -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-spring-boot-starter</artifactId>
    <version>1.39.0</version>
</dependency>
```

#### 2、配置 Sa-Token

在项目的 `application.yml` 中添加以下配置。重点关注 `is-concurrent`，需要设置为 false，这样才能实现同端冲突下线。

```yaml
# Sa-Token 配置
sa-token:
  # token 名称（同时也是 cookie 名称）
  token-name: mianshiya
  # token 有效期（单位：秒） 默认30天，-1 代表永久有效
  timeout: 2592000
  # token 最低活跃频率（单位：秒），如果 token 超过此时间没有访问系统就会被冻结，默认-1 代表不限制，永不冻结
  active-timeout: -1
  # 是否允许同一账号多地同时登录（为 true 时允许一起登录, 为 false 时新登录挤掉旧登录）
  is-concurrent: false
  # 在多人登录同一账号时，是否共用一个 token （为 true 时所有登录共用一个 token, 为 false 时每次登录新建一个 token）
  is-share: true
  # token 风格（默认可取值：uuid、simple-uuid、random-32、random-64、random-128、tik）
  token-style: uuid
  # 是否输出操作日志 
  is-log: true
```

#### 3、注册 Sa-Token 拦截器

我们现在的项目是使用 AOP + 自定义权限校验注解来实现的登录认证和权限认证：

![img](./assets/202409231710065.png)

Sa-Token 也是一样的模式，使用全局拦截器完成注解鉴权功能。为了不为项目带来不必要的性能负担，拦截器默认处于关闭状态。因此。为了使用注解鉴权，必须手动将 Sa-Token 的全局拦截器注册到项目中。

新建 `satoken` 包，在里面新建配置类 `SaTokenConfigure`，注册拦截器：

```java
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    // 注册 Sa-Token 拦截器，打开注解式鉴权功能 
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册 Sa-Token 拦截器，打开注解式鉴权功能 
        registry.addInterceptor(new SaInterceptor()).addPathPatterns("/**");    
    }
}
```

然后就可以使用注解鉴权了，比如下列注解，可以平替我们项目中已经写的鉴权注解：

```java
// 登录校验：只有登录之后才能进入该方法 
@SaCheckLogin                        
@RequestMapping("info")
public String info() {
    return "查询用户信息";
}

// 角色校验：必须具有指定角色才能进入该方法 
@SaCheckRole("super-admin")        
@RequestMapping("add")
public String add() {
    return "用户增加";
}
```

💡 Sa-Token 还支持另外一种鉴权模式，通过编写 [路由拦截代码实现鉴权](https://sa-token.cc/doc.html#/use/route-check)，可以实现更灵活、集中式的鉴权能力。

比如这个场景：项目中所有接口均需要登录认证，只有“登录接口”本身对外开放。

示例代码如下：

```java
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    // 注册拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册 Sa-Token 拦截器，校验规则为 StpUtil.checkLogin() 登录校验。
        registry.addInterceptor(new SaInterceptor(handle -> StpUtil.checkLogin()))
                .addPathPatterns("/**")
                .excludePathPatterns("/user/doLogin"); 
    }
}
```

这个就很像我们后端项目模板中利用 Spring AOP 功能实现的 `AuthInterceptor`，只不过 Sa-Token 提供了很多方法，可以帮我们更快速清晰地编写鉴权规则：

![img](./assets/202409231710087.png)

本项目中，还是采用注解校验的模式，跟已有写法尽量保持一致。

有了 Sa-Token 的拦截器后，将现有 `AuthInterceptor` 类的 Bean 加载注解进行注释即可：

```java
//@Aspect
//@Component
public class AuthInterceptor {
    ...
}
```

#### 4、定义权限与角色获取逻辑

部分接口需要特定的用户权限或对应的角色才能访问，那怎么知道当前登录用户具有哪些权限或角色呢？

按照 [Sa-Token 的开发模式](https://sa-token.cc/doc.html#/use/jur-auth)，我们需要新建一个类，实现 `StpInterface` 接口。该接口提供了获取当前登录用户的权限和角色的方法，在每次调用鉴权代码时，都会执行接口中的方法。

在 `satoken` 包下新建类，代码如下：

```java
@Component // 保证此类被 SpringBoot 扫描，完成 Sa-Token 的自定义权限验证扩展 
public class StpInterfaceImpl implements StpInterface {

    /**
     * 返回一个账号所拥有的权限码集合 (目前没用)
     */
    @Override
    public List<String> getPermissionList(Object loginId, String s) {
        return new ArrayList<>();
    }

    /**
     * 返回一个账号所拥有的角色标识集合 (权限与角色可分开校验)
     */
    @Override
    public List<String> getRoleList(Object loginId, String s) {
        // 从当前登录用户信息中获取角色
        User user = (User) StpUtil.getSessionByLoginId(loginId).get(USER_LOGIN_STATE);
        return Collections.singletonList(user.getUserRole());
    }
}
```

#### 5、新建设备信息获取工具类

可以从客户端发送的请求头中获取用户使用的设备信息，建议单独写一个工具类。本项目为了让大家学习更方便，采用模块化分包，将工具类也放到 `satoken` 包中。

代码如下：

```java
/**
 * 设备工具类
 */
public class DeviceUtils {

    /**
     * 根据请求获取设备信息
     **/
    public static String getRequestDevice(HttpServletRequest request) {
        String userAgentStr = request.getHeader(Header.USER_AGENT.toString());
        // 使用 Hutool 解析 UserAgent
        UserAgent userAgent = UserAgentUtil.parse(userAgentStr);
        ThrowUtils.throwIf(userAgent == null, ErrorCode.OPERATION_ERROR, "非法请求");
        // 默认值是 PC
        String device = "pc";
        // 是否为小程序
        if (isMiniProgram(userAgentStr)) {
            device = "miniProgram";
        } else if (isPad(userAgentStr)) {
            // 是否为 Pad
            device = "pad";
        } else if (userAgent.isMobile()) {
            // 是否为手机
            device = "mobile";
        }
        return device;
    }

    /**
     * 判断是否是小程序
     * 一般通过 User-Agent 字符串中的 "MicroMessenger" 来判断是否是微信小程序
     **/
    private static boolean isMiniProgram(String userAgentStr) {
        // 判断 User-Agent 是否包含 "MicroMessenger" 表示是微信环境
        return StrUtil.containsIgnoreCase(userAgentStr, "MicroMessenger")
                && StrUtil.containsIgnoreCase(userAgentStr, "MiniProgram");
    }

    /**
     * 判断是否为平板设备
     * 支持 iOS（如 iPad）和 Android 平板的检测
     **/
    private static boolean isPad(String userAgentStr) {
        // 检查 iPad 的 User-Agent 标志
        boolean isIpad = StrUtil.containsIgnoreCase(userAgentStr, "iPad");

        // 检查 Android 平板（包含 "Android" 且不包含 "Mobile"）
        boolean isAndroidTablet = StrUtil.containsIgnoreCase(userAgentStr, "Android")
                && !StrUtil.containsIgnoreCase(userAgentStr, "Mobile");

        // 如果是 iPad 或 Android 平板，则返回 true
        return isIpad || isAndroidTablet;
    }
}
```

可以根据实际需求，自己补充更多的设备、优化设备的判断方法。

#### 6、改造登录接口

修改 `UserServiceImpl#userLogin` 方法中的逻辑，需要给 Sa-Token 设置登录态，保存登录用户信息。

参考 [官方文档](https://sa-token.cc/doc.html#/up/mutex-login) ，直接给 `StpUtil.login` 方法多传递一个参数即可：

```java
// 3. 记录用户的登录态（移除这行代码）
request.getSession().setAttribute(USER_LOGIN_STATE, user);

// Sa-Token 登录，并指定设备，同端登录互斥
StpUtil.login(user.getId(), DeviceUtils.getRequestDevice(request));
StpUtil.getSession().set(USER_LOGIN_STATE, user);
```

`user.getId()` 就是登录成功的用户 id，可以在 `StpInterfaceImpl` 中通过方法参数 loginId 获取到。

注意，`StpUtil.getSession()` 是 `SaSession`，与 HttpSession 没任何关系， SaSession 是 Sa-Token 提供的会话中专业的数据缓存组件，通过 SaSession 我们可以很方便的缓存一些高频读写数据（比如登录用户信息），提高程序性能。

![img](./assets/202409231710106.png)

#### 7、改造获取用户信息的逻辑

将 `UserServiceImpl#getLoginUser` 修改为如下，不再从 `request.getSession()` 中获取登录用户的 id，改为从 Sa-Token 中获取。

```java
@Override
public User getLoginUser(HttpServletRequest request) {
    // 先判断是否已登录
    Object loginUserId = StpUtil.getLoginIdDefaultNull();
    if (loginUserId == null) {
        throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
    }
    // 从数据库查询（追求性能的话可以注释，直接走缓存）
    User currentUser = this.getById((String) loginUserId);
    if (currentUser == null) {
        throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
    }
    return currentUser;
}
```

如果用户信息几乎很少修改，可以不查数据库，直接从 Sa-Token 的 Session 中获取之前保存的用户登录态：

```java
@Override
public User getLoginUser(HttpServletRequest request) {
    // 先判断是否已登录
    Object loginId = StpUtil.getLoginIdDefaultNull();
    if (Objects.isNull(loginId)) {
        throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
    }
    return (User) StpUtil.getSessionByLoginId(loginId).get(USER_LOGIN_STATE);
}
```

**注意，所有原本从 servlet Session 中取登录态的代码都要修改！** 比如还有 `UserServiceImpl#isAdmin` 方法：

```java
public boolean isAdmin(HttpServletRequest request) {
    // 仅管理员可查询
    // 基于 Sa-Token 改造
    Object userObj = StpUtil.getSession().get(USER_LOGIN_STATE);
    // Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
    User user = (User) userObj;
    return isAdmin(user);
}
```

#### 8、改造用户注销功能

改为调用 Sa-Token 的注销方法，移除登录态：

```java
@Override
public boolean userLogout(HttpServletRequest request) {
    StpUtil.checkLogin();
    // 移除登录态
    StpUtil.logout();
    return true;
}
```

#### 9、替换鉴权注解

现在的项目中，如果是管理员权限的接口，打上了以下注解：

```java
@AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
```

可以全局替换成 Sa-Token 的权限校验注解：

```java
@SaCheckRole(UserConstant.ADMIN_ROLE)
```

### 测试

启动项目，利用接口文档进行测试，分别执行用户登录（2 次） => 获取登录用户信息 => 获取题目列表（仅管理员可用）=> 用户注销 => 获取题目列表（仅管理员可用）

查看 Sa-Token 日志，发现同端登录冲突检测生效：

![img](./assets/202409231710121.png) 用户注销时也会打印日志： ![img](./assets/202409231710163.png)

注销后，调用获取题目列表（仅管理员可用）接口，会出现报错：

![img](./assets/202409231710608.png)

可以同时用 PC 端和移动端（F12 浏览器控制台模拟即可）执行用户登录，不会出现冲突。

### 扩展知识

#### 1、Sa-Token 登录异常捕获

通过测试发现，如果不做任何处理，接口返回的无权限和未登录的报错如下：

```json
{
  "code": 50000,
  "data": null,
  "message": "系统错误"
}
```

这是因为没有处理 Sa-Token 自己的未登录异常（获取不到 Token 的异常）。

可以在 `GlobalExceptionHandler` 文件中，全局错误拦截 Sa-Token 的 NotRoleException 和 NotLoginException 异常：

```java
@ExceptionHandler(NotRoleException.class)
public BaseResponse<?> notRoleExceptionHandler(RuntimeException e) {
    log.error("NotRoleException", e);
    return ResultUtils.error(ErrorCode.NO_AUTH_ERROR, "无权限");
}

@ExceptionHandler(NotLoginException.class)
public BaseResponse<?> notLoginExceptionHandler(RuntimeException e) {
    log.error("NotLoginException", e);
    return ResultUtils.error(ErrorCode.NOT_LOGIN_ERROR, "未登录");
}
```

之后，用户无访问权限和未登录的报错就更清晰了：

```json
{
  "code": 40101,
  "data": null,
  "message": "无权限"
}

{
  "code": 40100,
  "data": null,
  "message": "未登录"
}
```

还可以参考 [官方文档](https://sa-token.cc/doc.html#/fun/not-login-scene) ，进一步定制异常处理逻辑：

![img](./assets/202409231710658.png)

#### 2、Sa-Token 集成 Redis

`Sa-Token` 默认将数据保存在内存中，此模式读写速度最快，且避免了序列化与反序列化带来的性能消耗，但是此模式也有一些缺点，比如：

- 重启后数据会丢失
- 无法在分布式环境中共享数据

此时，可以将会话数据存储在一些专业的缓存中间件上（比如 Redis），做到重启数据不丢失，而且保证分布式环境下多节点的会话一致性。

可以参考 [官方文档](https://sa-token.cc/doc.html#/up/integ-redis) 整合 Redis，非常简单。集成 Redis 后，也不需要额外手动保存数据，框架会自动保存。集成 Redis 只需要引入对应的 pom依赖 即可，框架所有上层 API 保持不变。

1）引入依赖

`sa-token-redis` 和 `sa-token-redis-jackson` 依赖二选一，差别就是序列化方式不同：

```xml
▼<!-- Sa-Token 整合 Redis （使用 jdk 默认序列化方式） -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-redis</artifactId>
    <version>1.39.0</version>
</dependency>

<!-- Sa-Token 整合 Redis （使用 jackson 序列化方式） -->
<dependency>
    <groupId>cn.dev33</groupId>
    <artifactId>sa-token-redis-jackson</artifactId>
    <version>1.39.0</version>
</dependency>

<!-- 提供Redis连接池 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

2）添加 Redis 配置

在 `application.yml` 中添加 Redis 配置（已有则无需添加）

```yaml
spring: 
  # redis配置 
  redis:
    # Redis数据库索引（默认为0）
    database: 1
    # Redis服务器地址
    host: 127.0.0.1
    # Redis服务器连接端口
    port: 6379
    # Redis服务器连接密码（默认为空）
    # password: 
    # 连接超时时间
    timeout: 10s
    lettuce:
      pool:
        # 连接池最大连接数
        max-active: 200
        # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-wait: -1ms
        # 连接池中的最大空闲连接
        max-idle: 10
        # 连接池中的最小空闲连接
        min-idle: 0
```

### 可自主扩展

#### 1、不使用 Sa-Token，实现同端登录冲突检测

Sa-Token 本质上就是多维护了一个“当前登录用户对应的设备信息”，我们也可以自己在 request 对象的 Session（或 Redis）中存储该信息。当用户新登录账号时，先检测该用户是否已经登录、并且是否有设备冲突，冲突的话，把之前的登录态删除掉即可。**可以试着自主实现。**

| 登录时间 | 设备 | session                                            |
| -------- | ---- | -------------------------------------------------- |
| 第 1 次  | ipad | device: "ipad"                                     |
| 第 2 次  | web  | device: "ipad" device: "web"                       |
| 第 3 次  | web  | device: "ipad" device: "web"（删除） device: "web" |

#### 2、同端登录冲突时，被踢下线的用户前端会收到通知

实现思路：

1）自定义“登录冲突被踢下线”异常，比如状态码 40110

2）用户在一个设备 A 登录后，如果在另一个设备 B 登录时，系统判断该用户已经在其他设备上登录过了，会移除设备 A 的登录态，并且在 Redis 里记录一条设备 A 的 sessionId 的冲突标识，之后用户在设备 A 请求任何一个接口（除登录接口），都会返回一个冲突的错误响应消息：

```javascript
{
  "code": 40110,
  "message": "用户已经在其他设备登录"
}
```

3）然后就可以移除在 Redis 里的冲突标识。之后请求任何接口，都能正常响应，如果需要登录，会和之前一样返回未登录。

4）前端全局响应拦截器中捕获该异常，并弹出消息通知框即可。

相比轮询或者 WebSocket，这种方案更轻量，能够减少服务器的压力。

#### 3、单点登录和 OAuth2

一般情况下公司都会有自己的单点登录或 OAuth2 基础设施，自学项目、或者小团队开发时可以不用掌握。但是建议学习一下这些概念和实现思路，面试时可能会被问到。

可以直接阅读 Sa-Token 的官方文档学习，介绍地非常详细：

- SSO 单点登录：https://sa-token.cc/doc.html#/sso/readme
- OAuth2：https://sa-token.cc/doc.html#/oauth2/readme

## 二、分级题目反爬虫策略

### 需求分析

对于以内容为卖点的网站（尤其是知识付费网站），网站上的数据可能被爬虫程序大规模抓取，导致竞争对手获得不当优势或者数据被滥用。而且恶意爬虫的频繁请求也会导致服务器的负载增加，影响正常用户的访问体验。

所以我们需要一些反爬虫的措施，来保护我们的系统和内容。

### 方案设计

#### 反爬虫的手段

之前鱼皮给大家分享过一些反爬的手段，包括使用协议条款、业务层处理、接入专业的反爬监测系统、设置溯源手段等等，推荐 [阅读文章](https://www.code-nav.cn/post/1821392938209808386) 或者 [观看视频](https://www.bilibili.com/video/BV1b142187Tb/)。

💡 有同学可能会想到“限流”。限流确实可以用来减缓爬虫的请求频率，通过限制每个用户或 IP 在一定时间内的请求数量来降低对系统的压力。然而，限流的核心目的是保护系统的可用性和性能，防止系统因瞬时过载而崩溃。它更像是一种流量控制措施，而不是专门的防爬策略。

如何反爬虫，是一门艺术，无法做到 100% 防御，但是可以 **根据实际业务定制** 一些特殊的限制逻辑、处理逻辑、追溯手段。即使防不住爬虫，但我们可以通过日志等途径定位到盗取内容或影响我们系统的用户，进行封号限制或追责。这也是本教程中要带大家实践的内容。

#### 多级反爬虫策略

对于我们的面试刷题网站，假设用户要浏览题目的答案（或者其他要保护的内容），那么 **必须要先登录**，这样才能够进行追溯，可以简单统计用户访问频率来限制数据的爬取。

频率限制为多少呢？

通过分析我们的系统使用情况、再加上人为主观判断：正常用户浏览一道面试题的时间是分钟级别的。我们稍微放宽一点，默认同一用户每分钟最多能够获取 10 道题目。

建议采用分级反爬虫策略，先告警、再采取强制措施，可以有效减少误封的风险：

- 如果每分钟超过 10 道题目，则给管理员发送告警，比如发送邮件或者短信。
- 如果每分钟超过 20 道题目，则直接将账号踢下线，且进行封号操作。（或者限制一段时间无法访问）

具体的策略大家可以针对实际情况自己定制。

------

那么如何统计用户访问题目的频率呢？有下面 3 种方案：

#### 统计访问频率 - 结合已有系统

在本项目之前的教程中，我们学习了 Hotkey 热 key 探测系统和 Sentinel 流控系统，这些系统的实现关键都在于如何统计一段时间内的调用频率。

所以我们完全可以利用这些系统帮我们进行统计，比如在 Hotkey 中配置热 key 的规则（业务前缀 + 用户 id 作为 key），如果发现一个 key 成为了热 key，就表示该 key 对应的用户访问题目过多，就可以进行后续处理。

或者在 Sentinel 中配置热点参数限流策略，如果某用户访问题目过多，该用户后续访问时会抛出流量阻塞异常，就可以进行后续处理。

这种方案的优点是利用专业的系统进行统计，更精准更可靠；缺点就是要依靠第三方依赖保证统计的可用性，万一 Sentinel 或 Hotkey 挂了，统计也失效了。

#### 统计访问频率 - 基于本地计数器（单机）

如果项目采用单机部署，可以使用 `LongAdder` 进行高并发的计数操作。

LongAdder 是 Java 中并发包提供的一个计数器，它扩展了 AtomicLong，主要通过分段（分散热点）来减少多线程竞争，能够在高并发情况下提供比 AtomicLong 更高的性能。

其工作原理是将计数值分散到多个独立的变量中，并且每个线程只更新其中一个变量，这样可以减少多个线程同时访问同一个变量的竞争。当需要获取总值时，会将这些变量的值汇总起来。

假设我们需要统计每个用户每分钟的访问次数，可以通过以下方式实现：

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.LongAdder;

public class RequestRateLimiter {
    
    // 用于存储每个用户的访问次数计数器
    private ConcurrentHashMap<String, LongAdder> userRequestCounts = new ConcurrentHashMap<>();
    
    // 统计的时间间隔（比如每分钟重置一次计数）
    private final long interval;
    
    public RequestRateLimiter(long intervalInSeconds) {
        this.interval = intervalInSeconds;
        startResetTask();
    }

    /**
     * 每次用户访问时调用此方法
     * @param userId 用户的唯一标识符
     */
    public void recordRequest(String userId) {
        // 获取或者初始化用户的访问计数器
        userRequestCounts.computeIfAbsent(userId, key -> new LongAdder()).increment();
    }

    /**
     * 获取用户的当前访问次数
     * @param userId 用户的唯一标识符
     * @return 用户的访问次数
     */
    public long getRequestCount(String userId) {
        return userRequestCounts.getOrDefault(userId, new LongAdder()).sum();
    }

    /**
     * 定期重置每个用户的访问计数器
     */
    private void startResetTask() {
        // 定时任务，每隔指定的时间间隔重置计数
        new Thread(() -> {
            while (true) {
                try {
                    TimeUnit.SECONDS.sleep(interval);  // 等待指定的时间间隔
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
                // 重置每个用户的计数器
                userRequestCounts.clear();
            }
        }).start();
    }
    
    public static void main(String[] args) {
        RequestRateLimiter limiter = new RequestRateLimiter(60);  // 每分钟重置一次

        // 模拟用户请求
        limiter.recordRequest("user1");
        limiter.recordRequest("user1");

        System.out.println("User1's current request count: " + limiter.getRequestCount("user1"));  // 输出 2
    }
}
```

上述代码中，我们通过定时任务，每隔指定的时间间隔重置计数。

#### 统计访问频率 - 基于 Redis 统计（分布式）

如果项目多机分布式部署，那么就需要利用一个独立的持久化存储来统计访问频率。

分布式存储 Redis 的 string 结构支持 incr 累加操作，可以对每个用户分钟（或其他时间精度）级别的访问次数进行累加统计。

**1）设计 Redis 键值对**

要能区分出用户和时间窗，示例 key 为：`user:access:{userId}:{timestamp_in_minutes}`

- {userId} 是用户 ID。
- {timestamp_in_minutes} 是当前的分钟级时间戳，即将当前时间戳转化为分钟，这样每分钟的访问都会被统计到一个 key 中。

每个 key 的 value，就是该用户在这分钟内的访问次数。

**2）Redis 操作逻辑**

对 Redis 的操作包括设置 key、给 key 增加计数、给 key 设置过期时间。

听起来并不难，但很多同学可能会使用如下的代码：

```java
//假设使用 jedis 客户端
// 使用 Redis 的 INCR 操作增加当前秒的访问次数
jedis.incr(redisKey);

// 设置过期时间（TTL），例如只保存60秒的数据
jedis.expire(redisKey, 60);  // 60秒后自动过期
```

然而，这种方法存在潜在的设计陷阱：incr 和 expire 是两个独立的操作。如果你在高并发情况下调用 incr() 之后发生上下文切换（比如另一个线程执行操作），可能会导致两个问题：

1. 过期时间重置：如果在高并发场景下，多次调用 incr() 后又多次调用 expire()，可能会不断重置该 key 的过期时间，导致这个 key 永远不会过期。（当前场景不会，但是连续性访问的场景就有可能发生）
2. 非原子操作：由于 incr() 和 expire() 是独立操作，在并发情况下，两个线程都可能先判断 key 不存在，然后各自执行 set 操作，导致计数逻辑出错。

所以我们要确保计数和过期时间的操作是原子性的，可以使用 Redis 的 Lua 脚本来完成。如果 key 不存在，则初始化并设置过期时间，否则只进行计数。

示例脚本如下：

```lua
String luaScript = 
    "if redis.call('exists', KEYS[1]) == 1 then " +
    "  return redis.call('incr', KEYS[1]); " +
    "else " +
    "  redis.call('set', KEYS[1], 1); " +
    "  redis.call('expire', KEYS[1], 180); " +  // 设置 180 秒过期时间
    "  return 1; " +
    "end";
```

这里一定要给 Redis key 设置过期时间！因为统计超过一分钟，之前的数据就没什么用了。我选择 180 秒作为过期时间的目的是，给当前时间窗口（如 60 秒）多留一点冗余时间，以防止意外情况下需要用到历史记录，这是一个习惯。

------

对于我们的项目，主要的目的是反爬虫，而不是应对高并发大流量的请求，所以不需要结合 Sentinel 或 Hotkey 去精确统计流量。自主实现固定时间窗口（1 分钟）的访问频率统计就足够了。为了便于项目扩展为分布式，使用 Redis 方案来实现。

### 后端开发

#### 1、通用计数器

可以在 manager 包中封装一个计数器类，作为通用能力，便于复用。代码如下：

```java
@Slf4j
@Service
public class CounterManager {

    @Resource
    private RedissonClient redissonClient;

    /**
     * 增加并返回计数，默认统计一分钟内的计数结果
     *
     * @param key 缓存键
     * @return
     */
    public long incrAndGetCounter(String key) {
        return incrAndGetCounter(key, 1, TimeUnit.MINUTES);
    }

    /**
     * 增加并返回计数
     *
     * @param key          缓存键
     * @param timeInterval 时间间隔
     * @param timeUnit     时间间隔单位
     * @return
     */
    public long incrAndGetCounter(String key, int timeInterval, TimeUnit timeUnit) {
        int expirationTimeInSeconds;
        switch (timeUnit) {
            case SECONDS:
                expirationTimeInSeconds = timeInterval;
                break;
            case MINUTES:
                expirationTimeInSeconds = timeInterval * 60;
                break;
            case HOURS:
                expirationTimeInSeconds = timeInterval * 60 * 60;
                break;
            default:
                throw new IllegalArgumentException("Unsupported TimeUnit. Use SECONDS, MINUTES, or HOURS.");
        }

        return incrAndGetCounter(key, timeInterval, timeUnit, expirationTimeInSeconds);
    }

    /**
     * 增加并返回计数
     *
     * @param key                     缓存键
     * @param timeInterval            时间间隔
     * @param timeUnit                时间间隔单位
     * @param expirationTimeInSeconds 计数器缓存过期时间
     * @return
     */
    public long incrAndGetCounter(String key, int timeInterval, TimeUnit timeUnit, int expirationTimeInSeconds) {
        if (StrUtil.isBlank(key)) {
            return 0;
        }

        // 根据时间粒度生成 redisKey
        long timeFactor;
        switch (timeUnit) {
            case SECONDS:
                timeFactor = Instant.now().getEpochSecond() / timeInterval;
                break;
            case MINUTES:
                timeFactor = Instant.now().getEpochSecond() / 60 / timeInterval;
                break;
            case HOURS:
                timeFactor = Instant.now().getEpochSecond() / 3600 / timeInterval;
                break;
            default:
                throw new IllegalArgumentException("Unsupported TimeUnit. Use SECONDS, MINUTES, or HOURS.");
        }

        String redisKey = key + ":" + timeFactor;

        // Lua 脚本
        String luaScript =
                "if redis.call('exists', KEYS[1]) == 1 then " +
                        "  return redis.call('incr', KEYS[1]); " +
                        "else " +
                        "  redis.call('set', KEYS[1], 1); " +
                        "  redis.call('expire', KEYS[1], ARGV[1]); " +
                        "  return 1; " +
                        "end";

        // 执行 Lua 脚本
        RScript script = redissonClient.getScript(IntegerCodec.INSTANCE);
        Object countObj = script.eval(
                RScript.Mode.READ_WRITE,
                luaScript,
                RScript.ReturnType.INTEGER,
                Collections.singletonList(redisKey), expirationTimeInSeconds);
        return (long) countObj;
    }
}
```

其中，通过 Java 8 的 `java.time.Instant` 类获取 {timestamp_in_minutes}：

```java
// getEpochSecond 获取秒级时间戳，除以 60 为分钟，除以 3600 为小时
long timestampInMinutes = Instant.now().getEpochSecond() / 60;
```

通过 Redisson 提交 Lua 脚本到 Redis 执行：

```java
RScript script = redissonClient.getScript(IntegerCodec.INSTANCE);
Object countObj = script.eval(
        RScript.Mode.READ_WRITE,
        luaScript,
        RScript.ReturnType.INTEGER,
        Collections.singletonList(redisKey), expirationTimeInSeconds);
```

#### 2、检测爬虫逻辑

针对我们的需求，编写一个检测爬虫并分级处理的方法。每次请求题目时，都会调用该方法。

代码如下：

```java
@Resource
private CounterManager counterManager;

/**
 * 检测爬虫
 *
 * @param loginUserId
 */
private void crawlerDetect(long loginUserId) {
    // 调用多少次时告警
    final int WARN_COUNT = 10;
    // 超过多少次封号
    final int BAN_COUNT = 20;
    // 拼接访问 key
    String key = String.format("user:access:%s", loginUserId);
    // 一分钟内访问次数，180 秒过期
    long count = counterManager.incrAndGetCounter(key, 1, TimeUnit.MINUTES, 180);
    // 是否封号
    if (count > BAN_COUNT) {
        // 踢下线
        StpUtil.kickout(loginUserId);
        // 封号
        User updateUser = new User();
        updateUser.setId(loginUserId);
        updateUser.setUserRole("ban");
        userService.updateById(updateUser);
        throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "访问太频繁，已被封号");
    }
    // 是否告警
    if (count == WARN_COUNT) {
        // 可以改为向管理员发送邮件通知
        throw new BusinessException(110, "警告访问太频繁");
    }
}
```

#### 3、使用检测爬虫方法

在 getQuestionVOById 接口中调用检测爬虫的方法即可：

```java
@GetMapping("/get/vo")
public BaseResponse<QuestionVO> getQuestionVOById(long id, HttpServletRequest request) {
    ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
    // 检测和处置爬虫
    User loginUser = userService.getLoginUser(request);
    crawlerDetect(loginUser.getId());
    // 查询数据库
    Question question = questionService.getById(id);
    ThrowUtils.throwIf(question == null, ErrorCode.NOT_FOUND_ERROR);
    // 获取封装类
    return ResultUtils.success(questionService.getQuestionVO(question, request));
}
```

### 测试

通过接口文档调用获取题目接口，第 10 次时会触发告警、第 20 次时会触发封号：

![img](./assets/202409231710682.png)

查看数据库，会发现该用户已被封禁：

![img](./assets/202409231710716.png)

### 扩展

#### 1、配置动态化

可以将以下 2 个配置放到 Nacos 中，并通过 @Value 注解获取，支持动态调整反爬虫的配置：

```java
@NacosValue(value = "${warn.count:10}", autoRefreshed = true)
private Integer warnCount;

@NacosValue(value = "${ban.count:20}", autoRefreshed = true)
private Integer banCount;
```

包括 CounterManager 中的 timeInterval、timeUnit 这两个参数，也可以抽取为配置，放置到 Nacos 中。

#### 2、策略模式

可以用策略模式实现多种计数器，比如基于 LongAdder 的本地计数器，开发者可以自主选择使用何种计数器。

而且还可以将本地计数器作为 Redis 计数器统计异常的降级，这样即使项目没有配置 Redis 也可以使用。

#### 3、优化频率统计

目前每次统计都要请求 Redis，频率非常高的情况下，可能会对 Redis 造成压力。可以先本地聚合统计结果，每隔一段时间再统一发送给 Redis。这也是之前讲过的 Hotkey 的统计原理，在高并发点赞系统中，也可以运用类似的设计思路。

当然，也可以直接尝试结合 Hotkey 或 Sentinel 优化频率统计的精准度（采用滑动窗口统计）。

#### 4、提升检测爬虫的易用性

如果有更多接口需要检测爬虫，可以考虑封装一个检测爬虫的注解，并通过 AOP 进行扫描；使用时直接给要反爬的接口添加注解即可。