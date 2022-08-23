
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { 
    getDatabase, 
    ref,
     set,
     push, 
     onValue,
 } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ14SJbwS1zKTiu7zITFWUkZ2k70KUuyY",
  authDomain: "to-do-app-with-time.firebaseapp.com",
  projectId: "to-do-app-with-time",
  storageBucket: "to-do-app-with-time.appspot.com",
  messagingSenderId: "943752289714",
  appId: "1:943752289714:web:6b5b3910198297ab8498ab",
  measurementId: "G-MSD7Q9L0HZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const databs = getDatabase();














//get started

var obj = {};
var inp=document.getElementById("inp")
var parent=document.getElementById("parent")

//added the values of input in window
window.add = function () {
    obj = {
    text: inp.value,
    time: new Date().getHours() + " : " + new Date().getMinutes(),
  };
  console.log(obj);


//sending values to databse
  var reference = ref(databs, "inps/");
  var newRef = push(reference);
  obj.id = newRef.key;
  set(newRef, {
    text: inp.value,
    time: new Date().getHours() + " : " + new Date().getMinutes(),
  });
};



//sent data to firebase databse

var objectsData;
function getData(){
    var reference = ref(databs, "inps/")
   
    onValue(reference, function(data){
 console.log(data.val());
 objectsData = Object.values( data.val());
 console.log(objectsData);
 renderQuestions();
    } )

}
getData()



//get back the data at window
function renderQuestions() {
  var parent = document.getElementById("parent");
  parent.innerHTML = "";
  for (var i = 0; i < objectsData.length; i++) {
    parent.innerHTML += `
    <div class="taskbox text-center rounded my-4">
<p> ${objectsData[i].text}</p>
<span class="fs-6">${objectsData[i].time}</span>
<button class="btn btn-light rounded my-1" onclick="del(${i})">Delete</button>
<button class="btn btn-light rounded my-1" onclick="edit(${i})">Edit</button>
</div>  `;
 
    inp.value = "";
  }
}




window.del = function (index){
objectsData.splice(index,1);
 renderQuestions();
 }



  window.deleteall = function(){
set(ref(databs, "inps/"),{value:null});
var parent = document.getElementById("parent");
parent.innerHTML ="";
}




 window.edit= function(i) {
  var a = prompt('Edit new text', objectsData[i].text);
  objectsData[i].text = a;
  renderQuestions();
  }
  








