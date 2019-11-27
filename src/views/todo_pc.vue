<template>
  <div class="CS-Todo">
    <div class="header">
      <div class="width-wrapper">
        <span class="title">
          Todo-list
        </span>
        <span class="todo-input">
          <input
            v-model="todoInputingValue"
            type="text"
            placeholder="添加todo"
            autocomplete="off"
            @keydown="onTodoInputKeydown"
          />
        </span>
        <span class="todo-input-right-space"></span>
      </div>
    </div>
    <div class="width-wrapper">
      <div class="layouts layout-left">
        <div class="long-todo-list-box">
          <div class="title">
            长期事项
            <span class="items-sum">{{longTodoList.length}}</span>
          </div>

          <transition-group
            class="long-todo-list"
            v-if="longTodoList.length > 0"
            name="list-anime1"
            tag="ul"
          >
            <li
              class="items todo-list-item"
              :class="{ 'is-top-item': item.isTop }"
              v-for="(item, index) in longTodoList"
              :key="item.id"
            >
              <span class="check">
                <input
                  type="checkbox"
                  v-model="item.hasDone"
                  @change="onTodoListItemCheckChange(item, index, 'longTodoList')"
                />
              </span>
              <div class="content" v-show="!item.isEdit" @click="onItemClick(item)">
                <span>{{ item.content }}</span>
              </div>
              <input
                :ref="item.id"
                class="edit-content"
                type="text"
                v-model="item.content"
                v-show="item.isEdit"
                @blur="onItemInputBlur(item)"
              />
              <div class="collection">
                <span class="time" title="创建日期">{{
                  formatDate(new Date(item.createTime), "yy-MM-dd hh:mm")
                }}</span>
                <span class="operations">
                  <span title="置顶" v-show="!item.isTop"
                    ><svg-icon
                      class="icons"
                      icon-class="pin"
                      @click="toTop(item, index, 'longTodoList')"
                  /></span>
                  <span title="取消置顶" v-show="item.isTop"
                    ><svg-icon
                      class="icons is-top"
                      icon-class="pin"
                      @click="cancelTop(item, index, 'longTodoList')"
                  /></span>
                  <span title="移至普通事项"
                    ><svg-icon
                      class="icons long-time"
                      icon-class="timer"
                      @click="moveItem(item, index, 'longTodoList', 'todoList')"
                  /></span>
                  <span title="删除"
                    ><svg-icon
                      class="icons"
                      icon-class="delete"
                      @click="delItem(item, index, 'longTodoList', false)"
                  /></span>
                </span>
              </div>
            </li>
          </transition-group>
        </div>
      </div>
      <div class="layouts layout-middle">
        <div class="todo-list-box">
          <div class="title">
            正在进行
          </div>

          <transition-group
            class="todo-list"
            v-if="todoList.length > 0"
            name="list-anime1"
            tag="ul"
          >
            <li
              class="items todo-list-item"
              :class="{ 'is-top-item': item.isTop }"
              v-for="(item, index) in todoList"
              :key="item.id"
            >
              <span class="check">
                <input
                  type="checkbox"
                  v-model="item.hasDone"
                  @change="onTodoListItemCheckChange(item, index, 'todoList')"
                />
              </span>
              <div class="content" v-show="!item.isEdit" @click="onItemClick(item)">
                <span>{{ item.content }}</span>
              </div>
              <input
                :ref="item.id"
                class="edit-content"
                type="text"
                v-model="item.content"
                v-show="item.isEdit"
                @blur="onItemInputBlur(item)"
              />
              <div class="collection">
                <span class="time" title="创建日期">{{
                  formatDate(new Date(item.createTime), "yy-MM-dd hh:mm")
                }}</span>
                <span class="operations">
                  <span title="置顶" v-show="!item.isTop"
                    ><svg-icon
                      class="icons"
                      icon-class="pin"
                      @click="toTop(item, index, 'todoList')"
                  /></span>
                  <span title="取消置顶" v-show="item.isTop"
                    ><svg-icon
                      class="icons is-top"
                      icon-class="pin"
                      @click="cancelTop(item, index, 'todoList')"
                  /></span>
                  <span title="长期事项"
                    ><svg-icon
                      class="icons"
                      icon-class="timer"
                      @click="moveItem(item, index, 'todoList', 'longTodoList')"
                  /></span>
                  <span title="删除"
                    ><svg-icon
                      class="icons"
                      icon-class="delete"
                      @click="delItem(item, index, 'todoList', false)"
                  /></span>
                </span>
              </div>
            </li>
          </transition-group>
        </div>

        <div class="done-list-box">
          <div class="title">
            已完成
          </div>

          <transition-group
            class="done-list"
            v-if="doneList.length > 0"
            name="list-anime2"
            tag="ul"
          >
            <li class="items done-list-item" v-for="(item, index) in doneList" :key="item.id">
              <span class="check">
                <input
                  type="checkbox"
                  v-model="item.hasDone"
                  @change="onDoneListItemCheckChange(item, index)"
                />
              </span>
              <div class="content">
                <span>{{ item.content }}</span>
              </div>
              <div class="collection">
                <span class="time" title="完成日期">{{
                  formatDate(new Date(item.doneTime), "yy-MM-dd hh:mm")
                }}</span>
                <span class="operations">
                  <span title="删除"
                    ><svg-icon
                      class="icons"
                      icon-class="delete"
                      @click="delItem(item, index, 'doneList', false)"
                  /></span>
                </span>
              </div>
            </li>
          </transition-group>
        </div>

        <div class="del-list-box">
          <div class="title">
            已删除
          </div>

          <transition-group class="del-list" v-if="delList.length > 0" name="list-anime2" tag="ul">
            <li class="items del-list-item" v-for="(item, index) in delList" :key="item.id">
              <span class="check">
                <input type="checkbox" v-model="item.hasDone" disabled />
              </span>
              <div class="content">
                <del>{{ item.content }}</del>
              </div>
              <div class="collection">
                <span class="time" title="完成日期">{{
                  formatDate(new Date(item.delTime), "yy-MM-dd hh:mm")
                }}</span>
                <span class="operations">
                  <span title="彻底删除"
                    ><svg-icon
                      class="icons"
                      icon-class="delete"
                      @click="delItem(item, index, 'delList', false)"
                  /></span>
                </span>
              </div>
            </li>
          </transition-group>
        </div>
      </div>
      <div class="layouts layout-right"></div>
    </div>
  </div>
