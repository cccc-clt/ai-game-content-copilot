# [AGENTS.md](http://AGENTS.md)

## Project Goal

本项目是 AI Game Content Copilot，面向游戏策划、UGC 创作者和 AI 产品团队。

它不是普通聊天机器人，也不是 AI 角色陪伴应用，而是一个游戏内容创作 Copilot。

目标岗位是：

- 米哈游 AI 创新产品实习生

- AI 产品实习

- AIGC 游戏内容方向

项目要体现：

- AIGC 游戏内容生产能力

- 玩家体验分析能力

- AI 产品原型设计能力

- Cursor + Codex 协同开发能力

- GitHub 作品集展示能力

## Tech Stack

- Frontend: React + Vite + Tailwind CSS

- Backend: FastAPI（根目录 `src/` + `python app.py` 启动）

- Legacy: `backend/app/main.py` 为兼容 shim，新代码请写在 `src/`

- AI API: OpenAI-compatible API

- Export: Markdown / JSON

- Database: SQLite in later versions

## Development Rules

- 不要硬编码 API Key。

- API Key 必须从 `.env` 读取。

- `.env` 不允许提交到 GitHub。

- 修改功能时保持项目可运行。

- 不要引入不必要的依赖。

- 不要使用真实游戏 IP、真实角色名或版权素材。

- 修改功能后更新 [README.md](http://README.md)。

- 不要大规模重构无关文件。

## UI Rules

- UI 使用浅色系。

- 风格应像游戏 AI 产品 Demo，不要像工程后台。

- 所有文字必须清晰可读。

- NPC profiles、quest flow、player feedback 使用卡片展示。

- 页面适合作为 GitHub README 截图。

## Prompt Rules

- 生成内容必须原创。

- 不使用真实游戏角色、世界观、地名或剧情。

- 输出优先使用 JSON。

- 结果必须方便前端渲染。

- 需要体现玩家体验、情绪曲线、角色记忆点、世界观一致性和可玩性。

## Review Focus

审查时重点关注：

- API key leakage

- frontend/backend API mismatch

- JSON parsing errors

- broken environment loading

- unclear product positioning

- poor README presentation

- UI readability problems

- unnecessary complexity