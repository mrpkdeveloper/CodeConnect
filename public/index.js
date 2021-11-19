let new_btn = document.getElementById("newbtn");
let room_btn = document.getElementById("joinroom");
new_btn.addEventListener("click", function () {
  // console.log("hello");
  document.querySelector(".bg-modal-menu").style.display = "flex";
  document.querySelector("body").style.overflow = "hidden";
});

room_btn.addEventListener("click", function () {
  console.log("hello");
  document.querySelector(".bg-modal-menu-2").style.display = "flex";
  document.querySelector("body").style.overflow = "hidden";
});

document.querySelector(".close-menu").addEventListener("click", function () {
  console.log("close clicked");
  document.querySelector(".bg-modal-menu").style.display = "none";
  document.querySelector("body").style.overflow = "visible";
});
document.querySelector(".close-menu-2").addEventListener("click", function () {
  console.log("close clicked");
  document.querySelector(".bg-modal-menu-2").style.display = "none";
  document.querySelector("body").style.overflow = "visible";
});
