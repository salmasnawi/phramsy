var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productContainer;
var currentIndex = -1;

if (localStorage.getItem("products") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts(productContainer);
  updateProductCount();
  updateTotalEarnings();
}

document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

function updateDateTime() {
  const dateTimeElement = document.getElementById("dateTime");
  const now = new Date();
  const formattedDateTime = now.toLocaleString();
  dateTimeElement.textContent = formattedDateTime;
}

function addProduct() {
  if (
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDesc()
  ) {
    var product = {
      name: productNameInput.value,
      price: parseFloat(productPriceInput.value),
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };
    if (currentIndex >= 0) {
      productContainer[currentIndex] = product;
    } else {
      productContainer.push(product);
    }
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
    updateProductCount();
    updateTotalEarnings();
    clearForm();
  } else {
    alert("Product input invalid");
  }
}

function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts(productContainer);
  updateProductCount();
  updateTotalEarnings();
}

function updateProductCount() {
  let productCount = productContainer.length;
  document.getElementById("productCount").innerText = productCount;
}

function updateTotalEarnings() {      
  let totalEarnings = productContainer.reduce(
    (total, product) => total + parseFloat(product.price),
    0
  );
  document.getElementById(
    "totalEarnings"
  ).innerText = `$${totalEarnings.toFixed(2)}`;
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function displayProducts(productsList) {
  var container = "";
  for (var i = 0; i < productsList.length; i++) {
    container += `<tr>
<td>${i}</td>
<td>${productsList[i].name}</td>
<td>${productsList[i].price}</td>
<td>${productsList[i].category}</td>
<td>${productsList[i].desc}</td>
<td><button class="btn btn-warning" onclick="updateProducts(${i})">Update</button></td>
<td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
</tr>`;
  }
  document.getElementById("tableRow").innerHTML = container;
}

function searchProducts(term) {
  var searchProducts = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchProducts.push(productContainer[i]);
    }
  }
  displayProducts(searchProducts);
}

function updateProducts(index) {
  productNameInput.value = productContainer[index].name;
  productPriceInput.value = productContainer[index].price;
  productCategoryInput.value = productContainer[index].category;
  productDescInput.value = productContainer[index].desc;
  currentIndex = index;
}


function validateProductPrice() {
  return !isNaN(productPriceInput.value) && Number(productPriceInput.value) > 0;
}

function validateProductCategory() {
  return productCategoryInput.value.trim().length > 0;
}

function validateProductDesc() {
  return productDescInput.value.trim().length > 0;
}
