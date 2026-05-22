from src.schemas.legacy import GameContentPackage
from src.services.legacy.markdown_sections import render_prd_markdown


def package_to_markdown(pkg: GameContentPackage) -> str:
    return render_prd_markdown(pkg)
