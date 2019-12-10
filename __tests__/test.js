/* eslint-disable no-undef */
// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import CsEditInput from '../src/components/CsEditInput'

describe('CsEditInput', () => {
  test('is a Vue instance', () => {
    // 通过 mount 生成了一个包裹器，包括了一个挂载组件或 vnode，以及测试该组件或 vnode 的方法
    const wrapper = mount(CsEditInput,{
      propsData: {
        id: 'testid',
        isEdit: true
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Has class named "isEdit" when editing',()=>{
    const id = "testid";
    const wrapper = mount(CsEditInput,{
      propsData: {
        id: id,
        isEdit: true
      }
    })
    expect(wrapper.find('.isEdit')).toBe(true)
    // expect(wrapper.classes('cs-edit-input')).toBe(true)
  })
})
