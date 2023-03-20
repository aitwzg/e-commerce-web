
<script>
export default {
  name: 'XtxTabs',
  render() {
    // 1.在babel的帮助下，可以在vue中写jsx语法
    // 2.数据的使用
    const name = 'tom'
    const title = 'tom 2'
    // 3.事件绑定
    const say = () => [console.log('hi jsx')]
    // 4.自定义一个jsx对象
    const sub = [<sub>123</sub>, <sub>456</sub>]
    return (
      <h1 title={title} onClick={say}>
        {name}
        {sub}
      </h1>
    )
  },
}
</script>

<style scoped lang='less'>
</style>