const saveCartItems = (element) => {
  // seu código aqui
  localStorage.setItem('cartItems', element);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
