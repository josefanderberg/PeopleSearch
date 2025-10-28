const peopleRaw = await fetch('people.json');
const people = await peopleRaw.json();

function render(search = '') {
    let html = people
    .filter(({lastName}) => search === '' 
    || lastName.toLowerCase().startsWith(search.toLowerCase()))
    
    //sorts name in alphabetical order
    .toSorted((a, b) => a.lastName > b.lastName ? 1 : - 1)

.map(({lastName}) => `
<section class="person">
      <p><b>Last name:</b> ${lastName}</p>
    </section>
`)

.join('');

//when letter doesn't match search
if (html === '') {
  html = '<p>No matches found.</p>';
}

document.querySelector('.people').innerHTML = html;
}

document.querySelector('.search-field')
.addEventListener('input', event => {
    render(event.target.value);
});
render();
