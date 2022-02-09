const fetchProducts = async (item) => {
  // seu código aqui
  try {
    const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
    const response = await url.json();
    // console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
