# Spring

## @Value

此注解如果使用static，注册不了值

## @Value和@ConfigurationProperties

### 🧠 一、`@ConfigurationProperties` 注入配置字段的核心机制

#### ✅ 支持的字段注入方式：

- **非静态字段（推荐）**
- **字段 + setter 方法**
- **字段 + 构造函数（需要配合 `@ConstructorBinding`）**

#### ❌ 不支持的字段注入方式：

- `static` 字段 ❌
- `final` 字段 ❌
- 没有 setter 方法的字段 ❌

---

### 🧠 二、为什么 `static` 字段不能直接注入？

- Spring 的 `@ConfigurationProperties` 是通过 **实例的 setter 方法注入值** 的。
- `static` 字段属于类，不属于实例对象。
- 即使写了 setter 方法，如果字段是 `static`，Spring 也不会识别。

---

### 🧠 三、为什么 [RuoYiConfig.java](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\config\RuoYiConfig.java) 的 `static` 字段能正常赋值？

因为：

```java
private String profile;

public void setProfile(String profile) {
    RuoYiConfig.profile = profile;
}
```


- ✅ 字段是 **非 static**
- ✅ setter 方法中 **手动赋值给 static 变量**
- ✅ Spring 注入的是实例字段，setter 被调用后赋值给 static 变量

> 这是推荐的做法：**字段非 static，setter 中赋值给 static 变量**

---

### 🧠 四、如何在工具类、异步任务等非 Bean 中访问配置值？

### ✅ 推荐做法：

```java
@Component
@ConfigurationProperties(prefix = "aliyun")
@Data
public class OssConfig {

    private String accessKeyId;
    private String accessKeySecret;
    private String bucket;
    private String dir;
    private String endpoint;
    private String region;
    private String dnsUrl;

    private static OssConfig staticConfig;

    @PostConstruct
    public void init() {
        staticConfig = this;
    }

    public static String getDnsUrl() {
        return staticConfig.dnsUrl;
    }
}
```


