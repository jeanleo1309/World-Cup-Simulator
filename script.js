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
