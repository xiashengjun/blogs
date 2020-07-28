---
title: element的使用
---

## （一）表格的基本引用

  ```vue
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
    </el-table>
  </div>

 ```

## 表格的合并

 ```js
 export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987122",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987122",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },{
          id: "12987123",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },{
          id: "12987123",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        }
      ],
      spanArr: [],
      pos:null
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    //处理要放入表格中的数据
    getSpanArr(data){
      this.spanArr = [];
      for(let i = 0;i< data.length;i++){
        if(i==0){
          this.spanArr.push(1);
          this.pos=0;
        }else{
          //根据id去合并，可更具实际情况更改
          if(data[i].id === data[i - 1].id){
            this.spanArr[this.pos] +=1;
            this.spanArr.push(0);
          }else{
            this.spanArr.push(1);
            this.pos=i;
          }
        }
      }
    }
  },
  mounted(){
    this.getSpanArr(this.tableData)
  }
};
```

参考资料

[elementui中文文档](https://element.eleme.cn/#/zh-CN)