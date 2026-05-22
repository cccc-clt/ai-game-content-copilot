# AI Game Content Copilot｜AI 游戏内容生产助手

[![License: MIT](https://img.shields.io/badge/License-MIT-sky.svg)](LICENSE)

> **这不是聊天机器人，而是面向游戏生产管线的 AI 内容 Copilot。**  
> 帮助策划与文案在角色人设约束下，快速产出可比选的多版本游戏文本，并完成 AI 质量评估、迭代优化与文档导出。

面向岗位：**米哈游 AI 创新产品实习**、AI 产品 / AIGC 游戏内容方向。  
所有生成内容为 **AI 原创虚构**，不使用任何真实游戏 IP、角色或版权素材。

---

## 一句话定位

把「写台词 / 写任务 / 写活动文案」从单次对话，升级为 **结构化输入 → 三版本方案 → 五维评分 → 选中优化 → 策划文档导出** 的完整产品流程。

---

## 为谁而做

| 用户 | 典型场景 |
|------|----------|
| **游戏策划** | 角色台词、任务描述、剧情片段的结构化起草 |
| **剧情文案** | 在人设与世界观约束下扩写、比选不同语气版本 |
| **内容运营** | 限时活动页、版本宣传等手游向文案 |
| **AI 产品 / 实习作品集** | 展示 AIGC 工作流设计、Evaluation 与 Prompt 工程能力 |

---

## 核心功能

### 主流程 · 内容 Copilot（默认 Tab）

| 模块 | 能力说明 |
|------|----------|
| **角色设定** | 名称、性格、阵营、世界观背景、说话风格、目标/动机 |
| **内容类型** | 角色台词、任务描述、剧情片段、活动文案、世界观设定、NPC 对话、道具描述（7 类） |
| **三版本生成** | **A** 稳妥正式版 · **B** 更有创意版 · **C** 更具角色风格版，卡片对比展示 |
| **AI Evaluation** | 人设一致性、创意度、可用性、语言风格、沉浸感（各 0–10）+ 总分 + 评语与建议 |
| **继续优化** | 选中某一版本后，可补充反馈并生成优化稿，附带更新评分 |
| **导出** | Markdown / TXT，含项目信息、角色设定、需求、最终正文与评分 |
| **一键示例** | 3 组预设（角色台词 / 主线任务 / 活动文案），便于 1 分钟内完成演示 |

### 高级模式 · 内容包生成（次要 Tab）

输入游戏创意后，一次生成 **8 大结构化模块**（剧情活动、世界观、NPC 人设、分支对话树、任务流程、玩家反馈模拟、一致性检查、优化建议），支持 JSON / PRD 风格 Markdown 导出。  
用于展示项目在「单点文案」之外的 **系统化内容包** 生产能力。

---

## AI 能力设计（产品 + 工程）

本项目重点体现的不只是「调 API」，而是 **游戏文本生成流程** 的 AI 产品设计：

| 能力 | 实现方式 | 产品价值 |
|------|----------|----------|
| **Prompt Engineering** | `src/prompts/` 按场景拆分模板，统一注入角色、世界观、JSON 约束与游戏文案风格 | 可控、可维护、可迭代 |
| **多版本生成** | 单次调用输出 A/B/C 三版 + 各版优点 / 适用场景 / 版本分 | 支撑策划「比选」而非「碰运气」 |
| **AI Evaluation** | 五维量化评分 + 总评 + 优化建议（生成与优化链路均可复用） | 把主观审稿部分结构化，便于演示决策逻辑 |
| **内容优化** | `optimize_prompt.py` 在保持人设前提下迭代选中版本 | 贴近真实「策划返工」流程 |
| **游戏文本工作流** | 前端 Copilot 工作流 + 后端 `generation_service` 编排 + 导出服务 | 完整 Demo，非单次问答 |

**技术栈**：React 18 + Vite + Tailwind · FastAPI · OpenAI-compatible API · Pydantic JSON 契约

---

## 产品流程

```text
角色设定 + 内容类型 + 用户需求
        ↓
  生成 A / B / C 三版本（附版本说明）
        ↓
  AI Evaluation 五维评分
        ↓
  选择版本 →（可选）补充优化意见 → 优化稿
        ↓
  导出 Markdown / TXT
```

**推荐演示路径（约 2 分钟）**  
`示例 1：角色台词` → `生成 A/B/C` → 选择 **版本 B** → `继续优化` → `导出 Markdown`

---

## 项目截图

将运行后的截图放入 [`docs/screenshots/`](docs/screenshots/)，README 将自动展示（提交 GitHub 前请替换为真实截图）：

| 首页与产品定位 | 三版本生成 | AI Evaluation |
|:---:|:---:|:---:|
| ![首页](docs/screenshots/copilot-home.png) | ![三版本](docs/screenshots/three-versions.png) | ![评分](docs/screenshots/evaluation.png) |

| 继续优化 | 导出文档 | 高级 · 8 模块内容包 |
|:---:|:---:|:---:|
| ![优化](docs/screenshots/optimize.png) | ![导出](docs/screenshots/export.png) | ![内容包](docs/screenshots/legacy-package.png) |

> 建议文件名：`copilot-home.png`、`three-versions.png`、`evaluation.png`、`optimize.png`、`export.png`、`legacy-package.png`

---

## 本地运行

### 环境要求

- **Python 3.11+**
- **Node.js 18+**
- 任意 **OpenAI 兼容** API（OpenAI / 国内中转等）

### 1. 克隆与配置 API

在 **项目根目录** 执行：

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

编辑根目录 `.env`（勿提交到 Git）：

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY` | API 密钥，勿使用占位值 `your_api_key_here` |
| `OPENAI_BASE_URL` | 兼容 API 根地址，默认 `https://api.openai.com/v1` |
| `OPENAI_MODEL` | 模型名，须替换 `your-model-name` |
| `CORS_ORIGINS` | 可选；默认已包含 `http://localhost:5173` |

### 2. 启动后端

**必须在项目根目录运行**（保证 `import src` 与 `app` 模块正确）：

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

任选一种启动方式：

```bash
uvicorn app:app --reload --host 127.0.0.1 --port 8001
```

```bash
python app.py
```

- 健康检查：http://127.0.0.1:8001/api/health  
- 期望返回：`"ready": true`（表示 Key 与 Model 已配置）

**端口被占用时**：关闭占用 8001 的进程，或改用 `--port 8002`，并同步修改 `frontend/.env` 中的 `VITE_API_BASE_URL`。

> 勿在 `backend/` 目录执行 `uvicorn app:app`；根目录 `app.py` 才是当前入口。

### 3. 启动前端

新开终端：

```bash
cd frontend

# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env

npm install
npm run dev
```

浏览器访问：**http://localhost:5173**

`frontend/.env` 默认：

```env
VITE_API_BASE_URL=http://127.0.0.1:8001
```

---

## 项目结构

```text
AI Game Content Copilot/
├── app.py                    # FastAPI 入口（导出 app，供 uvicorn app:app 使用）
├── requirements.txt
├── .env.example
├── src/
│   ├── api/routes/           # Copilot + Legacy + Health
│   ├── services/             # 生成、评分、优化、导出
│   ├── prompts/              # 分场景 Prompt 模板
│   └── schemas/              # Pydantic 请求/响应
├── frontend/                 # React 产品 Demo UI
└── docs/screenshots/         # README 截图目录
```

---

## API 概览

### Copilot（主流程）

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/health` | 环境与 Key 配置状态 |
| `POST` | `/api/copilot/generate` | 三版本 + Evaluation |
| `POST` | `/api/copilot/optimize` | 选中版本优化 |
| `POST` | `/api/copilot/evaluate` | 独立五维评分 |
| `POST` | `/api/copilot/export/markdown` | 导出 Markdown |
| `POST` | `/api/copilot/export/txt` | 导出 TXT |

### Legacy（高级 · 内容包）

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/generate` | 8 模块游戏内容包 |
| `POST` | `/api/export/markdown` | PRD 风格 Markdown |

---

## 求职 / 作品集使用建议

**适合写在简历或作品集的一句话：**

> 独立设计并实现 AI 游戏内容 Copilot：基于分场景 Prompt 与 JSON 结构化输出，支持七类游戏文案的三版本生成、五维 AI Evaluation、版本优化与策划文档导出；另含 8 模块内容包高级模式。

**面试时可强调的差异点：**

1. **产品形态**：工作流 Copilot，不是开放式聊天。  
2. **决策支持**：三版本 + 量化评分，对应策划真实比选习惯。  
3. **工程化**：Prompt 文件化、前后端 Schema 对齐、模块化 `src/`。  
4. **广度**：主流程深耕单点文案，高级模式展示系统化内容包能力。

**演示前检查清单：**

- [ ] 根目录 `.env` 已配置有效 `OPENAI_API_KEY` 与 `OPENAI_MODEL`
- [ ] 后端 `http://127.0.0.1:8001/api/health` 返回 `ready: true`
- [ ] 前端可打开且无 CORS 报错
- [ ] README 截图已替换为真实界面图

---

## Roadmap

- [ ] SSE 流式生成与进度反馈
- [ ] 三版本 Diff 与高亮对比
- [ ] 评分雷达图可视化
- [ ] SQLite 历史项目与多轮会话
- [ ] 多模型切换

---

## License

MIT — 详见 [LICENSE](LICENSE)（如仓库未包含 LICENSE 文件，可按 MIT 惯例使用）。
