<template>
<div style="display: flex">
  <div @click="toggleThis(ruleObj)" class="relation-action hand" v-if="ruleObj.children.length > 1">
    <span >{{relationMap[ruleObj.relation]}}</span>
  </div>
  <div style="display: flex; flex-direction: column">
    <div>{{`[${ruleObj.level}]-${ruleObj.id}`}}</div>
    <div 
      v-for="(rule, index) in ruleObj.children"
      :key="rule.id"
      :id="rule.id"
      style="margin-left: 12px"
    >
      <div class="item-condition" v-if="!rule.relation">
        <el-form-item>
          <el-input size="small" style="width: 200px" :value="`[${rule.level}]-${rule.id}`" />
        </el-form-item>
        <div 
          class="item-action hand"
          @click="addAfterThis(ruleObj, index)"
        >
          ＋
        </div>
        <div 
          class="item-action hand"
          v-if="(ruleObj.level === 0 && ruleObj.children.length > 1) || ruleObj.level !== 0" 
          @click="deleteThis(ruleObj, index)"
        >
          -
        </div>
        <div 
          class="item-action hand"
          v-if="(ruleObj.level === 0 && ruleObj.children.length > 1) || ruleObj.level > 0" 
          @click="addChild(ruleObj, index)"
        >
          子
        </div>
      </div>
      
      <FilterForm 
        v-if="rule.relation" 
        :ruleObj="rule"
        @addItem="addAfterThis"
        @deleteItem="deleteThis"
        @addChildItem="addChild"
        @toggleRelation="toggleThis"
      />
    </div>
  </div>
</div>
</template>
<script>


export default {
  name: 'FilterForm',
  props: {
    ruleObj: {
      type: Object,
      default: () => ({
        level: 0,
        relation: 'and',
        children: []
      })
    },
    addItem: {
      type: Function,
      default: () => {}
    },
    deleteItem: {
      type: Function,
      default: () => {}
    },
    addChildItem: {
      type: Function,
      default: () => {}
    },
    toggleRelation: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      relationMap : {
        and: '且',
        or: '或'
      }
    }
  },
  methods: {
    addAfterThis(ruleObj, index) {
      this.$emit('addItem', ruleObj, index)
    },
    deleteThis(ruleObj, index) {
      this.$emit('deleteItem', ruleObj, index)
    },
    addChild(ruleObj, index) {
      this.$emit('addChildItem', ruleObj, index)
    },
    toggleThis(ruleObj) {
      this.$emit('toggleRelation', ruleObj)
    }
  }
}
</script>
<style>

.hand {
  cursor: pointer;
}

.relation-action {
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 10px;
  margin-right: 10px;
  position: relative;
  user-select: none;  
}

.relation-action::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  overflow: hidden;
  background: #409eff;
}

.relation-action span {
  top: 50%;
  position: relative;
  background: #409eff;
  border-radius: 2px;
  color: #fff;
  padding: 4px;
}

.item-action {
  width: 20px;
  height: 20px;
  margin-bottom: 22px;
  margin-left: 8px;
  background: #409eff;
  color: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-condition {
  display: flex;
  align-items: center;
}
</style>