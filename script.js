const API_URL = "https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams";
const GIT_USER = "jeanleo1309";
const GROUP_LETTERS = ["A","B","C","D","E","F","G","H"];

const MATCH_MATRIX = [
[0,1],
[2,3],
[0,2],
[1,3],
[0,3],
[1,2]
];

async function loadTeams(){

const container = document.getElementById("teams")

container.innerHTML = "<p>Loading teams...</p>"

try{

const teams = await fetchTeams()

const groups = createGroups(teams)

renderGroups(container, groups)

renderMatches(container, groups)

}catch(error){

container.innerHTML = "Error loading teams"

}

}

async function fetchTeams(){

const response = await fetch(API_URL,{
headers:{
"git-user": GIT_USER
}
})

if(!response.ok){

throw new Error("API error")

}

return response.json()

}

function createGroups(teams){

const shuffledTeams = shuffle([...teams])

const groups = {}

GROUP_LETTERS.forEach((letter,index)=>{

const start = index * 4

groups[letter] = shuffledTeams.slice(start,start+4)

})

return groups

}

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j = Math.floor(Math.random()*(i+1))

[array[i],array[j]]=[array[j],array[i]]

}

return array

}

function renderGroups(container,groups){

container.innerHTML=""

GROUP_LETTERS.forEach(letter=>{

const section=document.createElement("section")

const title=document.createElement("h2")

title.innerText="Group "+letter

section.appendChild(title)

groups[letter].forEach(team=>{

const p=document.createElement("p")

p.innerText=team.name

section.appendChild(p)

})

container.appendChild(section)

})

}

function generateMatches(groupTeams){

return MATCH_MATRIX.map(([a,b])=>{

const goalsA=Math.floor(Math.random()*5)

const goalsB=Math.floor(Math.random()*5)

return{

team1:groupTeams[a].name,
team2:groupTeams[b].name,
goals1:goalsA,
goals2:goalsB

}

})

}

function renderMatches(container, groups){

const matchesBox = document.createElement("div")
matchesBox.className = "matches"

const title = document.createElement("h2")
title.innerText = "Group Stage Matches"

matchesBox.appendChild(title)

GROUP_LETTERS.forEach(letter=>{

const groupTitle = document.createElement("h3")
groupTitle.innerText = "Group " + letter

matchesBox.appendChild(groupTitle)

const matches = generateMatches(groups[letter])

matches.forEach(match=>{

const p=document.createElement("p")

p.innerText=`${match.team1} ${match.goals1} x ${match.goals2} ${match.team2}`

matchesBox.appendChild(p)

})

})

container.appendChild(matchesBox)

}
})

}
