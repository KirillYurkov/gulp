
document.body.addEventListener("click", getAccordeon);

function getAccordeon(event) {
  console.log(event.target);
  if (!event.target.classList.contains("accordeon__head")) {
    return;
  }

  let headAttr = event.target.getAttribute(["data-head"]);
  let content = document.querySelector("#" + headAttr);

  if (content) {
    event.target.classList.toggle("rotate");
    content.classList.toggle("hide");
  }
}