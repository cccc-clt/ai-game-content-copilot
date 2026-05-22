CONTENT_RULES = """
## 内容硬性规则
1. 必须完全原创，不得引用、模仿或提及任何真实游戏 IP、角色名、地名、剧情或版权素材。
2. 所有人名、地名、组织、道具名须为虚构（可参考风格：星港纪元、旅者·零、萤石商会）。
3. 全文使用中文，面向游戏策划与 UGC 团队，表述具体可执行。
4. 必须体现：玩家体验路径、情绪曲线、角色记忆点、可玩性设计、社交传播点。
5. 只输出一个合法 JSON 对象，禁止 Markdown 代码块与任何 JSON 之外的说明文字。
"""

MODULE_REQUIREMENTS = """
## 各模块最低要求
- game_event：含 title/theme/hook/duration；emotion_curve 至少 3 段；acts 至少 2 幕；spread_points 至少 2 条
- world_setting：locations 至少 2 个；factions 至少 2 个；memory_anchors 至少 3 条
- npc_profiles：至少 2 个 NPC，每人须有 memory_hook 与 emotional_arc
- dialogue_tree：nodes 至少 4 个，含分支 choices；root_id 必须对应存在的节点
- quest_flow：steps 至少 3 步，每步含 player_emotion
- player_feedback：personas 至少 2 个；predicted_reactions 至少 3 条
- consistency_check：score 0-100；dimension_scores 覆盖「世界观」「人设」「任务」「情绪曲线」四维
- improvement_suggestions：items 至少 4 条，覆盖玩法/叙事/传播/技术验证
"""
