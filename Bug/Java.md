# Spring

## @Value

此注解如果使用static，注册不了值



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