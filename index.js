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

    /**
     * перемещает вычеркнутые елементы в конец списка
     */
    function sortArr() {
        arrList.forEach((item, index) => {
            if (item.status) {
                arrList.push(item);
                arrList.splice(index, 1);
            } 
        });
    }

    sortArr();

    /**
     * выводит количество записей в списке
     */
    function listTitleRender() {
        const listTitle = document.querySelector('.list__title');
        if(arrList.length === 0) {
            listTitle.textContent = 'Ваш список пуст.';
        } else if(arrList.length === 1) {
            listTitle.textContent = `В вашем списке ${arrList.length} запись`;  
        } else if(arrList.length > 1 && arrList.length < 5) {
            listTitle.textContent = `В вашем списке ${arrList.length} записи`;  
        } else if(arrList.length > 4) {
            listTitle.textContent = `В вашем списке ${arrList.length} записей`;  
        }
  
    }

    listTitleRender();

    /**
     * Функция отрисовывает элементы из массива в виде списка на страницу
     */
    function render() {
            arrList.forEach((item, index) => {

                const elemementLi = document.createElement('li');
                elemementLi.classList.add('list__li');
                // elemementLi.textContent = item.text;

                const inputText = item.text.substring(0, 18) + '...';

                const paragraph = document.createElement('p');
                paragraph.classList.add('paragraph');
                elemementLi.append(paragraph);
                paragraph.textContent = inputText;

                let width = inputText.length * 7.5;

                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'Удалить';
                btnDelete.classList.add('deleteItem');
                elemementLi.append(btnDelete);

                const btnCrosOut = document.createElement('button');
                btnCrosOut.textContent = 'Вычеркнуть';
                btnCrosOut.classList.add('crossOut');
                elemementLi.append(btnCrosOut);

                const crosOutLine = document.createElement('span');
                crosOutLine.classList.add('crosOutLine');
                crosOutLine.style.width = `${width}px`;
                elemementLi.append(crosOutLine);

                if (item.status) {
                    crosOutLine.style.opacity = 1;
                    btnCrosOut.textContent = 'Вернуть';
                } else {
                    btnCrosOut.textContent = 'Вычеркнуть';
                }

                const parentElement = document.querySelector('.list__ul');
                parentElement.append(elemementLi);

            });


        deleteItem();
        crosOut();
        deliteList();
    }


    /**
     * Функция для добавления элемента
     */
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

            listTitleRender();
            render();
            input.value = '';
        });
    }


    /**
     * Функция для удаления элемента
     */
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
                            listTitleRender();
                        }
                    });
                    if (arrList.length == 0) {
                        render();
                    }
                }
            });
        });
    }


    /**
     * Функция для зачеркивания элемента
     */
    function crosOut() {
        const crosOutBtn = document.querySelectorAll('.crossOut');
        const element = document.querySelectorAll('.list__li');

        crosOutBtn.forEach((itemBtn, indexBtn) => {
            itemBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('crossOut')) {
                    arrList.forEach((itemArr, indexArr) => {
                        if (indexBtn == indexArr) {

                            if (itemArr.status) {
                                itemArr.status = false;
                            } else {
                                itemArr.status = true;
                            }

                            sortArr();
                            saveLocalStorage();

                            element.forEach(item => item.remove())
                            render();

                        }
                    });
                }
            });
        });
    }


    /**
     * Очищает весь список
     */
    function deliteList() {
        const element = document.querySelectorAll('.list__li');
        const btnDeliteList = document.querySelector('.button__deliteList');

        btnDeliteList.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('button__deliteList')) {
                arrList.splice(0, arrList.length)
                element.forEach(item => item.remove());
            }

            listTitleRender();
            saveLocalStorage();  
        });   
    }


    render();
    addItem();
 
});








