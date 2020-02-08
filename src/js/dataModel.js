export default class dataModel {
    //data 是一个json 数组(或label数组),idName 是该json数组的ID列的名称
    constructor(datas, idName) {
      this.datas = [];
      this.labels = [];
      this.countLabels = [];
      this.idName = idName ? idName : 'ID';
      this.deleteDatas = [];
      if (datas) {
        this.loadData(datas, false, -1);
      } else {
        alert("please input the datas");
      }
    }
  
  
    /*       
    data 是一个json数组或列名数组
    isAdd是一个布尔值，true表示以增量形式增加数据，默认为false
    addIndex表示增加在数组末尾或首行（0表示首行，其他值表示末尾）
  */
    loadData(data, isAdd, addIndex) {
      if (!data) {
        alert("please input the data");
        return "please input the data";
      }
      let idName = this.idName;
      let add = false;
      if (typeof (data) === "string") {
        data = JSON.parse(data);
      }
      if (isAdd && isAdd === true) {
        add = true;
      }
      if (Object.prototype.toString.call(data[0]) == "[object Object]") {
        if (!Object.keys(data[0]).some(d => d == idName)) {
          alert(idName + " is not finded");
          return idName + " is not finded";
        }
        let createModelRow = function (labels, countLabels) {
          let json = {
            'userDatasRowID': "",
            'userOperateState': "stable",
            'myLoadJsonDatas': {},
            'myCreateCountDatas': {}
          };
          for (let i = 0; i < labels.length; i++) {
            let key = labels[i];
            json.myLoadJsonDatas[key] = '';
            Object.defineProperty(json, key, {
              set:function (val) {
                json.userOperateState = "edit";
                 json.myLoadJsonDatas[key] = val;
              },
              get:function () {
                return json.myLoadJsonDatas[key];
              }
            })
          }
          for (let j = 0; j < countLabels.length; j++) {
            let col = countLabels[j];
            json.myCreateCountDatas[col]='';
            Object.defineProperty(json, col, {
              set:function (val) {
                 json.myCreateCountDatas[col] = val;
              },
              get:function () {
                return json.myCreateCountDatas[col];
              }
            })
          }
          return json
        }
        if (add) {
          let labels = this.labels;
          let countLabels = this.countLabels;
          if (addIndex === 0 || addIndex === "0") {
            this.datas.unshift(
              data.map((value) => {
                let json = createModelRow(labels,countLabels);
                json.userDatasRowID = value[idName];
                for (var key in value) {
                  if (!value.hasOwnProperty(key)) { continue }//跳过继承的属性
                  if (labels.indexOf(key) >= 0) {
                    json.myLoadJsonDatas[key] = value[key];
                  } else if (countLabels.indexOf(key) >= 0) {
                    json.myCreateCountDatas[key] = value[key];
                  }
                }
                json.userOperateState='stable';
                return json;
              })
            );
          } else {
            this.datas.push(
              data.map((value) => {
                let json = createModelRow(labels,countLabels);
                json.userDatasRowID = value[idName];
                for (var key in value) {
                  if (!value.hasOwnProperty(key)) { continue }//跳过继承的属性
                  if (labels.indexOf(key) >= 0) {
                    json.myLoadJsonDatas[key] = value[key];
                  } else if (countLabels.indexOf(key) >= 0) {
                    json.myCreateCountDatas[key] = value[key];
                  }
                }
                json.userOperateState='stable';
                return json;
              })
            )
          }
          return "success"
        } else {
          this.labels = Object.keys(data[0]);
          this.countLabels = [];
          let labels = this.labels;
          let countLabels = this.countLabels;
          this.datas = data.map((value) => {
            let json = createModelRow(labels, countLabels);
            json.userDatasRowID = value[idName];
            for (var key in value) {
              if (!value.hasOwnProperty(key)) { continue }//跳过继承的属性
              json.myLoadJsonDatas[key] = value[key];
            }
            json.userOperateState='stable';
            return json;
          })
          
          return "success"
        }
      } else {
        //创建一个空的数据组件
        if (data.some(d => d === idName)) {
          this.labels = data;
          return "success"
        } else {
          alert(idName + " is not finded");
          return idName + " is not finded";
        }
      }
  
    }
    //row this.datas的行json对象
    val(col, row) {
      if (row) {
        //return row.myLoadJsonDatas[col]?row.myLoadJsonDatas[col]:row.myCreateCountDatas[col];
        if (this.labels.indexOf(col) >= 0) {
          return row.myLoadJsonDatas[col];
        } else if (this.countLabels.indexOf(col) >= 0) {
          return row.myCreateCountDatas[col];
        } else {
          return null;
        }
      } else {
        row = this.datas[0];
        //return row.myLoadJsonDatas[col]?row.myLoadJsonDatas[col]:row.myCreateCountDatas[col];
        if (this.labels.indexOf(col) >= 0) {
          return row.myLoadJsonDatas[col];
        } else if (this.countLabels.indexOf(col) >= 0) {
          return row.myCreateCountDatas[col];
        } else {
          return null;
        }
      }
    }
    //col  是列名称，rowID 是当前行的ID值
    getValueByID(col, rowID) {
      let row = this.datas.find((value) => {
        return value.userDatasRowID.toString() === rowID.toString();
      })
      if (row) {
        //return row.myLoadJsonDatas[col]?row.myLoadJsonDatas[col]:row.myCreateCountDatas[col];
        if (this.labels.indexOf(col) >= 0) {
          return row.myLoadJsonDatas[col];
        } else if (this.countLabels.indexOf(col) >= 0) {
          return row.myCreateCountDatas[col];
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    //colNames 和values 是一一对应的数组，colName 是列名称的数组，values是对应的列的值的数组
    findRows(colNames, values) {
      if (Array.isArray(colNames) && Array.isArray(values)) {
        if (colNames.length == values.length && values.length > 0) {
          return this.datas.filter((v) => {
            return colNames.every((e, i) => v.myLoadJsonDatas[e] == values[i] || v.myCreateCountDatas[e] == values[i]);
          });
        } else {
          return null;
        }
      } else {
        alert("paramer is not Array");
        return "paramer is not Array";
      }
    }
    //col表示列名称,value表示要赋的值，rowID表示要赋值的行ID
    setValueByID(col, value, rowID) {
      let index = this.datas.findIndex((v) => {
        return v.userDatasRowID == rowID;
      })
      if (this.labels.indexOf(col) >= 0) {
        if (this.datas[index].userOperateState == "stable") {
          this.datas[index].userOperateState = 'edit';
        }
        this.datas[index].myLoadJsonDatas[col] = value;
      } else if (this.countLabels.indexOf(col) >= 0) {
        this.datas[index].myCreateCountDatas[col] = value;
      }
    }
    //col表示列名称,value表示要赋的值，row是要赋值的行
    setValue(col, value, row) {
      let rowID = row.userDatasRowID;
      this.setValueByID(col, value, rowID);
    }
    //通过ID删除当前行
    deleteByID(rowID) {
      let index = this.datas.findIndex((v) => {
        return v.userDatasRowID == rowID;
      })
      if (this.datas[index].userOperateState == "new") {
        this.datas.splice(index, 1);
      } else {
        this.datas[index].userOperateState = 'delete';
        this.deleteDatas.push(this.datas[index]);
        this.datas.splice(index, 1);
      }
    }
    //删除当前行
    deleteRow(row) {
      let rowID = row.userDatasRowID;
      this.deleteByID(rowID);
    }
    //新增数据  json 是新增的数据    index=0时插入第一行   
    newData(json, index) {
      let idName = this.idName;
      if (Object.prototype.toString.call(json) == "[object Object]") {
        if (json[idName]) {
          if (this.datas.some(d => d.userDatasRowID == json[idName])) {
            alert("the value of " + idName + " is used")
            return "the value of " + idName + " is used";
          }
          let newJson = {
            'userDatasRowID': json[idName],
            'userOperateState': 'new',
            'myLoadJsonDatas': {},
            'myCreateCountDatas': {}
          }
          for (let i = 0; i < this.labels.length; i++) {
            let key = this.labels[i];
            newJson.myLoadJsonDatas[key] = '';
            Object.defineProperty(newJson, key, {
              set:function (val) {
                newJson.myLoadJsonDatas[key] = val;
              },
              get:function () {
                return newJson.myLoadJsonDatas[key];
              }
            })
          }
          for (let j = 0; j < this.countLabels.length; j++) {
            let col = this.countLabels[j];
            newJson.myCreateCountDatas[col] = '';
            Object.defineProperty(newJson,col, {
              set:function (val) {
                newJson.myCreateCountDatas[col] = val;
              },
              get:function () {
                return newJson.myCreateCountDatas[col];
              }
            })
          }
          for (var key in json) {
            if (!json.hasOwnProperty(key)) { continue }//跳过继承的属性
            //循环体
            if (this.labels.indexOf(key) >= 0) {
              newJson.myLoadJsonDatas[key] = json[key];
            } else if (this.countLabels.indexOf(key) >= 0) {
              newJson.myCreateCountDatas[key] = json[key];
            }
  
          }
          if (index == 0 || index == "0") {//index为0时插入首行   array.unshift()
            this.datas.unshift(newJson);
          } else {//index为其他值时，插入最后    array.push()
            this.datas.push(newJson);
          }
        } else {
          alert(this.idName + " is not defined")
          return this.idName + " is not defined";
        }
      } else {
        alert("the type of the first param is not jsonObject")
        return "the type of the first param is not jsonObject"
      }
  
    }
    //为datas增添一个计算列，labName 是计算列的列名称    value 是该计算列的初始值   计算列将不会被提取和发送到后台
    setCountCol(labName, value) {
      if(this.labels.indexOf(labName)>=0){
        alert("labName has used");
        return "labName has used";
      }
      this.countLabels.push(labName);
      this.datas.forEach((element, index, arr) => {
        element.myCreateCountDatas[labName] = value;
        Object.defineProperty(element, labName, {
          set:function (val) {
            element.myCreateCountDatas[labName] = val;
          },
          get:function () {
            return element.myCreateCountDatas[labName];
          }
        })
        arr[index] = element;
      });
    }
    //获取被修改过的数据
    getChangedData() {
      let changedDatas = [];
      changedDatas = this.deleteDatas.map((value) => {
        let json = {
          'ID': value.userDatasRowID,
          'state': value.userOperateState,
          'jsonData': value.myLoadJsonDatas
        }
        return json;
      })
      this.datas.forEach(value => {
        if (value.userOperateState == "new" || value.userOperateState == "edit") {
          let json = {
            'ID': value.userDatasRowID,
            'state': value.userOperateState,
            'jsonData': value.myLoadJsonDatas
          }
          changedDatas.push(json);
        }
      })
      if (changedDatas.length == 0) {
        return ""
      } else {
        return JSON.stringify(changedDatas);
      }
  
    }
    //接受数据的所有修改
    acceptChanges() {
      this.datas.forEach((value, index, arr) => {
        if (value.userOperateState == "new" || value.userOperateState == "edit") {
          arr[index]['userOperateState'] = "stable";
        }
      })
      this.deleteDatas = [];
    }
  
  }