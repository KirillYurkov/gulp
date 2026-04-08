export class Calendar {
  constructor(className) {
    this.className = className;
  }
  createCalendar(year, month) {
    let months = [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ];
    // Создаем дату
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();

    // Дни недели
    let daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    // Если календарь уже существует, обновляем его
    if (!this.calendarElement) {
      this.calendarElement = document.createElement("div");
      this.calendarElement.classList.add(this.className);
      document.body.appendChild(this.calendarElement); // Временное место
    }

    let calendar = this.calendarElement;

    // Очищаем содержимое
    calendar.innerHTML = "";

    // Шапка календаря
    let calendarHeader = document.createElement("div");
    calendarHeader.classList.add(`${this.className}__header`);
    calendar.appendChild(calendarHeader);

    // Дата в шапке
    let calendarHeaderDate = document.createElement("span");
    calendarHeaderDate.classList.add(`${this.className}__date`);
    calendarHeader.appendChild(calendarHeaderDate);
    calendarHeaderDate.textContent = `${months[month]} ${year}`;

    // Блок кнопок переключения
    let calendarBtns = document.createElement("div");
    calendarBtns.classList.add(`${this.className}__btns`);
    calendarHeader.appendChild(calendarBtns);

    // Кнопки переключения
    let btnPrev = document.createElement("button");
    btnPrev.classList.add(`${this.className}__btn--prev`);
    btnPrev.textContent = "prev";
    calendarBtns.appendChild(btnPrev);

    let btnNext = document.createElement("button");
    btnNext.classList.add(`${this.className}__btn--next`);
    btnNext.textContent = "next";
    calendarBtns.appendChild(btnNext);

    // Дни недели
    let weekdays = document.createElement("div");
    weekdays.classList.add(`${this.className}__weekdays`);
    calendar.appendChild(weekdays);

    daysOfWeek.forEach((day) => {
      let weekday = document.createElement("span");
      weekday.classList.add(`${this.className}__weekday`);
      weekday.textContent = day;
      weekdays.appendChild(weekday);
    });

    // Дни месяца
    let days = document.createElement("div");
    days.classList.add(`${this.className}__days`);
    calendar.appendChild(days);

    //  Находим количество дней в месяце
    let firstDay = new Date(year, month, 1).getDay();
    let dayInMonth = new Date(year, month + 1, 0).getDate();

    // Пустые дни для выравнивания
    for (let i = 1; i < firstDay; i++) {
      let emptyDay = document.createElement("span");
      emptyDay.classList.add(`${this.className}__day--empty`);
      days.appendChild(emptyDay);
    }

    // Дни месяца

    for (let i = 1; i <= dayInMonth; i++) {
      let day = document.createElement("span");
      day.classList.add(`${this.className}__day`);
      day.textContent = i;
      days.appendChild(day);

      // Выделяем текущий день
      if (year === currentYear && month === currentMonth && i === currentDay) {
        day.classList.add(`${this.className}__day--current`);
      }
    }

    // Обработчики кнопок
    btnPrev.addEventListener("click", () => {
      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }
      this.createCalendar(year, month); // Пересоздаём с новыми данными
    });

    btnNext.addEventListener("click", () => {
      if (month === 11) {
        month = 0;
        year++;
      } else {
        month++;
      }
      this.createCalendar(year, month); // Пересоздаём с новыми данными
    });
  }
}
