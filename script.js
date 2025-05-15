let searchbtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp")
let card = document.querySelector(".card")


function getProfileData(username){
  return fetch(`https://api.github.com/users/${username}`).then((row)=>{
    if(!row.ok) throw new Error("user not found") & alert("enter valid name")
        return row.json()
  })
}
 

function getRepos(username){
   return  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=2`).then((row)=>{
    if(!row.ok) throw new Error("no repo found");
    else return row.json()
   })
}


function decorateProfileData(details) {
  console.log(details);
 let data = `
  <img src="${details.avatar_url}" alt="User Avatar"
    class="w-24 h-24 rounded-full border-2 border-emerald-500 object-cover shadow-lg" />
  <div class="flex-1 space-y-2">
    <h2 class="text-2xl font-bold text-emerald-300">${details.name}</h2>
    <p class="text-zinc-400 text-sm">@${details.login}</p>
    <p class="text-sm mt-2 text-zinc-300">
      ${details.bio ? details.bio : "Sorry there is no bio..."}
    </p>

    <div class="flex flex-wrap gap-4 mt-4 text-sm text-zinc-300">
      <div>
        <span class="font-semibold text-white">Public Repos:</span> ${details.public_repos}
      </div>
      <div>
        <span class="font-semibold text-white">Followers:</span> ${details.followers}
      </div>
      <div>
        <span class="font-semibold text-white">Following:</span> ${details.following}
      </div>
      <div>
        <span class="font-semibold text-white">Location:</span> ${details.location}
      </div>
      <div>
        <span class="font-semibold text-white">Company:</span> ${details.company ? details.company : "N/A"}
      </div>
      <div>
        <span class="font-semibold text-white">Blog:</span>
        <a href="${details.blog || '#'}" class="text-indigo-400 hover:underline hover:text-indigo-300"
            target="_blank">${details.blog ? details.blog : "N/A"}</a>
      </div>
    </div>
  </div>`;

card.innerHTML = data;
}



searchbtn.addEventListener("click" , function(){
  let username =  usernameinp.value.trim();
  if(username.length >0){
   getProfileData(username).then((data)=>{
    decorateProfileData(data)
    
   })
  }
  else{
    alert("enter a username")
  }
})

