import type { DialogueNode, DialogueTree } from "../types/gameContent";

export interface LayeredNode {
  node: DialogueNode;
  depth: number;
}

export function orderDialogueNodesByDepth(tree: DialogueTree): LayeredNode[] {
  const byId = new Map(tree.nodes.map((n) => [n.id, n]));
  const result: LayeredNode[] = [];
  const visited = new Set<string>();
  const queue: { id: string; depth: number }[] = [{ id: tree.root_id, depth: 0 }];

  while (queue.length > 0) {
    const { id, depth } = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const node = byId.get(id);
    if (!node) continue;
    result.push({ node, depth });
    for (const choice of node.choices) {
      if (byId.has(choice.target_id) && !visited.has(choice.target_id)) {
        queue.push({ id: choice.target_id, depth: depth + 1 });
      }
    }
  }

  for (const node of tree.nodes) {
    if (!visited.has(node.id)) {
      result.push({ node, depth: 0 });
    }
  }

  return result;
}
