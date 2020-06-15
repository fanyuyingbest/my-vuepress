# 2.数据结构：时间复杂度👉空间复杂度

### 2-1 时间昂贵，空间廉价

> 如果缺少计算空间，可以花钱买服务器；但是缺少计算时间，只能投入宝贵时间去计算下去

### 2-2 数据结构连接时空

- 常用的降低时间复杂度的方法有：递归、二分法、排序算法、动态规划等
- 降低空间复杂度核心思路就是，能用低复杂度的数据结构能解决问题，就千万不要用高复杂度的数据结构
 - 1.第一步，暴力解法，在没有任何时间，空间约束下，完成代码任务的开发
 - 2.第二步，无效操作处理，将代码中的无效计算、无效存储剔除，降低时间空间的复杂度
 - 3.第三步，时空转换，设计合力数据结构，完成时间复杂度向空间复杂度转移

 ![图示](/img/2020/algorithm/data2-1.gif)

### 2-3 降低复杂度的案例

#### 2-3-1 第一个例子
 
> 例子：有任意多张面额为2、3、7元的货币，现在要他们凑100元，求总共多少中可能

- 初级开发师做法

```
 function s2_1(){
   let count = 0 ;
   for(let i = 0; i < (100/7);i++){
     for(let j = 0; j < (100 /3); j++){
       for(let k = 0; k < (100 / 2); k++){
         if(i*7 + j*3 + k*2 == 100){
           count += 1
         }
       }
     }
   }
   return count;
 }

```

> 以上代码嵌套3层 for循环，所以时间复杂度为 O(n<sup>3</sup>)
> 但不难发现，当已经确定3元和7元的数量，2元是可以计算获得的，而不需要再循环，代码如下：

- 优化后

```
 function  s2_2(){
   let count = 0;
   for(let i = 0; i < (100/7); i++){
     for(let j = 0; j < (100 / 3); j++ ){
       if((100 - i*7 - j*3) % 2 == 0){
         count += 1
       }
     }
   }
   return count;
 }
```
> 删除无效循环后，时间复杂度由O(n<sup>3</sup>)降为O(n<sup>2</sup>)

#### 2-3-2 第二个例子

> 例子：查找一个数组中，出现次数最多的那个元素的数值，如 a = [1,2,3,4,5,5,6],结果应该输出5

- 初级做法

```
 function s2_3(){
   let a = [1,2,3,4,5,5,6];
   let val_max = -1;
   let time_temp = 0;
   let max_time = 0;
   for(let i = 0; i < a.length; i++){
     time_temp = 0;
     for(let j = 0; j < a.length; j++){
       if(a[i] === a[j]){
         time_temp += 1;
       };
     }
     if(time_temp > max_time){
       max_time = time_temp;
       val_max = a[i]
     }
   }
   return val_max
 }
```

> 以上代码嵌套2层 for循环，所以时间复杂度为 O(n<sup>2</sup>)
> 但是里面确实没有冗余代码，所以就从数据结构方面来优化，用数据字典的方式来处理，代码如下：


- 优化后

```
  function s2_4(){
    let a = [1,2,3,4,5,5,6];
    let obj2 = {};
    //hasOwnProperty
    for(let i = 0 ; i < a.length; i++){
      if(obj2.hasOwnProperty(a[i])){
        obj2[a[i]] += 1
      }else{
        obj2[a[i]] = 1;
      }
    }
    console.log('obj2',obj2)
    let val_max = -1;
    let max_time = 0;
    for(let key in obj2){
      if(obj2[key] > max_time){
        max_time = obj2[key];
        val_max = [key]
      }
    }
    return val_max
  }

```

![图示](/img/2020/algorithm/data2-2.gif)

> 以上代码可以看出，将嵌套for循环改为了顺序结构，时间复杂度由 O(n<sup>2</sup>) 变为  O(n)

### 2-4 总结
 - 第一步，暴力解决；在没有任何时间、空间约束下，完成代码任务的开发
 - 第二步，无效操作处理；将代码中的无效计算、无效存储剔除，降低时间或空间的复杂度
 - 第三步，时空转换，设计合理的数据结构，完成时间复杂度向空间复杂度的转移


<b></b>