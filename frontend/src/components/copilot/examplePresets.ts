import type { CopilotFormValues } from "../../types/copilot";

export const EXAMPLE_PRESETS: { id: string; label: string; values: CopilotFormValues }[] = [
  {
    id: "dialogue",
    label: "示例 1：角色台词",
    values: {
      character: {
        name: "洛希娅",
        personality: "温柔、神秘、带一点悲伤",
        faction: "失落王国守护者",
        world_background: "幻想大陆中失落王国的守护者",
        speech_style: "诗意、温柔、带有命运感",
        motivation: "引导旅者面对王国残响的真相",
      },
      content_type: "character_dialogue",
      user_requirement: "生成她首次登场时对主角说的话",
    },
  },
  {
    id: "quest",
    label: "示例 2：任务描述",
    values: {
      character: {
        name: "卡雷恩",
        personality: "冷静、可靠、骑士精神",
        faction: "蒸汽城卫团",
        world_background: "蒸汽朋克城市",
        speech_style: "简洁、坚定",
        motivation: "维护城市秩序并查明异常源头",
      },
      content_type: "quest_description",
      user_requirement: "生成一个调查城市地下能源异常的主线任务描述",
    },
  },
  {
    id: "event",
    label: "示例 3：活动文案",
    values: {
      character: {
        name: "活动主持·汐光",
        personality: "活泼、热情、善于调动气氛",
        faction: "海岛祭典委员会",
        world_background: "二次元幻想手游",
        speech_style: "轻快、有感染力",
        motivation: "吸引玩家参与限时祭典活动",
      },
      content_type: "event_copywriting",
      user_requirement:
        "活动主题：夏日海岛祭典。生成一段适合手游限时活动页面的宣传文案",
    },
  },
];

export const EMPTY_CHARACTER: CopilotFormValues["character"] = {
  name: "",
  personality: "",
  faction: "",
  world_background: "",
  speech_style: "",
  motivation: "",
};
