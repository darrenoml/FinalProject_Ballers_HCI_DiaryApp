// $(document).ready(function () {
//     $("#sidebar").mCustomScrollbar({
//         theme:"minimal"
//     });

//     $("#sidebarDismiss, .overlay").on('click', function () {
//         $('#sidebar').removeClass('active');
//         $('.overlay').removeClass('active');
//     });

//     $("#sidebarCollapse").on('click', function () {
//         $("#sidebar").addClass('active');
//         $(".overlay").addClass('active');
//         $(".collapse.in").toggleClass('in');
//         $("a[aria-expanded=true]").attr('aria-expanded', false);
//     });
// });

window.addEventListener("scroll", function(){
    let navbar = document.getElementById("headerMain");
    if(window.pageYOffset>=300){
      navbar.classList.add("force-fixed-header");
    }
    else{
      navbar.classList.remove("force-fixed-header");
    }
  })



  function openNav() {
    document.getElementById("mySidebar").style.width = "150px";
    document.getElementById("main").style.marginLeft = "150px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // 1. akan ada array untuk menampung setiap posting diary
  // 2. diary akan ada element?
  //  a. title
  //  b. body
  //  c. date
  //  diary akan disimpan dalam local storage dengan key : user_diary

  // akan menggunakan class diary

  class Diary {
    constructor(title, body, tag, createdAt) {
      this.title = title;
      this.body = body;
      this.createdAt = createdAt;
      this.tag = tag;
    }
  }

  function DiaryList() {
    let diaries = localStorage.getItem("user_diary");
    if (diaries !== "" && diaries !== null) {
      const diariesArr = JSON.parse(diaries);

      for (let i = 0; i < diariesArr.length; i++) {
        document
          .getElementById("timeline")
          .appendChild(CreateCard(diariesArr[i]));
      }
    }
  }

  // CRUD
  // CREATE
  // READ
  // UPDATE
  // DELETE
  function PostDiary() {
    // create new post
    // get form value
    // get form title
    const titleForm = document.getElementById("form-title").value;
    // get form body
    const bodyForm = document.getElementById("form-body").value;
    const tagForm = document.getElementById("form-tag").value;

    // create new diary
    const createDate = new Date();
    const newDiary = new Diary(titleForm, bodyForm, tagForm, createDate);

    // get local storage
    let diaries = localStorage.getItem("user_diary");
    if (diaries === "" || diaries === null) {
      const diariesArr = [newDiary];
      diaries = JSON.stringify(diariesArr);
    } else {
      const diariesArr = JSON.parse(diaries);
      diariesArr.push(newDiary);
      diaries = JSON.stringify(diariesArr);
    }

    // store to local storage
    localStorage.setItem("user_diary", diaries);

    // show to timeline
    document.getElementById("timeline").appendChild(CreateCard(newDiary));
  }

  function CreateCard(diary) {
    const obj = document.createElement("div");
    obj.className = "card"; 
    obj.style = "width: 18rem; height: 13rem; line-height: 12rem; margin: 10px; cursor: pointer; overflow: hidden; text-oveflow; ellipsis;"; 

    obj.style.transition = "transform 0.3s, box-shadow 0.3s";
    obj.style.transform = "scale(1)";
    obj.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";

    obj.addEventListener("mouseenter", function() {
        obj.style.transform = "scale(1.05)";
        obj.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.2)";
    });

    obj.addEventListener("mouseleave", function() {
        obj.style.transform = "scale(1)";
        obj.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
    });

    obj.addEventListener("click", function() {
        obj.setAttribute("data-bs-toggle", "modal")
        obj.setAttribute("data-bs-target", "#" + diary.title + "1")
      
    });

    const cardBody = document. createElement("div");
    cardBody.className = "card-body";

    // Create title
    const titleObj = document.createElement("h5");
    titleObj.className = "card-title";
    titleObj.innerText = diary.title;

    // Create tag
    const tagObj = document.createElement("h6");
    tagObj.className = "card-subtitle mb-2 text-muted";
    tagObj.innerText = diary.tag;

    // Create body
    const bodyObj = document.createElement("p");
    bodyObj.className = "card-text";

    const words = diary.body;
    const maxlength = 87

    if (words.length > maxlength){
      const truncate = words.slice(0,maxlength) + "..."
      bodyObj.innerText = truncate;
    }
    else {
      const truncate = words
      bodyObj.innerText = truncate;
    }

    // Create date
    const dateObj = document.createElement("p");
    dateObj.className = "card-text";
    const date = new Date(diary.createdAt);
    dateObj.innerText = `${date.toDateString()}`;

    const cardFoot = document.createElement("div");
    cardFoot.className = "card-footer";

    // Append elements to card body
    cardBody.appendChild(titleObj);
    cardBody.appendChild(tagObj);
    cardBody.appendChild(bodyObj);
    cardFoot.appendChild(dateObj);
    cardBody.appendChild(cardFoot);

    // Append card body to card
    obj.appendChild(cardBody);
    

    /// create modal ///

    // modal id //
    var modid

    // set modal structure //
    const mod = document.createElement("div");
    mod.className = "modal fade";
    mod.id = diary.title + "1";
    mod.tabIndex = -1;
    mod.ariaHidden = true;

    const modDialog = document.createElement("div");
    modDialog.className = "modal-dialog modal-lg";

    const modContent = document.createElement("div");
    modContent.className = "modal-content";

    const modHeader1 = document.createElement("div");
    modHeader1.className = "modal-header";

    const modTitle = document.createElement("div");
    modTitle.className = "modal-title";
    modTitle.id = "modalTitle_1";
    modTitle.innerText = diary.title;

    const modHeader2 = document.createElement("div");
    modHeader2.className = "modal-header";
    modHeader2.innerText = diary.tag;

    const modBody = document.createElement("div");
    modBody.className = "modal-body";
    
    const modP = document.createElement("h3");
    modP.className = "forceInline";
    modP.innerText = diary.body;

    const modSpan1 = document.createElement("span");
    modSpan1.className = "text-muted";
    modSpan1.innerText = "Click outside this card to close";

    // append child to each parent //

    mod.appendChild(modDialog);

    modDialog.appendChild(modContent);
    modContent.appendChild(modHeader1);
    modContent.appendChild(modHeader2);
    modContent.appendChild(modBody);

    modHeader1.appendChild(modTitle);
    modBody.appendChild(modP);
    modBody.appendChild(modSpan1);

    document.body.appendChild(mod);

    return obj;


};

 /*
        condition:
          1. local storage
          2. kita sudah menyimpan profile object di local storage
        question:
          1. bagaimana caranya agar value local storage ini akan kereflect di setting html
      */


        function start() {
            defaultProfile();
            DiaryList();
        }

         function loadProfilePic(userPic) {
            if (userPic !== null || userPic !== "" || userPic !== undefined) {
                const navAvatar = document.getElementById("nav-avatar");
                navAvatar.setAttribute("src", userPic);
            }
         }

          function defaultProfile() {
            const newDate = new Date("1970-01-01");
    
            let userObj = new Object();
            const user = localStorage.getItem("user_profile");
            if (user !== null) {
              userObj = JSON.parse(user);
            } else {
              userObj = {
                profilePic: "defaultpfp.jpg",
                dob: newDate,
                bioDetail: "default bio",
              };
            }
    
            // store in local storage first
            localStorage.setItem("user_profile", JSON.stringify(userObj));
            updateValue(userObj);
            loadProfilePic(userObj.profilePic);
          }
          

          function changeProfilePicture(imageName) {
            document.getElementById("profileImage").src = imageName;
          }

          function saveProfileChange() {
            // get profile pic value
            const profilePic = document.getElementById("profilePicture");
            // add some validation
            const validPictures = {
              "image1.jpg": true,
              "image2.jpg": true,
              "image3.jpg": true,
              "image4.jpg": true,
              "image5.jpg": true,
            };
    
            const selectedPicture = profilePic.value;
            if (
              validPictures[selectedPicture] === null ||
              validPictures[selectedPicture] === undefined
            ) {
              console.log("invalid picture");
              alert("invalid picture");
              return;
            }
    
            // get dob value
            const dob = document.getElementById("dob").value;
            if (dob === undefined || dob === null || dob === "") {
              console.log("invalid dob");
              alert("invalid dob");
              return;
            }
            // validate dob
            const dobSelected = new Date(dob);
            if (dobSelected.getFullYear() > 2010) {
              console.log("dob must be less than 2010");
              alert("dob must be less than 2010");
              return;
            }
    
            // get bio value
            const bio = document.getElementById("bio");
            // validate bio
            if (bio.value.length > 50) {
              console.log("bio text must be less than 50");
              alert("bio text must be less than 50");
              return;
            }
            const selectedBio = bio.value;
    
            // get profile
            const user = localStorage.getItem("user_profile");
            if (user === null || user === "" || user === "{}") {
              console.log("invalid user profile");
              alert("invalid user profile");
              return;
            }
            userObj = JSON.parse(user);
            // update property
            userObj.profilePic = selectedPicture;
            userObj.dob = dobSelected;
            userObj.bioDetail = selectedBio;
            // store to local storage
            localStorage.setItem("user_profile", JSON.stringify(userObj));
            updateValue(userObj);
          }
    
          function updateValue(userObj) {
            // update image
            const img = document.getElementById("profileImg");
            img.setAttribute("src", userObj.profilePic);
            // update profile picture dropdown
            const profileDropDown = document.getElementById("profilePicture");
            for (let i = 0; i < profileDropDown.length; i++) {
              if (profileDropDown.options[i].value === userObj.profilePic) {
                profileDropDown.selectedIndex = i;
              }
            }
            // update dob
            const dob = document.getElementById("dob");
            const x = new Date(userObj.dob);
            dob.valueAsDate = x;
            // update bio
            const bio = document.getElementById("bio");
            bio.innerText = userObj.bioDetail;
          }






