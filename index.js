document.addEventListener('DOMContentLoaded', () => {


    let arrList = [];

    function saveLocalStorage() {
        localStorage.setItem('arrList', JSON.stringify(arrList));
    }

    if (localStorage.getItem('arrList')) {
        arrList = JSON.parse(localStorage.getItem("arrList"));
    }

    function render(arr) {
        if (arr.length > 0) {
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
        const input = document.querySelector('.input__list'); //получил инпут
        const btn = document.querySelector('.button__list'); //получил кнопку
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const element = document.querySelectorAll('.list__li');
            element.forEach(item => item.remove());
            if (input.value != '') {
                arrList.push(input.value);
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
                            // console.log(indexBtn, index);
                            arrList.splice(index, 1);
                            saveLocalStorage();
                            item.remove();
                            // if (element.length == 0) {
                            //     render();
                            // }
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
                    element.forEach((itemElem, indexElem) => {
                        if (indexBtn === indexElem && !itemElem.classList.contains('lineThrough')) {
                            itemElem.classList.add('lineThrough');
                        }
                    });
                }
            });
        });
    }


    render(arrList);
    addItem();


});


//сортировку при нажатии на crosOut






