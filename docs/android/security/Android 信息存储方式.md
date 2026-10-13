# Android 信息存储方式

## db数据库本地存储

**是什么**
DB 数据库本地存储通常指 SQLite 数据库，适合保存结构化、关系型、需要增删改查和事务支持的数据。

**适用场景**

* 用户表、订单表、消息记录、离线缓存等结构化数据
* 数据量大、需要分页、排序、条件查询
* 多表关联、事务一致性要求较高
* 需要长期持久化，应用卸载前一直存在

**存储位置**
应用私有目录：

**text**

```
/data/data/<包名>/databases/<数据库名>.db
```

无需额外存储权限，应用卸载后一般会删除。

**常用实现**

* 原生：`SQLiteOpenHelper`、`SQLiteDatabase`
* 推荐：`Room`，对 SQLite 做了一层封装，支持编译期校验、DAO、LiveData/Flow
* 加密：SQLCipher，适合敏感数据
* 注意数据库版本升级和 Migration，避免升级后崩溃或数据丢失

**Room 简单示例**

**kotlin**

```
@Entity(tableName = "user")
data class UserEntity(
    @PrimaryKey val id: Long,
    val name: String,
    val token: String?
)

@Dao
interface UserDao {
    @Query("SELECT * FROM user WHERE id = :id")
    fun findById(id: Long): UserEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun upsert(user: UserEntity)
}

@Database(entities = [UserEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

使用：

**kotlin**

```
val db = Room.databaseBuilder(
    context,
    AppDatabase::class.java,
    "app.db"
).build()

db.userDao().upsert(UserEntity(1, "Tom", "token_xxx"))
```

**注意事项**

* 数据库操作不要放在主线程，避免 ANR
* 大量写入使用事务
* 敏感字段建议加密存储
* 设计好索引，避免全表扫描
* 数据库迁移必须测试
* `allowBackup` 可能把数据库备份到云端，敏感数据应排除

---

## sp本地存储

SharedPreferences 如何用于保存用户偏好参数，比如是否自动登录、是否记住密码等。

它本质上是一个轻量级的键值对 (Key-Value) 存储，数据以 XML 文件形式保存在应用私有目录中。

**存储位置**

**text**

```
/data/data/<包名>/shared_prefs/<文件名>.xml
```

**适合保存的内容**

* 是否自动登录
* 是否记住密码，建议只存标记，不存明文密码
* 是否首次启动
* 主题、语言、字体大小
* 用户偏好开关
* 上次登录用户名、token、token 过期时间等

**简单示例**

**kotlin**

```
val sp = context.getSharedPreferences("user_prefs", Context.MODE_PRIVATE)

// 保存
sp.edit()
    .putBoolean("auto_login", true)
    .putString("auth_token", token)
    .putLong("token_expire_at", expireAt)
    .apply()

// 读取
val autoLogin = sp.getBoolean("auto_login", false)
val token = sp.getString("auth_token", null)
```

**apply 与 commit 区别**

* `apply()`：异步写入，不返回结果，常用
* `commit()`：同步写入，返回是否成功，避免在主线程频繁调用

**安全提醒**

* 不要明文保存密码，推荐保存 token 或加密后的凭证
* 可结合 Android Keystore 加密后存入 SP/DataStore
* 旧项目可能使用 `EncryptedSharedPreferences`，但新项目更推荐 Keystore + DataStore
* Root 设备、备份、调试环境可能读取 SP 文件

**替代方案**
Jetpack `DataStore` 是 SharedPreferences 的现代替代方案，支持异步、事务、类型安全，推荐新项目使用。

* Preferences DataStore：适合键值对
* Proto DataStore：适合强类型结构化配置

**注意事项**

* 不适合保存大量数据
* 不适合复杂查询
* 多进程访问不可靠，`MODE_MULTI_PROCESS` 已废弃，不建议使用
* 应用卸载或清除数据后会被删除

---

## temp file临时文件

**是什么**
临时文件用于保存应用运行过程中产生的、可随时重建、不要求长期持久化的数据。

**常见目录**

内部缓存目录：

**kotlin**

```
context.cacheDir
// /data/data/<包名>/cache/
```

外部缓存目录：

**kotlin**

```
context.externalCacheDir
// /storage/emulated/0/Android/data/<包名>/cache/
```

内部缓存无需权限；外部私有缓存目录在 Android 4.4+ 通常也无需权限，但可能不可用。

**适用场景**

* 图片、视频、文件下载缓存
* 网络请求缓存
* 解压中间文件
* 上传前的压缩文件
* 分享、裁剪、拍照产生的临时文件
* 日志临时缓存

**创建与使用示例**

**kotlin**

```
val tempFile = File.createTempFile("download_", ".tmp", context.cacheDir)

tempFile.outputStream().use { output ->
    output.write(bytes)
}

// 使用完成后及时删除
tempFile.delete()
```

**清理缓存示例**

**kotlin**

```
context.cacheDir.listFiles()?.forEach { file ->
    file.deleteRecursively()
}
```

**特点与注意事项**

* 系统存储空间不足时可能自动清理缓存目录
* 用户点击“清除缓存”会删除这些文件
* 应用卸载后一般会删除
* 不能把重要数据只放在临时文件中
* 文件命名要唯一，避免并发冲突
* 使用后及时关闭流并删除文件
* 大文件优先放外部缓存目录，但要做好不存在时的兜底
* 敏感临时文件应放内部缓存，使用后立即删除，必要时加密
* 可设置过期时间、最大缓存大小和 LRU 清理策略

---

## 选型对比

| 存储方式  | 数据形态     | 适合场景                 | 生命周期 | 是否可被系统清理  |
| --------- | ------------ | ------------------------ | -------- | ----------------- |
| DB 数据库 | 结构化表数据 | 大量数据、复杂查询、事务 | 长期持久 | 清除数据/卸载删除 |
| SP        | Key-Value    | 少量配置、偏好参数       | 长期持久 | 清除数据/卸载删除 |
| 临时文件  | 文件         | 缓存、下载、中间文件     | 临时     | 可被系统/用户清理 |
