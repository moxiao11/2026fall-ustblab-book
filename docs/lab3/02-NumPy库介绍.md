# NumPy 库介绍

## 1. NumPy 是什么

NumPy 是 Python 里做科学计算的基础库。它的核心是一个叫 **ndarray**（N-dimensional array，多维数组）的数据结构。

```python
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])

print(a.shape)   # (2, 3)
print(a[0, 1])   # 2
```

NumPy 之所以快，是因为：

- 数据存在**连续内存**里
- 运算用 C 写成，不走 Python 循环
- 通过 **strides（步长）** 实现零拷贝的 reshape、切片、转置

本实验就是要在 C++ 里做一个简化版的 `NdArray`。

---

## 2. 多维数组的内存布局

计算机内存是一维的。把多维数组存进去，得先把多维下标"铺平"成一维偏移量。

### row-major（行优先）—— 本实验使用的规则

**最后一维变化最快**。C/C++ 默认使用这个规则。

```
逻辑视图 (2x3):          内存布局 (row-major):
┌───────────┐            [0] [1] [2] [3] [4] [5]
│ a  b  c   │             ↑── row 0 ──↑ ↑── row 1 ──↑
│ d  e  f   │
└───────────┘
```

### column-major（列优先）

第一维变化最快。Fortran 和 MATLAB 用这个。

```
逻辑视图 (2x3):          内存布局 (column-major):
┌───────────┐            [0] [1] [2] [3] [4] [5]
│ a  b  c   │             ↑─ col 0 ─↑ ↑─ col 1 ─↑ ...
│ d  e  f   │
└───────────┘
```

本实验只关心 row-major。

---

## 3. strides 是什么

**strides（步长）** 告诉你在内存中"沿着某一维走一步，要跨过多少个元素"。

### 计算规则（row-major）

```
最后一维 strides = 1
往前：strides[i] = strides[i+1] * shape[i+1]
```

例子：

```
shape   = {2, 3, 4}
strides = {12, 4, 1}
          ↑   ↑  ↑
          2*4 4*1 固定
```

验证：元素 `(i, j, k)` 的偏移量：

```
offset = i * 12 + j * 4 + k * 1
```

- `(0, 0, 0)` → 0
- `(0, 0, 3)` → 3
- `(0, 1, 0)` → 4（跨过第 0 行的 4 个元素）
- `(1, 0, 0)` → 12（跨过第 0 个矩阵的 12 个元素）

### 为什么 strides 很重要

有了 strides，很多操作只需要改 shape 和 strides，**不用拷贝数据**：

| 操作 | 怎么做 |
|---|---|
| reshape | 改 shape，重算 strides（数据不动） |
| transpose | 交换 shape 和 strides（数据不动） |
| slice | 改 shape / strides / 起始偏移（数据不动） |

这让 NumPy 在处理 GB 级数据时依然高效。本实验的第一阶段先不涉及这些，但理解 strides 是后续的基础。

---

## 4. NdArray 的核心设计

```
┌─────────────────────────────────┐
│          NdArray<T>             │
├─────────────────────────────────┤
│  data_   : vector<T>            │ ← 一维连续存储所有元素
│  shape_  : vector<int>          │ ← 各维度大小，如 {2, 3}
│  strides_: vector<int>          │ ← 各维度步长，如 {3, 1}
├─────────────────────────────────┤
│  NdArray(shape)                 │ ← 构造
│  shape() / size() / ndim()      │ ← 访问属性
│  operator()({i, j, ...})        │ ← 多维下标访问
│  zeros(shape) / ones(shape)     │ ← 工厂方法
│  full(shape, value)             │ ← 填充指定值
│  arange(start, end, step)       │ ← 等差数组
│  fill(value)                    │ ← 填充当前数组
│  reshape(new_shape)             │ ← 改变形状
│  sum()                          │ ← 求和
│  print()                        │ ← 打印
└─────────────────────────────────┘
```

核心公式只有一个：

```
一维偏移量 = sum(indices[i] * strides[i])
```

这个公式是理解整个 `NdArray` 的关键。

---

## 5. 本实验 vs NumPy

| 功能 | NumPy | 本实验（第一阶段） |
|---|---|---|
| 多维数组 | `np.array(...)` | `NdArray<T>({...})` |
| shape | `a.shape` | `a.shape()` |
| 总元素数 | `a.size` | `a.size()` |
| 维度数 | `a.ndim` | `a.ndim()` |
| 下标访问 | `a[0, 1]` | `a({0, 1})` |
| 全零数组 | `np.zeros((3,4))` | `NdArray<T>::zeros({3,4})` |
| 全一数组 | `np.ones((3,4))` | `NdArray<T>::ones({3,4})` |
| 等差数组 | `np.arange(0, 10, 2)` | `NdArray<T>::arange(0,10,2)` |
| 广播运算 | `a + b` | 后续阶段 |
| 切片 | `a[:, 1]` | 后续阶段 |
| reshape | `a.reshape(...)` | `a.reshape(...)` |
| full | `np.full(...)` | `NdArray<T>::full({...}, v)` |
| fill | `a.fill(v)` | `a.fill(v)` |
| sum | `a.sum()` | `a.sum()` |

---

## 6. row-major 偏移公式图解

以 `shape = {2, 3}` 为例：

```
shape   = {2, 3}
strides = {3, 1}

逻辑位置 (1, 2) → 内存偏移 = 1*3 + 2*1 = 5

     col 0  col 1  col 2
row 0: [0]    [1]    [2]      ← 偏移 0, 1, 2
row 1: [3]    [4]    [5]      ← 偏移 3, 4, 5
               ↑
            (1, 2) = 偏移 5 ✓
```

以 `shape = {2, 2, 2}` 为例：

```
shape   = {2, 2, 2}
strides = {4, 2, 1}

元素 (1, 0, 1) → 偏移 = 1*4 + 0*2 + 1*1 = 5

depth 0:           depth 1:
  [0] [1]            [4] [5]
  [2] [3]            [6] [7]
                    ↑ (1,0,1) = 偏移 5 ✓
```
