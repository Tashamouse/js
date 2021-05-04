const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    cartProducts: [],
    products: [],
    imgCatalog: 'https://via.placeholder.com/120x180',
    searchLine: '',
    isVisibleCart: true
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      product.quantity = 1
      console.log(product.id_product);
      const itemCart = this.cartProducts.findIndex(item => item.id_product === product.id_product)
      console.log(itemCart)
      if (itemCart !== -1) {
        console.log(this.cartProducts[itemCart].quantity)
        this.cartProducts[itemCart].quantity++
        console.log(this.cartProducts[itemCart].quantity)
      } else {

        this.cartProducts.push({ ...product })
      }
    },
    filterGoods() {
      //const regSearch = 
      const regName = new RegExp(this.searchLine, 'i')
      if (this.searchLine.length > 0) {
        this.products = this.products.filter(item => regName.exec(item.product_name))
      } else {
        this.products = []
        this.getJson(`${API + this.catalogUrl}`)
          .then(data => {
            for (let el of data) {
              this.products.push(el);
            }
          });
      }
    },
    openCart() {
      console.log(this.isVisibleCart)
      this.isVisibleCart = !this.isVisibleCart
    },
    // closeCart(event) {
    //   console.log(event.target.className)
    //   if (event.target.className !== 'btn-cart' && event.target.className !== 'cart-item') {
    //     this.isVisibleCart = true
    //   }

    // },
    removeCartItem(product) {
      console.log(product.id_product);
      console.log(this.cartProducts.findIndex(item => item.id_product === product.id_product))
      this.cartProducts.splice(this.cartProducts.findIndex(item => item.id_product === product.id_product), 1)
    }

  },
  computed: {
    sumCart() {
      return this.cartProducts.reduce((accum, item) => { return accum + item.price * item.quantity }, 0)
    }
  },
  beforeCreate() { },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        console.log(data)
        //data = []
        for (let el of data) {
          this.products.push(el);
        }
      });
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        console.log(data)
        //data = []
        for (let el of data.contents) {
          this.cartProducts.push(el);
        }
      });
  },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
});
