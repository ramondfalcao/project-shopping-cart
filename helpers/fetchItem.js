const fetchItem = async (id) => {
  // seu código aqui
  try {
    const url = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await url.json();
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
