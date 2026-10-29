
const save = document.getElementById('save');
const load = document.getElementById('load');
const firstName = document.getElementById('firstName');
const secondName = document.getElementById('secondName');
const age = document.getElementById('age');
const file = document.getElementById('file');
const display = document.getElementById('display');

const storage = JSON.parse(localStorage.getItem('users')) || [];

save.addEventListener('click', function () {
    const loader = load.value.trim();
    const fName = firstName.value.trim();
    const sName = secondName.value.trim();
    const ages = age.value.trim();
    const picture = file.files[0];

    if (
        loader === '' ||
        fName === '' ||
        sName === '' ||
        ages === '' ||
        !picture
    ) {
        console.log('Please fill everything and select a picture');
        return;
    }

    if (!picture.type.startsWith('image/')) {
        console.log('Please select an image');
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const user = {
            id: loader,
            firstName: fName,
            secondName: sName,
            age: ages,
            picture: reader.result
        };

        storage.push(user);

        try {
            localStorage.setItem('users', JSON.stringify(storage));
            displayUsers();
        } catch (error) {
            storage.pop();
            console.log('Storage limit reached. Try a smaller image.');
            return;
        }

        load.value = '';
        firstName.value = '';
        secondName.value = '';
        age.value = '';
        file.value = '';
    };

    reader.readAsDataURL(picture);
});

function displayUsers() {
    display.innerHTML = '';

    storage.forEach(function (user) {
        const card = document.createElement('div');

        const image = document.createElement('img');
        image.src = user.picture;
        image.alt = 'Profile picture';
        image.width = 100;

        const details = document.createElement('p');
        details.textContent =
            `${user.firstName} ${user.secondName}, Age: ${user.age}`;

        card.append(image, details);
        display.appendChild(card);
    });
}

displayUsers();
