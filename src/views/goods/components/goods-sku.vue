<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '☆'
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      // 得到所有大于1的有效库存
      const valueArr = sku.specs.map((val) => val.valueName)
      //   console.log(valueArr)

      // 用算法得到可选数组的子集
      const valueArrPowerSet = powerSet(valueArr)
      //   console.log(valueArrPowerSet)

      valueArrPowerSet.forEach((arr) => {
        // 拼接每一个子集里面的数组
        const key = arr.join(spliter)
        // console.log(key)
        // 给每一个数组添加sku
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 取出已选择的选项
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach((item) => {
    const selectVal = item.values.find((val) => val.selected)
    // 未选中的添加进undefined
    arr.push(selectVal ? selectVal.name : undefined)
  })
  return arr
}

// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    // 获取当前选中的数组
    const selectedValues = getSelectedValues(specs)
    item.values.forEach((val) => {
      // 已选中的不做判断
      if (val.selected) return
      // 从selectedValues的第一个开始添加
      selectedValues[i] = val.name
      // console.log(selectedValues)
      // 拼接成约定字符串方便查询
      const key = selectedValues.filter((value) => value).join(spliter)
      // console.log(key)
      val.disabled = !pathMap[key]
    })
  })
}

// 默认选中
const initDefaultSelected = (goods, skuId) => {
  // 找出sku信息
  // 遍历每一个按钮如果按钮之和水库记录的值相等就选择
  console.log(skuId)
  const sku = goods.skus.find((sku) => sku.id === skuId)
  console.log(sku)
  goods.specs.forEach((item, i) => {
    const val = item.values.find((val) => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
    skuId: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
    }
    // 初始化更新按钮禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    const changeSku = (item, val) => {
      if (val.disabled) return
      // 判断是否已选中
      if (val.selected) {
        //   已选中的改为未选中
        val.selected = false
      } else {
        //   未选中的先清除之前的选中
        item.values.forEach((valItem) => {
          valItem.selected = false
        })
        val.selected = true
      }
      //   点击按钮更新按钮禁用状态
      //   console.log(getSelectedValues(props.goods.specs))
      updateDisabledStatus(props.goods.specs, pathMap)
      const validSelectedVlues = getSelectedValues(props.goods.specs).filter(
        (v) => v
      )
      if (validSelectedVlues.length === props.goods.specs.length) {
        const skuIds = pathMap[validSelectedVlues.join(spliter)]
        console.log(skuIds)
        const sku = props.goods.skus.find((sku) => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs
            .reduce((p, c) => `${p} ${c.name}:${c.valueName}`, '')
            .trim(),
        })
      } else {
        emit('change', {})
      }
    }
    return { changeSku }
  },
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>