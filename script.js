document.addEventListener("DOMContentLoaded", () => {
  // Tema dizisi
  const renkTemalari = [
    {
      anaArkaPlan: "#ffffff",
      anaYazi: "#000000",
      butonArkaPlan: "#00796b",
      butonYazi: "#ffffff",
    },
    {
      anaArkaPlan: "#282c34",
      anaYazi: "#61dafb",
      butonArkaPlan: "#21a1f1",
      butonYazi: "#ffffff",
    },
    {
      anaArkaPlan: "#fef6e4",
      anaYazi: "#3b2f2f",
      butonArkaPlan: "#d9a441",
      butonYazi: "#3b2f2f",
    },
    {
      anaArkaPlan: "#e0f7fa",
      anaYazi: "#006064",
      butonArkaPlan: "#004d40",
      butonYazi: "#a7ffeb",
    },
    {
      anaArkaPlan: "#fff0f6",
      anaYazi: "#c41d7f",
      butonArkaPlan: "#9f0050",
      butonYazi: "#fff0f6",
    }
  ];

  // localStorage'dan tema kontrolü
  let secilenTema = localStorage.getItem("secilenTema");
  if (secilenTema) {
    secilenTema = JSON.parse(secilenTema);
  } else {
    secilenTema = renkTemalari[Math.floor(Math.random() * renkTemalari.length)];
    localStorage.setItem("secilenTema", JSON.stringify(secilenTema));
  }

  document.documentElement.style.setProperty('--ana-arka-plan', secilenTema.anaArkaPlan);
  document.documentElement.style.setProperty('--ana-yazi-rengi', secilenTema.anaYazi);
  document.documentElement.style.setProperty('--buton-arka-plan', secilenTema.butonArkaPlan);
  document.documentElement.style.setProperty('--buton-yazi-rengi', secilenTema.butonYazi);

  // Bitki Bakımı kısmı
  const bitkiEl = document.getElementById("bitki");
  const durumEl = document.getElementById("durum");
  const sulaBtn = document.getElementById("sulaBtn");

  let suSeviyesi = parseInt(localStorage.getItem("suSeviyesi")) || 5;
  let sonSulamaZamani = parseInt(localStorage.getItem("sonSulamaZamani")) || Date.now();

  const MILLISEKUNDE_BIR_GUN = 1000 * 60 * 60 * 24;

  function guncelleDurum() {
    const simdi = Date.now();
    const fark = simdi - sonSulamaZamani;
    const gunFarki = Math.floor(fark / MILLISEKUNDE_BIR_GUN);

    suSeviyesi = Math.max(0, 5 - gunFarki);
    localStorage.setItem("suSeviyesi", suSeviyesi);

    if (suSeviyesi >= 4) {
      bitkiEl.textContent = "🌵"; // Sağlıklı kaktüs
      durumEl.textContent = "Durum: Sağlıklı ve mutlu 🌞";
      bitkiEl.style.transform = "scale(1)";
    } else if (suSeviyesi >= 2) {
      bitkiEl.textContent = "🌿"; // Orta seviyede
      durumEl.textContent = "Durum: Susuz kaldı, biraz sulamaya ihtiyacı var 💧";
      bitkiEl.style.transform = "scale(0.9)";
    } else if (suSeviyesi >= 1) {
      bitkiEl.textContent = "🍂"; // Zayıflamış, solgun yapraklar
      durumEl.textContent = "Durum: Çok susuz, acilen su ver! 🚨";
      bitkiEl.style.transform = "scale(0.8)";
    } else {
      bitkiEl.textContent = "💀"; // Bitki öldü 😢
      durumEl.textContent = "Durum: Bitkin soldu... 😞";
      bitkiEl.style.transform = "scale(0.7)";
    }
  }

  sulaBtn.addEventListener("click", () => {
    suSeviyesi = 5;
    sonSulamaZamani = Date.now();
    localStorage.setItem("suSeviyesi", suSeviyesi);
    localStorage.setItem("sonSulamaZamani", sonSulamaZamani);
    guncelleDurum();
    alert("Bitki sulandı! 🌊");
  });

  guncelleDurum();
});
