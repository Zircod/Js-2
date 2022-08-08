const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

function service(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response));
  }
}

class GoodsItem {
  constructor({title ='', price = 0, img = 'https://i.ibb.co/bvjZbP9/black-friday-elements-assortment.jpg'}) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `
      <div class="goods-item">
        <img src="${this.img}" alt="img">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
      </div>
  `;
  }
}

class GoodsList {
  // constructor(list = []) {
  //   this.list = list;
  // }
  items = [];

  fetchGoods(callback) {
    service(GET_GOODS_ITEMS, (data) => {
      this.items = data;
      callback();
    });
  }

  calcPrice() {
    return this.items.reduce((acc, value) => acc + value.price, 0);
  }


  render() {
    const goodsList = this.items.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }
}

debugger
const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
  goodsList.render();
});

goodsList.calcPrice();


