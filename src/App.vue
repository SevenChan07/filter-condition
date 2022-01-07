<template>
  <div id="app" style="display: flex">
    <el-form style="flex: 1">
      <FilterForm 
        :ruleObj="formData" 
        @addItem="addItem"
        @deleteItem="deleteItem"
        @addChildItem="addChildItem"
        @toggleRelation="toggleRelation"
      />
    </el-form>
    <div style="flex: 1">
      <vue-json-editor
        v-model="json"
        :mode="'code'"
        style="height: 600px"
      />
    </div>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
import {testData} from './mock'
import FilterForm from './components/FilterForm.vue'
import {getUUID, lowerLevel, findParentNode, addLevelAndId} from './utils'

export default {
  name: 'App',
  components: {
    FilterForm,
    vueJsonEditor
  },
  data() {
    return {
      formData: {
        id: '1001',
        relation: 'and',
        level: 0,
        children: [
          {
            id: getUUID(),
            level: 1,
            left: 'a',
            operator: '>',
            right: '123',
          }
        ]
      }
    }
  },
  computed: {
    json() {
      return this.formData
    }
  },
  created() {
    this.formData = addLevelAndId(this.formData)
  },
  methods: {
    addItem(ruleObj, index) {
      let parentLevel = ruleObj.level
      
      const newChild = {
        id: getUUID(),
        left: 'a',
        operator: '>',
        right: '123',
        level: parentLevel += 1
      }

      ruleObj.children.splice(index + 1, 0, newChild)

      console.log(JSON.parse(JSON.stringify(this.formData)))
    },
    deleteItem(ruleObj, index) {
      if (ruleObj.children.length === 2 && ruleObj.level !== 0) {
        // 找到父亲节点
        const parentNode = findParentNode(this.formData, ruleObj.id)

        const {children} = ruleObj

        children.splice(index, 1)

        const id = ruleObj.id
        const [one] = ruleObj.children
        let newRule

        if (one.children) {
          let newChildren = lowerLevel(one.children)
          
          newChildren = newChildren.map(item => {
            return {
              ...item,
            }
          })

          newRule = {
            id,
            level: ruleObj.level,
            relation: one.relation,
            children: newChildren
          }
        } else {
          newRule = {
            id,
            left: one.left,
            right: one.right,
            operator: one.operator,
            level: ruleObj.level
          }
        }

        // 修改对应的父节点
        parentNode.children = parentNode.children.map(item => {
          if (item.id === id) {
            return newRule
          }
          return item
        })
      } else {
        ruleObj.children.splice(index, 1)
      }

      console.log(JSON.parse(JSON.stringify(this.formData)))
    },
    addChildItem(ruleObj, index) {
      const [rule] = ruleObj.children.splice(index, 1)
      const oldLevel = rule.level
      rule.level++

      const newRule = {
        id: getUUID(),
        level: oldLevel,
        relation: 'and',
        children: []
      }

      newRule.children = [
        rule,
        {
          id: getUUID(),
          left: 'a',
          operator: '>',
          right: '123',
          level: rule.level
        }
      ]

      ruleObj.children.splice(index, 0, newRule)
      console.log(JSON.parse(JSON.stringify(this.formData)))
    },
    toggleRelation(ruleObj) {
      ruleObj.relation = ruleObj.relation === 'and' ? 'or' : 'and'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 12px;
}

.jsoneditor-vue {
  height: 100%
}
</style>
