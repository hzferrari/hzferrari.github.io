import { shallowMount } from "@vue/test-utils";
import CsEditInput from "@/components/CsEditInput";

describe("CsEditInput.vue", () => {
  
  it("DIV has class 'editing' under editing", () => {
    const wrapper = shallowMount(CsEditInput, {
      propsData: {
        id: "testid",
        isEdit: true
      }
    });
    expect(wrapper.contains('.editing')).toBe(true)
  });

  it("DIV hasn't class 'editing' if not editing", () => {
    const wrapper = shallowMount(CsEditInput, {
      propsData: {
        id: "testid",
        isEdit: false
      }
    });
    expect(wrapper.contains('.editing')).toBe(false)
  });
 
});
