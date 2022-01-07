import {shallowMount} from '@vue/test-utils'
import FilterForm from '@/components/FilterForm.vue'

describe('FilterForm.vue', () => {
  it('初始值测试', () => {
    const wrapper = shallowMount(FilterForm)
    expect(wrapper.vm.ruleObj.children.length).toBe(0)
  })
})
