
const nomorWhatsApp = "6281234567890"; // Ganti dengan nomor tokomu

const produk = [
    {
        id: 1,
        nama: "Kaos Casual",
        kategori: "fashion",
        harga: 75000,
        deskripsi: "Kaos nyaman untuk aktivitas sehari-hari.",
        gambar: "https://ibb.co.com/TM7nbk4Z"
    },
    {
        id: 2,
        nama: "Headphone Wireless",
        kategori: "elektronik",
        harga: 150000,
        deskripsi: "Nikmati musik dengan suara yang jernih.",
        gambar: "https://ibb.co.com/hJWLNjhK"
    },
    {
        id: 3,
        nama: "Pisang ",
        kategori: "Makanam",
        harga: 7000,
        deskripsi: "Sepatu stylish untuk menemani harimu.",
        gambar: "https://ibb.co.com/TM7nbk4Z"
    },
    
];

let keranjang = [];

function formatRupiah(harga) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(harga);
}

function tampilkanProduk() {
    const daftar = document.getElementById("daftar-produk");
    const kataKunci = document
        .getElementById("pencarian")
        .value.toLowerCase();

    const kategori = document.getElementById("kategori").value;

    const hasil = produk.filter(item => {
        const cocokNama = item.nama.toLowerCase().includes(kataKunci);
        const cocokKategori =
            kategori === "semua" || item.kategori === kategori;

        return cocokNama && cocokKategori;
    });

    if (hasil.length === 0) {
        daftar.innerHTML = `
            <p class="empty-message">
                Produk tidak ditemukan.
            </p>
        `;
        return;
    }

    daftar.innerHTML = hasil.map(item => `
        <article class="product-card">
            <img
                src="${item.gambar}"
                alt="${item.nama}"
                loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Produk';"
            >

            <div class="product-info">
                <span class="category">${item.kategori}</span>
                <h3>${item.nama}</h3>
                <p class="description">${item.deskripsi}</p>
                <p class="price">${formatRupiah(item.harga)}</p>

                <div class="product-actions">
                    <button
                        class="add-button"
                        onclick="tambahKeranjang(${item.id})">
                        + Keranjang
                    </button>

                    <button
                        class="buy-button"
                        onclick="beliProduk(${item.id})">
                        Beli
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function tambahKeranjang(id) {
    const item = produk.find(p => p.id === id);
    const ada = keranjang.find(p => p.id === id);

    if (ada) {
        ada.jumlah++;
    } else {
        keranjang.push({
            ...item,
            jumlah: 1
        });
    }

    updateKeranjang();
    alert(item.nama + " berhasil ditambahkan ke keranjang!");
}

function updateKeranjang() {
    const jumlah = keranjang.reduce(
        (total, item) => total + item.jumlah, 0
    );

    document.getElementById("jumlah-keranjang").textContent = jumlah;
}

function lihatKeranjang() {
    if (keranjang.length === 0) {
        alert("Keranjang kamu masih kosong.");
        return;
    }

    const daftarBelanja = keranjang.map(item =>
        `${item.nama} x${item.jumlah} = ${formatRupiah(item.harga * item.jumlah)}`
    ).join("\n");

    const total = keranjang.reduce(
        (sum, item) => sum + item.harga * item.jumlah, 0
    );

    const pesan =
        "Daftar Belanja:\n\n" +
        daftarBelanja +
        "\n\nTotal: " + formatRupiah(total) +
        "\n\nKirim pesanan ke WhatsApp?";

    if (confirm(pesan)) {
        const pesanWA =
            "Halo, saya ingin memesan:\n\n" +
            daftarBelanja +
            "\n\nTotal: " + formatRupiah(total);

        bukaWhatsApp(pesanWA);
    }
}

function beliProduk(id) {
    const item = produk.find(p => p.id === id);

    const pesan =
        `Halo, saya ingin membeli ${item.nama}.\n` +
        `Harga: ${formatRupiah(item.harga)}.\n` +
        "Apakah produk ini tersedia?";

    bukaWhatsApp(pesan);
}

function hubungiWhatsApp() {
    bukaWhatsApp("Halo, saya ingin bertanya tentang produk yang tersedia.");
}

function bukaWhatsApp(pesan) {
    const url =
        "https://wa.me08988387332/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(pesan);

    window.open(url, "_blank", "noopener,noreferrer");
}

// Menampilkan produk saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
    tampilkanProduk();
    updateKeranjang();
});