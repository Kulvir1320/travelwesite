
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



  let openRequest = indexedDB.open("DB_traveldatabase", 3);
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



  let openRequest = indexedDB.open("DB_traveldatabase", 3);

   openRequest.onupgradeneeded = function() {
       console.log("upgrade called")

       let db = openRequest.result;

         if (!db.objectStoreNames.contains('userlogedin')) { // if there's no "books" store
           db.createObjectStore('userlogedin', {keyPath: 'id'}); // create it
         }
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

         // let ltrans = db.transaction("userlogedin", "readwrite");
         // let lt = ltrans.objectStore("userlogedin");
         //
         let req = t.get(uname)
         // let data={
         //   id: uname,
         //   lastname: ""
         // }
         //
         // let r = lt.add(data);

         req.onsuccess = function() {
            console.log(req.result)
            var recieved = req.result
            if(recieved == null){
              alert("user not registered!!!!")
            }else if (p == recieved.password) {


               saveLoginUser(uname);





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


function saveLoginUser(uname){


let openRequest = indexedDB.open("DB_traveldatabase", 3);
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

   // code to save login username
   let transaction = db.transaction("userdata", "readwrite");
   let t = transaction.objectStore("userdata");

   let r = t.put({id: "logInUser", username: uname});

   r.onsuccess = function(){

     alert("login succesful");
    // window.location.href = "index.html";


   };





}// end of success


openRequest.onblocked = function() {
};


}//end of function

function bookhotelfunc(){



   let openRequest = indexedDB.open("DB_traveldatabase", 3);

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


         let r = t.get("logInUser");

         r.onsuccess = function(){
           let reslt = r.result;
           let loginame = reslt.username;
           console.log(loginame);

           if(hname == "" & hperson == "" & hotelin == "" & hotelout == ""){
             alert("empty!!!!!!")
           }else {

             // let newreq = [hname,hperson,hotelin,hotelout];
             // oldreq.push(newreq);

           let Newdata={


              id: loginame,
              // lastname: r.lastname,
              // password: r.password,

              requests: ["Hotel Booked:" + hname + "\n Persons:" + hperson+"\n Check In:"+hotelin+"\n Check Out:"
            + hotelout]
           }
           let req = t.put(Newdata);

           req.onsuccess = function() {
             alert("booking succesful")
              console.log(req.result)
              console.log(Newdata);

           };
           req.onerror = function() {
                       console.log("Error", request.error);
                }
        };

         }




    }
       openRequest.onblocked = function() {
      };
}
