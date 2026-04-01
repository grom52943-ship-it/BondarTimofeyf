const form = document.getElementById('postForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    message.textContent = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error('Error');
        }

        const data = await response.json();

        message.textContent = 'Пост успішно створено! ID: ' + data.id;
        form.reset();

    } catch (error) {
        message.textContent = 'Помилка створення поста';
        console.error(error);
    }
});