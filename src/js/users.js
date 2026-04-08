// Получаем данные из нужного JSON файла
let pathToUsers = "./json_files/users.json";
// Получаем данные из нужного JSON файла
async function loadUsersJSON(path) {
  try {
    let response = await fetch(path);
    //console.log(response);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    let data = await response.json();
    //console.log(data);
    displayUsers(data);
  } catch (error) {
    console.log(`Ошибка загрузки данных users`);
  }
}

function displayUsers(data) {
  //Куда выводим
  let usersDiv = document.querySelector(".users");
  //console.log(data.users);
  data.users.forEach((user) => {
    if (data.users && data.users.length > 0) {
      let html = ` 
      <article class="users-card">
      <h3>${user.name}</h3>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Возраст:</strong> ${user.age} лет</p>
                            <p><strong>Город:</strong> ${user.city}</p>
                            <p><strong>ID:</strong> ${user.id}</p>
                     </article>
                    `;
      usersDiv.insertAdjacentHTML("beforeend", html);
    }
  });
}
//Вызываем функцию после загрузки документа
loadUsersJSON(pathToUsers);
