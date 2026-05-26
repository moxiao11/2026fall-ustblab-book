// ===== 侧边栏结构定义 =====
// path 对应 docs/ 下的 .md 文件路径（不含 .md 后缀）
const sidebarConfig = [
  {
    section: '总览',
    items: [
      { label: '实验总体思路', path: '/总体思路' },
    ],
  },
  {
    section: 'Lab1 · 贪吃蛇',
    items: [
      { label: '语法温习', path: '/lab1/01-语法温习' },
      { label: '控制台操作', path: '/lab1/02-控制台操作' },
      { label: '实验任务', path: '/lab1/03-实验任务' },
    ],
  },
  {
    section: 'Lab2 · 打字练习',
    items: [
      { label: '语法学习', path: '/lab2/01-语法学习' },
      { label: '分文件编写要点', path: '/lab2/02-分文件编写要点' },
      { label: '完成的任务', path: '/lab2/03-完成的任务' },
    ],
  },
  {
    section: 'Lab3 · NdArray',
    items: [
      { label: '语法学习', path: '/lab3/01-语法学习' },
      { label: 'NumPy 库介绍', path: '/lab3/02-NumPy库介绍' },
      { label: '测试文件', path: '/lab3/03-测试文件' },
      { label: '完成的任务', path: '/lab3/04-完成的任务' },
    ],
  },
];

// Lab 概述内容（纯 HTML）
const labOverviews = {
  '/lab1/': `
    <h1>Lab1 · 贪吃蛇</h1>
    <h2>实验目标</h2>
    <p>用纯 C++ 在控制台中实现一个完整的贪吃蛇游戏。全部代码写在一个 <code>.cpp</code> 文件里，通过命令行编译运行。</p>
    <h2>涉及知识点</h2>
    <ul>
      <li>变量、数据类型、枚举 <code>enum</code>、结构体 <code>struct</code></li>
      <li>数组的声明、遍历、边界检查</li>
      <li><code>if/else</code>、<code>switch</code>、<code>while</code>、<code>for</code>、<code>do-while</code> 控制流</li>
      <li>函数的定义与调用</li>
      <li>随机数 <code>rand()</code> / <code>srand()</code></li>
      <li>逻辑运算符 <code>&&</code> <code>||</code> <code>!</code>、取模 <code>%</code></li>
      <li>控制台光标定位、清屏</li>
      <li><code>g++</code> 命令行编译</li>
    </ul>
    <h2>你将带走的能力</h2>
    <ul>
      <li>能把一个游戏拆成多个模块（逻辑块、渲染块、输入块）</li>
      <li>习惯用 <code>g++</code> 而不是 IDE 按钮编译运行</li>
      <li>写出结构清晰、可读的单文件程序</li>
    </ul>
    <h2>阅读顺序</h2>
    <ol>
      <li><a href="#/lab1/01-语法温习">语法温习</a> — 快速回顾本实验用到的 C++ 语法</li>
      <li><a href="#/lab1/02-控制台操作">控制台操作</a> — 了解如何在控制台画图、读取键盘</li>
      <li><a href="#/lab1/03-实验任务">实验任务</a> — 动手实现</li>
    </ol>
  `,
  '/lab2/': `
    <h1>Lab2 · 打字练习</h1>
    <h2>实验目标</h2>
    <p>实现一个控制台打字速度测试程序。把控制台输入输出、计时封装到 <code>TypingConsole</code> 类中，学会分文件编写（<code>.h</code> + <code>.cpp</code>）。</p>
    <h2>涉及知识点</h2>
    <ul>
      <li>类与对象、<code>public</code> / <code>private</code> 访问控制</li>
      <li><code>const</code> 成员函数</li>
      <li>头文件编写与 <code>#include</code> 守卫</li>
      <li>随机数 <code>rand()</code> / <code>srand()</code></li>
      <li><code>&lt;chrono&gt;</code> 计时</li>
      <li>结构体打包数据（<code>TypingStats</code>）</li>
      <li>命令行编译多文件项目</li>
    </ul>
    <h2>你将带走的能力</h2>
    <ul>
      <li>能写出安全的头文件（<code>#ifndef</code> / <code>#define</code> / <code>#endif</code>）</li>
      <li>能把功能封装到类中，而不是写一长串全局函数</li>
      <li>能编译由多个 <code>.cpp</code> 和 <code>.h</code> 组成的项目</li>
    </ul>
    <h2>阅读顺序</h2>
    <ol>
      <li><a href="#/lab2/01-语法学习">语法学习</a> — 随机数、计时、类与对象复习</li>
      <li><a href="#/lab2/02-分文件编写要点">分文件编写要点</a> — 如何组织 <code>.h</code> 和 <code>.cpp</code></li>
      <li><a href="#/lab2/03-完成的任务">完成的任务</a> — 实验要求与步骤</li>
    </ol>
  `,
  '/lab3/': `
    <h1>Lab3 · NdArray — 简易 NumPy</h1>
    <h2>实验目标</h2>
    <p>用 <code>vector</code>、<code>template</code>、运算符重载从零实现一个多维数组类 <code>NdArray&lt;T&gt;</code>，类似 Python NumPy 的 <code>ndarray</code>。同时学习编写简单的测试文件。</p>
    <h2>涉及知识点</h2>
    <ul>
      <li><code>vector&lt;T&gt;</code> 动态数组的常用操作</li>
      <li><code>template&lt;typename T&gt;</code> 函数模板与类模板</li>
      <li><code>operator()</code> 函数调用运算符重载（多维下标访问）</li>
      <li><code>static</code> 成员函数（<code>zeros</code>、<code>ones</code>、<code>full</code>、<code>arange</code>）</li>
      <li><code>const</code> 成员函数（读写分离）</li>
      <li>C++11 特性：<code>auto</code>、range-for、<code>initializer_list</code></li>
      <li>测试驱动开发（TDD）入门——写测试文件</li>
    </ul>
    <h2>你将带走的能力</h2>
    <ul>
      <li>能用 <code>vector</code> 替代原始数组</li>
      <li>能用模板写出泛型代码</li>
      <li>能重载运算符让自定义类型用起来像内置类型</li>
      <li>能为自己的代码编写测试</li>
    </ul>
    <h2>阅读顺序</h2>
    <ol>
      <li><a href="#/lab3/01-语法学习">语法学习</a> — vector、模板、operator() 详解</li>
      <li><a href="#/lab3/02-NumPy库介绍">NumPy 库介绍</a> — 了解 NumPy 的设计思路</li>
      <li><a href="#/lab3/03-测试文件">测试文件</a> — 学习如何为 NdArray 编写测试</li>
      <li><a href="#/lab3/04-完成的任务">完成的任务</a> — 实验要求与步骤</li>
    </ol>
  `,
};

