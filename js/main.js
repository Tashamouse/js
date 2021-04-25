class ProductList {

    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
        this._totalPrice();
        this._renderTotalPrice();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000, quantity: 3},
            {id: 2, title: 'Mouse', price: 1500, quantity: 10},
            {id: 3, title: 'Keyboard', price: 5000, quantity: 5},
            {id: 4, title: 'Gamepad', price: 4500, quantity: 7},
        ];
    }

    _totalPrice() {
            let sum = 0;
            let n = 0;
            for (const i in this._goods) {
                sum += this._goods[i].price * this._goods[i].quantity;
                n++;                
            }
            return sum;
            
    }

    _renderTotalPrice() {
        const totalSum = document.querySelector(".totalSum");
        totalSum.insertAdjacentHTML('afterbegin',
        `<div>
        <p>Общая стоимость всех товаров: ${this._totalPrice()} \u20bd
        </p></div>`)
    }
    
    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
      
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
        this.quantity = product.quantity;
        this.getPrice = this.price * this.quantity;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>Цена: ${this.price} \u20bd</p>
                          <p>Количество: ${this.quantity} шт.</p>
                          <p>Общая стоимость: ${this.getPrice} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
    }
}

const pl = new ProductList();


