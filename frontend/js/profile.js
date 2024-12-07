if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}



$(document).ready(() => {
    getUserData();

    
   


    $('#logoutButton').on('click', function () {
        window.location.href = './index.html';
        localStorage.clear();
        window.location.href = './index.html';
    });
    getListOfDonations();
});



function getUserData() {
    $.ajax({
        url: "https://blogpost.org.in/fundraiser/api/getUser.php",
        method: "POST",
        data: {
            token: localStorage.getItem("token"),
        },
        success: function (response) {
            console.log(response);
            const userData = JSON.parse(response);
            console.log(userData);
            const user_id = userData.data.user.user_id;
            localStorage.setItem('user_id', user_id);

        
            const newDiv = document.createElement('div');
            newDiv.className = 'tab-pane fade show active profile-overview';
            newDiv.innerHTML = `
            <h5 class="card-title">About</h5>
            <p class="small fst-italic">Helpful person</p>

            <h5 class="card-title">Profile Details</h5>

            <div class="row">
              <div class="col-lg-3 col-md-4 label ">User ID</div>
              <div class="col-lg-9 col-md-8" id = "userID">${userData.data.user.user_id}</div>
            </div>

            <div class="row">
              <div class="col-lg-3 col-md-4 label ">Full Name</div>
              <div class="col-lg-9 col-md-8">${userData.data.user.fullname}</div>
            </div>

            <div class="row">
              <div class="col-lg-3 col-md-4 label">Email</div>
              <div class="col-lg-9 col-md-8">${userData.data.user.email}</div>
            </div>            
            `;
            var body = document.getElementById("profile-overview");
            body.appendChild(newDiv);


            const secondDiv = document.createElement('div');
            secondDiv.className = 'card-body profile-card pt-4 d-flex flex-column align-items-center';
            secondDiv.innerHTML = `
            <img src="./assets/logos/profile-blue.png" alt="Profile" class="rounded-circle">
            <h2>${userData.data.user.fullname}</h2>
            <h3>User</h3>
        
            `;
            var body = document.getElementById("profile-card");
            body.appendChild(secondDiv);
        },
        error: function (response) {
            // let data = JSON.parse(response.responseText);
            // localStorage.removeItem("token");
            // location.href = "./login.html?error=" + data.message;
            console.log(response);
        },
    });
}

function getListOfDonations() {
    const user_id = localStorage.getItem('user_id');
    console.log("user id is " + user_id);
    $.ajax({
        url: "https://blogpost.org.in/fundraiser/api/getListOfDonationById.php",
        method: "POST",
        data: {
            token: localStorage.getItem("token")
        },
        success: function (users) {
            console.log(users);
            users.forEach((user) => {
              const newDiv = document.createElement("div");
              newDiv.className = "activity-item";
              newDiv.innerHTML = `
                      $${user.amount} By You in ${user.eventname} on ${user.donated_at}
                      
                      `;
              var body = document.getElementById("yourDonations");
              body.appendChild(newDiv);
            });
          },
        error: function (response) {
          console.log(response);
        },
      });
    
}