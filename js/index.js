'use strict';

let habits = [];
const HABIT_KEY = 'HABIT_KEY';
let globalActiveHabitId;
let iconLi = '';

/* page */

const page = {
   menu: document.querySelector('.app__menu-wrapper > ul'),
   header: {
      h1: document.querySelector('.app__info-title > h1'),
      progressPercent: document.querySelector('.progress > span'),
      progressBar: document.querySelector('.notif'),
   },
   main: document.querySelector('.tasks > ul'),
   popup: {
      index: document.querySelector('.form'),
      iconField: document.querySelector('.form__popup[name="icon"'),
   },
};

/* svg */

const svgCode = [
   {
      id: 1,
      svg: `<svg
		 width="25"
		 height="25"
		 viewBox="0 0 25 25"
		 fill="none"
		 xmlns="http://www.w3.org/2000/svg"
	>
		 <path
				d="M14.0625 21.9646C14.0625 21.574 13.9073 21.199 13.6313 20.9229L4.07708 11.3687C3.80104 11.0927 3.42604 10.9375 3.03542 10.9375C2.22187 10.9375 1.5625 11.5969 1.5625 12.4104C1.5625 12.801 1.71771 13.176 1.99375 13.4521L11.5474 23.0057C11.8234 23.2818 12.1984 23.437 12.5891 23.437C13.4031 23.4375 14.0625 22.7781 14.0625 21.9646Z"
				stroke="white"
				stroke-miterlimit="10"
		 />
		 <path
				d="M4.07708 15.5354C3.80104 15.2594 3.42604 15.1042 3.03542 15.1042C2.22188 15.1042 1.5625 15.7636 1.5625 16.5771C1.5625 16.9677 1.71771 17.3427 1.99375 17.6188L7.38073 23.0057C7.65677 23.2818 8.03177 23.437 8.4224 23.437C9.23646 23.4375 9.89583 22.7781 9.89583 21.9646C9.89583 21.574 9.74063 21.199 9.46458 20.9229"
				stroke="white"
				stroke-miterlimit="10"
		 />
		 <path
				d="M3.64587 19.2708L2.08337 20.8333L4.16671 22.9166L5.72921 21.3541"
				stroke="white"
				stroke-miterlimit="10"
		 />
		 <path
				d="M10.9375 3.03542C10.9375 3.42604 11.0927 3.80104 11.3687 4.07708L20.9224 13.6307C21.1984 13.9068 21.5734 14.062 21.9641 14.062C22.7781 14.0625 23.4375 13.4031 23.4375 12.5896C23.4375 12.199 23.2823 11.824 23.0063 11.5479L13.4521 1.99375C13.176 1.71771 12.801 1.5625 12.4104 1.5625C11.5969 1.5625 10.9375 2.22187 10.9375 3.03542V3.03542Z"
				stroke="white"
				stroke-miterlimit="10"
		 />
		 <path
				d="M20.9229 9.46458C21.1989 9.74063 21.5739 9.89583 21.9645 9.89583C22.7781 9.89583 23.4375 9.23646 23.4375 8.42292C23.4375 8.03229 23.2823 7.65729 23.0062 7.38125L17.6187 1.99375C17.3427 1.71771 16.9677 1.5625 16.577 1.5625C15.7635 1.5625 15.1041 2.22188 15.1041 3.03542C15.1041 3.42604 15.2593 3.80104 15.5354 4.07708"
				stroke="white"
				stroke-miterlimit="10"
		 />
		 <path
				d="M21.3542 5.72915L22.9167 4.16665L20.8334 2.08331L19.2709 3.64581"
				stroke="white"
				stroke-miterlimit="10"
		 />
		 <path
				d="M7.8125 15.1042L15.1042 7.8125"
				stroke="white"
				stroke-miterlimit="10"
		 />
		 <path
				d="M9.89587 17.1875L17.1875 9.89581"
				stroke="white"
				stroke-miterlimit="10"
		 />
	</svg>`,
   },
   {
      id: 2,
      svg: `<svg
		width="25"
		height="25"
		viewBox="0 0 25 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
 >
		<path
			 d="M17.1875 10.4169H7.8125"
			 stroke="white"
			 stroke-miterlimit="10"
		/>
		<path
			 d="M7.8125 18.2294H17.1875"
			 stroke="white"
			 stroke-miterlimit="10"
		/>
		<path
			 d="M17.1874 18.2293C17.4637 18.2293 17.7286 18.3391 17.924 18.5344C18.1193 18.7298 18.2291 18.9947 18.2291 19.271V22.9168C18.2291 23.3312 18.0645 23.7287 17.7714 24.0217C17.4784 24.3147 17.081 24.4793 16.6666 24.4793H8.33325C7.91885 24.4793 7.52142 24.3147 7.2284 24.0217C6.93537 23.7287 6.77075 23.3312 6.77075 22.9168V19.271C6.77075 18.9947 6.8805 18.7298 7.07585 18.5344C7.2712 18.3391 7.53615 18.2293 7.81242 18.2293V10.4168C7.53615 10.4168 7.2712 10.3071 7.07585 10.1117C6.8805 9.91639 6.77075 9.65144 6.77075 9.37517V7.29184C6.77075 6.46304 7.09999 5.66818 7.68604 5.08213C8.27209 4.49608 9.06695 4.16684 9.89575 4.16684H15.1041C15.9329 4.16684 16.7277 4.49608 17.3138 5.08213C17.8998 5.66818 18.2291 6.46304 18.2291 7.29184V9.37517C18.2291 9.65144 18.1193 9.91639 17.924 10.1117C17.7286 10.3071 17.4637 10.4168 17.1874 10.4168V18.2293Z"
			 stroke="white"
			 stroke-miterlimit="10"
		/>
		<path
			 d="M15.1041 4.16689V1.56272C15.1041 1.28646 14.9943 1.0215 14.799 0.826154C14.6036 0.630804 14.3387 0.521057 14.0624 0.521057H10.9374C10.6612 0.521057 10.3962 0.630804 10.2008 0.826154C10.0055 1.0215 9.89575 1.28646 9.89575 1.56272V4.16689"
			 stroke="white"
			 stroke-miterlimit="10"
		/>
 </svg>`,
   },
   {
      id: 3,
      svg: `<?xml version="1.0" encoding="utf-8"?>
		<svg
			 version="1.1"
			 id="Uploaded to svgrepo.com"
			 xmlns="http://www.w3.org/2000/svg"
			 xmlns:xlink="http://www.w3.org/1999/xlink"
			 fill="none"
			 width="25px"
			 height="25px"
			 viewBox="0 0 32 32"
		>
			 <path
					d="M22,28.744V30c0,0.55-0.45,1-1,1H11c-0.55,0-1-0.45-1-1v-1.256C4.704,26.428,1,21.149,1,15
			 c0-0.552,0.448-1,1-1h28c0.552,0,1,0.448,1,1C31,21.149,27.296,26.428,22,28.744z M29,12c0-3.756-2.961-6.812-6.675-6.984
			 C21.204,2.645,18.797,1,16,1s-5.204,1.645-6.325,4.016C5.961,5.188,3,8.244,3,12v1h26V12"
					stroke="white"
					fill="none"
			 /></svg
 >`,
   },
   {
      id: 4,
      svg: `<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
 >
		<path
			 d="M10.3333 18.6667C14.9357 18.6667 18.6667 14.9357 18.6667 10.3333C18.6667 5.73096 14.9357 2 10.3333 2C5.73096 2 2 5.73096 2 10.3333C2 14.9357 5.73096 18.6667 10.3333 18.6667Z"
			 stroke="white"
			 stroke-miterlimit="10"
		/>
		<path d="M5.41663 10H14.5833" stroke="white" stroke-miterlimit="10" />
		<path d="M10 5.41666V14.5833" stroke="white" stroke-miterlimit="10" />
 </svg>`,
   },
];

