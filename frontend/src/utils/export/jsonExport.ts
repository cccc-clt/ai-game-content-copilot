import type { GameContentPackage } from "../../types/gameContent";
import { downloadTextFile } from "./download";
import { jsonFilename } from "./filename";

export function serializePackageJson(pkg: GameContentPackage): string {
  return JSON.stringify(pkg, null, 2);
}

export async function copyPackageJson(
  pkg: GameContentPackage
): Promise<void> {
  const text = serializePackageJson(pkg);
  if (!navigator.clipboard?.writeText) {
    throw new Error("当前浏览器不支持剪贴板 API");
  }
  await navigator.clipboard.writeText(text);
}

export function downloadPackageJson(pkg: GameContentPackage): void {
  downloadTextFile(
    serializePackageJson(pkg),
    jsonFilename(pkg),
    "application/json;charset=utf-8"
  );
}
