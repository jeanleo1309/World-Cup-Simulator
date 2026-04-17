diff --git a/script.js b/script.js
index e56064bcce4437a5572e247e83ec499bb2c60be4..e66c25c7dfabda8db5265978ac35d2e72f2f01ae 100644
--- a/script.js
+++ b/script.js
@@ -1,183 +1,111 @@
-async function loadTeams(){
+const API_URL = "https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams";
+const GIT_USER = "SEU_USUARIO";
+const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
+const MATCH_MATRIX = [
+  [0, 1],
+  [2, 3],
+  [0, 2],
+  [1, 3],
+  [0, 3],
+  [1, 2]
+];
 
-const response = await fetch(
-"https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams",
-{
-headers:{
-"git-user":"SEU_USUARIO"
-}
-}
-)
-
-const teams = await response.json()
-
-const groups = createGroups(teams)
+async function loadTeams() {
+  const container = document.getElementById("teams");
+  container.innerHTML = "<p>Carregando times...</p>";
 
-displayGroups(groups)
-
-displayMatches(groups)
+  try {
+    const teams = await fetchTeams();
+    const groups = createGroups(teams);
 
+    renderGroups(container, groups);
+    renderMatches(container, groups);
+  } catch (error) {
+    container.innerHTML = `<p>Erro ao carregar os times: ${error.message}</p>`;
+  }
 }
-const teams = await response.json()
-
-console.log(teams)
-
-const container = document.getElementById("teams")
-
-container.innerHTML = ""
 
-teams.forEach(team => {
+async function fetchTeams() {
+  const response = await fetch(API_URL, {
+    headers: {
+      "git-user": GIT_USER
+    }
+  });
 
-const p = document.createElement("p")
-
-p.innerText = jeanleo1309
-
-
-container.appendChild(p)
-
-})
+  if (!response.ok) {
+    throw new Error(`HTTP ${response.status}`);
+  }
 
+  return response.json();
 }
-function shuffle(array){
 
-for(let i = array.length - 1; i > 0; i--){
+function createGroups(teams) {
+  const shuffledTeams = shuffle([...teams]);
+  const groups = {};
 
-const j = Math.floor(Math.random() * (i + 1))
-
-[array[i], array[j]] = [array[j], array[i]]
+  GROUP_LETTERS.forEach((letter, index) => {
+    const start = index * 4;
+    groups[letter] = shuffledTeams.slice(start, start + 4);
+  });
 
+  return groups;
 }
 
-return array
+function shuffle(array) {
+  for (let i = array.length - 1; i > 0; i--) {
+    const j = Math.floor(Math.random() * (i + 1));
+    [array[i], array[j]] = [array[j], array[i]];
+  }
 
+  return array;
 }
-function createGroups(teams){
-
-const shuffled = shuffle(teams)
-
-const groups = {}
-
-const letters = ["A","B","C","D","E","F","G","H"]
 
-let index = 0
+function renderGroups(container, groups) {
+  container.innerHTML = "";
 
-letters.forEach(letter => {
+  GROUP_LETTERS.forEach((letter) => {
+    const groupBox = document.createElement("section");
+    const title = document.createElement("h2");
 
-groups[letter] = shuffled.slice(index, index + 4)
+    title.innerText = `Grupo ${letter}`;
+    groupBox.appendChild(title);
 
-index += 4
-
-})
-
-return groups
+    groups[letter].forEach((team) => {
+      const line = document.createElement("p");
+      line.innerText = team.name;
+      groupBox.appendChild(line);
+    });
 
+    container.appendChild(groupBox);
+  });
 }
-function displayGroups(groups){
-
-const container = document.getElementById("teams")
-
-container.innerHTML = ""
-
-for(let group in groups){
-
-const div = document.createElement("div")
-
-const title = document.createElement("h2")
-
-title.innerText = "Group " + group
 
-div.appendChild(title)
-
-groups[group].forEach(team =>{
-
-const p = document.createElement("p")
-
-p.innerText = team.name
-
-div.appendChild(p)
-
-})
-
-container.appendChild(div)
+function generateMatches(groupTeams) {
+  return MATCH_MATRIX.map(([teamA, teamB]) => {
+    const goalsA = Math.floor(Math.random() * 5);
+    const goalsB = Math.floor(Math.random() * 5);
 
+    return {
+      team1: groupTeams[teamA].name,
+      team2: groupTeams[teamB].name,
+      goals1: goalsA,
+      goals2: goalsB
+    };
+  });
 }
 
-}
-async function loadTeams(){
+function renderMatches(container, groups) {
+  GROUP_LETTERS.forEach((letter) => {
+    const title = document.createElement("h3");
+    title.innerText = `Partidas do Grupo ${letter}`;
+    container.appendChild(title);
 
-const response = await fetch(
-"https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams",
-{
-headers:{
-"git-user":"SEU_USUARIO"
-}
-}
-)
-
-const teams = await response.json()
-
-const groups = createGroups(teams)
-
-displayGroups(groups)
-
-}
-function generateMatches(groupTeams){
-
-const matches = [
-
-[0,1],
-[2,3],
-
-[0,2],
-[1,3],
-
-[0,3],
-[1,2]
-
-]
-
-return matches.map(match =>{
-
-const team1 = groupTeams[match[0]]
-const team2 = groupTeams[match[1]]
-
-const goals1 = Math.floor(Math.random()*5)
-const goals2 = Math.floor(Math.random()*5)
-
-return {
-team1: team1.name,
-team2: team2.name,
-goals1,
-goals2
-}
-
-})
-
-}
-function displayMatches(groups){
-
-const container = document.getElementById("teams")
-
-for(let group in groups){
-
-const matches = generateMatches(groups[group])
-
-const title = document.createElement("h3")
-title.innerText = "Matches Group " + group
-
-container.appendChild(title)
-
-matches.forEach(match =>{
-
-const p = document.createElement("p")
-
-p.innerText =
-`${match.team1} ${match.goals1} x ${match.goals2} ${match.team2}`
-
-container.appendChild(p)
-
-})
-
-}
+    const matches = generateMatches(groups[letter]);
 
+    matches.forEach((match) => {
+      const line = document.createElement("p");
+      line.innerText = `${match.team1} ${match.goals1} x ${match.goals2} ${match.team2}`;
+      container.appendChild(line);
+    });
+  });
 }
