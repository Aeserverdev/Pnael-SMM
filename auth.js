let isLogin = true;
const endpoint = 'https://script.google.com/macros/s/AKfycbwAFeD7KjBQ5zHEgGC0CZUUqFvCCT3caU8D7Ig2etL-tJbu5rrrnq5foxS7V3uKc-U/exec'; // Ganti dengan GAS kamu

function toggleMode() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login ke SMM Panel" : "Daftar Akun Baru";
  document.getElementById("toggle").innerText = isLogin ? "Belum punya akun? Daftar" : "Sudah punya akun? Login";
}

function submitForm() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const layanan = document.getElementById("layanan").value;
  const nowa = document.getElementById("nowa").value;

  if (!username || !password) return alert("Lengkapi data.");

  const data = {
    username, password, layanan, nowa,
    action: isLogin ? "login" : "register"
  };

  fetch(endpoint, {
    method: "POST",
    body: new URLSearchParams(data)
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      localStorage.setItem("smm_user", JSON.stringify(res.data));
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("notif").innerText = res.message;
    }
  });
}
