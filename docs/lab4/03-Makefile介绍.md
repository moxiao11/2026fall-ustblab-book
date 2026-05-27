# Makefile 介绍

## 一、什么是 Makefile

Makefile 是一个**编译脚本**，告诉 `make` 工具如何编译项目。不用每次手动敲一长串 `g++` 命令，一条 `make` 就搞定。

```bash
make          # 编译
make test     # 编译并运行测试
make run      # 编译并运行程序
make clean    # 清理编译产物
```

## 二、基本语法

### 2.1 变量

```makefile
CXX = g++                    # 定义变量 CXX，值为 g++
CXXFLAGS = -std=c++11 -Wall  # 编译选项

# 使用时用 $() 包裹
$(CXX) $(CXXFLAGS) -o main main.cpp
```

### 2.2 规则（Rule）

```makefile
目标: 依赖
	命令                    # ← 注意：命令前必须是 TAB 键，不能用空格
```

- **目标**：要生成的文件名，或一个操作名（如 `clean`）
- **依赖**：目标依赖哪些文件。任一依赖有变动，就重新执行命令
- **命令**：实际执行的 shell 命令

```makefile
gacha: main.cpp GachaSystem.cpp
	g++ -std=c++11 -o gacha main.cpp GachaSystem.cpp
# ↑ TAB 键开头
```

### 2.3 伪目标

有些目标不是文件，只是一个操作名（如 `all`、`test`、`run`、`clean`）。make 默认会把目标当文件名处理，若碰巧存在同名文件会出问题。

本实验没有显式声明 `.PHONY`，但 `test`、`run`、`clean` 这类操作型的命名不会与文件名冲突，直接用即可。

## 三、lab4 的 Makefile 逐段解析

### 3.1 变量定义

```makefile
CXX = g++                    # 编译器
CXXFLAGS = -std=c++11 -Wall -Wextra   # 编译选项

TARGET = gacha               # 主程序名
TEST_TARGET = test           # 测试程序名

SRC = main.cpp GachaSystem.cpp Item.cpp        # 主程序源文件
TEST_SRC = test.cpp GachaSystem.cpp Item.cpp    # 测试程序源文件
```

编译选项含义：

| 选项 | 含义 |
|------|------|
| `-std=c++11` | 使用 C++11 标准 |
| `-Wall` | 开启常见警告（Warning all）|
| `-Wextra` | 开启额外警告 |

> 注意这里**没有包含 `.tpp` 和 `.h` 文件**——它们不是编译单元，由 `#include` 间接引入。

### 3.2 默认目标：all

```makefile
all: $(TARGET)               # make 不带参数时默认执行第一个目标
```

这里 `all` 依赖 `$(TARGET)`（即 `gacha`），所以 make 会先去构建 `gacha`。

### 3.3 编译主程序

```makefile
$(TARGET): $(SRC) GachaPool.h GachaPool.tpp Inventory.h Inventory.tpp GachaSystem.h Item.h Rarity.h
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(SRC)
```

分解一下：

```
gacha: main.cpp GachaSystem.cpp Item.cpp GachaPool.h ... Rarity.h
    g++ -std=c++11 -Wall -Wextra -o gacha main.cpp GachaSystem.cpp Item.cpp
```

- **依赖**列出了所有 `.cpp` 和头文件。任何头文件改动都会触发重新编译
- **命令**就是展开变量后的一句 `g++` 编译命令
- `-o gacha` 指定输出文件名为 `gacha`

### 3.4 编译并运行测试

```makefile
test: $(TEST_SRC) GachaPool.h GachaPool.tpp Inventory.h Inventory.tpp GachaSystem.h Item.h Rarity.h
	$(CXX) $(CXXFLAGS) -o $(TEST_TARGET) $(TEST_SRC)
	./$(TEST_TARGET)
```

- 与主程序类似的编译命令，只是源文件换成了 `test.cpp GachaSystem.cpp Item.cpp`
- 第二条命令 `./test` 直接运行编译出的测试程序
- 所以 `make test` 会**先编译再自动跑测试**

### 3.5 编译并运行程序

```makefile
run: $(TARGET)
	./$(TARGET)
```

依赖 `gacha`，确保先编译再运行。

### 3.6 清理

```makefile
clean:
ifeq ($(OS),Windows_NT)
	-if exist $(TARGET).exe del /Q /F $(TARGET).exe
	-if exist $(TEST_TARGET).exe del /Q /F $(TEST_TARGET).exe
else
	rm -f $(TARGET) $(TEST_TARGET) *.exe
endif
```

- `ifeq ($(OS),Windows_NT)` — 条件判断，检查当前是否 Windows 系统
- `-if exist` — 开头的 `-` 表示"这行命令失败了也别停，继续执行"
- Windows 用 `del`，Linux/Mac 用 `rm -f`
- `/Q` 安静模式，`/F` 强制删除只读文件

## 四、完整文件

```makefile
CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra

TARGET = gacha
TEST_TARGET = test

SRC = main.cpp GachaSystem.cpp Item.cpp
TEST_SRC = test.cpp GachaSystem.cpp Item.cpp

all: $(TARGET)

$(TARGET): $(SRC) GachaPool.h GachaPool.tpp Inventory.h Inventory.tpp GachaSystem.h Item.h Rarity.h
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(SRC)

test: $(TEST_SRC) GachaPool.h GachaPool.tpp Inventory.h Inventory.tpp GachaSystem.h Item.h Rarity.h
	$(CXX) $(CXXFLAGS) -o $(TEST_TARGET) $(TEST_SRC)
	./$(TEST_TARGET)

run: $(TARGET)
	./$(TARGET)

clean:
ifeq ($(OS),Windows_NT)
	-if exist $(TARGET).exe del /Q /F $(TARGET).exe
	-if exist $(TEST_TARGET).exe del /Q /F $(TEST_TARGET).exe
else
	rm -f $(TARGET) $(TEST_TARGET) *.exe
endif
```

## 五、常用命令速查

```bash
make            # 编译主程序（生成 gacha.exe）
make test       # 编译测试程序并运行
make run        # 编译主程序并运行
make clean      # 删除所有编译产物
```
