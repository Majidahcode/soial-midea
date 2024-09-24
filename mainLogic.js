// MAIN URL
const baseURL = "https://tarmeezacademy.com/api/v1";


// ********** SETUP UI FUNCTION**********//
function setupUI() {
  loginBtn = document.getElementById("loginBtn");
  regesterBtn = document.getElementById("regesterBtn");
  logOutBtn = document.getElementById("logOutBtn");
  addPostButton = document.getElementById("add-post-button");
//  PostUsername = document.getElementById("Post-Username-Div")

  sidebar = document.getElementById("sidebar");

  let token = window.localStorage.getItem("token");
  console.log("التوكن المخزن في localStorage:", token); // التحقق من أن التوكن مخزن بشكل صحيح
  if (token == null) {
    loginBtn.style.display = "block"; // إظهار زر تسجيل الدخول
    regesterBtn.style.display = "block"; // إظهار زر التسجيل
    logOutBtn.style.display = "none"; // إخفاء زر تسجيل الخروج
  //  PostUsername.style.display = "none"; // إخفاء زر تسجيل الخروج
  if(addPostButton != null){
      addPostButton.style.display = "none";
  }
  
    sidebar.style.display = "none";
  } else {
    loginBtn.style.display = "none"; // إخفاء زر تسجيل الدخول
    regesterBtn.style.display = "none"; // إخفاء زر التسجيل
    logOutBtn.style.display = "block"; // إظهار زر تسجيل الخروج
    //PostUsername.style.display = "block"; // إخفاء زر تسجيل الخروج

    if(addPostButton != null){
      addPostButton.style.display = "block";
  }
  
    sidebar.style.display = "flex";
    const user = getCurrentUser();
    document.getElementById("sidebar-username").innerHTML = user.username;
  //  document.getElementById("Post-Username").innerHTML = user.username;
    const email = getCurrentUser();
    document.getElementById("sidebar-email").innerHTML = email.username;
    //const image = getCurrentUser()
    document.getElementById("sidebar-image").src = user.profile_image;
    //userName.innerText = user.username;
    //userImage.src = user.profile_image || "default-avatar.png";
  }
}
// ********** SETUP UI FUNCTION**********//



///////////AUTH FUNCTION///////////////


// ********* LOGIN FUNCTION**********//
function loginbuttonclick() {
  console.log("تسجيل الدخول قيد التنفيذ...");
  let username = document.getElementById("input1").value;
  let password = document.getElementById("input2").value;
  const param = { username: username, password: password };

  const url = `${baseURL}/login`;
  axios
    .post(url, param)
    .then((response) => {
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // إغلاق المودال بعد تسجيل الدخول
      const modal = document.getElementById("loginModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      setupUI(); // تحديث الواجهة
      showAlert("logged in successfully", "success");
      // إعادة تحميل الصفحة للتأكد من تحديث الواجهة
      //  window.location.reload();
    })
    .catch((error) => {
      console.error("حدث خطأ أثناء تسجيل الدخول:", error);
    });
}
// ********* END LOGIN FUNCTION**********//



// **********REGITSER FUNCTION**********//
function regesterbuttonclick() {
  const name = document.getElementById("regesterNameInput").value;
  const username = document.getElementById("regesterUserNameInput").value;
  const password = document.getElementById("regesterPassInput2").value;
  const image = document.getElementById("register-image-input").files[0];

  let formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("image", image);

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const url = `${baseURL}/register`; // تأكد من تغيير هذا إلى عنوان API الصحيح

  axios
    .post(url, formData)
    .then((response) => {
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      const modal = document.getElementById("regesterModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      showAlert("logged in successfully", "success");
      setupUI(); // تحديث الواجهة
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
    });
}
// **********END REGITSER FUNCTION**********//


// **********LOGOUT FUNCTION**********//
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  //todo: hide alert
  showAlert("logged out successfully", "danger");
  //alert("are you sure you want deleteig?");
  setupUI();
}
// **********END LOGOUT FUNCTION**********//


// **********GET CURRENT USEER FUNCTION**********//
function getCurrentUser() {
  let user = null;
  const storgeUser = localStorage.getItem("user");
  if (storgeUser != null) {
    user = JSON.parse(storgeUser);
  }
  return user;
}
// **********END GET CURRENT USEER FUNCTION**********//


// ********** SHOW ALERT FUNCTION**********//
function showAlert(custumMessage, type) {
  const alertPlaceholder = document.getElementById("AlertPlaceholder");

  // تأكد من وجود العنصر قبل محاولة استخدامه
  if (!alertPlaceholder) {
    console.error("Alert placeholder element not found");
    return;
  }

  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper); // append لن يعمل إذا كان alertPlaceholder غير موجود
  };

  appendAlert(custumMessage, type);

  //setTimeout(() => {
  //  const alert = bootstrap.Alert.getOrCreateInstance("#AlertPlaceholder");
  //  alert.close();
  //}, 3000);
}
// **********END SHOW ALERT FUNCTION**********//
