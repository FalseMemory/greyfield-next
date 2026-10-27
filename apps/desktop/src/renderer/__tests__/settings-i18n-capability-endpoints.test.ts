import { describe, expect, it } from "vitest";
import { settingsT, type SettingsI18nKey } from "../settings-i18n";

/**
 * 英文词典被 Record<SettingsI18nKey, string> 完整约束，漏 key 会编译失败；
 * 但中文词典是 Partial，缺条目会静默回退成英文。这组测试专门盯住后者。
 */
const capabilityEndpointKeys: SettingsI18nKey[] = [
  "field.asrBaseUrl",
  "field.asrApiKey",
  "field.ttsBaseUrl",
  "field.ttsApiKey",
  "field.endpointFallback"
];

describe("capability endpoint settings copy", () => {
  it.each(capabilityEndpointKeys)("translates %s in both locales", (key) => {
    expect(settingsT("en-US", key)).not.toBe(key);
    expect(settingsT("zh-CN", key)).not.toBe(key);
  });

  it("keeps the Chinese copy actually localized instead of falling back to English", () => {
    expect(settingsT("zh-CN", "field.asrBaseUrl")).toContain("地址");
    expect(settingsT("zh-CN", "field.ttsBaseUrl")).toContain("地址");
    expect(settingsT("zh-CN", "field.endpointFallback")).toContain("留空");
  });
});
