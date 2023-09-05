document.addEventListener('DOMContentLoaded', () => {


    let arrList = [];


    /**
     * Функция записывает данные в localStorage
     */
    function saveLocalStorage() {
        localStorage.setItem('arrList', JSON.stringify(arrList));
    }

    /**
     * Берет данные из localStorage и зписывает их в массив
     */
    if (localStorage.getItem('arrList')) {
        arrList = JSON.parse(localStorage.getItem("arrList"));
    }


    function sortArr() {
        arrList.forEach((item, index) => {
            if (item.status) {
                arrList.push(item);
                arrList.splice(index, 1);
                // console.log(arrList)
            }
        })
    }

    sortArr();


    /**
     * Функция отрисовывает элементы из массива в виде списка на страницу
     */
    function render() {
        if (arrList.length > 0) {
            arrList.forEach((item, index) => {

                const elemementLi = document.createElement('li');
                elemementLi.classList.add('list__li');
                elemementLi.textContent = item.text;

                if (item.status) {
                    elemementLi.classList.add('lineThrough');
                }

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
        } else {
            const elemementLi = document.createElement('li');
            elemementLi.classList.add('list__li');
            elemementLi.textContent = 'Список пуст ☹';

            const parentElement = document.querySelector('.list__ul');
            parentElement.append(elemementLi);
        }

        deleteItem();
        crosOut();

    }


    function addItem() {
        const input = document.querySelector('.input__list');
        const btn = document.querySelector('.button__list'); 
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const element = document.querySelectorAll('.list__li');
            element.forEach(item => item.remove());

            const newItem = {
                text: input.value,
                status: false,
            }

            if (input.value != '') {
                arrList.unshift(newItem);
                console.log(arrList)
                sortArr();
                saveLocalStorage();
            }

            render(arrList);
            input.value = '';
        });
    }


    function deleteItem() {
        const deleteItem = document.querySelectorAll('.deleteItem');
        const element = document.querySelectorAll('.list__li');
        deleteItem.forEach((item, indexBtn) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('deleteItem')) {
                    element.forEach((item, index) => {
                        if (indexBtn == index) {
                            arrList.splice(index, 1);
                            saveLocalStorage();
                            item.remove();
                            if (element.length == 0) {
                                render();
                            }
                        }
                    });
                }
            });
        });
    }


    function crosOut() {
        const crosOutBtn = document.querySelectorAll('.crossOut');
        const element = document.querySelectorAll('.list__li');

        crosOutBtn.forEach((itemBtn, indexBtn) => {
            itemBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('crossOut')) {
                    arrList.forEach((itemArr, indexArr) => {
                        if (indexBtn == indexArr) {
                           
                            itemArr.status = true
                            element[indexArr].classList.add('lineThrough');
                            saveLocalStorage();
                            // location.reload();

                        }
                    });
                }
            });
        });
    }


    render();
    addItem();
    crosOut();

});








