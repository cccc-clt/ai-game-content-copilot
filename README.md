# AI Game Content Copilot

面向游戏策划、UGC 创作者与 AI 产品团队的 **AI 游戏内容创作助手**。输入一个原创游戏创意，系统自动生成剧情活动方案、NPC 人设卡、分支对话树、任务流程、玩家反馈模拟、内容一致性检查与 PRD 文档。

> 本项目为 GitHub 作品集 MVP，所有内容为 AI 原创虚构，不包含任何真实游戏 IP。

## 能力对照（米哈游 AI 创新产品实习向）

| 能力维度 | 本项目体现 |
|----------|------------|
| AIGC 游戏内容生产 | 一次生成 7 大结构化内容模块（JSON） |
| 玩家体验分析 | 玩家画像 + 预测反馈 + 一致性评分 |
| AI 产品原型设计 | 完整 Demo 流程、PRD 输出、可选参数 |
| Cursor + Codex 协同 | 模块化 monorepo，便于 Agent 分文件审查 |
| GitHub 作品集展示 | README、`.env.example`、可复现本地运行 |

## 功能截图

将截图放入 [`docs/screenshots/`](docs/screenshots/) 目录（MVP 可先运行后自行补充）。

## 技术栈

- **前端**：React + Vite + Tailwind CSS
- **后端**：FastAPI
- **AI**：OpenAI-compatible API（任意兼容端点）
- **导出**：JSON 下载、Markdown 预览/下载
- **数据库**：SQLite（Phase 2，MVP 未接入）

## 快速开始

### 环境要求

- Node.js 18+
- Python 3.11+

### 1. 配置 API

```bash
# 在项目根目录
cp .env.example backend/.env
# 编辑 backend/.env，填入 OPENAI_API_KEY、OPENAI_BASE_URL、OPENAI_MODEL
```

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY` | API 密钥（勿提交到 Git） |
| `OPENAI_BASE_URL` | 兼容 API 根地址，默认 `https://api.openai.com/v1` |
| `OPENAI_MODEL` | 模型名称 |
| `CORS_ORIGINS` | 可选，默认 `http://localhost:5173` |

### 2. 启动后端

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

验证：访问 http://127.0.0.1:8001/api/health（端口需与 `frontend/.env` 中 `VITE_API_BASE_URL` 一致）

### 3. 配置前端 API 地址

```bash
cd frontend
cp .env.example .env
# 默认 VITE_API_BASE_URL=http://127.0.0.1:8001，与后端 uvicorn 端口一致即可
```

| 变量 | 说明 |
|------|------|
| `VITE_API_BASE_URL` | 后端根地址，如 `http://127.0.0.1:8001`（勿以 `/` 结尾） |

### 4. 启动前端

```bash
cd frontend
npm install
npm run dev
```

浏览器打开 http://localhost:5173 ，填写创意后点击「生成内容包」。

## API 文档

### `GET /api/health`

```json
{
  "status": "ok",
  "apiKeyConfigured": true
}
```

### `POST /api/generate`

**请求体：**

```json
{
  "idea": "在漂浮的星港都市中，玩家扮演失忆旅者……",
  "genre": "科幻",
  "platform": "手游",
  "tone": "史诗"
}
```

`genre` / `platform` / `tone` 均为可选。

**响应体（节选）：**

```json
{
  "meta": {
    "title": "星港纪元：萤石湾",
    "tagline": "……",
    "genre": "科幻",
    "targetAudience": "轻度叙事玩家",
    "oneLinePitch": "……"
  },
  "eventPlan": { "hook": "……", "acts": [], "rewards": [], "duration": "7 天" },
  "npcs": [],
  "dialogueTree": { "rootId": "n1", "nodes": [] },
  "questFlow": { "steps": [] },
  "playerFeedback": { "personas": [], "predictedReactions": [] },
  "consistencyCheck": { "score": 85, "issues": [], "suggestions": [] },
  "prd": { "overview": "……", "userStories": [], "metrics": [], "risks": [], "mvpScope": "……" },
  "generatedAt": "2026-05-22T12:00:00+00:00"
}
```

未配置 API Key 时返回 `503`。

### `POST /api/export/markdown`

请求体为完整的 `GameContentPackage` JSON，返回 `{ "markdown": "..." }`。

## 项目结构

```text
├── frontend/          # React UI
├── backend/app/       # FastAPI + LLM 服务
├── .env.example
├── docs/screenshots/
└── README.md
```

## Roadmap

- [ ] SQLite 历史记录与项目管理
- [ ] SSE 流式生成与进度反馈
- [ ] 可视化对话树编辑器
- [ ] 多语言输出与模板库

## 开发工作流（Cursor + Codex）

1. 用 **Cursor Agent** 按模块迭代（`schemas` → `services` → `components`）
2. 提交 PR 后由 **Codex** 做分文件 Code Review
3. 本地 `npm run build` + `uvicorn` 手测后再 push

## License

MIT（可按需修改）