/* utils */

function loadData() {
   if (localStorage.getItem(habits.length !== 0)) {
      const getData = localStorage.getItem(HABIT_KEY);
      const arrData = JSON.parse(getData);
      if (Array.isArray(arrData)) {
         habits = arrData;
      }
   } else {
      habits = [
         {
            "id": 1,
            "name": "Отжимания",
            "target": 10,
            "days": []
         },
         {
            "id": 2,
            "name": "Управление здоровьем",
            "target": 10,
            "days": []
         },
         {
            "id": 3,
            "name": "Правильное питание",
            "target": 10,
            "days": []
         },
         {
            "id": 4,
            "name": "Добавить элемент",
            "target": 10
         }
      ]
      
      localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
      const getData = localStorage.getItem(HABIT_KEY);
      const arrData = JSON.parse(getData);
      if (Array.isArray(arrData)) {
         habits = arrData;
      }
      
   }
}

function saveData() {
   localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
}

/* render  */

function rerenderMenu(activeHabit) {
   if (!activeHabit) {
      return;
   }

   for (const habit of habits) {
      const svgImg = svgCode.find((code) => code.id === habit.id);

      const existed = document.querySelector(`[menu-habit-id="${habit.id}"]`);

      if (!existed) {
         // Создание

         const element = document.createElement('li');
         element.setAttribute('menu-habit-id', habit.id);
         element.addEventListener('click', () => {
            if (habit.id === 4) {
               return;
            }

            rerender(habit.id);
         });
         element.innerHTML = `
				 <a href="#!"
				 >${
                svgImg?.id === habit.id
                   ? svgImg.svg
                   : habit.icon === 'sport'
                   ? svgCode[0].svg
                   : habit.icon === 'water'
                   ? svgCode[1].svg
                   : svgCode[2].svg
             }
			</a>
				 `;

         if (activeHabit.id === habit.id) {
            element.classList.add('active');
         }
         page.menu.appendChild(element);
         continue;
      }
      if (activeHabit.id === habit.id) {
         existed.classList.add('active');
      } else {
         existed.classList.remove('active');
      }
   }
}

