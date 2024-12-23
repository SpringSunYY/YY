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