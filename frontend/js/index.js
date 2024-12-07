if (!localStorage.getItem("token")) {
  location.href = "./login.html";
}

burger = document.querySelector(".toggle-sidebar-btn");
sideBar = document.querySelector(".sidebar");
mainContent = document.querySelector(".main");

burger.addEventListener("click", () => {
  sideBar.classList.toggle("w-class-resp");
  mainContent.classList.toggle("m-class-resp");
});

$(document).ready(() => {
  getDonationsCount();
  getCollectedAmount();
  getTotalUsers();
  getListRecentOfDonors();
  getListOfDonors();
  getAllCampaigns();
  getOngoingCampaigns();
  getSuccessfulCampaigns();
  getUserData();

  $('#openDonationModal').click(function() {
    $('#donationModal').modal('show');
  });
  $('#openCreationModal').click(function() {
    $('#campaignCreationModal').modal('toggle');
  });

  $('#saveDonation').click(function () {
    var user_id = parseInt(document.getElementById('userIdentity').innerHTML, 10);
    const campaign_id = $('#campaignName').val();
    const amount = $('#donationAmount').val();
    console.log(user_id);
  
    $.ajax({
      url: 'https://blogpost.org.in/fundraiser/api/setDonation.php',
      method: 'POST',
      data: {
        user_id,
        campaign_id,
        amount
      },
      success: function (response) {
        console.log(response);
  
        Swal.fire({
          icon: 'success',
          title: 'Donation Successful!',
          text: 'Thank you for your contribution.',
        });
        location.reload();
  
        $('#donationModal').modal('hide');
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  })

  $('#saveCampaign').click(function () {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const user_id = userData.data.user.user_id;
    
    const eventname = $('#eventName').val();
    const totalgoal = $('#totalGoal').val();
    const date = $('#eventDate').val();
    const description = $('#eventDescription').val();

    console.log("Creating campaign with user_id:", user_id);

    $.ajax({
        url: 'https://blogpost.org.in/fundraiser/api/setCampaigns.php',
        method: 'POST',
        data: {
            user_id: user_id,
            eventname: eventname,
            totalgoal: totalgoal,
            date: date,
            description: description
        },
        success: function (response) {
            console.log("Campaign creation response:", response);
            Swal.fire({
                icon: 'success',
                title: 'Campaign Created Successfully!',
                text: 'Your campaign has been created.',
            });
            location.reload();
        },
        error: function(error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create campaign',
            });
        }
    });
  })

  // Add smooth scrolling for navigation links
  $('.scroll-link').click(function(e) {
    e.preventDefault();
    
    const targetId = $(this).attr('href');
    const targetSection = $(targetId);
    
    if (targetSection.length) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - 100 // Offset for header
      }, 800);
    }
  });

  $('.scroll-to-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 800);
  });

  // Add sidebar toggle functionality
  $('.toggle-sidebar-btn').click(function() {
    $('.sidebar').toggleClass('active');
    $('#main').toggleClass('shift');
  });

  // Close sidebar on small screens when clicking outside
  $(document).click(function(e) {
    if ($(window).width() < 1200) {
      if (!$(e.target).closest('.sidebar, .toggle-sidebar-btn').length) {
        $('.sidebar').removeClass('active');
        $('#main').removeClass('shift');
      }
    }
  });

  // Handle window resize
  $(window).resize(function() {
    if ($(window).width() >= 1200) {
      $('.sidebar').removeClass('active');
      $('#main').removeClass('shift');
    }
  });
});