// ===== 配置 marked =====
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (_) {}
    }
    // 对 cpp 默认高亮
    try {
      return hljs.highlight(code, { language: 'cpp' }).value;
    } catch (_) {
      return code;
    }
  },
  breaks: false,
  gfm: true,
});

// ===== DOM 元素 =====
const sidebarEl = document.getElementById('sidebar');
const sidebarMenu = document.getElementById('sidebar-menu');
const contentEl = document.getElementById('content');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// ===== 构建侧边栏 =====
function buildSidebar() {
  sidebarMenu.innerHTML = '';

  sidebarConfig.forEach(function (group) {
    const titleEl = document.createElement('li');
    titleEl.className = 'sidebar-section-title';
    titleEl.innerHTML = '<span class="arrow">▼</span>' + group.section;
    titleEl.addEventListener('click', function () {
      titleEl.classList.toggle('collapsed');
      sectionEl.classList.toggle('collapsed');
    });

    const sectionEl = document.createElement('ul');
    sectionEl.className = 'sidebar-section';
    // 初始高度：计算 item 数量 * 行高
    const itemCount = group.items.length;
    sectionEl.style.maxHeight = (itemCount * 34 + 8) + 'px';

    group.items.forEach(function (item) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.label;
      a.href = '#' + item.path;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(item.path);
      });
      li.appendChild(a);
      sectionEl.appendChild(li);
    });

    sidebarMenu.appendChild(titleEl);
    sidebarMenu.appendChild(sectionEl);

    // 在 lab 标题后插入概述链接
    // 判断是不是 Lab 分组
    if (group.section.indexOf('Lab') !== -1) {
      const labPath = '/' + group.section.split(' ·')[0].toLowerCase() + '/';
      const overviewLi = document.createElement('li');
      const overviewA = document.createElement('a');
      overviewA.textContent = '概述';
      overviewA.href = '#' + labPath;
      overviewA.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(labPath);
      });
      overviewLi.appendChild(overviewA);
      sectionEl.insertBefore(overviewLi, sectionEl.firstChild);
      // 更新高度
      sectionEl.style.maxHeight = ((itemCount + 1) * 34 + 8) + 'px';
    }
  });
}

