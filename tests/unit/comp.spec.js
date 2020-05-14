// import Vue from "vue";
import TestComp from "@/components/compTest.vue";

describe("TestComp", () => {
  // 检查原始组件选项
  it("由created生命周期", () => {
    expect(typeof TestComp.created).toBe("function");
  });
  // 评估原始组件选项中的函数的结果
  it("初始data是vue-text", () => {
    // 检查data函数存在性
    expect(typeof TestComp.data).toBe("function");
    // 检查data返回值
    const defaultData = TestComp.data();
    expect(defaultData.message).toBe("hello!");
  });
});
