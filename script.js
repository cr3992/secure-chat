function generateUserListItem(username, imageUrl, lastActivity, isOnline,mobileNumber) {
    var anchor = document.createElement("a");
    anchor.href = "chat.html?username=" + encodeURIComponent(username)+"&imageUrl="+encodeURIComponent(imageUrl)+"&lastActivity="+encodeURIComponent(lastActivity)+"&isOnline="+encodeURIComponent(isOnline)+"&mobileNumber="+encodeURIComponent(mobileNumber);
    var listItem = document.createElement("li");
    var flexContainer = document.createElement("div");
    flexContainer.className = "d-flex bd-highlight";
    var imgContainer = document.createElement("div");
    imgContainer.className = "img_cont";
    var imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.className = "rounded-circle user_img";

    var onlineIcon = document.createElement("span");
    onlineIcon.className = "online_icon " + (isOnline ? "online" : "offline");

    imgContainer.appendChild(imgElement);
    imgContainer.appendChild(onlineIcon);

    var userInfo = document.createElement("div");
    userInfo.className = "user_info";

    var usernameSpan = document.createElement("span");
    usernameSpan.textContent = capitalizeFirstLetter(username);

    var lastActivityP = document.createElement("p");
    if(isOnline ? "online" : "offline" == "online"){
        lastActivityP.textContent = "Online";
    }else{
        lastActivityP.textContent = capitalizeFirstLetter(username)+" left " + lastActivity;
    }

    userInfo.appendChild(usernameSpan);
    userInfo.appendChild(lastActivityP);

    flexContainer.appendChild(imgContainer);
    flexContainer.appendChild(userInfo);

    listItem.appendChild(flexContainer);
    anchor.appendChild(listItem);
    var contacts = document.getElementById("contacts");
    contacts.appendChild(anchor);
}

function loadSavedContacts(){
    var count = localStorage.getItem('contactCount') || 0;
    for (var i = 1; i <= count; i++) {
        var name = localStorage.getItem('name' + i);
        var contact = localStorage.getItem('contact' + i);
        generateUserListItem(name, "img/meetme.png", "online", true,contact);
    }
}

function capitalizeFirstLetter(str) {
    return str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }