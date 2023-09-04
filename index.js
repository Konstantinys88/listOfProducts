const arrList = ['хлеб', 'молоко', 'мыло', 'колбаса', 'пирожки'];


class List {
    constructor(arr) {
        this.arr = arr;
    }

    /**
     * Метод отрисовывает на страницу данные из массива в виде списка ul>li с вложенной кнопкой delete
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

            const parentElement = document.querySelector('.list__ul');
            parentElement.append(elemementLi);
        });
    }

    deleteItem() {
        const deleteItem = document.querySelectorAll('.deleteItem'); //получил кнопки
        const element = document.querySelectorAll('.list__li'); // получил элементы списка
        deleteItem.forEach((item, indexBtn) => {
            item.addEventListener('click', (e) => { //обработчик событий
                e.preventDefault(); //отмена стандартного поведения
                if (e.target.classList.contains('deleteItem')) { //проверка есть ли у кнопки нужный класс
                    element.forEach((item, index) => { //перебор элементов списка
                        if(indexBtn === index) { //проверка совпадает ли элемент списка с кнопкой
                            this.arr.splice(indexBtn, 1); //удаляет из массива 
                            item.remove() // удаляет со страницы
                        }
                    })
                }
            });
        });
    }





}

let list = new List(arrList);
list.render();
list.deleteItem();

