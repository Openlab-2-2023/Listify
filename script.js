

document.getElementById('add-button').addEventListener('click', () => {
    addItem();
    saveItems();
});

document.getElementById('item-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addItem();
        saveItems();
    }
});

/* PRIDAVANIE POLOZIEK */

function addItem() {
    const itemInput = document.getElementById('item-input');
    const itemText = itemInput.value.trim();

    if (itemText !== '') {
        const itemList = document.getElementById('item-list');

        const li = document.createElement('li');
        li.textContent = itemText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function () {
            itemList.removeChild(li);
            saveItems();
        });

        li.appendChild(deleteButton);
        itemList.appendChild(li);

        itemInput.value = '';
    }
}

/* UKLADANIE POLOZIEK */

function saveItems() {
    const items = [];
    document.querySelectorAll('#item-list li').forEach(li => {
        items.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function loadItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(itemText => {
        const itemList = document.getElementById('item-list');

        const li = document.createElement('li');
        li.textContent = itemText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function () {
            itemList.removeChild(li);
            saveItems();
        });

        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadItems);
