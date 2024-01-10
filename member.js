function skillsMember() {
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("member-skills");
    var memberSkillsButton = document.getElementById("member-skills-button");

    memberSkillsButton.addEventListener("click", function() {
        memberSkills.classList.toggle("hidden");
    });
}