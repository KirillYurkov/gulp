let form = document.querySelector('.contact__form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  sendMail(this); // Передаём форму в функцию
});

async function sendMail(formElement) {
  try {
    let formData = new FormData(formElement); // Используем переданный элемент формы

    let response = await fetch('send_mail.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    showMessage(data, formElement);
  } catch (error) {
    console.error('Ошибка отправки:', error);
    showMessage({
      success: false,
      message: 'Произошла ошибка при отправке. Попробуйте ещё раз.'
    }, formElement);
  }
}

function showMessage(data, form) {
  let messageDiv = document.createElement('div');
  messageDiv.className = data.success ? 'success-message' : 'error-message';
  messageDiv.textContent = data.message;

  if (data.success) {
    form.reset();
  }

  form.insertAdjacentElement('afterend', messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}
