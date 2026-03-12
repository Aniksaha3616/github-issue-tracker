const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];
let currentFilter = "all";

window.onload = loadIssues;



async function loadIssues() {

showLoading(true);

try {

const res = await fetch(API);

const data = await res.json();

allIssues = data.data || [];

displayIssues(allIssues);

}

catch (error) {

console.error(error);

}

finally {

showLoading(false);

}

}



function displayIssues(issues) {

const container = document.getElementById("issuesContainer");

container.innerHTML = "";

document.getElementById("issueCount").innerText = issues.length;



issues.forEach(issue => {

const card = document.createElement("div");



let borderColor = "";

let badgeColor = "";

let iconBg = "";

let iconImg = "";



const p = issue.priority.toLowerCase();



if (p === "high") {

borderColor = "border-t-4 border-green-500";

badgeColor = "bg-red-100 text-red-500";

iconBg = "bg-green-100";

iconImg = "../assets/Open-Status.png";

}

else if (p === "medium") {

borderColor = "border-t-4 border-green-500";

badgeColor = "bg-yellow-100 text-yellow-600";

iconBg = "bg-green-100";

iconImg = "../assets/Open-Status.png";

}

else {

borderColor = "border-t-4 border-purple-500";

badgeColor = "bg-gray-200 text-gray-500";

iconBg = "bg-purple-100";

iconImg = "../assets/Closed- Status .png";

}



card.className = `bg-white rounded-xl shadow-sm hover:shadow-md transition ${borderColor} cursor-pointer`;

card.onclick = () => showIssue(issue.id);



card.innerHTML = `

<div class="p-4">



<div class="flex justify-between items-center">



<div class="w-6 h-6 flex items-center justify-center rounded-full ${iconBg}">

<img src="${iconImg}" class="w-3 h-3">

</div>



<span class="px-3 py-1 text-xs rounded-full font-semibold ${badgeColor}">

${issue.priority.toUpperCase()}

</span>



</div>



<h3 class="mt-3 text-sm font-semibold text-gray-800">

${issue.title}

</h3>



<p class="text-xs text-gray-500 mt-1">

${issue.description?.slice(0,80)}...

</p>



<div class="flex gap-2 mt-3">



<span class="px-2 py-1 text-[10px] rounded-full bg-red-100 text-red-500 border border-red-200">

BUG

</span>



<span class="px-2 py-1 text-[10px] rounded-full bg-yellow-100 text-yellow-600 border border-yellow-200">

HELP WANTED

</span>



</div>



</div>



<div class="border-t px-4 py-3 text-[11px] text-gray-400">



<p>#${issue.id} by ${issue.author}</p>

<p>${issue.createdAt}</p>



</div>

`;



container.appendChild(card);

});

}



function setFilter(type) {

currentFilter = type;



document.querySelectorAll(".tab")

.forEach(tab => tab.classList.remove("tab-active"));



document.getElementById(`tab${capitalize(type)}`)

.classList.add("tab-active");



let filtered = allIssues;



if (type !== "all") {

filtered = allIssues.filter(i => i.status === type);

}



displayIssues(filtered);

}



function capitalize(text) {

return text.charAt(0).toUpperCase() + text.slice(1);

}



async function showIssue(id) {

showLoading(true);



try {

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

const data = await res.json();

const issue = data.data;



document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDesc").innerText = issue.description;

document.getElementById("modalStatus").innerText = issue.status;

document.getElementById("modalAuthor").innerText = issue.author;

document.getElementById("modalPriority").innerText = issue.priority;

document.getElementById("modalLabel").innerText = issue.label;

document.getElementById("modalDate").innerText = issue.createdAt;



document.getElementById("issueModal").showModal();

}

catch (error) {

console.error(error);

}

finally {

showLoading(false);

}

}



async function searchIssues() {

const text = document.getElementById("searchInput").value.trim();



if (!text) {

displayIssues(allIssues);

return;

}



showLoading(true);



try {

const res = await fetch(

`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(text)}`

);



const data = await res.json();



displayIssues(data.data || []);

}

catch (error) {

console.error(error);

}

finally {

showLoading(false);

}

}



function showLoading(state) {

const loading = document.getElementById("loading");

loading.classList.toggle("hidden", !state);

}