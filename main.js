import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm9HdJ92vSLrKRclI6Z2J4bmvlFgR4AuU",
  authDomain: "mang-yana.firebaseapp.com",
  projectId: "mang-yana",
  storageBucket: "mang-yana.appspot.com",
  messagingSenderId: "1094982396668",
  appId: "1:1094982396668:web:2d103526ab40a59efc0579",
  measurementId: "G-MF48P7VG5P"
};

// ambil data untuk absensi
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absensi");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggal: dok.data().tanggal,
      nis: dok.data().nis,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      noTlpn: dok.data().noTlpn,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,

    });
  });



  return hasil;
}

// ambil data untuk pembeli
export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      noTlpn: dok.data().noTlpn,
    });
  });



  return hasil;
}

// ambil data untuk penjual
export async function ambilDaftarPenjual() {
  const refDokumen = collection(db, "penjual");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      gmail: dok.data().gmail,
      noTlpn: dok.data().noTlpn,
    });
  });



  return hasil;
}

// ambil data untuk produk
export async function ambilDaftarProduk() {
  const refDokumen = collection(db, "produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
      stok: dok.data().stok,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahAbsensi(tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi'), {
      tanggal: tanggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn,
      kelas: kelas,
      keterangan: keterangan
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "absensi", docId));
}

export async function ubahAbsensi(docId, tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  await updateDoc(doc(db, "absensi", docId), {
    tanggal: tanggal,
    nis: nis,
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn,
    kelas: kelas,
    keterangan: keterangan
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "absensi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

// fungsi untuk pembeli

// fungsi untuk tambah data pembeli
export async function tambahPembeli(nama, alamat, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'pembeli'), {
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
  }
}

// fungsi untuk hapus pembeli
export async function hapusPembeli(docId) {
  await deleteDoc(doc(db, "pembeli", docId));
}

// fungsi untuk ubah data
export async function ubahPembeli(docId, nama, alamat, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

// fungsi penjual

//fungsi untuk menambahkan data penjual
export async function tambahPenjual(nama, alamat, gmail, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'penjual'), {
      nama: nama,
      alamat: alamat,
      gmail: gmail,
      noTlpn: noTlpn
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
  }
}
//fungsi untuk hapus data penjual
export async function hapusPenjual(docId) {
  await deleteDoc(doc(db, "penjual", docId));
}
//fungsi untuk ubah data penjual
export async function ubahPenjual(docId, nama, alamat, gmail, noTlpn) {
  await updateDoc(doc(db, "penjual", docId), {
    nama: nama,
    alamat: alamat,
    gmail: gmail,
    noTlpn: noTlpn
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilPenjual(docId) {
  const docRef = await doc(db, "penjual", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

// fungsi produk

// fungsi tambah produk
export async function tambahProduk(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'), {
      nama: nama,
      harga: harga,
      stok: stok
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
  }
}

// fungsi hapus produk
export async function hapusProduk(docId) {
  await deleteDoc(doc(db, "produk", docId));
}