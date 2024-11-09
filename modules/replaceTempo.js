function replaceTempo(tempCard, product) {
  let output = tempCard.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%DETAILS%}/g, "Details");
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%COUNTRY%}/g, product.from);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%not-organic%}/g, "not-organic");
  }

  return output;
}

module.exports = replaceTempo;
