// script.js

const jadwal = {
  "Senin": [
    { jam: "06:30 - 08:30", mapel: "PST", guru: "Bu Nurhanan Afifah, S.Pd.", foto: "nurhanan.jpg" },
    { jam: "08:30 - 10:30", mapel: "Inggris", guru: "Mrs. Zian Muzakkiyah Kosman, S.Pd, M.Pd.", foto: "zian.jpg" },
    { jam: "10:30 - 12:00", mapel: "PWB", guru: "Pak Ahmad Jumadi, S.Kom.", foto: "jumadi.jpg" },
    { jam: "12:45 - 15:00", mapel: "PWB", guru: "Pak Ahmad Jumadi, S.Kom.", foto: "jumadi.jpg" }
  ],
  "Selasa": [
    { jam: "06:30 - 09:30", mapel: "PBT", guru: "Bu Dhian Nur Rahayu, ST, M.Kom.", foto: "dhian.jpg" },
    { jam: "09:30 - 10:30", mapel: "PAI", guru: "Bu Hani Siti Nuraeni, S.Pd.", foto: "hani.jpg" },
    { jam: "10:30 - 12:00", mapel: "INDONESIA", guru: "Pak Drs. Deden Hamdani, M.M.", foto: "deden.jpg" },
    { jam: "12:45 - 15:00", mapel: "INDONESIA", guru: "Pak Drs. Deden Hamdani, M.M.", foto: "deden.jpg" }
  ],
  "Rabu": [
    { jam: "06:30 - 08:45", mapel: "PKK", guru: "Pak Gunawan Busyaeri, S.Pd.", foto: "gunawan.jpg" },
    { jam: "09:00 - 10:30", mapel: "PKK", guru: "Pak Gunawan Busyaeri, S.Pd.", foto: "gunawan.jpg" },
    { jam: "10:30 - 12:00", mapel: "PPB", guru: "Pak Yusuf Effendy, S.T.", foto: "yusuf.jpg" },
    { jam: "12:45 - 15:00", mapel: "PPB", guru: "Pak Yusuf Effendy, S.T.", foto: "yusuf.jpg" }
  ],
  "Kamis": [
    { jam: "06:30 - 08:30", mapel: "PST", guru: "Bu Nurhanan Afifah, S.Pd.", foto: "nurhanan.jpg" },
    { jam: "08:30 - 10:30", mapel: "Inggris", guru: "Mrs. Zian Muzakkiyah Kosman, S.Pd, M.Pd.", foto: "zian.jpg" },
    { jam: "10:30 - 12:00", mapel: "PPS", guru: "Bu Dewi Lestari Nengsih, S.IP.", foto: "dewi.jpg" },
    { jam: "12:45 - 13:45", mapel: "PAI", guru: "Bu Hani Siti Nuraeni, S.Pd.", foto: "hani.jpg" },
    { jam: "13:45 - 15:00", mapel: "PFS", guru: "Pak Darwis Prasetyo, S.Pd.", foto: "darwis.jpg" }
  ],
  "Jumat": [
    { jam: "06:30 - 09:30", mapel: "BSD", guru: "Bu Indria Listiani Ningrum, S.T.", foto: "indria.jpg" },
    { jam: "09:30 - 12:00", mapel: "MTK", guru: "Pak Acun, S.Pd.", foto: "acun.jpg" }
  ]
};

const ISTIRAHAT1 = { start: "08:45", end: "09:00" };
const ISTIRAHAT2 = { start: "12:00", end: "12:45" };
const PENANGGUNG_JAWAB = { mapel: "Penanggung Jawab LAB", guru: "Pak Yusuf Effendy, S.T.", ruang: "LAB 1", foto: "yusuf.jpg" };

function convertToMinutes(time) {
  const [h, m] = time.split(":".trim());
  return parseInt(h) * 60 + parseInt(m);
}

function isInTimeRange(start, end, now) {
  return convertToMinutes(now) >= convertToMinutes(start) && convertToMinutes(now) < convertToMinutes(end);
}

function tampilkanJadwalSekarang() {
  const now = new Date();
  const hari = now.toLocaleDateString('id-ID', { weekday: 'long' });
  const jamSekarang = now.toTimeString().substring(0, 5);

  document.getElementById("now").textContent = `Sekarang: ${jamSekarang}`;

  if (isInTimeRange(ISTIRAHAT1.start, ISTIRAHAT1.end, jamSekarang) || isInTimeRange(ISTIRAHAT2.start, ISTIRAHAT2.end, jamSekarang)) {
    tampilkan(PENANGGUNG_JAWAB, `${ISTIRAHAT1.start} - ${ISTIRAHAT1.end}`);
    return;
  }

  const jadwalHariIni = jadwal[hari];
  if (!jadwalHariIni) {
    tampilkan(PENANGGUNG_JAWAB, "Diluar Hari Sekolah");
    return;
  }

  for (const entry of jadwalHariIni) {
    const [start, end] = entry.jam.split(" - ");
    if (isInTimeRange(start, end, jamSekarang)) {
      tampilkan(entry, entry.jam);
      return;
    }
  }

  tampilkan(PENANGGUNG_JAWAB, "Diluar Jam Pelajaran");
}

function tampilkan(data, jam) {
  document.getElementById("guru").textContent = data.guru;
  document.getElementById("mapel").textContent = data.mapel;
  document.getElementById("jam").textContent = jam;
  document.getElementById("ruang").textContent = data.ruang || "LAB 1";
  document.getElementById("foto").src = `images/${data.foto}`;
}

tampilkanJadwalSekarang();
setInterval(tampilkanJadwalSekarang, 60000);
