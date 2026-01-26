# EEG Tahlili va AI Diagnostikasi - Loyiha Prompti

**Rol:** Senior AI Engineer & Medical Software Architect
**Vazifa:** Quyidagi texnik talablar va funksionallikka ega bo'lgan "EEG Tahlili" (Elektroentsefalogramma) loyihasini noldan ishlab chiqish yoki mavjud tizimga integratsiya qilish uchun arxitektura va kod bazasini yaratish.

---

## 1. Loyiha Maqsadi
Foydalanuvchilarga (shifokorlar va neyro-mutaxassislar) EEG ma'lumotlarini yuklash, vizualizatsiya qilish va Sun'iy Intellekt yordamida avtomatik tashxis qo'yish imkonini beruvchi web-platforma yaratish.

## 2. Asosiy Funktsionallik (Talablar)

### A. Miya to'lqinlari tahlili (Brainwave Analysis)
- **Vizualizatsiya:** Ko'p kanalli (16/32/64 kanal) EEG signallarini vaqt shkalasi bo'yicha chizish (Canvas/WebGL yoki D3.js yordamida).
- **Filtrlash:** Shovqinlarni (artifacts) olib tashlash va chastota diapazonlarini ajratish:
  - Delta (0.5-4 Hz)
  - Theta (4-8 Hz)
  - Alpha (8-13 Hz)
  - Beta (13-30 Hz)
  - Gamma (>30 Hz)
- **Topografik Xarita:** Bosh miya faolligini 2D/3D "Heatmap" ko'rinishida aks ettirish.

### B. Tutqanoq aniqlash (Seizure Detection)
- **AI Modeli:** CNN yoki LSTM tarmog'i yordamida epileptik xurujlarni (epileptic spikes/seizures) aniqlash.
- **Ogohlantirish tizimi:** Agar xuruj ehtimolligi yuqori bo'lsa (masalan >85%), vaqt shkalasida o'sha joyni qizil rang bilan belgilash va shifokorga "Alert" ko'rsatish.
- **Vaqt belgilari:** Xuruj boshlanish va tugash vaqtlarini aniq ko'rsatish.

### C. Uyqu tahlili (Sleep Analysis)
- **Gipnogramma (Hypnogram):** Uyqu bosqichlarini avtomatik tasniflash (W - Uyg'oq, REM, N1, N2, N3).
- **Sifat metrikalari:** Uyqu samaradorligi, uyg'onishlar soni va umumiy uyqu vaqti bo'yicha hisobot.

---

## 3. Texnik Stek (Tavsiya etilgan)

### Frontend
- **Framework:** Next.js (React)
- **Vizualizatsiya:** Chart.js, Recharts yoki maxsus WebGL kutubxonalari (masalan, `eeg-viewer-web`).
- **UI:** Tailwind CSS + Shadcn UI (Med-Taxlil dizayn tizimiga mos).

### Backend & AI
- **Til:** Python (FastAPI yoki Django).
- **EEG kutubxonalari:** MNE-Python (oltin standart), PyEEG.
- **AI Framework:** PyTorch yoki TensorFlow.
- **Ma'lumotlar:** `.edf`, `.bdf` (European Data Format) fayllarini o'qish imkoniyati.

---

## 4. Bosqichma-bosqich Ijr Prompti (Yordamchi AI uchun)

> **Agar siz ushbu loyihani boshlayotgan bo'lsangiz, quyidagi promptdan foydalaning:**

```markdown
Men "Med-Taxlil EEG" nomli yangi modul yaratmoqchiman. Bu modul shifokorlarga bemorlarning EEG fayllarini (.edf formatda) yuklash va tahlil qilish imkonini beradi.

**Quyidagi komponentlarni yaratib ber:**

1.  **EDF Upload Component:** Katta hajmdagi fayllarni yuklash uchun (Drag & Drop).
2.  **EEG Viewer:** Yuklangan fayl ma'lumotlarini o'qib, 19 ta kanalni (Fp1, Fp2, F3, F4 va h.k.) vaqt o'qi bo'yicha harakatlanuvchi grafik sifatida chizib beruvchi React komponenti. Zoom va Scroll funksiyalari bo'lsin.
3.  **Analysis Dashboard:** Viewer ostida 3 ta panel bo'lsin:
    -   *Spektral Tahlil:* Har bir to'lqin (Alpha, Beta...) ulushini ko'rsatuvchi Pie Chart.
    -   *AI Xulosasi:* "Epileptik faollik aniqlanmadi" yoki "Soat 00:15:30 da shubhali faollik" kabi matnli xulosa.
    -   *Uyqu Bosqichlari:* Agar fayl uyqu ma'lumotlarini o'z ichiga olsa, oddiy gipnogramma chizig'i.
4.  **Dizayn:** Zamonaviy, toza, tibbiy ko'k va yashil ranglardan (Tailwind) foydalaning.
```

---

## 5. Kutilayotgan Natija (Mockup Tavsifi)
Ekranning yuqori qismida boshqaruv paneli (Play/Pause, Tezlik x1/x2, Filtrlarni yoqish).
Markazda qora fonli EEG signallari oqimi (Matrix uslubiga o'xshash, lekin tibbiy aniqlikda).
O'ng tomonda "AI Assistant" paneli - u yerda real vaqtda tahlil natijalari chiqib turadi.
Pastki qismda butun yozuvning miniatyurasi (timeline navigator).
