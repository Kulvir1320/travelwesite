
// createDatabase();
createObjectStores();



function createDatabase(){

  let openRequest = indexedDB.open("DB_traveldatabase", 1);

openRequest.onupgradeneeded = function() {

console.log("upgrade called")
};

openRequest.onerror = function() {

    console.log("error called")
};

openRequest.onsuccess = function() {
  //let db = openRequest.result;

    console.log("success called")
};

}

function createObjectStores(){
  let openRequest = indexedDB.open("DB_traveldatabase", 2);

openRequest.onupgradeneeded = function() {

console.log("upgrade called")

// add table cide ---
let db = openRequest.result;

  if (!db.objectStoreNames.contains('userdata')) { // if there's no "books" store
    db.createObjectStore('userdata', {keyPath: 'id'}); // create it
  }


};

openRequest.onerror = function() {

    console.log("error called")

};

openRequest.onsuccess = function() {
  //let db = openRequest.result;

    console.log("success called")


};
}

function registerUser(){
  let firstname = document.getElementById('fname').value;
  let lastname = document.getElementById('lname').value;
  let pass = document.getElementById('passwordsignup').value;

  if(firstname == "" & lastname == "" & pass == ""){
    alert("please fill the required feilds");
  }else{



  let openRequest = indexedDB.open("DB_traveldatabase", 2);
  openRequest.onupgradeneeded = function() {
     console.log("upgrade called")
  };

  openRequest.onerror = function() {
    console.log("error called")
  };

  openRequest.onsuccess = function() {
     let db = openRequest.result;

        console.log("success called")

        db.onversionchange = function() {
        db.close();
         };//ver change
         // your code: add data to table
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");

         let data={
            id: firstname,
            lastname: lastname,
            password: pass,
            requests: []


         }


         let req = t.add(data);

         req.onsuccess = function() {


            console.log(req.result)
            console.log(data);

         };

         req.onerror = function() {
                     console.log("Error", req.error);
              }
};


openRequest.onblocked = function() {

};
document.getElementById('fname').value = ""
document.getElementById('lname').value = ""
document.getElementById('passwordsignup').value = ""
var x = document.getElementById("msg");
x.className = "show";
setTimeout(function() {
  x.className.replace("show", "");
}, 30000);

}
}