</template>

<script>
import util from "@/utils/util";

export default {
  name: "CS-Todo",
  data() {
    return {
      todoInputingValue: "",
      todoList: [],
      longTodoList: [],
      doneList: [],
      delList: [] // 已经删除的项
    };
  },
  watch: {
    /**
     * list发生变化时也记录在本地(需要deep监听)
     */
    todoList: {
      handler: function(val, oldVal) {
        localStorage.setItem("todoList", JSON.stringify(val));
      },
      deep: true
    },
    doneList: {
      handler: function(val, oldVal) {
        localStorage.setItem("doneList", JSON.stringify(val));
      },
      deep: true
    },
    longTodoList: {
      handler: function(val, oldVal) {
        localStorage.setItem("longTodoList", JSON.stringify(val));
      },
      deep: true
    },
    delList: {
      handler: function(val, oldVal) {
        localStorage.setItem("delList", JSON.stringify(val));
      },
      deep: true
    }
  },
  created() {
    this.recoverData("todoList");
    this.recoverData("doneList");
    this.recoverData("longTodoList");
    this.recoverData("delList");
  },
  methods: {
    formatDate(date, format) {
      return util.formatDate(date, format);
    },
    /**
     * 从本地恢复数据
     */
    recoverData(listName) {
      let list = JSON.parse(localStorage.getItem(listName));
      if (list && Object.prototype.toString.call(list) === "[object Array]") {
        this[listName] = [...list];
      } else {
        this[listName] = [];
      }
    },
    /**
     * @event
     */
    onTodoInputKeydown(e) {
      if (e.keyCode === 13) {
        // 按下回车键
        this.add(e);
      }
    },
    /**
     * @function insertItemUnderTop 将item置于非置顶项的最上方
     * @param {Object} item 要插入的事项
     * @param {String} insertListName 要插入的列表名
     */
    insertItemUnderTop(item, insertListName) {
      for (let i = 0; i < this[insertListName].length; i++) {
        if (!this[insertListName][i].isTop) {
          this[insertListName].splice(i, 0, item);
          break;
        } else if (i === this[insertListName].length - 1) {
          // 全部都是置顶的情况
          this[insertListName].push(item);
          break;
        }
      }
    },
    /**
     * 新增
     */
    add(evt) {
      if (evt.target.value && evt.target.value.trim() != "") {
        let o = {
          content: evt.target.value.trim(),
          id: "_000_" + new Date().getTime() + "_" + Math.round(Math.random() * 10000),
          hasDone: false, // 是否完成
          hasDel: false, // 是否删除
          isEdit: false, // 是否编辑状态
          isTop: false, // 是否置顶
          createTime: new Date().getTime(),
          doneTime: -1,
          delTime: -1
        };

        // 插入在非置顶项的第一个
        if (this.todoList.length > 0) {
          this.insertItemUnderTop(o, "todoList");
        } else {
          this.todoList.push(o);
        }

        this.todoInputingValue = "";
      }
    },
    /**
     * item点击时
     */
    onItemClick(item) {
      item.isEdit = true;
      // console.log("this.$refs[item.id]: ", this.$refs[item.id][0]);

      this.$nextTick(() => {
        this.$refs[item.id][0].focus();
      });
    },
    /**
     * 编辑项blur时
     */
    onItemInputBlur(item) {
      item.isEdit = false;
    },
    /**
     * todolist/longtodolist CheckBox变化时
     */
    onTodoListItemCheckChange(item, index, listName) {
      if (item.hasDone === false) return;

      item.doneTime = new Date().getTime();
      let tmp = this[listName].splice(index, 1)[0];
      this.doneList.unshift(tmp);
    },
    /**
     * donelist CheckBox变化时
     */
    onDoneListItemCheckChange(item, index) {
      if (item.hasDone === true) return;

      let tmp = this.doneList.splice(index, 1)[0];

      this.insertItemUnderTop(tmp, "todoList");
    },
    /**
     * 置顶。置于整个队列最上方
     * @param {String} listName 列表名
     */
    toTop(item, index, listName) {
      item.isTop = true;
      let tmp = this[listName].splice(index, 1)[0];
      this[listName].unshift(tmp);
    },
    /**
     * 取消置顶，置于非置顶队列的最上方
     */
    cancelTop(item, index, listName) {
      item.isTop = false;
      let tmp = this[listName].splice(index, 1)[0];

      this.insertItemUnderTop(tmp, listName);
    },
    /**
     * 项目移动
     * @param {String} fromList 从这个列表移出
     * @param {String} toList 移到这个列表
     */
    moveItem(item, index, fromList, toList) {
      item.isTop = false;
      let tmp = this[fromList].splice(index, 1)[0];

      this.insertItemUnderTop(tmp, toList);
    },
    /**
     * 删除
     * @param {String} listName 列表名
     * @param {Boolean} flag 是否需要弹窗确认
     */
    delItem(item, index, listName, flag) {
      let tmp;
      if (flag) {
        let cf = confirm(`确认要删除【${item.content}】吗？`);
        if (cf) {
          tmp = this[listName].splice(index, 1)[0];
        }
      } else {
        tmp = this[listName].splice(index, 1)[0];
      }

      if (listName !== "delList") {
        tmp.delTime = new Date().getTime();
        this.delList.unshift(tmp);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$content-width: 1200px;
$header-height: 50px;
$borderRadius: 6px;
$bgColor1: #abc;
$textColor: #000;

// shuffle和排序的过渡动画只需要这个类设置
.todo-list-item,
.done-list-item,
.del-list-item {
  transition: all 0.3s;
}
// 下面是add和del的动画
.list-anime1-enter-active,
.list-anime1-leave-active {
  transition: all 0.3s ease;
}
.list-anime1-enter,
.list-anime1-leave-to {
  transform: translate3d(-1000px, 0, 0);
  opacity: 0.3;
}
.list-anime1-leave-to {
  // position: absolute !important;
  // width: 100px !important;
}

.list-anime2-enter-active,
.list-anime2-leave-active {
  transition: all 0.5s ease;
}
.list-anime2-enter,
.list-anime2-leave-to {
  transform: translate3d(1000px, 0, 0);
  opacity: 0.3;
}

.CS-Todo {
  font-family: "Microsoft YaHei";
  font-size: 12px;
  background: #efefef;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .width-wrapper {
    // width:$content-width;
    width: 100%;
    display: block;
    margin: 0 auto;
  }
  .header {
    position: relative;
    width: 100%;
    background: $bgColor1;
    height: $header-height;
    line-height: $header-height;
    text-align: center;
    .title,
    .todo-input,
    .todo-input-right-space {
      display: inline-block;
      margin: 0;
      width: 33%;
    }
    .title {
      font-size: 30px;
      font-weight: 700;
      color: #507f96;
      text-shadow: 3px 2px 4px #efefef;
      // text-align left;
    }
    .todo-input {
      margin: 0 auto;
      height: $header-height;
      line-height: $header-height;
      vertical-align: top;
      input {
        padding: 0 10px;
        border: 1px solid #ccc;
        height: 30px;
        width: 96%;
        border-radius: $borderRadius;
        font-family: "Microsoft YaHei";
        letter-spacing: 0.6px;
        font-size: 12px;
        &:focus {
          outline: none;
        }
      }
    }
  }
  .layouts {
    display: inline-block;
    vertical-align: top;
    &.layout-left,
    &.layout-right {
      width: 30%;
    }
    &.layout-middle {
      width: 40%;
    }
  }
  .todo-list-box,
  .done-list-box,
  .del-list-box {
    width: 90%;
  }
  .long-todo-list-box {
    width: 70%;
  }

  .todo-list-box,
  .done-list-box,
  .long-todo-list-box,
  .del-list-box {
    margin: 20px auto;
    vertical-align: top;
    .title {
      margin-top: 10px;
      font-size: 15px;
      font-weight: 600;
      color: #555;
      letter-spacing: 0.7px;
      .items-sum{
        width: 10%;
        
        float: right;
        font-size: 12px;
        padding: 2px;
        border-radius: 50%;
        background: $bgColor1;
      }
    }

    .todo-list,
    .done-list,
    .long-todo-list,
    .del-list {
      .items {
        position: relative;
        margin: 10px auto;
        padding-top: 3px;
        width: 100%;
        min-height: 40px;
        line-height: 30px;
        font-size: 13px;
        background: #fff;
        color: $textColor;
        border-radius: $borderRadius;
        &:hover {
          .operations {
            opacity: 1 !important;
          }
        }
        .check {
          display: inline-block;
          width: 8%;
          line-height: 10px;
          input {
            display: block;
            margin: 0 auto;
            // margin-left: 30%;
            width: 18px;
            height: 18px;
            vertical-align: middle;
            cursor: pointer;
          }
        }
        div.content {
          display: inline-block;
          width: 90%;
          letter-spacing: 0.6px;
          cursor: pointer;
          word-break: break-all;
          vertical-align: top;
        }
        div.collection {
          display: inline-block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          span.time {
            display: inline-block;
            margin-left: 8%;
            font-size: 11px;
            color: #bbb;
          }
          .operations {
            float: right;
            margin-right: 0px;
            opacity: 0.15;
            transition: all 0.2s;
          }
          .icons {
            padding: 1px;
            margin-right: 15px;
            font-size: 14px;
            cursor: pointer;
            color: #000;
            border-radius: 20%;
            transition: all 0.2s;
            &.is-top {
              transform: rotate(-45deg);
              &:hover {
                transform: rotate(0) scale(1.5);
              }
            }
            &:hover {
              // font-size: 18px;
              transform: scale(1.5);
              color: #fff;
              background: $bgColor1;
            }
          }
        }
        input.edit-content {
          padding: 2px;
          width: 90%;
          height: 26px;
          line-height: 26px;
          // min-height: 60%;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid #ddd;
          border-radius: $borderRadius;
          box-sizing: border-box;
          &:focus {
            outline: none;
          }
        }
      }
    }

    .todo-list,
    .long-todo-list {
      .items {
        background: #fff;
        &.is-top-item {
          background: #f9ffbd;
        }
      }
    }
    .long-todo-list {
      .items {
        .collection {
          .icons.long-time {
            &:hover {
              transform: rotate(45deg) scale(1.5);
            }
          }
        }
      }
    }
    .done-list,
    .del-list {
      .items {
        background: #eaeaea;
        color: #848484;
      }
    }
  }
}
</style>
