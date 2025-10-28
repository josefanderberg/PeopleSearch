const peopleRaw = await fetch('people.json')
const people = await peopleRaw.json()

console.log(people)

let html = ''
let sortType

function Menu(option, people){
    switch(option){
        case "firstname":
            sortType = "firstName"
            SortPeople(people, sortType)
            break
        case "lastname":
            sortType = "lastName"
            SortPeople(people, sortType)
            break
        case "email":
            sortType = "email"
            SortPeople(people, sortType)
            break
        default:
            console.log("Default")
            break
    }
}

function SortPeople(people, sortType){
    html = people
    .sort((a, b) => a[sortType] > b[sortType] ? 1 : -1)
    // Vadå "p"
    .map(({firstName, lastName, email}) => `
    <div class="person">
        <p>${firstName}</p>
        <p>${lastName}</p>
        <p>${email}</p>
    </div>
    ` )
    .join('')
    document.querySelector('.article').innerHTML = html
}

document.querySelector('nav')
    .addEventListener('click', event => {
    Menu(event.target.getAttribute('value'), people)
})