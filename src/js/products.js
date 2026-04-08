let pathToProducts = "./json_files/products.json";
// Получаем данные из нужного JSON файла
async function loadProducts(path) {
  try {
    let response = await fetch(path);

    //console.log(response);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    let data = await response.json();
    //console.log(data);
    displayProducts(data);
  } catch (error) {
    console.log(`Ошибка загрузки данных users`);
  }
}

function displayProducts(data) {
  //Куда выводим
  let productsDiv = document.querySelector(".products");
  console.log(productsDiv);
  // console.log(data.users);
  data.products.forEach((product) => {

      let html = ` 
      <article class="product-card">
                            <p><strong>Название</strong> ${product.title}</p>
                            <p><strong>Описание:</strong> ${product.desc} лет</p>
                           <img class="products__img" src="${product.imgSrc}">
                     </article>
                    `;
      productsDiv.insertAdjacentHTML("beforeend", html);
    
  });
}
//Вызываем функцию после загрузки документа
loadProducts(pathToProducts);