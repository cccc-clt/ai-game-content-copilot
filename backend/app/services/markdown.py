"""游戏内容策划 PRD 风格 Markdown 导出（与前端 markdownPrd 结构对齐）。"""

from app.schemas.response import GameContentPackage
from app.services.markdown_sections import render_prd_markdown


def package_to_markdown(pkg: GameContentPackage) -> str:
    return render_prd_markdown(pkg)
