# AI Game Content Copilot｜AI 游戏内容生产助手

<div align="center">

**上传或输入游戏创意 · 生成多版本游戏文本 · AI 评分 · 优化 · 导出策划文档**

面向游戏策划、剧情文案与内容运营的 **结构化游戏文本生产 Copilot**（非聊天机器人）

<br/>

[![Python](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-sky.svg)](LICENSE)
[![AI Evaluation](https://img.shields.io/badge/AI-Evaluation-purple)](docs/screenshots/evaluation.png)
[![OpenAI Compatible](https://img.shields.io/badge/API-OpenAI%20Compatible-green)](https://platform.openai.com/docs/api-reference)

</div>

---

## 项目预览

本项目将游戏内容生产从「单次对话」升级为可演示的 **AI 产品工作流**：

| 环节 | 说明 |
|------|------|
| **角色设定** | 名称、性格、阵营、世界观、说话风格、动机等人设约束 |
| **内容类型** | 7 类游戏文本场景（台词、任务、剧情、活动等） |
| **三版本生成** | A 稳妥版 / B 创意版 / C 角色风格版，卡片并排比选 |
| **AI Evaluation** | 五维量化评分（人设、创意、可用性、语言、沉浸）+ 总评与建议 |
| **继续优化** | 选中版本后补充反馈，生成优化稿并更新评分 |
| **导出** | Markdown / TXT 策划文档 |
| **高级模式** | 输入游戏创意，一次生成 8 大模块结构化内容包 |

> **在线 Demo**：暂未部署，请按 [§10 本地运行](#10-本地运行) 在本地体验完整流程。  
> 所有生成内容为 **AI 原创虚构**，不使用真实游戏 IP、角色名或版权素材。

### 界面截图

将运行界面截图置于 [`docs/screenshots/`](docs/screenshots/)（路径统一，便于 GitHub 展示）。

| 首页 · 产品定位 | 三版本生成（一） | 三版本生成（二） |
|:---:|:---:|:---:|
| ![首页](docs/screenshots/copilot-home.png) | ![三版本 1](docs/screenshots/three-versions.png) | ![三版本 2](docs/screenshots/three-versions2.png) |

| AI 五维评分 | 继续优化 | 高级 · 8 模块内容包 |
|:---:|:---:|:---:|
| ![评分](docs/screenshots/evaluation.png) | ![优化](docs/screenshots/optimize.png) | ![内容包](docs/screenshots/legacy-package.png) |

> **截图说明**：`three-versions.png` 对应三版本比选主视图；若需与文档命名一致，可另存为 `three-versions1.png` 并更新上方链接。导出流程截图 `export.png` 尚未收录，见文末 [待补充截图](#待补充截图)。

**推荐演示路径（约 2 分钟）**  
`示例 1：角色台词` → `生成 A/B/C` → 选择 **版本 B** → `继续优化` → `导出 Markdown`

---

## 1. 项目介绍

**AI Game Content Copilot** 是一款面向游戏内容生产流程的 AI Copilot 原型，帮助策划与文案在 **角色人设与世界观约束** 下，快速产出可比较、可评分、可迭代、可导出的游戏文本。

与通用聊天机器人的核心差异：

| 维度 | 通用聊天 | 本项目 |
|------|----------|--------|
| 交互形态 | 开放式多轮对话 | **结构化表单 + 固定工作流** |
| 输出形态 | 自由文本 | **JSON Schema + 三版本卡片 + 评分对象** |
| 产品目标 | 回答问题 | **支撑策划比选、审稿与文档化** |
| 能力边界 | 泛化问答 | **七类游戏文本 + 可选 8 模块内容包** |

---

## 2. 项目背景

手游与二次元向内容生产中，策划与文案常遇到以下痛点：

| 问题 | 影响 |
|------|------|
| **灵感启动难** | 空文档起步成本高，人设与世界观难以一次写全 |
| **初稿产出慢** | 单点台词、任务、活动文案反复推敲占用大量时间 |
| **多版本比选成本高** | 同一需求需手写多个语气版本，横向对比效率低 |
| **角色风格难保持一致** | 长链路创作中容易出现人设漂移、口吻不统一 |
| **AI 生成缺少评测机制** | 纯生成难以支撑「选哪一版、为何选」的产品决策 |
| **结果难进入文档流程** | 生成物与策划文档、评审材料之间缺少结构化衔接 |

本项目以 **「输入约束 → 多版本方案 → AI Evaluation → 优化 → 导出」** 串联上述环节，形成可演示、可讲解的 AIGC 游戏内容生产原型。

---

## 3. 目标用户

| 用户类型 | 典型使用场景 | 本项目提供的价值 |
|----------|--------------|------------------|
| **游戏策划** | 角色台词、任务描述、剧情片段起草 | 三版本比选 + 五维评分，缩短从需求到初稿的路径 |
| **剧情文案** | 在人设约束下扩写、调整语气与节奏 | 角色设定表单 + 优化链路，降低风格漂移 |
| **内容运营** | 版本活动页、限时宣传等手游向文案 | 活动文案类型 + 结构化导出 |
| **二创作者 / UGC** | 快速验证角色与世界观设定 | 预设示例 + 多类型内容生成 |
| **AI 产品实习作品集** | 展示 AIGC 工作流与 Evaluation 设计 | 完整前后端 Demo + 可复现本地运行 |

---

## 4. 核心功能

| 功能模块 | 能力说明 | 产品价值 |
|----------|----------|----------|
| **角色设定输入** | 名称、性格、阵营、世界观、说话风格、动机 | 将「人设约束」前置为结构化输入，而非散落在对话里 |
| **内容类型选择** | 7 类：角色台词、任务描述、剧情片段、活动文案、世界观设定、NPC 对话、道具描述 | 按场景切换 Prompt，输出更贴近真实岗位分工 |
| **三版本生成** | A 稳妥正式 · B 更有创意 · C 更具角色风格；附优点、适用场景、版本分 | 对应策划「比选」习惯，而非单次碰运气 |
| **AI 五维评分** | 人设一致性、创意度、可用性、语言风格、沉浸感（0–10）+ 总分 + 评语 | 将主观审稿部分结构化，便于演示与讨论 |
| **继续优化** | 选中版本 + 补充反馈 → 优化稿 + 更新评分 | 贴近「策划返工」真实流程 |
| **Markdown / TXT 导出** | 含项目信息、角色设定、需求、正文与评分 | 生成结果可直接进入文档协作 |
| **高级内容包模式** | 输入游戏创意 → 8 大模块（活动、世界观、NPC、对话树、任务流、玩家反馈、一致性、优化建议） | 展示从单点文案到系统化内容包的能力广度 |
| **一键示例** | 3 组预设（角色台词 / 主线任务 / 活动文案） | 1 分钟内完成作品集演示 |

---

## 5. 示例测试输入

复制以下字段到 Copilot 表单，即可快速验证主流程（角色台词场景）：

```text
角色名称：洛希娅
性格：温柔、神秘、带一点悲伤
世界观：幻想大陆中失落王国「银庭」的最后守护者
内容类型：角色台词
需求：请生成她首次登场时对主角说的话，要求温柔、神秘、有宿命感，适合二次元幻想手游主线剧情开场。
```

**表单填写对照**（其余字段可按演示需要补充）：

| 字段 | 建议填写 |
|------|----------|
| 阵营 | 银庭遗民 / 守护者 |
| 说话风格 | 轻柔、留白多、略带诗意 |
| 目标/动机 | 引导主角正视王国覆灭真相，同时隐藏自身代价 |

---

## 6. AI 能力设计

| 能力名称 | 实现方式 | 产品价值 |
|----------|----------|----------|
| **Prompt Engineering** | `src/prompts/` 按内容类型拆分模板；`router.py` 统一路由；注入角色、世界观、JSON 约束与手游文案风格 | Prompt 可维护、可迭代，便于面试讲解「如何控风格」 |
| **多版本生成** | `generation_service` 单次调用输出 A/B/C + 各版说明与版本分 | 支撑策划横向比选，体现「生成即方案」而非「生成即终稿」 |
| **AI Evaluation** | `evaluation_prompt.py` + `evaluation_service`；五维打分 + 总评 + 建议 | 补齐「生成后怎么选」的决策层，体现 AI 产品质量意识 |
| **内容优化** | `optimize_prompt.py`；在保持人设前提下迭代选中版本 | 贴近返工流程，展示闭环而非一次性生成 |
| **结构化输出** | Pydantic Schema（`src/schemas/copilot.py`）约束请求/响应；前端 TypeScript 类型对齐 | 降低 JSON 解析失败，结果可直接渲染为卡片 |
| **游戏文本工作流** | 前端 `CopilotWorkspace` 状态机 + 后端 API 编排 + `export_service` | 完整产品 Demo，证明「流程设计」而非「套壳聊天」 |

---

## 7. 技术栈

| 层级 | 技术选型 | 用途 |
|------|----------|------|
| **前端** | React 18、Vite、Tailwind CSS | 浅色产品 Demo UI、卡片化结果展示 |
| **后端** | FastAPI、Python 3.11+ | REST API、Schema 校验、服务编排 |
| **模型调用** | OpenAI-compatible API（`llm_service`） | 对接 OpenAI 或国内兼容中转 |
| **数据结构** | Pydantic Schema | 请求/响应契约、Evaluation 与版本对象 |
| **配置** | python-dotenv（`src/config/settings.py`） | 根目录 `.env` 读取 Key，禁止硬编码 |
| **导出** | Markdown / TXT（Copilot）；JSON / PRD Markdown（Legacy） | 策划文档与内容包交付 |
| **工程结构** | 模块化 `src/`（api / services / prompts / schemas） | 便于扩展新内容类型与评测维度 |

---

## 8. 产品流程

```text
角色设定 + 内容类型 + 用户需求
        ↓
生成 A / B / C 三个版本（附版本说明与版本分）
        ↓
AI Evaluation 五维评分 + 总评与优化建议
        ↓
选择版本 →（可选）补充优化意见 → 优化稿 + 更新评分
        ↓
导出 Markdown / TXT
```

**高级模式（独立 Tab）**：

```text
输入游戏创意
        ↓
一次生成 8 大模块内容包（JSON 结构化）
        ↓
导出 JSON / PRD 风格 Markdown
```

---

## 9. 项目结构

以下为仓库主要目录（不含 `node_modules`、`__pycache__`、虚拟环境等）：

```text
AI Game Content Copilot/
├── app.py                      # FastAPI 入口（uvicorn app:app）
├── requirements.txt
├── .env.example                # 后端环境变量模板
├── README.md
├── AGENTS.md
├── src/
│   ├── api/
│   │   ├── main.py             # 应用装配与 CORS
│   │   └── routes/
│   │       ├── health.py       # GET /api/health
│   │       ├── copilot.py      # Copilot 主流程 API
│   │       └── legacy.py       # 8 模块内容包 API
│   ├── config/settings.py      # .env 加载
│   ├── prompts/                # 分场景 Prompt + Evaluation + Optimize
│   ├── schemas/                # Pydantic 请求/响应模型
│   ├── services/               # 生成、评分、优化、导出
│   └── utils/
├── frontend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── components/copilot/ # Copilot 工作区 UI
│       └── components/legacy/  # 高级内容包 UI
├── docs/screenshots/           # README 截图
└── backend/                    # Legacy 兼容 shim（新代码请写在 src/）
```

---

## 10. 本地运行

### 环境要求

- **Python 3.11+**
- **Node.js 18+**
- 任意 **OpenAI 兼容** API

### 10.1 配置环境变量

在 **项目根目录**：

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

编辑根目录 `.env`（勿提交 Git），填入有效 Key 与模型名。

### 10.2 启动后端

**必须在项目根目录执行**（保证 `import src` 与 `app` 模块正确）：

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload --host 127.0.0.1 --port 8001
```

也可使用：`python app.py`

| 检查项 | 地址 |
|--------|------|
| 健康检查 | http://127.0.0.1:8001/api/health |
| 期望结果 | `"ready": true`（表示 Key 与 Model 已正确配置） |

> 勿在 `backend/` 目录执行 `uvicorn app:app`；根目录 `app.py` 为当前入口。  
> 若 8001 端口占用，可改用 `--port 8002`，并同步修改 `frontend/.env` 中的 `VITE_API_BASE_URL`。

### 10.3 启动前端

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

| 访问 | 地址 |
|------|------|
| 前端界面 | http://localhost:5173 |
| 后端 API | http://127.0.0.1:8001 |

---

## 11. 环境变量配置

### 根目录 `.env`（后端）

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY` | API 密钥；勿使用占位值 `your_api_key_here` |
| `OPENAI_BASE_URL` | 兼容 API 根地址，默认 `https://api.openai.com/v1` |
| `OPENAI_MODEL` | 模型名称；须替换 `your-model-name` |
| `CORS_ORIGINS` | 可选；逗号分隔前端源，默认已含 `http://localhost:5173` |

### `frontend/.env`（前端）

```env
VITE_API_BASE_URL=http://127.0.0.1:8001
```

**安全提醒**：`.env`、真实 API Key、用户输入内容均 **不要提交到 GitHub**。仓库仅保留 `.env.example` 作为模板。

---

## 12. API 概览

### Copilot（主流程）

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/health` | 服务状态与 Key/Model 配置检测 |
| `POST` | `/api/copilot/generate` | 三版本生成 + Evaluation |
| `POST` | `/api/copilot/optimize` | 选中版本优化 |
| `POST` | `/api/copilot/evaluate` | 独立五维评分 |
| `POST` | `/api/copilot/export/markdown` | 导出 Markdown |
| `POST` | `/api/copilot/export/txt` | 导出 TXT |

### Legacy（高级 · 8 模块内容包）

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/generate` | 一次生成 8 大模块游戏内容包 |
| `POST` | `/api/export/markdown` | PRD 风格 Markdown 导出 |

---

## 13. 当前限制

| 限制项 | 说明 |
|--------|------|
| **原型阶段** | 侧重产品流程与能力演示，非生产级 SaaS |
| **生成质量** | 依赖所选模型能力与 Prompt 设计，需人工终审 |
| **数据闭环** | 暂无真实用户行为数据、A/B 实验与效果看板 |
| **高级内容包** | 8 模块模式可继续深化模块间一致性与联动校验 |
| **在线 Demo** | 暂未部署公网实例，需本地配置 API 后体验 |
| **流式体验** | 当前为一次性返回，尚未支持 SSE 流式输出 |

---

## 14. 安全与隐私说明

请勿将以下内容提交到公开仓库或截图外泄：

| 类别 | 示例 |
|------|------|
| 密钥与配置 | `.env`、`OPENAI_API_KEY` |
| 依赖与构建产物 | `node_modules/`、`frontend/dist/`、`__pycache__/` |
| 本地环境 | `.venv/`、`backend/.venv/` |
| 日志与临时文件 | 本地运行日志、调试导出文件 |
| 用户数据 | 表单中填写的创意、角色设定等输入内容 |

`.gitignore` 已覆盖常见敏感路径；分享作品集时请使用打码截图或示例数据。

---

## 15. 求职展示说明

本项目用于展示以下能力，适合写入 **AI 产品 / AIGC 游戏内容** 方向实习或校招作品集：

- **AI 产品思维**：将游戏文本生产拆解为结构化工作流，而非聊天交互
- **AIGC 场景理解**：七类手游向文本 + 可选 8 模块内容包
- **Prompt Engineering**：分场景模板、人设注入、JSON 约束
- **AI Evaluation**：五维量化评分支撑版本决策
- **前后端原型**：React 产品 Demo + FastAPI + Pydantic 契约对齐

**简历一句话（可直接使用）**：

> 独立设计并实现 AI 游戏内容 Copilot，支持七类游戏文本的三版本生成、AI 五维评分、版本优化与 Markdown/TXT 导出，并保留 8 模块内容包高级模式。

**演示前检查清单**：

- [ ] 根目录 `.env` 已配置有效 `OPENAI_API_KEY` 与 `OPENAI_MODEL`
- [ ] http://127.0.0.1:8001/api/health 返回 `"ready": true`
- [ ] 前端 http://localhost:5173 可访问且无 CORS 报错
- [ ] README 截图已替换为最新界面（见 [待补充截图](#待补充截图)）

---

## 16. Roadmap

- [ ] **SSE 流式生成**：降低长文本等待焦虑，展示生成进度
- [ ] **历史项目保存**：SQLite 存储多轮会话与导出记录
- [ ] **多模型切换**：按场景选择不同模型（创意 / 稳定）
- [ ] **评分雷达图**：五维 Evaluation 可视化
- [ ] **角色库**：复用常用人设与世界观片段
- [ ] **世界观知识库**：RAG 约束长线设定一致性
- [ ] **团队协作**：共享项目、评论与版本锁定
- [ ] **内容审核**：敏感词与合规策略接入
- [ ] **A/B 测试**：对比不同 Prompt 策略的效果
- [ ] **数据看板**：生成次数、评分分布、导出使用率

---

## 17. License

本项目采用 [MIT License](LICENSE) 开源。如仓库尚未包含 `LICENSE` 文件，可按 MIT 惯例补充。

---

## 待补充截图

以下截图建议补全后更新 README 链接，以提升作品集完整度：

| 文件名 | 建议画面 | 当前状态 |
|--------|----------|----------|
| `export.png` | 导出 Markdown/TXT 成功或预览弹窗 | ❌ 待补充 |
| `three-versions1.png` | 可与 `three-versions.png` 二选一或重命名统一 | ⚠️ 已有 `three-versions.png`，命名可选统一 |

已有截图：`copilot-home.png`、`three-versions.png`、`three-versions2.png`、`evaluation.png`、`optimize.png`、`legacy-package.png`。