通过 [@PostConstruct](file://jakarta\annotation\PostConstruct.java#L2-L6) 把注入后的实例保存为 `static`，提供静态访问方法。

---

### 🧠 五、Spring 注入字段的完整流程

1. Spring 创建 [OssConfig](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\config\OssConfig.java#L18-L72) Bean
2. Spring 调用 `setAccessKeyId(...)` 等方法注入配置
3. [@PostConstruct](file://jakarta\annotation\PostConstruct.java#L2-L6) 被调用，将当前实例保存为 [staticConfig](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\config\OssConfig.java#L31-L31)
4. 静态方法如 [getDnsUrl()](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\config\OssConfig.java#L38-L40) 可以通过 `staticConfig.dnsUrl` 获取注入后的值

---

### 🧠 六、Lombok 的 `@Data` 对 `static` 字段的影响

- `@Data` 会为字段生成 `getter`、`setter`、`toString`、`equals` 等方法
- **但不会为 `static` 字段生成 setter 方法**
- 所以如果你的字段是 `static`，即使写了 `@Data`，注入也不会生效

---

### 🧠 七、`@Value` 与 `@ConfigurationProperties` 的区别

| 特性         | `@Value`                              | `@ConfigurationProperties` |
| ------------ | ------------------------------------- | -------------------------- |
| 注入方式     | 单个字段注入                          | 整体对象注入               |
| 支持 YAML    | ✅（需要配合 `PropertySourceFactory`） | ✅                          |
| 支持嵌套结构 | ❌                                     | ✅                          |
| 支持静态字段 | ❌                                     | ❌                          |
| 推荐场景     | 简单字段注入                          | 配置类、多字段注入         |

---

### 🧠 八、配置类推荐写法（最佳实践）

```java
@Component
@ConfigurationProperties(prefix = "aliyun")
@PropertySource("classpath:application-config.yml")
@Data
public class OssConfig {

    private String accessKeyId;
    private String accessKeySecret;
    private String bucket;
    private String dir;
    private String endpoint;
    private String region;
    private String dnsUrl;

    private static OssConfig staticConfig;

    @PostConstruct
    public void init() {
        staticConfig = this;
    }

    public static String getDnsUrl() {
        return staticConfig.dnsUrl;
    }
}
```


---

### 🧠 九、常见问题总结

| 问题                                                         | 原因                                                         | 解决方式                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `@ConfigurationProperties` 不注入值                          | 字段是 `static`                                              | 改为非 static，使用 `@Data`                                  |
| [getDnsUrl()](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\config\OssConfig.java#L38-L40) 为 `null` | [staticConfig](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\config\OssConfig.java#L31-L31) 未初始化 | 使用 [@PostConstruct](file://jakarta\annotation\PostConstruct.java#L2-L6) 初始化 |
| `@Data` 不生效                                               | 字段是 `static`                                              | 改为非 static                                                |
| `NullPointerException`                                       | 静态访问字段时 Spring 未完成注入                             | 确保 [@PostConstruct](file://jakarta\annotation\PostConstruct.java#L2-L6) 被调用后才访问 |
| 无法注入嵌套对象                                             | 未使用嵌套类                                                 | 使用嵌套类 + `@Data` + `@ConfigurationProperties`            |

---

### 🧠 十、总结一句话：

> **Spring 的 `@ConfigurationProperties` 不支持直接注入 `static` 字段。推荐使用非 static 字段 + `@Data` 自动生成 setter + [@PostConstruct](file://jakarta\annotation\PostConstruct.java#L2-L6) 保存静态引用，从而实现静态访问配置值的能力。**



## @Autiwired和@Resource 

`@Autowired` 和 [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) 都是用于依赖注入的注解，但在使用方式和行为上有明显区别。下面是对它们的核心差异总结：

---

### ✅ 1. 来源不同

| 注解                                                         | 来源                          | 所属框架             |
| ------------------------------------------------------------ | ----------------------------- | -------------------- |
| `@Autowired`                                                 | Spring 框架提供               | Spring               |
| [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) | Java 标准注解（属于 JSR-250） | Java EE / Jakarta EE |

---

### ✅ 2. 默认注入方式不同

| 注解                                                         | 默认按类型注入 | 默认按名称注入                   |
| ------------------------------------------------------------ | -------------- | -------------------------------- |
| `@Autowired`                                                 | ✅ 是           | ❌ 否                             |
| [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) | ❌ 否           | ✅ 是（默认字段名作为 Bean 名称） |

> 示例：
```java
@Resource
private AlipayPaymentConfig config; 
// 等价于查找名为 "config" 的 Bean

@Autowired
private AlipayPaymentConfig config;
// 查找匹配 AlipayPaymentConfig 类型的唯一 Bean
```


---

### ✅ 3. 是否支持指定 Bean 名称

| 注解                                                         | 支持 [name](file://jakarta\annotation\Resource.java#L8-L8) 属性 | 示例                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------- |
| `@Autowired`                                                 | ❌ 不支持                                                     | N/A                                       |
| [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) | ✅ 支持                                                       | `@Resource(name = "alipayPaymentConfig")` |

---

### ✅ 4. 使用推荐场景

| 场景                                 | 推荐注解                                                     |
| ------------------------------------ | ------------------------------------------------------------ |
| Spring 项目中注入 Bean               | ✅ `@Autowired`（更简洁、符合 Spring 编程习惯）               |
| 需要按名称注入 Bean                  | ✅ [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) |
| 非 Spring 管理的对象（如 JNDI 资源） | ✅ [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) |

---

### ✅ 5. 实际代码对比

```java
// 使用 @Autowired（推荐）
@Autowired
private AlipayPaymentConfig config;

// 使用 @Resource（需要指定名称才能正确注入）
@Resource(name = "alipayPaymentConfig")
private AlipayPaymentConfig config;
```


---

### ✅ 总结对比表

| 特性                                                         | `@Autowired` | [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) |
| ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |
| 来源                                                         | Spring 提供  | Java 提供（标准注解）                                        |
| 默认注入方式                                                 | 按类型       | 按名称                                                       |
| 是否支持 [name](file://jakarta\annotation\Resource.java#L8-L8) | ❌ 否         | ✅ 是                                                         |
| 是否适合 Spring 项目                                         | ✅ 强烈推荐   | ✅ 可用                                                       |
| 是否适用于非 Spring 对象                                     | ❌ 否         | ✅ 是                                                         |

---

📌 **结论：**

- 在 **Spring 项目中**，优先使用 `@Autowired`，简单、清晰、无需关心 Bean 名字。
- 如果你需要 **精确控制注入的 Bean 名称**，或在 **非 Spring 容器环境**下开发，可以使用 [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23)。

如果你当前已经知道 Bean 名为 `alipayPaymentConfig`，使用 [[@Resource](file://jakarta\annotation\Resource.java#L4-L23)](file://jakarta/annotation/Resource.java#L4-L23) 并显式指定 name 是没问题的。否则建议继续使用 `@Autowired`。



## Spring AOP代理问题及解决方案

### 问题描述

在Spring框架中，当我们在同一个类内部直接调用带有AOP注解（如自定义缓存注解 [@CustomCacheable](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\annotation\CustomCacheable.java#L11-L27)）的方法时，AOP代理不会生效。这是因为Spring AOP基于代理模式实现，只有通过Spring容器管理的Bean引用调用时才会触发AOP逻辑。

例如在 [PictureInfoServiceImpl](file://E:\Project\Picture\Code\Picture\picture-picture\src\main\java\com\lz\picture\service\impl\PictureInfoServiceImpl.java#L82-L1486) 类中：
```java
@Override
public UserPictureDetailInfoVo userSelectPictureInfoByPictureId(String pictureId, String userId) {
    // 直接调用不会触发AOP代理
    UserPictureDetailInfoVo userPictureDetailInfoVo = getUserPictureDetailInfoVo(pictureId);
    // ...
}
```


### 原因分析

1. Spring的缓存注解（包括自定义的 [@CustomCacheable](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\annotation\CustomCacheable.java#L11-L27)）是基于代理模式实现的
2. 当使用 `this.getUserPictureDetailInfoVo()` 方式调用时，绕过了Spring代理，直接调用了目标方法
3. 只有通过Spring容器管理的Bean引用调用时，才会触发AOP代理逻辑

### 解决方案

#### 方案一：自注入方式（推荐）

在类中注入自身实例，通过注入的引用来调用需要AOP增强的方法：

```java
@Service
public class PictureInfoServiceImpl extends ServiceImpl<PictureInfoMapper, PictureInfo> implements IPictureInfoService {
    // 注入自身实例
    @Resource
    private PictureInfoServiceImpl self;
    
    @Override
    public UserPictureDetailInfoVo userSelectPictureInfoByPictureId(String pictureId, String userId) {
        // 通过self调用，这样会走AOP代理
        UserPictureDetailInfoVo userPictureDetailInfoVo = self.getUserPictureDetailInfoVo(pictureId);
        // ... 后续逻辑
    }
}
```


#### 方案二：使用ApplicationContext获取代理对象

```java
@Service
public class PictureInfoServiceImpl extends ServiceImpl<PictureInfoMapper, PictureInfo> implements IPictureInfoService {
    @Resource
    private ApplicationContext applicationContext;
    
    private PictureInfoServiceImpl self;
    
    @PostConstruct
    private void init() {
        // 从ApplicationContext中获取当前Bean的代理对象
        self = applicationContext.getBean(PictureInfoServiceImpl.class);
    }
    
    @Override
    public UserPictureDetailInfoVo userSelectPictureInfoByPictureId(String pictureId, String userId) {
        // 通过self调用，这样会走AOP代理
        UserPictureDetailInfoVo userPictureDetailInfoVo = self.getUserPictureDetailInfoVo(pictureId);
        // ... 后续逻辑
    }
}
```


#### 方案三：使用AopContext获取当前代理

首先需要在启动类或配置类上添加：
```java
@EnableAspectJAutoProxy(exposeProxy = true)
@SpringBootApplication
public class Application {
    // ...
}
```


然后在需要的地方使用：
```java
@Override
public UserPictureDetailInfoVo userSelectPictureInfoByPictureId(String pictureId, String userId) {
    // 通过AopContext获取当前代理对象
    PictureInfoServiceImpl self = (PictureInfoServiceImpl) AopContext.currentProxy();
    UserPictureDetailInfoVo userPictureDetailInfoVo = self.getUserPictureDetailInfoVo(pictureId);
    // ... 后续逻辑
}
```


#### 方案四：手动处理缓存逻辑

如果上述方案不方便实施，可以在当前方法中手动处理缓存逻辑：

```java
private UserPictureDetailInfoVo getUserPictureDetailInfoVo(String pictureId) {
    //手动设置缓存，这里基本内部调用，spring没有托管，所以需要手动设置缓存
    String key = PICTURE_PICTURE_DETAIL + COMMON_SEPARATOR_CACHE + pictureId;
    if (redisCache.hasKey(key)) {
        return redisCache.getCacheObject(key);
    }
    // ... 执行业务逻辑
    redisCache.setCacheObject(key, userPictureDetailInfoVo, PictureRedisConstants.PICTURE_PICTURE_DETAIL_EXPIRE_TIME, TimeUnit.MINUTES);
    return userPictureDetailInfoVo;
}
```


### 推荐做法

推荐使用**自注入方式**，因为：

1. 简单直接：只需要添加一个字段和注入即可
2. 无需额外配置：不需要修改启动类或其他配置
3. 清晰明了：代码意图明确，其他人容易理解
4. 性能良好：Spring会正确处理循环依赖并提供代理对象

这种方式能确保调用带有 [@CustomCacheable](file://E:\Project\Picture\Code\Picture\picture-common\src\main\java\com\lz\common\annotation\CustomCacheable.java#L11-L27) 注解的方法时能够触发缓存逻辑。

# MP

## 实体类与数据库表映射异常

### 1. **检查 `MyBatis` 的自动配置**

在 Spring Boot 中，MyBatis 的自动配置默认会自动扫描 `Mapper`，并将其注册为 Spring Bean。你可以检查一下是否有手动配置或者与 Spring Boot 的自动配置产生冲突。

- 确保你没有手动配置 `Mybatis` 的 `SqlSessionFactoryBean` 或 `MapperScannerConfigurer`，这些配置会干扰 Spring Boot 的自动配置。

  如果你已经在配置文件中手动配置了 `SqlSessionFactory` 或 `MapperScannerConfigurer`，尝试去掉这些配置，交由 Spring Boot 自动配置处理。

### 2. **确认没有 Bean 名称冲突**

`SysConfigMapper` 类的名称可能与其他配置中的 `Bean` 名称冲突。Spring 中，`Mapper` 默认会被注册为 Bean，且名称通常为类名的小写形式。检查一下是否有其他 Bean 被注册成了 `sysConfigMapper`。

你可以在 `@Mapper` 注解中指定 Bean 名称来避免冲突：

```java
@Mapper("sysConfigMapper")
public interface SysConfigMapper extends BaseMapper<SysConfig> {
    // 自定义方法
}
```

这样可以避免自动生成的 Bean 名称冲突。

### 3. **检查 `@MapperScan` 的路径配置**

确保 `@MapperScan` 注解的路径配置正确。特别是检查你的 `@MapperScan` 是否正确指定了 `SysConfigMapper` 所在的包。

```java
@MapperScan("com.lz.system.mapper")  // 确保扫描到 Mapper 接口
```

如果 `SysConfigMapper` 位于子包中，路径配置也需要正确指定。

### 4. **MyBatis Plus 与 Spring Boot 3.x 的兼容性问题**

MyBatis Plus 3.x 和 Spring Boot 3.x 之间可能存在兼容性问题，尤其是在 Spring Boot 3.x 引入了很多新的特性，可能导致一些底层的自动配置和反射机制不兼容。

尝试使用以下步骤来解决兼容性问题：

- **升级 MyBatis Plus 版本**：如果你使用的 MyBatis Plus 版本较旧，可以尝试升级到最新的版本。例如，`mybatis-plus-boot-starter` 版本为 3.6.0 或更高版本：

  ```xml
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-boot-starter</artifactId>
      <version>3.6.0</version> <!-- 或者更高版本 -->
  </dependency>
  ```

  这可能会修复与 Spring Boot 3.x 的兼容性问题。

### 5. **检查 `factoryBeanObjectType` 配置**

由于错误信息中提到 `factoryBeanObjectType` 的类型是 `java.lang.String`，可以检查下 `SysConfigMapper` 类是否有任何异常的配置，特别是和 MyBatis 或 Spring Bean 相关的配置。

例如，检查是否有类似的配置：

```xml
<bean id="sysConfigMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
    <property name="mapperInterface" value="com.lz.system.mapper.SysConfigMapper" />
    <property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```

如果你手动配置了 `MapperFactoryBean`，确保 `mapperInterface` 的值是 `SysConfigMapper` 类，而不是 `String` 类型。

### 6. **排查是否存在 JAR 依赖冲突**

你可以使用 `mvn dependency:tree` 命令查看所有依赖的树状结构，检查是否存在版本冲突或重复的 JAR 包，特别是与 MyBatis、Spring Boot 和相关的数据库连接池（如 Druid、HikariCP）有关的库。

如果发现有版本冲突，可以尝试排除冲突的版本，或者在 `dependencyManagement` 中强制指定版本。

### 7. **手动检查 `application.yml` 配置**

确保你的 `application.yml` 或 `application.properties` 文件中没有任何无效的配置项。例如，检查数据库相关的配置是否正确。

```yaml
mybatis-plus:
  mapper-locations: classpath:/mapper/**/*.xml
  type-aliases-package: com.lz.system.entity
```

或者在 `application.properties` 中，检查数据库连接配置：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dbname
spring.datasource.username=username
spring.datasource.password=password
```

### 8. **启用详细的调试日志**

你可以启用更详细的日志级别，查看 Spring 在加载过程中发生的详细信息。这有助于定位问题出在哪个环节。

```yaml
logging:
  level:
    org.springframework.beans.factory: DEBUG
    org.springframework.context: DEBUG
```

这将帮助你查看 Spring 在加载时加载了哪些 Bean，并且是否加载了不正确的配置。

### 9.未找到主键

使用**@TableId("message_id")**注解指定主键，他默认只会找到字段名为**id**的主键。

### 总结

- 确保没有手动配置与 Spring Boot 自动配置冲突的 Bean。
- 检查 `@MapperScan` 路径配置。
- 升级 MyBatis Plus 版本以确保与 Spring Boot 3.x 的兼容性。
- 检查 JAR 依赖冲突。
- 调整 `SysConfigMapper` 的 Bean 配置，避免名称冲突。
- 通过调试日志输出获取更多的错误信息。

如果这些检查后问题依然存在，建议逐步回退并测试每个配置，逐步定位问题的根源。

## mybatis自动分页

#### **问题表现**

1. 在MySQL客户端能正常执行的SQL，通过MyBatis查询却返回空数据
2. 返回对象显示为分页对象：`Page{count=true, pageNum=0, ...}[]`
3. 出现Druid解析错误：`ParserException: not supported.pos... token LIMIT`
4. 实际数据为空数组`[]`，但分页信息显示有数据(`total=10`)

#### **根本原因分析**

##### 1. **分页插件自动激活**

- **触发机制**：
  - MyBatis分页插件(PageHelper)自动检测到参数对象中的`pageNum`和`pageSize`字段
  - 即使没有显式调用`PageHelper.startPage()`，插件仍会自动进行分页处理
- **后果**：
  - 原始查询被包装为分页查询
  - 实际执行两个SQL：先执行count查询，再执行分页查询
  - 返回类型被强制转为`Page`对象

##### 2. **Druid SQL解析限制**

- **技术限制**：
  - Druid SQL解析器不支持CTE(WITH子句)后直接使用LIMIT的语法
  - 这是Druid已知的语法解析限制
- **触发场景**：
  - 当分页插件执行count查询时尝试解析原始SQL
  - 解析器遇到CTE+LIMIT组合语法抛出异常

##### 3. **参数对象设计问题**

- **冲突字段**：

  ```
  private Integer pageNum;  // 触发分页插件
  private Integer pageSize; // 触发分页插件
  ```

- **后果**：

  - 标准字段名`pageNum`/`pageSize`被分页插件识别
  - 即使业务不需要分页，插件仍会强制干预

##### 4. **SQL结构问题**

- **语法兼容性**：

  ```
  WITH CTE AS (...) SELECT ... LIMIT ? OFFSET ?
  ```

- 虽然MySQL支持，但：

  - 某些SQL解析器不支持
  - 分页插件包装时出现冲突

#### **解决方案**

##### 1. **解决分页插件干扰**

```java
// 服务层代码
public List<UserPictureInfoVo> getPictureInfoDetailRecommend(...) {
    PageHelper.clearPage(); // 关键：清除分页设置
    req.setOffset((req.getCurrentPage() - 1) * req.getPageSize());
    List<PictureInfo> list = pictureInfoMapper.getPictureInfoDetailRecommend(req);
    // ...
}
```

```yml
# application.yml 配置
pagehelper:
  auto-runtime-dialect: false
  support-methods-arguments: false
  params: ""
```

##### 2. **重构参数对象**

```java
@Data
public class PictureInfoRecommendRequest {
    // 重命名字段避免冲突
    private Integer currentPage;  // 原pageNum
    private Integer sizePerPage;  // 原pageSize
    private Integer offset;
    
    // 添加偏移量计算方法
    public void calculateOffset() {
        this.offset = (this.currentPage - 1) * this.sizePerPage;
    }
}
```

##### 3. **修复SQL兼容性**

```sql
<select id="getPictureInfoDetailRecommend">
  SELECT * FROM (
    WITH origin_tags AS (...),
         matched_images AS (...)
    SELECT ... 
    ORDER BY ...
  ) AS wrapped_query <!-- 关键包装层 -->
  LIMIT #{sizePerPage}
  OFFSET #{offset}
</select>
```

##### 4. **优化SQL逻辑**

```sql
COUNT(DISTINCT CASE 
     WHEN rel.tag_name IN (SELECT tag_name FROM origin_tags) 
     THEN rel.tag_name 
 END) AS exact_match_count
```

#### **预防措施**

1. **分页插件使用规范**：

   - 避免在参数对象中使用`pageNum`/`pageSize`标准名
   - 显式调用`PageHelper.startPage()`或`clearPage()`
   - 在非分页查询前强制清除分页设置

2. **SQL设计原则**：

   - 复杂查询（含CTE）使用子查询包装
   - 避免在CTE后直接使用LIMIT/OFFSET
   - 为分页参数设置合理的默认值

3. **参数对象设计**：

   ```java
   public class QueryParam {
       private Integer current = 1;  // 当前页
       private Integer size = 10;    // 每页大小
       @JsonIgnore                  // 防止序列化
       private transient Integer offset; // 计算字段
   }
   ```

4. **日志监控**：

   ```yml
   logging:
     level:
       com.github.pagehelper: DEBUG
       com.alibaba.druid: WARN
   ```

<svg role="graphics-document document" viewBox="0 0 912.6146240234375 868.09375" class="flowchart mermaid-svg" xmlns="http://www.w3.org/2000/svg" width="100%" id="mermaid-svg-1" style="max-width: 912.615px; transform-origin: 0px 0px; user-select: none; transform: translate(77.8554px, 0px) scale(0.792938);"><g><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-1_flowchart-v2-pointEnd"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z"></path></marker><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="4.5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-1_flowchart-v2-pointStart"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="11" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-1_flowchart-v2-circleEnd"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="-1" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-1_flowchart-v2-circleStart"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="12" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-svg-1_flowchart-v2-crossEnd"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="-1" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-svg-1_flowchart-v2-crossStart"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><g class="root"><g class="clusters"></g><g class="edgePaths"><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_A_B_0" d="M458.961,62L458.961,66.167C458.961,70.333,458.961,78.667,459.031,86.417C459.101,94.167,459.242,101.334,459.312,104.917L459.383,108.501"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_B_C_0" d="M410.606,267.739L397.381,281.965C384.155,296.191,357.704,324.642,344.478,349.535C331.253,374.427,331.253,395.76,331.253,415.094C331.253,434.427,331.253,451.76,331.253,463.927C331.253,476.094,331.253,483.094,331.253,486.594L331.253,490.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_C_D_0" d="M331.253,548.094L331.253,552.26C331.253,556.427,331.253,564.76,331.253,572.427C331.253,580.094,331.253,587.094,331.253,590.594L331.253,594.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_B_E_0" d="M508.316,267.739L521.375,281.965C534.433,296.191,560.551,324.642,573.61,344.368C586.669,364.094,586.669,375.094,586.669,380.594L586.669,386.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_E_F_0" d="M586.669,444.094L586.669,448.26C586.669,452.427,586.669,460.76,586.669,468.427C586.669,476.094,586.669,483.094,586.669,486.594L586.669,490.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_F_G_0" d="M586.669,548.094L586.669,552.26C586.669,556.427,586.669,564.76,586.669,572.427C586.669,580.094,586.669,587.094,586.669,590.594L586.669,594.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_D_H_0" d="M331.253,652.094L331.253,656.26C331.253,660.427,331.253,668.76,341.587,677.135C351.92,685.509,372.588,693.925,382.922,698.133L393.256,702.34"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_G_H_0" d="M586.669,652.094L586.669,656.26C586.669,660.427,586.669,668.76,576.335,677.135C566.001,685.509,545.333,693.925,535,698.133L524.666,702.34"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_H_I1_0" d="M396.961,738.333L349.134,745.459C301.307,752.586,205.654,766.84,157.827,777.467C110,788.094,110,795.094,110,798.594L110,802.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_H_I2_0" d="M399.948,756.094L390.842,760.26C381.735,764.427,363.521,772.76,354.414,780.427C345.307,788.094,345.307,795.094,345.307,798.594L345.307,802.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_H_I3_0" d="M517.973,756.094L527.08,760.26C536.187,764.427,554.401,772.76,563.508,780.427C572.615,788.094,572.615,795.094,572.615,798.594L572.615,802.094"></path><path marker-end="url(#mermaid-svg-1_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_H_I4_0" d="M520.961,738.262L569.237,745.401C617.512,752.539,714.063,766.816,762.339,777.455C810.615,788.094,810.615,795.094,810.615,798.594L810.615,802.094"></path></g><g class="edgeLabels"><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g transform="translate(331.25260162353516, 417.09375)" class="edgeLabel"><g transform="translate(-8, -12)" class="label"><foreignObject height="24" width="16"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"><p style="margin: 0px; background-color: rgba(232, 232, 232, 0.8);">是</p></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g transform="translate(586.6692657470703, 353.09375)" class="edgeLabel"><g transform="translate(-8, -12)" class="label"><foreignObject height="24" width="16"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"><p style="margin: 0px; background-color: rgba(232, 232, 232, 0.8);">否</p></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div class="labelBkg" xmlns="http://www.w3.org/1999/xhtml" style="background-color: rgba(232, 232, 232, 0.5); display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51); background-color: rgba(232, 232, 232, 0.8); text-align: center;"></span></div></foreignObject></g></g></g><g class="nodes"><g transform="translate(458.96093368530273, 35)" id="flowchart-A-0" class="node default"><rect height="54" width="124" y="-27" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">问题现象</p></span></div></foreignObject></g></g><g transform="translate(458.96093368530273, 214.046875)" id="flowchart-B-1" class="node default"><polygon transform="translate(-102.046875,102.046875)" class="label-container" points="102.046875,0 204.09375,-102.046875 102.046875,-204.09375 0,-102.046875"></polygon><g transform="translate(-75.046875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="150.09375"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">MyBatis返回分页对象</p></span></div></foreignObject></g></g><g transform="translate(331.25260162353516, 521.09375)" id="flowchart-C-3" class="node default"><rect height="54" width="188" y="-27" x="-94" style="" class="basic label-container"></rect><g transform="translate(-64, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="128"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">分页插件自动激活</p></span></div></foreignObject></g></g><g transform="translate(331.25260162353516, 625.09375)" id="flowchart-D-5" class="node default"><rect height="54" width="245.36459350585938" y="-27" x="-122.68229675292969" style="" class="basic label-container"></rect><g transform="translate(-92.68229675292969, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="185.36459350585938"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">参数含pageNum/pageSize</p></span></div></foreignObject></g></g><g transform="translate(586.6692657470703, 417.09375)" id="flowchart-E-7" class="node default"><rect height="54" width="150.61458587646484" y="-27" x="-75.30729293823242" style="" class="basic label-container"></rect><g transform="translate(-45.30729293823242, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="90.61458587646484"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">SQL执行异常</p></span></div></foreignObject></g></g><g transform="translate(586.6692657470703, 521.09375)" id="flowchart-F-9" class="node default"><rect height="54" width="162.25" y="-27" x="-81.125" style="" class="basic label-container"></rect><g transform="translate(-51.125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="102.25"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">Druid解析失败</p></span></div></foreignObject></g></g><g transform="translate(586.6692657470703, 625.09375)" id="flowchart-G-11" class="node default"><rect height="54" width="165.46875" y="-27" x="-82.734375" style="" class="basic label-container"></rect><g transform="translate(-52.734375, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="105.46875"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">CTE+LIMIT语法</p></span></div></foreignObject></g></g><g transform="translate(458.96093368530273, 729.09375)" id="flowchart-H-13" class="node default"><rect height="54" width="124" y="-27" x="-62" style="" class="basic label-container"></rect><g transform="translate(-32, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">解决方案</p></span></div></foreignObject></g></g><g transform="translate(110, 833.09375)" id="flowchart-I1-17" class="node default"><rect height="54" width="204" y="-27" x="-102" style="" class="basic label-container"></rect><g transform="translate(-72, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="144"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">重命名分页参数字段</p></span></div></foreignObject></g></g><g transform="translate(345.30728912353516, 833.09375)" id="flowchart-I2-19" class="node default"><rect height="54" width="166.61458587646484" y="-27" x="-83.30729293823242" style="" class="basic label-container"></rect><g transform="translate(-53.30729293823242, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="106.61458587646484"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">SQL添加包装层</p></span></div></foreignObject></g></g><g transform="translate(572.6145782470703, 833.09375)" id="flowchart-I3-21" class="node default"><rect height="54" width="188" y="-27" x="-94" style="" class="basic label-container"></rect><g transform="translate(-64, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="128"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">显式清除分页设置</p></span></div></foreignObject></g></g><g transform="translate(810.6145782470703, 833.09375)" id="flowchart-I4-23" class="node default"><rect height="54" width="188" y="-27" x="-94" style="" class="basic label-container"></rect><g transform="translate(-64, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="128"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel" style="fill: rgb(51, 51, 51); color: rgb(51, 51, 51);"><p style="margin: 0px;">禁用自动分页检测</p></span></div></foreignObject></g></g></g></g></g></svg>

通过以上措施，可同时解决：

1. 分页插件强制干预问题
2. Druid SQL解析失败问题
3. 参数设计与SQL兼容性问题
4. 实际业务数据返回异常问题

# Json

## 问题记录：JSON解析导致的`ClassCastException`（`Integer`无法转换为`Long`）

**源代码**

```java
    @Override
    public InformTemplateInfo getInformTemplateInfoByVersion(InformTemplateInfoVersionQuery informTemplateInfoVersionQuery) {
        InformTemplateInfo info = informTemplateInfoMapper.selectInformTemplateInfoByTemplateId(informTemplateInfoVersionQuery.getTemplateId());
        if (StringUtils.isNull(info)) {
            throw new ServiceException("通知模版不存在");
        }
        HashMap<Long, String> parse = (HashMap<Long, String>) JSONObject.parseObject(info.getTemplateVersionHistory(), HashMap.class);
        Long templateVersion = informTemplateInfoVersionQuery.getTemplateVersion();
        System.out.println("templateVersion = " + templateVersion);
//        if (!parse.containsKey(templateVersion)) {
//            throw new ServiceException("指定的通知模版版本不存在");
//        }
        for (Map.Entry<Long, String> longStringEntry : parse.entrySet()) {
            System.out.println("Key type: " + longStringEntry.getKey().getClass().getName());
            System.out.println(longStringEntry.getKey());
            System.out.println("parse = " + parse.get(longStringEntry.getKey()));
        }
        String informTemplateInfoHistory = parse.get(templateVersion);
        System.out.println("informTemplateInfoHistory = " + informTemplateInfoHistory);
        return InformTemplateInfoHistory.getInformTemplateInfoByVersion(informTemplateInfoHistory);
    }
```

**修改后**

```java
    @Override
    public InformTemplateInfo getInformTemplateInfoByVersion(InformTemplateInfoVersionQuery informTemplateInfoVersionQuery) {
        InformTemplateInfo info = informTemplateInfoMapper.selectInformTemplateInfoByTemplateId(informTemplateInfoVersionQuery.getTemplateId());
        if (StringUtils.isNull(info)) {
            throw new ServiceException("通知模版不存在");
        }
        // 使用 TypeReference 明确指定键为 Long 类型
        HashMap<Long, String> parse = JSON.parseObject(
                info.getTemplateVersionHistory(),
                new TypeReference<HashMap<Long, String>>() {}
        );
        Long templateVersion = informTemplateInfoVersionQuery.getTemplateVersion();
        System.out.println("templateVersion = " + templateVersion);
        if (!parse.containsKey(templateVersion)) {
            throw new ServiceException("指定的通知模版版本不存在");
        }
        for (Map.Entry<Long, String> longStringEntry : parse.entrySet()) {
            System.out.println("Key type: " + longStringEntry.getKey().getClass().getName());
            System.out.println(longStringEntry.getKey());
            System.out.println("parse = " + parse.get(longStringEntry.getKey()));
        }
        String informTemplateInfoHistory = parse.get(templateVersion);
        System.out.println("informTemplateInfoHistory = " + informTemplateInfoHistory);
        return InformTemplateInfoHistory.getInformTemplateInfoByVersion(informTemplateInfoHistory);
    }
```



#### **问题背景**

在通过版本号查询通知模板历史记录时，出现以下错误：

```
 java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.Long
```

原因是代码中尝试用 `Long` 类型的键去查询 `HashMap<Long, String>`，但实际 JSON 解析后的键为 `Integer` 类型。

#### **问题复现**

- **触发条件** 调用接口 `/config/informTemplateInfo/version`，传入 `templateVersion=2`（`Long` 类型参数）。

- **关键代码**

  ```
  JavaHashMap<Long, String> parse = (HashMap<Long, String>) JSONObject.parseObject(info.getTemplateVersionHistory(), HashMap.class);
  Long templateVersion = query.getTemplateVersion();
  String history = parse.get(templateVersion); // 此处报错
  ```

- **日志分析**

  ```
   Key type: java.lang.Integer  // 实际键类型为 Integer
  templateVersion = 2          // 查询参数为 Long 类型
  informTemplateInfoHistory = null
  ```

#### **根本原因**

1. **JSON 反序列化类型推断问题** FastJSON 默认将 JSON 中的数字类型解析为 `Integer`（若数值较小），而代码期望键为 `Long` 类型。
2. **类型不匹配** `parse` 的键实际为 `Integer` 类型，但代码尝试用 `Long` 类型的 `templateVersion` 查询，导致 `ClassCastException`。

#### **解决方案**

使用 FastJSON 的 `TypeReference` 强制指定键值类型，确保反序列化后的键为 `Long` 类型。

**修改后的代码：**

```java
Javaimport com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

HashMap<Long, String> parse = JSON.parseObject(
    info.getTemplateVersionHistory(),
    new TypeReference<HashMap<Long, String>>() {}
);
```

#### **关键修改点**

1. **替换解析方式** 使用 `JSON.parseObject` 替代 `JSONObject.parseObject`，配合 `TypeReference` 明确类型。
2. **类型一致性** 确保 `HashMap` 的键类型（`Long`）与查询参数 `templateVersion` 类型完全一致。

#### **验证步骤**

1. **添加日志检查键类型**

   ```java
   Javafor (Map.Entry<Long, String> entry : parse.entrySet()) {
       System.out.println("Key type: " + entry.getKey().getClass().getName());
   }
   ```

   输出应为 `java.lang.Long`。

2. **测试查询** 传入 `templateVersion=2`，确认能正确返回历史记录且无空值。

#### **注意事项**

1. **FastJSON 版本依赖** 确保使用 FastJSON ≥1.2.83（旧版本可能不支持 `TypeReference` 泛型解析）。

   ```
   XML<dependency>
       <groupId>com.alibaba</groupId>
       <artifactId>fastjson</artifactId>
       <version>1.2.83</version>
   </dependency>
   ```

2. **备选方案** 如果版本号较小（不超过 `Integer.MAX_VALUE`），可将 `templateVersion` 类型改为 `Integer`，但需全局统一类型。

#### **问题总结**

- **教训** JSON 反序列化时，默认类型推断可能与预期不一致，需通过 `TypeReference` 显式指定类型。
- **改进点** 所有涉及 JSON 解析的地方，避免直接使用 `HashMap.class`，优先指定明确类型。