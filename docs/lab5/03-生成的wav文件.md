# WAV 文件生成 — 格式、写入与播放

## 一、WAV 文件格式

WAV 是 Windows 平台常用的无损音频文件格式。一个 WAV 文件主要包含三个部分：

| 部分 | 作用 |
|------|------|
| `RIFF` | 文件类型标识（Resource Interchange File Format） |
| `fmt` | 音频格式信息（采样率、声道数、位深度等） |
| `data` | 真正的 PCM 采样数据 |

本实验使用的音频参数：

| 参数 | 值 |
|------|------|
| 采样率 | 44100 Hz |
| 声道数 | 1（单声道） |
| 采样位数 | 16 bit |
| 编码格式 | PCM（脉冲编码调制） |

### 1.1 采样率

采样率决定了每秒采集多少个音频样本点。44100 Hz 是 CD 音质标准，意味着每秒采集 44100 个采样点。

### 1.2 采样位数

16 bit 表示每个采样点用 16 位（2 字节）存储，取值范围为 -32768 ~ 32767。程序中生成的 `double` 波形值乘以 32767 后转为 `int16_t` 即可写入文件。

### 1.3 WAV 文件头结构

WAV 文件头共 44 字节，包含 RIFF chunk、fmt chunk 和 data chunk 的描述信息。程序通过 `WavWriter` 类自动填充这些字段。

---

## 二、TODO 6 — WavWriter::save

文件：

```text
header/WavWriter.h
src/WavWriter.cpp
```

**要做的事**：完成 WAV 文件写入。

`WavWriter` 的核心流程：

1. 打开二进制输出文件
2. 写入 44 字节的 WAV 文件头
3. 逐采样点写入 PCM 数据（小端序）
4. 写入 `RIFF`、`fmt `、`data` 三部分
5. 成功后返回 `true`

需要计算的关键字段：

| 字段 | 计算方式 |
|------|----------|
| `byteRate` | `sampleRate * channels * bitsPerSample / 8` |
| `blockAlign` | `channels * bitsPerSample / 8` |
| `dataSize` | `samples.size() * sizeof(int16_t)` |
| `chunkSize` | `36 + dataSize` |

---

## 三、TODO 7 — WavWriter::writeInt16 / writeInt32

文件：

```text
src/WavWriter.cpp
```

**要做的事**：完成小端序整数写入。

`writeInt16()` 写入 2 个字节：

```cpp
bytes[0] = value & 0xff;
bytes[1] = (value >> 8) & 0xff;
```

`writeInt32()` 写入 4 个字节：

```cpp
bytes[0] = value & 0xff;
bytes[1] = (value >> 8) & 0xff;
bytes[2] = (value >> 16) & 0xff;
bytes[3] = (value >> 24) & 0xff;
```

---

## 四、运行示例

```text
Song: Twinkle Twinkle Little Star
Generated synth_song.wav
Sample rate: 44100 Hz
Samples: 1154598
Duration: 26.1814 seconds
Playing...
```

运行后会生成：

```text
synth_song.wav
```

Windows 环境下程序会自动调用 `mciSendString` 播放该文件。

---

## 五、思考题

1. 如果采样率从 44100 Hz 降低到 8000 Hz，声音质量会发生什么变化？为什么？

2. 16 bit 和 8 bit 采样在音质上有何区别？

3. 如果要生成立体声（双声道）WAV 文件，`WavWriter` 需要做哪些修改？