function rerenderHeader(activeHabit) {
   if (!activeHabit) {
      return;
   }

   page.header.h1.innerText = activeHabit.name;
   const progress =
      activeHabit.days.length / activeHabit.target > 1
         ? 100
         : activeHabit.days.length / activeHabit.target;
   page.header.progressPercent.innerText = `${progress * 100}%`;
   page.header.progressBar.style.width = `${progress * 100}%`;
}

function rerenderMain(activeHabit) {
   if (!activeHabit) {
      return;
   }

   if (activeHabit.days.length === 0) {
      const comment = document.createElement('li');
      comment.innerHTML = `
			<div class="title">День ${Object.keys(activeHabit.days).length + 1}</div>
			<form class="task-input">
				 <input class="input" type="text" placeholder="Комментарий" />
				 <button type="submit" class="button">Готово</button>
			</form>
			`;
      page.main.insertAdjacentElement('beforeend', comment);
   }

   page.main.innerHTML = '';

   for (const index in activeHabit.days) {
      const li = document.createElement('li');
      li.innerHTML = `<div class="title">День ${Number(index) + 1}</div>
			<div class="task-info">
				<p>${activeHabit.days[index].comment}</p>
				<div class="task-info-img">
					<img onclick="removeDays(${index})" src="/image/remove.svg" alt="remove" />
				</div>
			</div>`;
      page.main.insertAdjacentElement('beforeend', li);
   }
   const comment = document.createElement('li');
   comment.innerHTML = `
			<div class="title">День ${Object.keys(activeHabit.days).length + 1}</div>
			<form class="task-input" onsubmit="addDays(event)">
				 <input name="comment" class="input" type="text" placeholder="Комментарий" />
				 <button type="submit" class="button">Готово</button>
			</form>
			`;
   page.main.insertAdjacentElement('beforeend', comment);
}

function addDays(e) {
   const form = e.target;
   e.preventDefault();
   const data = new FormData(form);
   const comment = data.get('comment');
   form['comment'].classList.remove('error');
   if (!comment) {
      form['comment'].classList.add('error');
   } else {
      habits = habits.map((item) => {
         if (globalActiveHabitId === item.id) {
            return {
               ...item,
               days: item.days.concat([{ comment }]),
            };
         }
         return item;
      });
      saveData();
      form['comment'].value = '';
      rerender(globalActiveHabitId);
   }
}

function removeDays(i) {
   habits.map((item) => {
      if (globalActiveHabitId === item.id) {
         item.days.splice(i, 1);
         return {
            ...item,
            days: item.days,
         };
      }
   });
   saveData();
   rerender(globalActiveHabitId);
}

function onAddHabit(e) {
   console.log(iconLi);
   const form = e.target;
   e.preventDefault();
   const data = new FormData(form);
   const name = data.get('name');
   const cout = data.get('cout');
   form['name'].classList.remove('error');
   form['cout'].classList.remove('error');

   if (!name && !cout) {
      form['name'].classList.add('error');
      form['cout'].classList.add('error');
   } else {
      habits = [
         ...habits,
         {
            id: habits.length + 1,
            name,
            target: 10,
            days: [
               {
                  comment: cout,
               },
            ],
            icon: iconLi,
         },
      ];
      saveData();
      form['name'].value = '';
      form['cout'].value = '';
      rerender(globalActiveHabitId);
   }
}

function rerender(activeHabitId) {
   globalActiveHabitId = activeHabitId;
   const activeHabit = habits.find((habit) => habit.id === activeHabitId);
   rerenderHeader(activeHabit);
   rerenderMenu(activeHabit);
   rerenderMain(activeHabit);
}

/* Init */

function setIcon(context, icon) {
   page.popup.iconField = icon;
   iconLi = page.popup.iconField;
   const active = document.querySelector('.active');
   active.classList.remove('active');
   context.classList.add('active');
}

(() => {
   loadData();
   rerender(habits[0].id);

   page.popup.iconField = 'sport';
   iconLi = page.popup.iconField;

   const habitWithId4 = document.querySelector('[menu-habit-id="4"]');
   const outImage = document.querySelector('.out__image');

   habitWithId4.addEventListener('click', () => {
      page.popup.index.classList.remove('hidden');
      page.popup.index.classList.add('open');
   });
   outImage.addEventListener('click', () => {
      page.popup.index.classList.remove('open');
      page.popup.index.classList.add('hidden');
   });
})();
