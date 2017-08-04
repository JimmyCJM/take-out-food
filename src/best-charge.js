function bestCharge(selectedItems) {

  //loadAllItems
  var items = loadAllItems();
  /*items
[ { id: 'ITEM0001', name: '黄焖鸡', price: 18 },
  { id: 'ITEM0013', name: '肉夹馍', price: 6 },
  { id: 'ITEM0022', name: '凉皮', price: 8 },
  { id: 'ITEM0030', name: '冰锋', price: 2 } ]
 */

  //select
  var selectedItemsIfo = new Array();
  for (let i=0;i<selectedItems.length;i++){
    selectedItemsIfo.push({id:selectedItems[i].split("x")[0].trim(), count:parseInt(selectedItems[i].split("x")[1])});
  }
  /*selectedItemsIfo
[ { id: 'ITEM0001', count: 1 },
  { id: 'ITEM0013', count: 2 },
  { id: 'ITEM0022', count: 1 } ]
 */

  //count
  var itemsCount = new Array();
  for(let i=0;i<items.length;i++){
    for(let j=0;j<selectedItemsIfo.length;j++){
      if(items[i].id === selectedItemsIfo[j].id)
        itemsCount.push({id:items[i].id, name:items[i].name, price:items[i].price, count:selectedItemsIfo[j].count})
    }
  }
  /*itemsCount
[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
  { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
  { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 } ]
 */

  //loadPromotions
  var promotionIfo = loadPromotions();
  /*promotionIfo
[ { type: '满30减6元' },
  { type: '指定菜品半价', items: [ 'ITEM0001', 'ITEM0022' ] } ]
 */

  //promotion_1
  var discount_1 = 0;
  var cost = 0;
  for (let i=0;i<itemsCount.length;i++){
    cost += itemsCount[i].price * itemsCount[i].count;
  }
  if(parseInt(cost/30) > 0) discount_1 = 6;
  else discount_1 = 0;
  //discount_1 = 6

  //promotion_2
  var discount_2 = 0;
  var discountName = new Array();
  for (let i=0;i<itemsCount.length;i++){
    for (let j=0;j<promotionIfo[1].items.length;j++){
      if (itemsCount[i].id === promotionIfo[1].items[j] && j < (promotionIfo[1].items.length - 1)){
        discount_2 += itemsCount[i].price * itemsCount[i].count / 2;
        discountName = discountName + itemsCount[i].name + '，';
      }
      if (itemsCount[i].id === promotionIfo[1].items[j] && j === (promotionIfo[1].items.length - 1)){
        discount_2 += itemsCount[i].price * itemsCount[i].count / 2;
        discountName = discountName + itemsCount[i].name;
      }
    }
  }
  /*
discount_2 = 13
discountName = 黄焖鸡，凉皮
 */

  //comparePromotions
  var sum = new Array();
  var totalprice = 0;
  itemsCount.map(value => totalprice += value.price * value.count)
  if (discount_1 < discount_2)
    sum.push({discount:discount_2, totalprice:totalprice - discount_2,type:promotionIfo[1].type+'('+discountName+')'})
  else sum.push({discount:discount_1,totalprice:totalprice - discount_1, type:promotionIfo[0].type});

  //print
  var printIfo = new Array();
  var print = [];
  printIfo.push(`============= 订餐明细 =============`);
  for (let i=0;i<itemsCount.length;i++){
    printIfo.push(`${itemsCount[i].name} x ${itemsCount[i].count} = ${itemsCount[i].count * itemsCount[i].price}元` );
  }
  printIfo.push(`-----------------------------------`);
  if(discount_1 !== 0 && discount_2 !== 0){
    printIfo.push('使用优惠:');
    printIfo.push(`${sum[0].type}，省${sum[0].discount}元`);
    printIfo.push(`-----------------------------------`);
  }
  printIfo.push(`总计：${sum[0].totalprice}元`);
  printIfo.push(`===================================`);

  for(let i=0;i<printIfo.length;i++){
    print = print + printIfo[i].toString() +'\n';
  }
  return print.trim();
/* print
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 6元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡,凉皮)，省13元
-----------------------------------
总计：25元
===================================
 */
}
