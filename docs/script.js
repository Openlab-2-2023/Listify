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

function addItem() {
    const itemInput = document.getElementById('item-input');
    const itemText = itemInput.value.trim();

    if (itemText !== '') {
        const itemList = document.getElementById('item-list');

        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.textContent = itemText;

        const timestamp = document.createElement('div');
        timestamp.style.fontSize = '0.8em';
        timestamp.style.color = 'grey';
        const now = new Date();
        timestamp.textContent = `${now.toLocaleString()}`;

        const checkButton = document.createElement('button');
        checkButton.className = 'check-button';
        checkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>';
        checkButton.addEventListener('click', function () {
            li.classList.toggle('completed');
            saveItems();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
        deleteButton.addEventListener('click', function () {
            li.classList.add('deleting');
            li.addEventListener('animationend', function () {
                itemList.removeChild(li);
                saveItems();
            });
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.appendChild(checkButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(textSpan);
        li.appendChild(timestamp);
        li.appendChild(buttonContainer);
        itemList.appendChild(li);

        itemInput.value = '';
    }
}

function saveItems() {
    const items = [];
    document.querySelectorAll('#item-list li').forEach(li => {
        items.push({
            text: li.querySelector('span').textContent.trim(),
            timestamp: li.querySelector('div').textContent.replace('Added on: ', '').trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function loadItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => {
        const itemList = document.getElementById('item-list');

        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.textContent = item.text;
        if (item.completed) {
            li.classList.add('completed');
        }

        const timestamp = document.createElement('div');
        timestamp.style.fontSize = '0.8em';
        timestamp.style.color = 'grey';
        timestamp.textContent = `Added on: ${item.timestamp}`;

        const checkButton = document.createElement('button');
        checkButton.className = 'check-button';
        checkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>';
        checkButton.addEventListener('click', function () {
            li.classList.toggle('completed');
            saveItems();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
        deleteButton.addEventListener('click', function () {
            li.classList.add('deleting');
            li.addEventListener('animationend', function () {
                itemList.removeChild(li);
                saveItems();
            });
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.appendChild(checkButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(textSpan);
        li.appendChild(timestamp);
        li.appendChild(buttonContainer);
        itemList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadItems);

document.getElementById('darkmode-toggle').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
});
