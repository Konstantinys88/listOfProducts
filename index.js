document.addEventListener('DOMContentLoaded', () => {


    const arrList = ['Хлеб', 'Вода', 'Арбуз', 'Доширак', 'Кока-кола'];

    // localArr = localStorage.setItem(arrList, JSON.stringify(arrList));
    // array = JSON.parse(localStorage.getItem("localArr"));

    class List {
        constructor(arr) {
            this.arr = arr;
        }

        /**
         * Метод отрисовывает на страницу данные из массива в виде списка ul>li с вложенной кнопкой delete и crosOut
         */
        render() {
            this.arr.forEach(item => {
                const elemementLi = document.createElement('li');
                elemementLi.classList.add('list__li');
                elemementLi.textContent = item;

                const btnDelete = document.createElement('button');
                btnDelete.textContent = '✘';
                btnDelete.classList.add('deleteItem');
                elemementLi.append(btnDelete);

                const btnCrosOut = document.createElement('button');
                btnCrosOut.textContent = '✔';
                btnCrosOut.classList.add('crossOut');
                elemementLi.append(btnCrosOut);

                const parentElement = document.querySelector('.list__ul');
                parentElement.append(elemementLi);
            });
            this.crosOut();
        }

        /**
         * Метод удаляет элемент из массива и удаляет элемент со страницы
         */
        deleteItem() {
            const deleteItem = document.querySelectorAll('.deleteItem'); //получил кнопки
            const element = document.querySelectorAll('.list__li'); // получил элементы списка
            deleteItem.forEach((item, indexBtn) => {
                item.addEventListener('click', (e) => { //обработчик событий
                    e.preventDefault(); //отмена стандартного поведения
                    if (e.target.classList.contains('deleteItem')) { //проверка есть ли у кнопки нужный класс
                        element.forEach((item, index) => { //перебор элементов списка
                            if (indexBtn === index) { //проверка совпадает ли элемент списка с кнопкой
                                this.arr.splice(indexBtn, 1); //удаляет из массива 
                                item.remove(); // удаляет со страницы
                            }
                        })
                    }
                });
            });
        }

        /**
         * Метод добавляет данные в список и отрисовывает на странице
         */
        addItem() {
            const input = document.querySelector('.input__list'); //получил инпут
            const btn = document.querySelector('.button__list'); //получил кнопку
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                const element = document.querySelectorAll('.list__li');
                element.forEach(item => item.remove());
                if (input.value != '') {
                    this.arr.push(input.value);
                }

                this.render();
                this.deleteItem();

                input.value = ''
            })
        }



        /**
         * вызывается в методе рендер
         */
        crosOut() {
            const crosOutBtn = document.querySelectorAll('.crossOut');
            const element = document.querySelectorAll('.list__li');

            crosOutBtn.forEach((itemBtn, indexBtn) => {
                itemBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (e.target.classList.contains('crossOut')) {
                        element.forEach((itemElem, indexElem) => {
                            if (indexBtn === indexElem) {
                                console.log(indexBtn, indexElem)
                                itemElem.classList.toggle('lineThrough');
                            }
                        });
                    }
                });
            });
        }
    }

    let list = new List(arrList);
    list.render();
    list.deleteItem();
    list.addItem();

});



