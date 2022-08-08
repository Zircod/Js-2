class Param {
  constructor(el) {
    this.name = el.value;
    this.price = +el.dataset['price'];
    this.calories = +el.dataset.calories;
  }
}

class Burger {
  constructor(size, add, topping) {
    this.size = new Param(this.select(size));
    this.add = new Param(this.select(add));
    this.topping = this.getToppings(topping);
  }

  getToppings(name) {
    let result = [];
    this.selectAll(name).forEach(el => result.push(new Param(el)));
    return result;
  }

  select(name) {
    return document.querySelector(`input[name="${name}"]:checked`);
  }

  selectAll(name) {
    return document.querySelectorAll(`input[name="${name}"]:checked`);
  }

  sumPrice() {
    let result = this.size.price + this.add.price;
    this.topping.forEach(el => result += el.price);
    return result;
  }

  sumCalories() {
    let result = this.size.calories + this.add.calories;
    this.topping.forEach(el => result += el.calories);
    return result;
  }

  showSum(price, calories) {
    document.querySelector(price).textContent = this.sumPrice();
    document.querySelector(calories).textContent = this.sumCalories()
  }
}
//debugger
document.getElementById('check').addEventListener('click', () => {
  let burger = new Burger('size', 'add', 'topping');
  console.log(burger);
  burger.showSum('#price', '#calories');
})

