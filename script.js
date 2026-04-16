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
