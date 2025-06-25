const user = JSON.parse(localStorage.getItem("smm_user"));
const baseURL = "https://script.google.com/macros/s/AKfycbwAFeD7KjBQ5zHEgGC0CZUUqFvCCT3caU8D7Ig2etL-tJbu5rrrnq5foxS7V3uKc-U/exec"; // Ganti dengan GAS kamu

if (!user) location.href = "index.html";
document.getElementById("namaUser").innerText = user.username;

function tambahPesanan() {
  const jenis = document.getElementById("jenis").value;
  const jumlah = document.getElementById("jumlah").value;
  const link = document.getElementById("link").value;

  if (!jenis || !jumlah || !link) return alert("Isi semua form.");

  fetch(baseURL, {
    method: "POST",
    body: new URLSearchParams({
      action: "tambahPesanan",
      username: user.username,
      jenis,
      jumlah,
      link
    })
  })
  .then(res => res.json())
  .then(res => {
    document.getElementById("pesan").innerText = res.message;
    getRiwayat();
  });
}

function getRiwayat() {
  fetch(`${baseURL}?action=getRiwayat&username=${user.username}`)
    .then(res => res.json())
    .then(data => {
      let html = data.map(d => `<div>✅ ${d.jenis} - ${d.jumlah} - ${d.status}</div>`).join('');
      document.getElementById("riwayat").innerHTML = html;
    });
}

function logout() {
  localStorage.removeItem("smm_user");
  location.href = "index.html";
}

window.onload = getRiwayat;