// ===== 路由导航 =====
function navigateTo(path) {
  // 更新 URL hash
  window.location.hash = '#' + path;

  // 高亮侧边栏
  updateActiveLink(path);

  // 关闭移动端侧边栏
  closeSidebar();

  // 渲染内容
  if (path === '/') {
    renderHome();
  } else if (labOverviews[path + '/'] || labOverviews[path]) {
    const overview = labOverviews[path + '/'] || labOverviews[path];
    contentEl.innerHTML = overview;
    document.title = getTitleFromPath(path) + ' - 程序设计基础实验';
    window.scrollTo(0, 0);
  } else {
    loadMarkdown(path);
  }
}

function getTitleFromPath(path) {
  // 在 sidebarConfig 中查找匹配的 label
  for (var i = 0; i < sidebarConfig.length; i++) {
    for (var j = 0; j < sidebarConfig[i].items.length; j++) {
      if (sidebarConfig[i].items[j].path === path) {
        return sidebarConfig[i].items[j].label;
      }
    }
  }
  // fallback
  var parts = path.split('/');
  return parts[parts.length - 1] || '首页';
}

function updateActiveLink(path) {
  var links = sidebarMenu.querySelectorAll('a');
  links.forEach(function (a) {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + path) {
      a.classList.add('active');
    }
  });
}

// ===== 加载 Markdown =====
function loadMarkdown(path) {
  contentEl.innerHTML = '<div class="loading">加载中...</div>';

  // 去掉开头的 /，用相对路径，兼容 GitHub Pages 子目录部署
  var mdPath = (path[0] === '/' ? path.slice(1) : path) + '.md';

  fetch(mdPath)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('文件未找到: ' + mdPath);
      }
      return response.text();
    })
    .then(function (text) {
      var html = marked.parse(text);
      contentEl.innerHTML = html;
      document.title = getTitleFromPath(path) + ' - 程序设计基础实验';
      window.scrollTo(0, 0);

      // 高亮所有代码块
      contentEl.querySelectorAll('pre code').forEach(function (block) {
        hljs.highlightElement(block);
      });
    })
    .catch(function (err) {
      contentEl.innerHTML =
        '<h1>404</h1><p>文件 <code>' + mdPath + '</code> 未找到。</p>' +
        '<p><a href="#/">返回首页</a></p>';
      console.error(err);
    });
}

// ===== 首页 =====
function renderHome() {
  contentEl.innerHTML = `
    <div class="home-hero">
      <h1>程序设计基础实验</h1>
      <p class="subtitle">C++ 编程入门实验手册 — 从贪吃蛇到简易 NumPy，三个实验带你走进 C++ 的世界</p>
    </div>
    <div class="home-cards">
      <a class="home-card" href="#/lab1/">
        <div class="card-icon">🐍</div>
        <h3>Lab1 · 贪吃蛇</h3>
        <p>用数组、结构体和控制流实现经典游戏，学习控制台操作和命令行编译</p>
      </a>
      <a class="home-card" href="#/lab2/">
        <div class="card-icon">⌨️</div>
        <h3>Lab2 · 打字练习</h3>
        <p>分文件编写、类与对象、随机数与计时——致敬 CS61A 的打字实验</p>
      </a>
      <a class="home-card" href="#/lab3/">
        <div class="card-icon">🧮</div>
        <h3>Lab3 · NdArray</h3>
        <p>vector、模板、运算符重载，从零实现一个简易的 NumPy 多维数组</p>
      </a>
    </div>
  `;
  document.title = '程序设计基础实验手册';
  window.scrollTo(0, 0);
}

// ===== 移动端侧边栏 =====
function openSidebar() {
  sidebarEl.classList.add('open');
  sidebarOverlay.classList.add('show');
}

function closeSidebar() {
  sidebarEl.classList.remove('open');
  sidebarOverlay.classList.remove('show');
}

sidebarToggle.addEventListener('click', function () {
  if (sidebarEl.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

sidebarOverlay.addEventListener('click', closeSidebar);

// ===== 初始化 =====
function init() {
  buildSidebar();

  // 读取当前 hash
  var hash = window.location.hash;
  var path = '/';
  if (hash && hash.startsWith('#')) {
    path = hash.slice(1);
  }

  navigateTo(path);

  // 监听 hash 变化
  window.addEventListener('hashchange', function () {
    var newHash = window.location.hash;
    var newPath = '/';
    if (newHash && newHash.startsWith('#')) {
      newPath = newHash.slice(1);
    }
    navigateTo(newPath);
  });
}

// 启动
init();
