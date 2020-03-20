
// createDatabase();
// createObjectStores();





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

function userlogIn(){

  let uname = document.getElementById('username').value;
  let p = document.getElementById('upassword').value;


  if(uname == "" & p == ""){
    alert("empty")
  }else {



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

         };
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");

         let req = t.get(uname)

         req.onsuccess = function() {
            console.log(req.result)
            var recieved = req.result
            if(recieved == null){
              alert("user not registered!!!!")
            }else if (p == recieved.password) {
              window.location = "index.html";
              alert("login succesful")

            }else {
              alert("wrong password")
            }
         };

         req.onerror = function() {
                     console.log("Error", request.error);

              }
     };

     openRequest.onblocked = function() {

       };

     }

}

function bookhotelfunc(){

  console.log(loginuser);

   let openRequest = indexedDB.open("DB_traveldatabase", 2);

      openRequest.onupgradeneeded = function() {

        console.log("upgrade called")
     };

    openRequest.onerror = function() {

        console.log("error called")

    };

    let hname = document.getElementById('hotelname').value
    let hperson = document.getElementById('numperson').value
    let hotelin = document.getElementById('hotelcheckin').value
    let hotelout  = document.getElementById('hotelcheckout').value

   openRequest.onsuccess = function() {
        let db = openRequest.result;

          console.log("success called")

        db.onversionchange = function() {
        db.close();

         };
         let transaction = db.transaction("userdata", "readwrite");
         let t = transaction.objectStore("userdata");

         let r = t.get(loginuser);

         if(hname == "" & hperson == "" & hotelin == "" & hotelout == ""){
           alert("empty!!!!!!")
         }else {



         let Newdata={
            id: loginuser,
            lastname: r.lastname,
            password: r.password,

            requests: ["r1","r2","r3"]


         }
         let req = t.put(Newdata);

         req.onsuccess = function() {
            console.log(req.result)
            console.log(Newdata);

         };
         req.onerror = function() {
                     console.log("Error", request.error);
              }
      };

    }


       openRequest.onblocked = function() {
      };
}
