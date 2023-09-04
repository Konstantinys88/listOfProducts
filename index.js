document.addEventListener('DOMContentLoaded', () => {


    const arrList = ['Хлеб', 'Вода', 'Арбуз', 'Доширак', 'Кока-кола'];

    
    localStorage.setItem('arrList', JSON.stringify(arrList));
    array = JSON.parse(localStorage.getItem("arrList"));
    // console.log(array);



    function render(arr) {
        arr.forEach(item => {
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

        deleteItem(arr);
        crosOut();
    }


    function deleteItem(arr) {
        const deleteItem = document.querySelectorAll('.deleteItem'); //получил кнопки
        const element = document.querySelectorAll('.list__li'); // получил элементы списка
        deleteItem.forEach((item, indexBtn) => {
            item.addEventListener('click', (e) => { //обработчик событий
                e.preventDefault(); //отмена стандартного поведения
                if (e.target.classList.contains('deleteItem')) { //проверка есть ли у кнопки нужный класс
                    element.forEach((item, index) => { //перебор элементов списка
                        if (indexBtn === index) { //проверка совпадает ли элемент списка с кнопкой

                            arr.splice(indexBtn, 1); //удаляет из массива 
                            item.remove(); // удаляет со страницы

                            
                        }
                    });
                }
            });
        });
    }

    function addItem(arr) {
        const input = document.querySelector('.input__list'); //получил инпут
        const btn = document.querySelector('.button__list'); //получил кнопку
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const element = document.querySelectorAll('.list__li');
            element.forEach(item => item.remove());
            if (input.value != '') {
                arr.push(input.value);
            }

            render(arr);
            input.value = '';
        });
    }

    function crosOut() {
        const crosOutBtn = document.querySelectorAll('.crossOut');
        const element = document.querySelectorAll('.list__li');

        crosOutBtn.forEach((itemBtn, indexBtn) => {
            itemBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('crossOut')) {
                    element.forEach((itemElem, indexElem) => {
                        if (indexBtn === indexElem) {
                            itemElem.classList.toggle('lineThrough');
                        }
                    });
                }
            });
        });
    }


    render(array);
    addItem(array);

});


//что осталось сделать
//гдето сохранять данные localstorega ?:
//сортировку при нажатии на crosOut


// можгл попробовать без класаса только функции



