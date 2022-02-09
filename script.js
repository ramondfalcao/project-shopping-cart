//

const cartItems = document.querySelector('.cart__items');

const totalPriceCart = async () => {
  let cartPrice = 0;
  const price = document.querySelector('.total-price');
  price.innerHTML = '';
  [...cartItems.children].forEach((element) => {
   let priceItem = element.innerText.match(/\$[0-9]*.[0-9]*$/);
    priceItem = priceItem[0].slice(priceItem.length - [priceItem.length - 1]);
    cartPrice += Number(priceItem);
  });
  price.innerHTML = cartPrice;
  return cartPrice;
}; // Cheguei na solução dessa função pelo codigo do Raphael Martins https://github.com/tryber/sd-019-a-project-shopping-cart/pull/90/files
// const addPriceCart = () => {
//   const price = document.querySelector('.total-price');
//   price.innerText = cartPrice;
// };

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const updateLocalStorage = () => {
  saveCartItems(cartItems.innerHTML); 
};

function cartItemClickListener(event) {
  const item = event.target;
  item.remove();
  totalPriceCart();
  updateLocalStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemsCart = async (event) => {
  const cartItem = document.querySelector('.cart__items');
  const sku = getSkuFromProductItem(event.target.parentNode);
  const { id, title, price } = await fetchItem(sku);
  const createElement = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartItem.appendChild(createElement);
  saveCartItems(cartItem.innerHTML);
  totalPriceCart();
};

const emptyCart = () => {
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((element) => {
    element.parentNode.removeChild(element);
  });
  totalPriceCart();
  localStorage.clear();
};

const insertItems = async () => {
  const itens = await fetchProducts('computador');
  itens.results.forEach(({ id, title, thumbnail, price }) => {
    // const { id: sku, title: name, thumbnail: image, salePrice: price } = element;
    const create = createProductItemElement({
       sku: id, name: title, image: thumbnail, price: `R$ ${price.toFixed(2)}` });
    document.querySelector('.items').appendChild(create);
  }); 
};
const loadingItems = () => {
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.textContent = 'carregando...';
  document.querySelector('.items').appendChild(loading);
};

const stopLoading = () => {
 const loanding = document.querySelector('.loading');
 loanding.remove();
};

const addCartItemListener = () => {
  const lis = document.querySelectorAll('.cart__item');
  lis.forEach((element) => element.addEventListener('click', cartItemClickListener));
};

const reloadBuyButtonCart = () => {
  const buyButton = document.querySelector('.buy-cart');
  buyButton.addEventListener('click', () => {
    window.location.reload();
    localStorage.clear();
  });
};

window.onload = async () => {
  loadingItems();
  // addPriceCart();
  await insertItems();
  const buttonAddCart = document.querySelectorAll('.item__add');
  const emptyButton = document.querySelector('.empty-cart');
  cartItems.innerHTML = getSavedCartItems();
  addCartItemListener();
  stopLoading();
  reloadBuyButtonCart();
  buttonAddCart.forEach((element) => element.addEventListener('click', addItemsCart));
  emptyButton.addEventListener('click', emptyCart);
}; 
