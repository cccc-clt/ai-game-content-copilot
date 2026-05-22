import type { GameContentPackage } from "../../types/gameContent";
import { downloadTextFile } from "./download";
import { markdownFilename } from "./filename";
import { packageToMarkdownPrd } from "./markdownPrd";

export function buildMarkdownPrd(pkg: GameContentPackage): string {
  return packageToMarkdownPrd(pkg);
}

export function downloadPackageMarkdown(pkg: GameContentPackage): void {
  downloadTextFile(
    buildMarkdownPrd(pkg),
    markdownFilename(pkg),
    "text/markdown;charset=utf-8"
  );
}
