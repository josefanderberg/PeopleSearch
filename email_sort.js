const peopleRaw = await fetch('people.json')
const people = await peopleRaw.json()

console.log(people)

function render(search = '') {

    let html = people

        .filter(({ email }) =>
            email.startsWith(search))
        .toSorted((a, b) => a.email > b.email ? 1 : -1)
        .map(({ email }) =>
        `
        <div class="person">
            <p>${email}</p>
        </div>
        `)
    .join('')
    document.querySelector('article').innerHTML = html
}

document.querySelector('.search-field')
    .addEventListener('keyup', event => {
        render(event.target.value);
    });

render();