function getDonationsCount() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getDonationsCount.php",
    method: "GET",
    success: function (response) {
      console.log(response);
      console.log(response[0].count);
      $("#donationsCount").text(response[0].count);
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getCollectedAmount() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getCollectedAmountSum.php",
    method: "GET",
    success: function (response) {
      console.log(response);
      console.log(response[0].count);
      $("#collectedAmount").text(response[0].sum);
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getTotalUsers() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getTotalUsers.php",
    method: "GET",
    success: function (response) {
      console.log(response);
      console.log(response[0].count);
      $("#totalUsers").text(response[0].count);
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getListRecentOfDonors() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getListOfRecentDonors.php",
    method: "GET",
    success: function (users) {
      console.log(users);
      users.forEach((user) => {
        const newDiv = document.createElement("div");
        newDiv.className = "activity-item d-flex";
        newDiv.innerHTML = `
                <div class="activity-label">$${user.amount}</div>
                <div class="activity-content">By ${user.fullname} in ${user.eventname} on ${user.donated_at}</div>
                
                `;
        var body = document.getElementById("recentDonorsList");
        body.appendChild(newDiv);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getListOfDonors() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getListOfDonors.php",
    method: "GET",
    success: function (users) {
      console.log(users);
      users.forEach((user) => {
        const newDiv = document.createElement("div");
        newDiv.className = "activity-item d-flex";
        newDiv.innerHTML = `
                <div class="activity-label">$${user.amount}</div>
                <div class="activity-content">By ${user.fullname} in ${user.eventname} on ${user.donated_at}</div>
                
                `;
        var body = document.getElementById("DonorsList");
        body.appendChild(newDiv);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getAllCampaigns() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getAllCampaigns.php",
    method: "GET",
    success: function (campaigns) {
      console.log(campaigns);
      campaigns.forEach((campaign) => {
        const currentAmount = campaign.currentamountraised;
        const totalAmount = campaign.totalgoal;
        const averageTemp = (currentAmount / totalAmount) * 100;
        var average;
        var status;
        if (averageTemp >= 100) {
          average = 100;
          status = "Successful";
        } else {
          average = averageTemp;
          status = "Ongoing";
        }

        const newDiv = document.createElement("div");
        newDiv.className = "campaign-card";
        newDiv.innerHTML = `
                <div class="d-flex justify-content-between">
                    <h4>
                        ${campaign.eventname}
                        <span>/${status}</span>
                    </h4>
                    <h4>
                        Goal Amount
                        <label>:$${campaign.totalgoal}</label>
                    </h4>
                </div>
                <div class="progress mb-3">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100" style="width:${average}% "></div>
                </div>
                <div class="d-flex justify-content-between">
                    <h4>
                        Total Amount Collected
                        <label>:$${campaign.currentamountraised}</label>
                    </h4>
                    <h4>
                        Campaign Date
                        <label>:${campaign.date}</label>
                     </h4>
                </div>
                
                
                `;
        var body = document.getElementById("allCampaigns");
        body.appendChild(newDiv);

        const newOption = document.createElement("option");
        newOption.value = campaign.campaign_id;
        newOption.text = campaign.eventname;
        const selectElement = document.getElementById('campaignName');
        selectElement.appendChild(newOption);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getOngoingCampaigns() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getOngoingCampaigns.php",
    method: "GET",
    success: function (campaigns) {
      console.log(campaigns);
      campaigns.forEach((campaign) => {
        if (campaign.currentamountraised < campaign.totalgoal) {
          const currentAmount = campaign.currentamountraised;
          const totalAmount = campaign.totalgoal;
          const averageTemp = (currentAmount / totalAmount) * 100;
          var average;
          var status;
          if (averageTemp >= 100) {
            average = 100;
          } else {
            average = averageTemp;
          }

          var status = "Ongoing";
          const newDiv = document.createElement("div");
          newDiv.className = "campaign-card";
          newDiv.innerHTML = `
                  <div class="d-flex justify-content-between">
                  <h4>
                      ${campaign.eventname}
                      <span>/${status}</span>
                  </h4>
                  <h4>
                      Goal Amount
                      <label>:$${campaign.totalgoal}</label>
                  </h4>
              </div>
              <div class="progress mb-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${average}%"></div>
              </div>
              <div class="d-flex justify-content-between">
              <h4>
                  Total Amount Collected
                  <label>:$${campaign.currentamountraised}</label>
              </h4>
              <h4>
                Campaign Date
                <label>:${campaign.date}</label>
              </h4>
          </div>
                  
                  `;
          var body = document.getElementById("ongoingCampaigns");
          body.appendChild(newDiv);
        }
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function getSuccessfulCampaigns() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getSuccessfulCampaign.php",
    method: "GET",
    success: function (campaigns) {
      console.log(campaigns);
      campaigns.forEach((campaign) => {
        if (campaign.currentamountraised >= campaign.totalgoal) {
          const currentAmount = campaign.currentamountraised;
          const totalAmount = campaign.totalgoal;
          const averageTemp = (currentAmount / totalAmount) * 100;
          var average;
          var status;
          if (averageTemp >= 100) {
            average = 100;
          } else {
            average = averageTemp;
          }
  
          var status = 'Successful';
          const newDiv = document.createElement("div");
          newDiv.className = "campaign-card";
          newDiv.innerHTML = `
                  <div class="d-flex justify-content-between">
                  <h4>
                      ${campaign.eventname}
                      <span>/${status}</span>
                  </h4>
                  <h4>
                      Goal Amount
                      <label>:$${campaign.totalgoal}</label>
                  </h4>
              </div>
              <div class="progress mb-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${average}%"></div>
              </div>
              <div class="d-flex justify-content-between">
              <h4>
                  Total Amount Collected
                  <label>:$${campaign.currentamountraised}</label>
              </h4>
              <h4>
                  Campaign Date
                  <label>:${campaign.date}</label>
               </h4>
          </div>
                  
                  `;
          var body = document.getElementById("successfulCampaigns");
          body.appendChild(newDiv);
        }
      });
    },
    error: function (error) {
      console.log(error);
    },
  });

  
}

function getUserData() {
  $.ajax({
    url: "https://blogpost.org.in/fundraiser/api/getUser.php",
    method: "POST",
    data: {
      token: localStorage.getItem("token"),
    },
    success: function (response) {
      console.log("User data response:", response);
      const userData = JSON.parse(response);
      
      localStorage.setItem('userData', response);

      $("#profileName").text(userData.data.user.fullname);
      
      $("#userIdentity").text(userData.data.user.user_id);
      $("#userIdentityTwo").text(userData.data.user.user_id);
    },
    error: function (response) {
      console.log("Error getting user data:", response);
    },
  });
}

