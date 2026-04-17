async function loadTeams(){

const response = await fetch(
"https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams",
{
headers:{
"git-user":"seu_usuario_github"
}
}
)

const teams = await response.json()

console.log(teams)

const container = document.getElementById("teams")

container.innerHTML = ""

teams.forEach(team => {

const p = document.createElement("p")

p.innerText = jeanleo1309


container.appendChild(p)

})

}
function shuffle(array){

for(let i = array.length - 1; i > 0; i--){

const j = Math.floor(Math.random() * (i + 1))

[array[i], array[j]] = [array[j], array[i]]

}

return array

}
function createGroups(teams){

const shuffled = shuffle(teams)

const groups = {}

const letters = ["A","B","C","D","E","F","G","H"]

let index = 0

letters.forEach(letter => {

groups[letter] = shuffled.slice(index, index + 4)

index += 4

})

return groups

}
function displayGroups(groups){

const container = document.getElementById("teams")

container.innerHTML = ""

for(let group in groups){

const div = document.createElement("div")

const title = document.createElement("h2")

title.innerText = "Group " + group

div.appendChild(title)

groups[group].forEach(team =>{

const p = document.createElement("p")

p.innerText = team.name

div.appendChild(p)

})

container.appendChild(div)

}

}
async function loadTeams(){

const response = await fetch(
"https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams",
{
headers:{
"git-user":"SEU_USUARIO"
}
}
)

const teams = await response.json()

const groups = createGroups(teams)

displayGroups(groups)

}
function generateMatches(groupTeams){

const matches = [

[0,1],
[2,3],

[0,2],
[1,3],

[0,3],
[1,2]

]

return matches.map(match =>{

const team1 = groupTeams[match[0]]
const team2 = groupTeams[match[1]]

const goals1 = Math.floor(Math.random()*5)
const goals2 = Math.floor(Math.random()*5)

return {
team1: team1.name,
team2: team2.name,
goals1,
goals2
}

})

}
