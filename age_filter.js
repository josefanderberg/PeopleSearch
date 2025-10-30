const peopleRaw = await fetch('people.json');
const people = await peopleRaw.json();

function AgeCount(birthDate, today) {
 let age = today.getFullYear() - birthDate.getFullYear();
if (birthDate.getMonth() > today.getMonth() ||
(birthDate.getMonth() === today.getMonth() && birthDate.getDate() > today.getDate())) 
{
age--; 
}
return age;
}

function render(searchTerm = '') {
  const today = new Date();
  let html = '';

  const filtered = people
    .filter(person => {
      const age = AgeCount(new Date(person.birthDate), today);
      return (
        age.toString().includes(searchTerm)
      );
    })
    .map(person => ({
      firstName: person.firstName,
      lastName: person.lastName,
      age: AgeCount(new Date(person.birthDate), today)
    }))
    
    .toSorted((a, b) => a.age - b.age);

  for (let { firstName, lastName, age } of filtered) {
    html += `
      <div class="person">
        <p>${firstName} ${lastName}</p>
        <p>Current age: ${age} years</p>
      </div>
    `;
  }

  if (html === '') {
    html = '<p>No matches found.</p>';
  }

  document.querySelector('.people').innerHTML = html;
}

document.querySelector('.search-field') 
.addEventListener('input', event => {
  render(event.target.value);
});

render('');
