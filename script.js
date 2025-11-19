// Variabel Global untuk menyimpan data registrasi
let registrationData = {};

// Fungsi untuk menampilkan screen tertentu dan menyembunyikan yang lain
function showScreen(screenId) {
  // Sembunyikan semua screen
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  // Tampilkan screen yang dipilih
  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add("active");
  }
}

// Inisialisasi: SEMUA LOGIKA TERPUSAT DI SINI
document.addEventListener("DOMContentLoaded", function () {
  showScreen("home-screen");

  // --- 1. LOGIKA REGISTRASI BARU (DENGAN SELECTOR FORM YANG LEBIH SPESIFIK) ---
  // Pastikan Anda memiliki tag <form> di HTML Anda!
  const registerForm = document.getElementById("registration-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Ambil nilai dari input fields menggunakan placeholder yang SANGAT akurat
      const namaInput = registerForm.querySelector(
        "input[placeholder='Masukkan Nama Lengkapmu']"
      );
      const kelasInput = registerForm.querySelector(
        "input[placeholder='Masukkan Kelasmu ']" // PASTIKAN ADA SPASI DI AKHIR
      );
      const waInput = registerForm.querySelector(
        "input[placeholder='Masukkan Nomor Teleponmu']"
      );

      // *** PENTING: Lakukan validasi keberadaan elemen sebelum mengakses .value ***
      if (!namaInput || !kelasInput || !waInput) {
        console.error(
          "Kesalahan: Salah satu elemen input tidak ditemukan di formulir."
        );
        alert("Terjadi kesalahan pada formulir. Mohon hubungi admin.");
        return; // Berhenti jika ada elemen yang hilang
      }

      // Simpan data ke variabel global
      registrationData = {
        nama: namaInput.value.trim(),
        kelas: kelasInput.value.trim(),
        nomorWA: waInput.value.trim(),
      };

      // Validasi Sederhana (akan tetap berjalan jika data sudah terambil)
      if (registrationData.nama === "" || registrationData.nomorWA === "") {
        alert("Mohon lengkapi Nama dan Nomor Whatsapp Anda.");
        return;
      }

      alert(
        `Registrasi sukses, ${registrationData.nama}! Lanjut ke Pembayaran.`
      );
      showScreen("payment-screen"); // PINDAH KE LAYAR PEMBAYARAN - KINI AKAN JALAN
    });
  }

  

  // --- 2. LOGIKA LAYAR PEMBAYARAN DAN WHATSAPP ---
  const confirmPaymentBtn = document.getElementById("confirm-payment-btn");

  if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener("click", redirectToWhatsApp);
  }

  // Fungsi untuk redirect ke WhatsApp
  function redirectToWhatsApp() {
    // GANTI NOMOR ADMIN INI DENGAN NOMOR SESUNGGUHNYA
    const adminNumber = "6281249303503";

    // Pesan otomatis yang menggunakan data dari variabel global registrationData
    const message = `Halo Admin, saya sudah membayar dan ini bukti pembayarannya. Mohon kirimkan Kode Redeem saya.
        
Data Registrasi:
Nama: ${registrationData.nama || "TIDAK ADA DATA"}
Kelas: ${registrationData.kelas || "TIDAK ADA DATA"}
Nomor WA: ${registrationData.nomorWA || "TIDAK ADA DATA"}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    alert("Anda akan dialihkan ke WhatsApp untuk mengirim bukti pembayaran");
  }

  // --- 3. LOGIKA REDEEM KODE ---
  const redeemForm = document.getElementById("redeem-form");
  const redeemInput = document.getElementById("redeem-code");
  const redeemBtn = document.getElementById("redeem-btn");
  const messageOutput = document.getElementById("message-output");

  // JIKA FORMULIR REDEEM DITEMUKAN:
  if (redeemForm) {
    // Validasi input: tombol aktif hanya jika input terisi
    redeemInput.addEventListener("input", function () {
      redeemBtn.disabled = redeemInput.value.trim() === "";
    });

    // Menangani submit formulir
    redeemForm.addEventListener("submit", handleRedeemSubmit);
  }

  // Fungsi utama untuk menangani redeem
  function handleRedeemSubmit(event) {
    event.preventDefault();

    const redeemCode = redeemInput.value.trim();

    // Memanggil fungsi verifikasi
    verifyRedeemCode(redeemCode);
  }

  // Fungsi untuk verifikasi kode redeem (SIMULASI - akan diganti API)
  function verifyRedeemCode(code) {
    // Simulasi loading
    redeemBtn.disabled = true;
    redeemBtn.textContent = "Memproses...";

    setTimeout(() => {
      if (code === "12345") {
        showMessage("Redeem Berhasil! Nomor Antrian Anda: A05", "success");
      } else {
        showMessage("Kode Redeem tidak valid. Mohon hubungi admin.", "error");
      }

      // Reset tombol
      redeemBtn.disabled = false;
      redeemBtn.textContent = "REDEEM";
    }, 1000);
  }

  // Fungsi untuk menampilkan pesan
  function showMessage(message, type) {
    messageOutput.textContent = message;
    messageOutput.className = "message-output"; // Reset kelas

    if (type === "success") {
      messageOutput.classList.add("success-message");
    } else if (type === "error") {
      messageOutput.classList.add("error-message");
    }
  }
});
