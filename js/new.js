const inputTag = document.querySelector("input[name=roomTag");
const inputTags = document.querySelector("input[name=roomTags");
const divTags = document.querySelector(".tags");
const iconBtnTag = document.querySelector(".iconBtnTag");
const iconBtnFileAdd = document.querySelector(".iconBtnFileAdd");
const roomImg = document.querySelector(".roomImg");
const fileTotalNum = document.querySelector("input[name=fileTotalNum");
let tags = [];

iconBtnTag.addEventListener("click", (e) => {
  if(inputTag.value === ""){
    return false;
  }
  tags.push(inputTag.value);
  let tagsHtml = tags.map((tag) => `<span class="tag tagBtn">${tag}</span>`);
  divTags.innerHTML = tagsHtml.join("");
  inputTags.value = JSON.stringify(tags);
  inputTag.value = "";
  const tagBtns = document.querySelectorAll(".tagBtn");
  for(let tagBtn of tagBtns){
    tagBtn.removeEventListener("click", tagBenClick);
    tagBtn.addEventListener("click", tagBenClick);
  }
});

iconBtnFileAdd.addEventListener("click", (e) => {
  const temp = document.querySelector("#inputFile");
  const clon = temp.content.cloneNode(true);
  roomImg.appendChild(clon);
  resetBtns1();
});

function tagBenClick(e){
  const target = e.target;
  const value = e.target.innerText;
  tags.map((tag, index) => {
    if(tag === value){
      tags.splice(index, 1);
    }
  })
  target.remove();
}

function resetBtns1(){
  const rooms = roomImg.querySelectorAll('.row');
  Array.from(rooms).map((room, index)=>{
    const label = room.querySelector("label");
    const input = room.querySelector("input");
    const removeBtn = room.querySelector(".iconBtnFileRemove");
    label.innerText ="房間照片"+(index+1);
    label.setAttribute("for", "file"+index);
    input.setAttribute("id", "file"+index);
    input.setAttribute("name", "file"+index);
    if(removeBtn !== null){
      removeBtn.setAttribute("index", index);
      removeBtn.removeEventListener("click", removeFileInput);
      removeBtn.addEventListener("click", removeFileInput);
    }
  });
  fileTotalNum.value = rooms.length;
}

function removeFileInput(e){
  const target = e.target.closest(".row");
  target.remove();
  resetBtns1();
}
