const peopleRaw = await fetch('people.json')
const people = await peopleRaw.json()

console.log(people)

let html = ''
const today = new Date()

for (let { firstName, birthDate } of people){
    let personAge = AgeCalc(new Date(birthDate), today)
    html += `
    <div class="person">
        <p>${firstName} was born ${birthDate}</p>
        <p>He/She is ${personAge} years old</p>
        <br>
    </div>
    `;
}

function AgeCalc(birthDate, today) {
    let years = today.getFullYear() - birthDate.getFullYear();
    if (
        birthDate.getMonth() > today.getMonth() ||
        (birthDate.getMonth() === today.getMonth() && birthDate.getDate() > today.getDate())
    ) {
        years--;
    }
    return years;
}

document.body.innerHTML = html;