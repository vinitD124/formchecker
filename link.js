let url = "https://652b9943d0d1df5273ee81b8.mockapi.io/user";

function getAlluser() {
  let userTable = document.getElementById("usertables");

  let str = "";

  let resObj = fetch(url);

  let mydata = resObj.then((data) => {
    return data.json();
  });

  mydata.then((finaldata) => {
    let usersArray = finaldata;

    usersArray.map((element) => {
      str += `<tr>  
          <td class="name">${element.name}</td><td class="phone">${element.email}</td><td class="phone">${element.number}</td>
            <td class="btn"><button class="btn-delete" onclick="deleteUser(${element.id})"><i class='bx bxs-trash-alt'></i></button>
                 <button class="btn-edit" onclick="editUser(${element.id})"><i class='bx bxs-edit'></i></button>
               </td></tr>`;
    });
    userTable.innerHTML = str;
  });
}

getAlluser();

document.getElementById("btn-submit").addEventListener("click", createUser);

function createUser(e) {
  // e.preventDefault();
  let nameNew = document.getElementById("name").value;
  let emailNew = document.getElementById("email").value;
  let numberNew = document.getElementById("number").value;

  let newUser = {
    name: nameNew,
    email: emailNew,
    number: numberNew,
  };

  let fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  };

  fetch(url, fetchOption)
    .then((res) => {
      console.log(res.json())
      // return res.json();
    })
    .then((data) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("number").value = "";
      console.log("passed")
      getAlluser();
    })
    .catch((e) => {
      console.log(e);
    });
}

console.log("failed")



function editUser(id) {
    userId = id;
  
    fetch(url + "/" + userId)
      .then((response) => response.json())
      .then((userData) => {
 
        document.getElementById("name").value = userData.name;
        document.getElementById("email").value = userData.email;
        document.getElementById("number").value = userData.number;
        document.getElementById("btn-submit").innerText = "Update";
  
     
        document.getElementById("btn-submit").removeEventListener("click", createUser);
        document.getElementById("btn-submit").addEventListener("click", updateUser);
      })
     
  }
  
function updateUser() {
  
    let nameNew = document.getElementById("name").value;
    let emailNew = document.getElementById("email").value;
    let numberNew = document.getElementById("number").value;
  
    let updatedUser = {
      name: nameNew,
      email: emailNew,
      number: numberNew,
    };
  
    let fetchOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    };
  
    fetch(url + "/" + userId, fetchOption)
      .then((response) => response.json())
      .then(() => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("number").value = "";
        document.getElementById("btn-submit").innerText = "Create";
        getAlluser(); 
      })
   
  }
  


  

function deleteUser(id) {
  console.log("Deleting user with ID:", id);

  let fetchOption = {
    method: "DELETE",
  };

  fetch(url + "/" + id, fetchOption)
    .then((resobj) => {
      console.log("Response from server:", resobj);
      return resobj.json();
    })
    .then((finaldata) => {
      console.log(finaldata);
      alert("User deleted successfully");
      getAlluser();
    })
    .catch((e) => {
      console.error(e);
    });
}
