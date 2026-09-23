# 竹林动效主题市场

「竹林」Obsidian 插件的官方主题分发仓库。所有主题均为 **竹林用户专享** 内容。

## 版权与授权

- 维护者：**羽鳞君**
- 许可：**竹林用户专享 · 未经授权禁止使用（含个人使用）**

本仓库内所有主题（`themes/*.js`）仅限已安装并使用「竹林」插件（bamboo-immortals）的用户在插件内使用。
未经作者书面授权，任何人不得复制、转载、再分发、转售，亦不得在本插件之外以任何形式（含个人学习/自用）使用。

## 仓库结构

```
manifest.json        # 主题清单（插件拉取的市场数据源）
themes/              # 各主题的 .js 源文件（含版权文件头）
  ├─ 荷塘鱼影.js
  ├─ 绯梦飞行.js
  ├─ 混沌星系.js
  ├─ 时间的鱼.js
  └─ 雪原木屋.js
```

## manifest.json 结构

```json
{
  "name": "竹林动效主题市场",
  "version": "1.0.0",
  "maintainer": "羽鳞君",
  "license": "竹林用户专享 · 未经授权禁止使用（含个人使用）",
  "themes": [
    {
      "id": "荷塘鱼影",            // 主题唯一标识，需与文件名（不含 .js）、主题内 window.__bamboo_theme_<id> 一致
      "name": "荷塘鱼影",          // 展示名
      "author": "羽鳞君",          // 作者署名
      "license": "竹林用户专享 …",  // 版权声明（含「专享」时插件显示「竹林专享」徽章）
      "description": "…",          // 简介
      "version": "1.0.0",          // 用于更新检测
      "url": "https://raw.githubusercontent.com/miaoziguan/bamboo-theme-market/main/themes/荷塘鱼影.js"
    }
  ]
}
```

## 新增主题

1. 把主题 `.js` 放进 `themes/`，确保文件顶部含版权声明、并导出 `window.__bamboo_theme_<id> = theme`。
2. 在 `manifest.json` 的 `themes` 数组追加一条，填好 `id` / `name` / `author` / `license` / `description` / `version` / `url`（指向本仓库 raw 地址）。
3. 提交并推送到 `main` 分支，插件侧即可在「逛市场」中看到并一键安装。
