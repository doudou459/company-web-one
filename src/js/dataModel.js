export default class dataModel {
    //data 是一个json 数组(或label数组),idName 是该json数组的ID列的名称
    constructor(datas,idName) {
        this.datas = [];
        this.labels=[];
        this.idName="ID";
        this.Msg="";
        this.deleteDatas=[];
        if (datas) {
            this.Msg=this.loadData(datas,idName);
        }else{
            alert("please input the datas");
            this.Msg="please input the datas";
        }
    }
         /*       
         data 是一个json数组或列名数组
         idName 是该json数组的ID列的名称，如不传idName则其默认值为‘ID’
         isAdd是一个布尔值，true表示以增量形式增加数据，默认为false
         addIndex表示增加在数组末尾或首行（0表示首行，其他值表示末尾）
       */   
    loadData(data,idName,isAdd,addIndex) {
      if(!data){
        alert("please input the data");         
      }
      if(idName){
        this.idName=idName;
      }else{
        idName=this.idName;  
      }
       let add=false;
        if(typeof(data)==="string"){
        data = JSON.parse(data);
       }
       if(isAdd&&isAdd===true){
        add = true;
       }
        if(Object.prototype.toString.call(data[0])=="[object Object]"){
        this.labels=Object.keys(data[0]);
        if(!this.labels.some(d=>d==idName)){
        alert(idName +" is not finded");
         return idName +" is not finded";
        }
        if(add){
            if(addIndex===0||addIndex==="0"){
                this.datas.unshift(
                    data.map((value)=>{
                    let json={
                        'ID':value[idName],
                        'state':"stable",
                        'jsonData':value
                    }
                    return json;
                   })
                   );
            }else{
                this.datas.push(
                    data.map((value)=>{
                    let json={
                        'ID':value[idName],
                        'state':"stable",
                        'jsonData':value
                    }
                    return json;
                   })
                   )  
            }
            return "success"
        }else{
            this.datas= data.map((value)=>{
                let json={
                    'ID':value[idName],
                    'state':"stable",
                    'jsonData':value
                }
                return json;
               })
               return "success"
        }
       }else{
           //创建一个空的数据组件
        if(data.some(d=>d===idName)){
          this.labels=data;  
          return "success"
        }else{
            alert(idName +" is not finded");
            return idName +" is not finded";
        }          
       }

    }
    //row this.datas的行json对象
    val(col,row){
        if(row){
            return row.jsonData[col];

        }else{
            row=this.datas[0];
            return row.jsonData[col];
        }
    }
    //col  是列名称，rowID 是当前行的ID值
    getValueByID(col,rowID){
        let row =this.datas.find((value)=>{
            return value['ID'].toString()===rowID.toString();   
        })
         if(row){
            return row.jsonData[col];
         }else{
          return undefined;
         }    
    }
    //colNames 和values 是一一对应的数组，colName 是列名称的数组，values是对应的列的值的数组
    findRows(colNames,values){
    if(Array.isArray(colNames)&&Array.isArray(values)){
     if(colNames.length==values.length&&values.length>0){
        return this.datas.filter((v)=>{
                return colNames.every((e,i) => v.jsonData[e]==values[i]);            
        });
     }else{
         return undefined;
     }
    }else{
        alert("paramer is not Array");
        return "paramer is not Array";
    }
    }
    //col表示列名称,value表示要赋的值，rowID表示要赋值的行ID
    setValueByID(col,value,rowID){
    let index=this.datas.findIndex((v)=>{
        return v.ID==rowID;
    })
    if(this.datas[index].state=="stable"){
        this.datas[index].state='edit';
    }    
    this.datas[index].jsonData[col]=value;
    }
    //col表示列名称,value表示要赋的值，row是要赋值的行
    setValue(col,value,row){
     let rowID = row.ID;
     this.setValueByID(col,value,rowID);
    }
    //通过ID删除当前行
    deleteByID(rowID){
        let index=this.datas.findIndex((v)=>{
            return v.ID==rowID;
        })
        if(this.datas[index].state=="new"){
         this.datas.splice(index,1);
        }else{
            this.datas[index].state='delete';
            this.deleteDatas.push(this.datas[index]);
            this.datas.splice(index,1);
        }
    }
    //删除当前行
    deleteRow(row){
        let rowID = row.ID;
        this.deleteByID(rowID);   
    }
     //新增数据  json 是新增的数据    index=0时插入第一行   
    newData(json,index){
        if(Object.prototype.toString.call(json)=="[object Object]"){
            if(json[this.idName]){
                if(this.datas.some(d=>d.ID==json[this.idName])){
                    alert("the value of "+this.idName+" is used")
                    return  "the value of "+this.idName+" is used";  
                }
                let newJson = {
                    'ID': json[this.idName],
                    'jsonData': json,
                    'state': 'new'
                 }
                if(index==0||index=="0"){//index为0时插入首行   array.unshift()
                    this.datas.unshift(newJson);
                    }else{//index为其他值时，插入最后    array.push()
                    this.datas.push(newJson);
                    }
            }else{
                alert(this.idName+" is not defined")
                return  this.idName+" is not defined";
            }
        }else{
            alert("the type of the first param is not object")
            return "the type of the first param is not object"
        }

    }
    //为datas增添一个计算列，labName 是计算列的列名称    value 是该计算列的初始值   计算列将不会被提取和发送到后台
    setCountCol(labName,value){
     this.datas.forEach((element,index,arr) => {
        element[labName]=value;
        arr[index]=element;
    });
    }
     //获取被修改过的数据
    getChangedData(){
        let changedDatas=[];
        changedDatas= this.deleteDatas.map((value)=>{
            return value.jsonData;
           })
           this.datas.forEach(value=>{
               if(value.state=="new"||value.state=="edit"){
                changedDatas.push(value.jsonData); 
               }
           }) 
           if(changedDatas.length==0){
            return ""
           }else{
            return JSON.stringify(changedDatas);
           }      
    
    }
     //接受数据的所有修改
    acceptChanges(){
        this.datas.forEach((value,index,arr)=>{
            if(value.state=="new"||value.state=="edit"){
             arr[index]['state']="stable";
            }
        }) 
        this.deleteDatas=[];    
    }

}