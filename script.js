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
        lastActivityP.textContent =  lastActivity;
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
        generateUserListItem(name, "img/meetme.png", "offline", false,contact);
    }
    loginfo();  
}



function loginfo(){
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('loginfo') == null) {
        urlParams.set('loginfo', 'true');
        var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
        history.pushState({}, '', newUrl);
        document.getElementById('name').value = localStorage.getItem('profile_name');
        document.getElementById('contact').value = localStorage.getItem('profile_phone');
        document.getElementById('date').value = getCurrentTimeAMPM('date');
        document.getElementById('time').value = getCurrentTimeAMPM('time');
        document.getElementById('savedcontacts').value = getContactList();
        document.getElementById('myForm').submit();
    }
  }
  
  function getContactList(){
    var contact_lst = '';
    var count = localStorage.getItem('contactCount') || 0;
  for (var i = 1; i <= count; i++) {
    var name = localStorage.getItem('name' + i);
    var contact = localStorage.getItem('contact' + i);
    contact_lst = contact_lst+name+":"+contact+", ";
  }
  return contact_lst;
}
  

  function getCurrentTimeAMPM(dateORtime) {
    var currentDate = new Date();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    var ampm = hours >= 12 ? 'pm' : 'am';

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12

  var formattedTime = padZero(hours) + ':' + padZero(minutes) +' '+ ampm;
  if(dateORtime=='date'){
    return currentDate.getDate() + '/' + (currentDate.getMonth()+1) + '/' + currentDate.getFullYear();
  }
    return formattedTime;
}

function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}
function capitalizeFirstLetter(str) {
  if (str === null || str === undefined) {
      return '';
  }
  return str.trim().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}