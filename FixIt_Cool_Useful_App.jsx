import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Bike,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Droplets,
  HelpCircle,
  Home,
  Image,
  List,
  MapPin,
  MessageCircle,
  Minus,
  MoreHorizontal,
  Paintbrush,
  Paperclip,
  Phone,
  Plug,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Timer,
  Trash2,
  Upload,
  User,
  Wrench,
  Zap,
} from "lucide-react";

const NAVY = "#08275A";
const ORANGE = "#FF7900";
const BLUE = "#0B3A7A";
const SOFT = "#F6F8FC";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const services = [
  { id: "paint", title: "Pengecatan", category: "Pengecatan", price: 150000, rating: 4.8, eta: "Hari ini", icon: Paintbrush, desc: "Cat ulang, touch up, dan finishing dinding." },
  { id: "wall", title: "Perbaikan Dinding", category: "Perbaikan", price: 200000, rating: 4.9, eta: "2 jam", icon: Wrench, desc: "Retak rambut, dinding lembap, dan plesteran." },
  { id: "roof", title: "Atap Bocor", category: "Perbaikan", price: 250000, rating: 4.7, eta: "Besok", icon: Home, desc: "Pengecekan genteng, dak, talang, dan rembesan." },
  { id: "electric", title: "Perbaikan Listrik", category: "Instalasi", price: 150000, rating: 4.8, eta: "Hari ini", icon: Zap, desc: "Stop kontak, lampu, MCB, dan instalasi ringan." },
  { id: "water", title: "Plumbing", category: "Instalasi", price: 150000, rating: 4.7, eta: "3 jam", icon: Droplets, desc: "Keran bocor, pipa mampet, dan saluran air." },
];

const technicians = [
  { id: "agus", name: "Agus Santoso", area: "Jakarta Selatan", rating: 4.9, jobs: 173, skill: "Dinding & Pengecatan", price: 200000, available: "13:00", avatar: "👨‍🔧" },
  { id: "dedi", name: "Dedi Pratama", area: "Jakarta Barat", rating: 4.8, jobs: 141, skill: "Listrik & Instalasi", price: 180000, available: "15:00", avatar: "🧰" },
  { id: "bima", name: "Bima Wijaya", area: "Tangerang", rating: 4.7, jobs: 98, skill: "Atap & Waterproofing", price: 250000, available: "Besok", avatar: "🏠" },
];

const products = [
  { id: "p1", name: "Cat Elastis Anti Retak", brand: "Aquaproof Elastic", price: 215000, tag: "Best Match" },
  { id: "p2", name: "Cat Dasar Primer", brand: "Nippon Vinilex S100", price: 108000, tag: "Wajib" },
  { id: "p3", name: "Akrilik Sealant", brand: "Silacril 200", price: 72000, tag: "Hemat" },
  { id: "p4", name: "Kuas Cat Premium", brand: "FixPro Tools", price: 45000, tag: "Tools" },
  { id: "p5", name: "Waterproof Coating", brand: "NoDrop", price: 185000, tag: "Bocor" },
];

const articles = [
  { title: "Cara Mencegah Dinding Lembap", minute: 3, type: "Tips Rumah" },
  { title: "Tanda Atap Harus Segera Dicek", minute: 4, type: "Checklist" },
  { title: "Kapan Harus Memanggil Teknisi?", minute: 2, type: "Panduan" },
];

const initialHistory = [
  { title: "Retakan Dinding Ruang Tamu", date: "15 Mei 2025", status: "Selesai", cost: 540000 },
  { title: "Bocor Atap Kamar Mandi", date: "29 Apr 2025", status: "Selesai", cost: 750000 },
  { title: "Noda Lembap di Plafon", date: "15 Apr 2025", status: "Dalam Proses", cost: 300000 },
  { title: "Keramik Lantai Retak", date: "01 Apr 2025", status: "Selesai", cost: 960000 },
];

const menuItems = [
  ["diagnose", Camera, "Diagnosa"],
  ["technician", Wrench, "Teknisi"],
  ["shop", ShoppingCart, "Toko"],
  ["chat", MessageCircle, "Konsultasi"],
  ["history", ClipboardList, "Riwayat"],
  ["tips", List, "Tips"],
];

function Logo({ light = false, compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 100 115" className={`${compact ? "h-10 w-10" : "h-14 w-14"} shrink-0 drop-shadow-sm`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,85 V45 L40,5 L55,20 V10 H75 V40 L95,60 V85 Z" fill={ORANGE} />
        <rect x="12" y="58" width="8" height="8" rx="1" fill="white" />
        <rect x="24" y="58" width="8" height="8" rx="1" fill="white" />
        <rect x="12" y="70" width="8" height="8" rx="1" fill="white" />
        <rect x="24" y="70" width="8" height="8" rx="1" fill="white" />
        <g stroke="white" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" fill="white">
          <circle cx="45" cy="45" r="22" />
          <path d="M35,60 V105 L42,112 L49,103 L55,108 V60 Z" />
        </g>
        <circle cx="45" cy="45" r="20" fill={NAVY} />
        <circle cx="45" cy="40" r="6" fill="white" />
        <path d="M37,60 V103 L42,108 L48,100 L53,104 V60 Z" fill={NAVY} />
      </svg>
      <div className="flex flex-col justify-center">
        <div className={`${compact ? "text-2xl" : "text-[40px]"} font-black tracking-tight leading-none ${light ? "text-white" : "text-[#08275A]"}`}>FixIt</div>
        <div className={`${compact ? "text-[8px]" : "text-[13px]"} mt-1 font-semibold tracking-wide ${light ? "text-white/85" : "text-[#08275A]"}`}>Properti Anda, Solusi Kami</div>
      </div>
    </div>
  );
}

function StatusBar({ dark = false }) {
  return (
    <div className={`flex h-7 items-center justify-between px-5 pt-2 text-[11px] font-bold ${dark ? "text-white" : "text-slate-900"}`}>
      <span>9:41</span>
      <span>⌁ ◔ ▰</span>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto h-[790px] w-[375px] overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(8,39,90,0.22)] ring-8 ring-slate-950/5">
      <div className="absolute left-1/2 top-2 z-30 h-5 w-28 -translate-x-1/2 rounded-full bg-slate-950/90" />
      <div className="h-full overflow-hidden rounded-[34px] bg-white">{children}</div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[24px] border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] ${className}`}>{children}</div>;
}

function Header({ title, back, go, right }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#061F4D] via-[#08275A] to-[#0B3A7A] text-white">
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 left-10 h-36 w-36 rounded-full bg-orange-400/20 blur-2xl" />
      <StatusBar dark />
      <div className="relative grid grid-cols-[42px_1fr_42px] items-center px-4 pb-4 pt-3">
        <button type="button" onClick={back ? () => go("home") : undefined} className="flex h-10 items-center justify-start rounded-full">
          {back ? <ArrowLeft size={21} /> : null}
        </button>
        <h1 className="text-center text-base font-extrabold leading-tight">{title}</h1>
        <div className="flex h-10 items-center justify-end">{right || null}</div>
      </div>
    </div>
  );
}

function BottomNav({ page, go, cartCount }) {
  const items = [
    ["home", Home, "Beranda"],
    ["history", List, "Aktivitas"],
    ["diagnose", Plus, ""],
    ["chat", MessageCircle, "Pesan"],
    ["profile", User, "Akun"],
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-slate-100 bg-white/95 px-3 py-3 text-[10px] font-semibold text-slate-500 backdrop-blur">
      {items.map(([key, Icon, label]) => (
        <button key={key} type="button" onClick={() => go(key)} className={`relative flex min-w-12 flex-col items-center gap-1 transition ${page === key ? "text-[#08275A]" : "hover:text-slate-900"}`}>
          <div className={key === "diagnose" ? "-mt-8 rounded-full bg-[#FF7900] p-3 text-white shadow-xl shadow-orange-300 ring-4 ring-white" : "relative"}>
            <Icon size={key === "diagnose" ? 25 : 19} fill={page === key && key !== "diagnose" ? "currentColor" : "none"} />
            {key === "chat" && cartCount > 0 ? <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#FF7900] text-[9px] text-white">{cartCount}</span> : null}
          </div>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function Layout({ page, go, children, cartCount }) {
  return (
    <PhoneFrame>
      <div className="relative h-full overflow-hidden bg-[#F6F8FC] pb-20">
        <div className="h-full overflow-y-auto pb-5">{children}</div>
        <BottomNav page={page} go={go} cartCount={cartCount} />
      </div>
    </PhoneFrame>
  );
}

function Toast({ message }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-2xl">
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Splash({ go }) {
  return (
    <PhoneFrame>
      <div className="relative h-full overflow-hidden bg-gradient-to-br from-[#061F4D] via-[#08275A] to-[#071C45] p-7 text-white">
        <StatusBar dark />
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#FF7900]/25 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative mt-20">
          <Logo light />
          <div className="mt-16 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
            <Sparkles size={15} /> Smart home repair assistant
          </div>
          <p className="mt-7 max-w-[280px] text-2xl font-black leading-snug">Diagnosa kerusakan rumah, estimasi biaya, dan panggil teknisi dalam satu aplikasi.</p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
            {[["4.8", "Rating"], ["500+", "Teknisi"], ["24/7", "Bantuan"]].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                <b className="block text-lg">{value}</b>
                <span className="text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-7 right-7 space-y-3">
          <button type="button" onClick={() => go("login")} className="w-full rounded-2xl bg-[#FF7900] py-4 text-sm font-extrabold shadow-xl shadow-orange-900/20 transition hover:scale-[1.01]">Mulai Sekarang</button>
          <button type="button" onClick={() => go("home")} className="w-full rounded-2xl border border-white/35 py-4 text-sm font-extrabold text-white">Lewati Dulu</button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Login({ go, setToast }) {
  const [email, setEmail] = useState("wishnu@email.com");
  const [password, setPassword] = useState("12345678");

  const submit = () => {
    if (!email || !password) {
      setToast("Email dan kata sandi wajib diisi.");
      return;
    }
    setToast("Berhasil masuk ke FixIt.");
    go("home");
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white px-7">
        <StatusBar />
        <div className="mt-16 flex justify-center"><Logo /></div>
        <h1 className="mt-12 text-xl font-black text-slate-950">Selamat Datang Kembali 👋</h1>
        <p className="mt-1 text-sm text-slate-500">Masuk untuk melanjutkan perbaikan rumah Anda.</p>
        <div className="mt-7 space-y-4">
          <label className="block text-xs font-bold text-slate-700">Email atau No. HP<input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-4 text-sm font-normal outline-none focus:border-[#08275A]" placeholder="contoh@email.com" /></label>
          <label className="block text-xs font-bold text-slate-700">Kata Sandi<input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-4 text-sm font-normal outline-none focus:border-[#08275A]" placeholder="••••••••" type="password" /></label>
          <button type="button" className="ml-auto block text-xs font-bold text-[#08275A]">Lupa kata sandi?</button>
          <button type="button" onClick={submit} className="w-full rounded-2xl bg-[#FF7900] py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Masuk</button>
        </div>
        <div className="my-7 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />atau masuk dengan<span className="h-px flex-1 bg-slate-200" /></div>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => setToast("Demo: login Google belum dihubungkan.")} className="rounded-xl border border-slate-200 py-3 text-sm font-bold">G Google</button>
          <button type="button" onClick={() => setToast("Demo: login Apple belum dihubungkan.")} className="rounded-xl border border-slate-200 py-3 text-sm font-bold">● Apple</button>
        </div>
        <p className="mt-10 text-center text-sm text-slate-500">Belum punya akun? <button type="button" onClick={() => setToast("Demo daftar akun aktif di versi berikutnya.")} className="font-black text-[#08275A]">Daftar</button></p>
      </div>
    </PhoneFrame>
  );
}

function HomePage({ go, page, cartCount, search, setSearch }) {
  const filtered = services.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase())).slice(0, 3);

  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#061F4D] via-[#08275A] to-[#0A3675] px-5 pb-8 text-white">
        <div className="absolute -right-16 top-16 h-44 w-44 rounded-full bg-orange-400/20 blur-2xl" />
        <StatusBar dark />
        <div className="relative mt-3 flex items-center justify-between">
          <Logo light compact />
          <button type="button" onClick={() => go("profile")} className="relative rounded-full bg-white/10 p-2"><Bell size={21} /> <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF7900]" /></button>
        </div>
        <p className="relative mt-8 text-sm text-white/85">Selamat datang,</p>
        <h1 className="relative text-2xl font-black">Wishnu</h1>
        <div className="relative mt-4 flex rounded-2xl bg-white p-2 shadow-lg shadow-blue-950/10">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 px-3 text-xs text-slate-700 outline-none" placeholder="Apa yang perlu diperbaiki?" />
          <button type="button" onClick={() => go("technician")} className="rounded-xl bg-[#FF7900] p-3 text-white"><Search size={17} /></button>
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-3 text-center text-xs">
          {[["2", "Aktif"], ["85%", "Akurasi"], [cartCount, "Keranjang"]].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <b className="block text-lg">{value}</b>
              <span className="text-white/70">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="-mt-4 space-y-4 rounded-t-[30px] bg-[#F6F8FC] p-4">
        <div className="grid grid-cols-3 gap-3">
          {menuItems.map(([key, Icon, title]) => (
            <button key={key} type="button" onClick={() => go(key)} className="min-h-[92px] rounded-2xl bg-white p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F7FB]"><Icon color={key === "diagnose" ? NAVY : ORANGE} size={20} /></div>
              <b className="mt-2 block text-[11px] leading-tight text-slate-950">{title}</b>
            </button>
          ))}
        </div>

        <Card className="relative overflow-hidden p-4">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-100" />
          <div className="relative max-w-[210px]">
            <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-[10px] font-black text-[#FF7900]"><Timer size={12} /> Respon cepat</div>
            <h2 className="text-base font-black text-[#08275A]">Butuh Bantuan Cepat?</h2>
            <p className="mt-1 text-xs text-slate-500">Hubungi teknisi terdekat dan pantau kedatangannya secara real-time.</p>
            <button type="button" onClick={() => go("technician")} className="mt-3 rounded-xl bg-[#FF7900] px-4 py-2 text-xs font-bold text-white">Cari Teknisi</button>
          </div>
          <Wrench className="absolute bottom-5 right-7" size={58} color={ORANGE} />
        </Card>

        <div>
          <div className="mb-3 flex items-center justify-between"><h2 className="font-black text-[#08275A]">Rekomendasi Layanan</h2><button onClick={() => go("technician")} className="text-xs font-black text-[#FF7900]">Lihat semua</button></div>
          <div className="space-y-3">
            {filtered.map(({ id, title, price, rating, icon: Icon }) => (
              <button key={id} type="button" onClick={() => go("technician")} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50"><Icon color={ORANGE} size={20} /></div>
                <div className="flex-1"><b className="text-sm">{title}</b><p className="text-xs text-slate-500">Mulai {formatRupiah(price)}</p></div>
                <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-black text-[#08275A]">★ {rating}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Stepper({ step }) {
  const steps = ["Unggah", "Analisis", "Solusi"];
  return (
    <div className="flex items-center justify-between px-5 py-4 text-[10px] font-bold text-slate-500">
      {steps.map((label, index) => {
        const active = index + 1 <= step;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center gap-1">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${active ? "border-[#08275A] bg-[#08275A] text-white" : "border-slate-300 bg-white text-slate-500"}`}>{active && index + 1 < step ? <CheckCircle2 size={16} /> : index + 1}</div>
              <span className={active ? "text-[#08275A]" : ""}>{label}</span>
            </div>
            {index < 2 ? <div className="-mx-3 mb-4 h-px w-full bg-slate-300" /> : null}
          </div>
        );
      })}
    </div>
  );
}

function Diagnose({ go, page, cartCount, diagnosis, setDiagnosis, setToast }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setDiagnosis((current) => ({ ...current, fileName: file.name }));
    setPreview(URL.createObjectURL(file));
    setToast("Foto berhasil diunggah untuk demo diagnosa.");
  };

  const next = () => {
    if (!diagnosis.description.trim()) {
      setToast("Tulis deskripsi masalah dulu ya.");
      return;
    }
    go("analysis");
  };

  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Diagnosa Kerusakan" back go={go} />
      <Stepper step={1} />
      <div className="space-y-4 px-5">
        <div><h2 className="font-black text-slate-950">Unggah Foto / Video</h2><p className="mt-1 text-xs text-slate-500">Foto yang jelas membantu sistem memberi rekomendasi lebih akurat.</p></div>
        <label className="block cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-white p-5 text-center transition hover:border-[#FF7900]">
          <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
          {preview ? (
            <img src={preview} alt="Preview kerusakan" className="h-44 w-full rounded-2xl object-cover" />
          ) : (
            <div className="py-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F7FB]"><Upload size={28} color={NAVY} /></div>
              <b className="mt-4 block text-sm text-[#08275A]">Klik untuk unggah file</b>
              <p className="text-xs text-slate-500">JPG, PNG, atau video singkat</p>
            </div>
          )}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <select value={diagnosis.room} onChange={(e) => setDiagnosis((current) => ({ ...current, room: e.target.value }))} className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-700 outline-none">
            <option>Ruang Tamu</option><option>Kamar Mandi</option><option>Dapur</option><option>Kamar Tidur</option><option>Area Luar</option>
          </select>
          <select value={diagnosis.type} onChange={(e) => setDiagnosis((current) => ({ ...current, type: e.target.value }))} className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-700 outline-none">
            <option>Dinding Retak</option><option>Atap Bocor</option><option>Listrik</option><option>Plumbing</option><option>Cat Mengelupas</option>
          </select>
        </div>
        <label className="block text-sm font-black text-slate-950">Deskripsikan Masalah<textarea value={diagnosis.description} onChange={(e) => setDiagnosis((current) => ({ ...current, description: e.target.value }))} className="mt-3 h-28 w-full rounded-2xl border border-slate-200 p-4 text-sm font-normal outline-none focus:border-[#08275A]" placeholder="Contoh: Dinding lembap di sudut ruang tamu setelah hujan." /></label>
        <button type="button" onClick={next} className="w-full rounded-2xl bg-[#FF7900] py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Analisis Sekarang</button>
      </div>
    </Layout>
  );
}

function Analysis({ go, page, cartCount, diagnosis }) {
  const score = diagnosis.type.includes("Listrik") ? 72 : diagnosis.type.includes("Atap") ? 78 : 85;
  const severity = score >= 82 ? "Ringan" : score >= 75 ? "Sedang" : "Perlu Dicek";
  const cause = diagnosis.type.includes("Atap") ? "Kemungkinan terdapat celah pada sambungan atap atau talang sehingga air merembes." : diagnosis.type.includes("Listrik") ? "Perlu pengecekan instalasi untuk memastikan tidak ada kabel longgar atau beban berlebih." : "Retakan non-struktur akibat penyusutan cat/plesteran, lembap, atau perubahan suhu.";

  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Hasil Analisis" back go={go} />
      <Stepper step={2} />
      <div className="space-y-4 px-5">
        <Card className="overflow-hidden p-4">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold text-slate-500">Tingkat Kerusakan</p><h2 className="mt-1 text-2xl font-black text-[#08275A]">{severity}</h2><p className="mt-1 text-xs text-slate-500">Area: {diagnosis.room} • Tipe: {diagnosis.type}</p></div>
            <div className="grid h-20 w-20 place-items-center rounded-full bg-orange-50 text-xl font-black text-[#FF7900]">{score}%</div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#FF7900]" style={{ width: `${score}%` }} /></div>
        </Card>

        <Card className="p-4"><h2 className="font-black text-slate-950">Analisis Singkat</h2><p className="mt-2 text-xs leading-relaxed text-slate-600">{cause}</p><div className="mt-3 rounded-2xl bg-blue-50 p-3 text-xs font-semibold text-[#08275A]">Catatan: hasil ini merupakan simulasi prototype dan tetap perlu validasi teknisi.</div></Card>

        <Card className="p-4"><h2 className="font-black text-slate-950">Data dari Pengguna</h2><div className="mt-3 space-y-2 text-xs"><div className="flex justify-between"><span className="text-slate-500">File</span><b>{diagnosis.fileName || "Belum ada file"}</b></div><div className="flex justify-between"><span className="text-slate-500">Lokasi</span><b>{diagnosis.room}</b></div><div className="flex justify-between"><span className="text-slate-500">Masalah</span><b>{diagnosis.type}</b></div></div></Card>

        <button type="button" onClick={() => go("recommendation")} className="w-full rounded-2xl bg-[#FF7900] py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Lihat Solusi & Estimasi</button>
      </div>
    </Layout>
  );
}

function Recommendation({ go, page, cartCount, addToCart, diagnosis }) {
  const repairSteps = diagnosis.type.includes("Atap")
    ? ["Periksa titik rembesan", "Bersihkan area sambungan", "Aplikasikan waterproof coating", "Lakukan tes siram setelah kering"]
    : ["Bersihkan area retakan", "Aplikasikan primer", "Gunakan sealant atau cat elastis", "Finishing dua lapis"];
  const total = 540000 + cartCount * 45000;

  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Rekomendasi Solusi" back go={go} />
      <Stepper step={3} />
      <div className="space-y-4 px-5 pb-24">
        <div className="rounded-2xl bg-orange-50 p-3 text-xs font-extrabold text-[#E86E00]"><ShieldCheck className="mr-1 inline" size={16} /> Rekomendasi awal berdasarkan input kerusakan.</div>
        <Card className="p-4"><h2 className="font-black text-slate-950">Langkah Perbaikan</h2><ol className="mt-2 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-slate-600">{repairSteps.map((step) => <li key={step}>{step}</li>)}</ol></Card>
        <div><h2 className="mb-3 font-black text-slate-950">Produk yang Disarankan</h2>{products.slice(0, 3).map((item) => <div key={item.id} className="mb-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"><div className="grid h-14 w-14 place-items-center rounded-xl bg-slate-100 text-xl">🧴</div><div className="flex-1"><div className="flex items-center gap-2"><b className="text-sm">{item.name}</b><span className="rounded-full bg-orange-50 px-2 py-0.5 text-[9px] font-black text-[#FF7900]">{item.tag}</span></div><p className="text-xs text-slate-500">{item.brand}</p><p className="text-xs font-bold text-slate-700">{formatRupiah(item.price)}</p></div><button type="button" onClick={() => addToCart(item)} className="rounded-full border border-orange-200 p-2 text-[#FF7900]"><Plus size={18} /></button></div>)}</div>
      </div>
      <div className="absolute bottom-20 left-0 right-0 grid grid-cols-[1fr_1.1fr] bg-[#08275A] p-4 text-white"><div><p className="text-[10px] text-white/70">Total Estimasi</p><b>{formatRupiah(total)}</b></div><button type="button" onClick={() => go("technician")} className="rounded-xl bg-[#FF7900] text-sm font-extrabold">Panggil Teknisi</button></div>
    </Layout>
  );
}

function Technician({ go, page, cartCount, selectedService, setSelectedService, favoriteTechs, toggleFavorite }) {
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const filters = [[MoreHorizontal, "Semua"], [Paintbrush, "Pengecatan"], [Bike, "Perbaikan"], [Plug, "Instalasi"]];
  const filteredServices = services.filter((service) => (category === "Semua" || service.category === category) && service.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Layanan Teknisi" back go={go} />
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3"><Search size={17} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 text-xs outline-none" placeholder="Cari layanan teknisi..." /></div>
        <div className="grid grid-cols-4 gap-2">{filters.map(([Icon, label]) => <button key={label} type="button" onClick={() => setCategory(label)} className={`rounded-2xl p-2 text-center shadow-sm ${category === label ? "bg-[#08275A] text-white" : "bg-white text-slate-600"}`}><Icon className="mx-auto" size={18} color={category === label ? "white" : "#64748B"} /><span className="mt-1 block text-[9px] font-bold">{label}</span></button>)}</div>
        <h2 className="font-black text-[#08275A]">Layanan Populer</h2>
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return <button key={service.id} type="button" onClick={() => { setSelectedService(service); go("techDetail"); }} className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm ${selectedService?.id === service.id ? "border border-[#FF7900] bg-orange-50" : "bg-white"}`}><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F7FB]"><Icon color={ORANGE} size={20} /></div><div className="flex-1"><b className="text-sm">{service.title}</b><p className="text-xs text-slate-500">Mulai {formatRupiah(service.price)} • {service.eta}</p></div><ChevronRight size={16} /></button>;
        })}
        <h2 className="pt-2 font-black text-[#08275A]">Teknisi Terdekat</h2>
        {technicians.map((tech) => (
          <Card key={tech.id} className="p-4">
            <div className="flex gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-xl">{tech.avatar}</div><div className="flex-1"><div className="flex items-center justify-between"><b>{tech.name}</b><button onClick={() => toggleFavorite(tech.id)} className={favoriteTechs.includes(tech.id) ? "text-[#FF7900]" : "text-slate-300"}><Star size={17} fill="currentColor" /></button></div><p className="text-xs text-slate-500">{tech.skill} • {tech.area}</p><p className="mt-1 text-xs font-bold text-[#FF7900]">★ {tech.rating} ({tech.jobs} ulasan) • tersedia {tech.available}</p></div></div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

function TechDetail({ go, page, cartCount, selectedService, selectedTech, setSelectedTech }) {
  const tech = selectedTech || technicians[0];
  const service = selectedService || services[1];
  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Detail Teknisi" back go={go} />
      <div className="space-y-4 p-5">
        <Card className="p-4"><div className="flex gap-4"><div className="grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-2xl">{tech.avatar}</div><div><h2 className="text-lg font-black">{tech.name}</h2><p className="text-xs font-bold text-[#FF7900]">★ {tech.rating} <span className="text-slate-400">({tech.jobs} ulasan)</span></p><p className="mt-1 text-xs text-slate-500">{tech.skill} • {tech.area}</p></div></div></Card>
        <Card className="p-4"><h2 className="font-black">Layanan Dipilih</h2><p className="mt-2 text-sm font-bold text-[#08275A]">{service.title}</p><p className="mt-1 text-xs leading-relaxed text-slate-600">{service.desc}</p><div className="mt-3 rounded-2xl bg-orange-50 p-3 text-xs font-black text-[#FF7900]">Mulai dari {formatRupiah(service.price)}</div></Card>
        <Card className="p-4"><h2 className="font-black">Pilih Teknisi Lain</h2><div className="mt-3 space-y-2">{technicians.map((item) => <button key={item.id} onClick={() => setSelectedTech(item)} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ${tech.id === item.id ? "bg-blue-50" : "bg-slate-50"}`}><span className="text-xl">{item.avatar}</span><div className="flex-1"><b className="text-sm">{item.name}</b><p className="text-xs text-slate-500">★ {item.rating} • {item.available}</p></div></button>)}</div></Card>
        <button type="button" onClick={() => go("schedule")} className="w-full rounded-2xl bg-[#FF7900] py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Pilih Jadwal</button>
      </div>
    </Layout>
  );
}

function Schedule({ go, page, cartCount, selectedService, selectedTech, booking, setBooking, setToast }) {
  const days = Array.from({ length: 14 }, (_, i) => i + 12);
  const times = ["08:00", "10:00", "13:00", "15:00", "17:00"];
  const tech = selectedTech || technicians[0];
  const service = selectedService || services[1];
  const confirm = () => {
    setToast("Pesanan berhasil dibuat. Teknisi sedang diproses.");
    go("tracking");
  };

  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Jadwal & Konfirmasi" back go={go} />
      <div className="space-y-4 p-5">
        <Card className="p-4"><h2 className="text-center font-black text-[#08275A]">Mei 2026</h2><div className="mt-4 grid grid-cols-7 gap-2 text-center text-[11px]"><span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>{days.map((day) => <button key={day} type="button" onClick={() => setBooking((current) => ({ ...current, day }))} className={`rounded-full py-2 font-bold ${booking.day === day ? "bg-[#FF7900] text-white" : "text-slate-700"}`}>{day}</button>)}</div></Card>
        <div><h2 className="mb-3 font-black text-slate-950">Pilih Waktu</h2><div className="flex gap-2">{times.map((time) => <button key={time} type="button" onClick={() => setBooking((current) => ({ ...current, time }))} className={`flex-1 rounded-xl border py-2 text-xs font-bold ${booking.time === time ? "border-[#FF7900] bg-[#FF7900] text-white" : "border-slate-200 bg-white"}`}>{time}</button>)}</div></div>
        <Card className="p-4 text-xs"><h2 className="mb-3 font-black text-[#08275A]">Ringkasan Pesanan</h2>{[["Layanan", service.title], ["Teknisi", tech.name], ["Tanggal", `${booking.day} Mei 2026`], ["Waktu", `${booking.time} WIB`], ["Estimasi Durasi", "2 jam"]].map(([a, b]) => <div key={a} className="mb-2 flex justify-between gap-4"><span className="text-slate-500">{a}</span><b className="text-right text-slate-900">{b}</b></div>)}<div className="mt-3 flex justify-between border-t pt-3"><span className="font-bold text-slate-500">Total Estimasi</span><b className="text-[#08275A]">{formatRupiah(service.price + 340000)}</b></div></Card>
        <button type="button" onClick={confirm} className="w-full rounded-2xl bg-[#FF7900] py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Konfirmasi Pesanan</button>
      </div>
    </Layout>
  );
}

function Tracking({ go, page, cartCount, selectedTech }) {
  const tech = selectedTech || technicians[0];
  const steps = ["Pesanan diterima", "Teknisi berangkat", "Hampir sampai", "Pekerjaan dimulai"];
  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Tracking Teknisi" back go={go} />
      <div className="space-y-4 p-5">
        <Card className="p-4 text-center"><p className="text-xs font-bold text-[#08275A]">Teknisi Dalam Perjalanan</p><p className="mt-3 text-xs text-slate-500">Estimasi tiba</p><h2 className="text-2xl font-black text-[#08275A]">15 Menit Lagi</h2><p className="text-xs text-slate-500">Pukul 10.26 WIB</p><div className="relative mt-5 flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-slate-100"><div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(8,39,90,.04)_25%,rgba(8,39,90,.04)_50%,transparent_50%,transparent_75%,rgba(8,39,90,.04)_75%)] bg-[length:32px_32px]" /><MapPin size={76} color={ORANGE} /></div></Card>
        <Card className="flex items-center gap-3 p-4"><div className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-xl">{tech.avatar}</div><div className="flex-1"><b>{tech.name}</b><p className="text-xs text-[#FF7900]">★ {tech.rating} • AB 1234 CD</p><p className="text-xs text-slate-500">Honda Beat • Hitam</p></div></Card>
        <Card className="p-4"><h2 className="mb-3 font-black text-[#08275A]">Progress</h2><div className="space-y-3">{steps.map((step, index) => <div key={step} className="flex items-center gap-3 text-xs"><CheckCircle2 size={18} className={index < 3 ? "text-[#FF7900]" : "text-slate-300"} /><span className={index < 3 ? "font-bold text-slate-800" : "text-slate-400"}>{step}</span></div>)}</div></Card>
        <div className="grid grid-cols-2 gap-3"><button type="button" className="rounded-2xl border border-slate-200 bg-white py-4 text-sm font-extrabold text-[#08275A]"><Phone className="mr-1 inline" size={17} />Hubungi</button><button type="button" onClick={() => go("chat")} className="rounded-2xl border border-slate-200 bg-white py-4 text-sm font-extrabold text-[#08275A]"><MessageCircle className="mr-1 inline" size={17} />Chat</button></div>
      </div>
    </Layout>
  );
}

function Chat({ go, page, cartCount, messages, setMessages, setToast }) {
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    setMessages((current) => [...current, { from: "me", text, time: "10:29" }]);
    setText("");
    setTimeout(() => setMessages((current) => [...current, { from: "tech", text: "Siap, saya cek ya.", time: "10:30" }]), 350);
  };

  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Chat Teknisi" back go={go} right={<Bell size={18} />} />
      <div className="flex min-h-[650px] flex-col justify-between p-5">
        <div className="space-y-4 text-xs">
          {messages.map((message, index) => <div key={`${message.time}-${index}`} className={`${message.from === "me" ? "ml-auto bg-blue-100 text-[#08275A]" : "bg-white text-slate-700"} max-w-[230px] rounded-2xl p-3 shadow-sm`}>{message.text}<span className="mt-1 block text-right text-[10px] opacity-50">{message.time}{message.from === "me" ? " ✓✓" : ""}</span></div>)}
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm"><button type="button" onClick={() => setToast("Demo: lampiran belum dikirim ke server.")} className="p-2 text-slate-400"><Paperclip size={18} /></button><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="flex-1 text-sm outline-none" placeholder="Ketik pesan..." /><button type="button" onClick={send} className="rounded-xl bg-[#08275A] p-3 text-white"><Send size={17} /></button></div>
      </div>
    </Layout>
  );
}

function History({ go, page, cartCount }) {
  const [filter, setFilter] = useState("Semua");
  const list = initialHistory.filter((item) => filter === "Semua" || item.status === filter);
  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Riwayat Diagnosa" back go={go} />
      <div className="px-5 py-4"><div className="mb-4 grid grid-cols-3 rounded-2xl bg-white p-1 text-xs font-bold">{["Semua", "Selesai", "Dalam Proses"].map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-xl py-2 ${filter === item ? "bg-blue-50 text-[#08275A]" : "text-slate-500"}`}>{item}</button>)}</div><div className="space-y-3">{list.map((item) => <Card key={item.title} className="flex gap-3 p-3"><div className="grid h-16 w-16 place-items-center rounded-xl bg-slate-100 text-xl">🏡</div><div className="flex-1"><b className="text-sm">{item.title}</b><p className="mt-1 text-xs text-slate-500">{item.date} • {item.status}</p><p className="mt-1 text-xs font-black text-[#08275A]">Biaya: {formatRupiah(item.cost)}</p></div></Card>)}</div></div>
    </Layout>
  );
}

function Shop({ go, page, cart, addToCart, removeFromCart, cartCount }) {
  const [query, setQuery] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const list = products.filter((item) => `${item.name} ${item.brand}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Toko Bahan" back go={go} right={<ShoppingCart size={18} />} />
      <div className="space-y-3 p-5 pb-28"><div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3"><Search size={17} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 text-xs outline-none" placeholder="Cari bahan bangunan..." /></div>{list.map((item) => <Card key={item.id} className="flex items-center gap-3 p-4"><div className="grid h-14 w-14 place-items-center rounded-xl bg-slate-100 text-xl">🧴</div><div className="flex-1"><b className="text-sm">{item.name}</b><p className="text-xs text-slate-500">{item.brand}</p><p className="text-xs font-bold text-slate-500">{formatRupiah(item.price)}</p></div><button type="button" onClick={() => addToCart(item)} className="rounded-full border border-orange-200 p-2 text-[#FF7900]"><Plus size={18} /></button></Card>)}</div>
      {cart.length ? <div className="absolute bottom-20 left-0 right-0 bg-[#08275A] p-4 text-white"><div className="mb-3 flex items-center justify-between text-sm"><b>Keranjang ({cartCount})</b><b>{formatRupiah(total)}</b></div><div className="flex gap-2 overflow-x-auto pb-1">{cart.map((item) => <div key={item.id} className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs"><span>{item.name} x{item.qty}</span><button onClick={() => removeFromCart(item.id)}><Minus size={13} /></button></div>)}</div></div> : null}
    </Layout>
  );
}

function Tips({ go, page, cartCount }) {
  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <Header title="Artikel & Tips" back go={go} />
      <div className="space-y-3 p-5">{articles.map((article) => <Card key={article.title} className="p-4"><p className="text-xs font-bold text-[#FF7900]">{article.type} • {article.minute} menit baca</p><h2 className="mt-1 font-black text-[#08275A]">{article.title}</h2><p className="mt-2 text-xs leading-relaxed text-slate-500">Panduan singkat agar perawatan rumah jadi lebih mudah, aman, dan terencana.</p><button className="mt-3 text-xs font-black text-[#08275A]">Baca artikel ›</button></Card>)}</div>
    </Layout>
  );
}

function Profile({ go, page, cartCount, favoriteTechs, cart, clearCart, setToast }) {
  const settings = [[User, "Informasi Akun"], [MapPin, "Alamat Saya"], [CreditCard, "Metode Pembayaran"], [Bell, "Notifikasi"], [HelpCircle, "Bantuan & FAQ"], [ClipboardList, "Syarat & Ketentuan"], [Settings, "Tentang FixIt"]];
  return (
    <Layout page={page} go={go} cartCount={cartCount}>
      <div className="bg-gradient-to-br from-[#061F4D] to-[#0A3675] px-5 pb-7 text-white"><StatusBar dark /><div className="mt-5 flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-2xl">👤</div><div className="flex-1"><h2 className="text-lg font-black">Wishnu</h2><p className="text-xs text-white/70">Member FixIt Basic</p></div><ChevronRight size={18} /></div><div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs"><div className="rounded-2xl bg-white/10 p-3"><b className="block text-lg">{cartCount}</b>Cart</div><div className="rounded-2xl bg-white/10 p-3"><b className="block text-lg">{favoriteTechs.length}</b>Favorit</div><div className="rounded-2xl bg-white/10 p-3"><b className="block text-lg">4</b>Order</div></div></div>
      <div className="space-y-2 p-5">{settings.map(([Icon, label]) => <button key={label} type="button" onClick={() => setToast(`${label} masih mode demo.`)} className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm"><Icon size={19} color={NAVY} /><span className="flex-1 text-sm font-semibold text-slate-700">{label}</span><ChevronRight size={16} className="text-slate-400" /></button>)}{cart.length ? <button type="button" onClick={clearCart} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 py-4 text-sm font-extrabold text-red-600"><Trash2 size={17} />Kosongkan Keranjang</button> : null}<button type="button" onClick={() => go("splash")} className="mt-4 w-full rounded-2xl border border-slate-200 bg-white py-4 text-sm font-extrabold text-[#08275A]">Keluar</button></div>
    </Layout>
  );
}

function WebsiteLanding({ go }) {
  const websiteServices = [
    { icon: Camera, title: "Diagnosa Kerusakan", desc: "Unggah foto atau video kerusakan rumah dan dapatkan analisis cepat." },
    { icon: Wrench, title: "Panggil Teknisi", desc: "Temukan teknisi terpercaya sesuai kebutuhan perbaikan properti." },
    { icon: ShoppingCart, title: "Toko Bahan", desc: "Beli rekomendasi bahan bangunan sesuai hasil diagnosa." },
    { icon: MessageCircle, title: "Konsultasi", desc: "Diskusikan masalah rumah dengan teknisi sebelum memesan layanan." },
  ];

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.16)]">
      <nav className="flex items-center justify-between px-8 py-6 lg:px-12">
        <Logo />
        <div className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
          <a href="#fitur" className="hover:text-[#08275A]">Fitur</a><a href="#layanan" className="hover:text-[#08275A]">Layanan</a><a href="#cara-kerja" className="hover:text-[#08275A]">Cara Kerja</a><a href="#kontak" className="hover:text-[#08275A]">Kontak</a>
        </div>
        <button type="button" onClick={() => go("home")} className="rounded-2xl bg-[#FF7900] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200">Buka App</button>
      </nav>
      <section className="grid items-center gap-10 px-8 pb-16 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pb-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-extrabold text-[#FF7900]"><ShieldCheck size={18} /> Solusi properti cepat & terpercaya</div>
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-[#08275A] lg:text-6xl">Diagnosa kerusakan properti dan panggil teknisi dalam satu platform.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">FixIt membantu pengguna mengidentifikasi masalah rumah, mendapatkan rekomendasi solusi, estimasi biaya transparan, hingga memantau teknisi secara real-time.</p>
          <div className="mt-8 flex flex-wrap gap-4"><button type="button" onClick={() => go("diagnose")} className="rounded-2xl bg-[#FF7900] px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-orange-200">Mulai Diagnosa</button><a href="#layanan" className="rounded-2xl border border-slate-200 px-7 py-4 text-sm font-extrabold text-[#08275A]">Lihat Layanan</a></div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-5">{["10K+ Pengguna", "4.8 Rating", "500+ Teknisi"].map((item) => { const [value, ...labelParts] = item.split(" "); return <div key={item} className="rounded-2xl bg-[#F7F9FC] p-4 text-center"><b className="text-lg text-[#08275A]">{value}</b><p className="text-xs font-bold text-slate-500">{labelParts.join(" ")}</p></div>; })}</div>
        </div>
        <div className="relative mx-auto w-full max-w-[430px]"><div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-orange-100 to-blue-100 blur-2xl" /><div className="relative rounded-[36px] bg-gradient-to-br from-[#061F4D] to-[#0A3675] p-7 text-white shadow-2xl"><div className="flex items-center justify-between"><Logo light compact /><Bell size={20} /></div><p className="mt-8 text-sm text-white/80">Selamat Datang,</p><h2 className="text-3xl font-black">Wishnu</h2><div className="mt-5 flex rounded-2xl bg-white p-2"><input className="flex-1 px-3 text-sm text-slate-700 outline-none" placeholder="Apa yang perlu diperbaiki?" /><button type="button" className="rounded-xl bg-[#FF7900] p-3"><Search size={18} /></button></div><div className="mt-5 grid grid-cols-2 gap-3">{websiteServices.map(({ icon: Icon, title }) => <div key={title} className="rounded-2xl bg-white/95 p-4 text-[#08275A]"><Icon color={title === "Diagnosa Kerusakan" ? NAVY : ORANGE} /><b className="mt-3 block text-sm">{title}</b></div>)}</div></div></div>
      </section>
      <section id="fitur" className="bg-[#F7F9FC] px-8 py-16 lg:px-12"><div className="mx-auto max-w-3xl text-center"><h2 className="text-4xl font-black text-[#08275A]">Fitur utama FixIt</h2><p className="mt-4 text-slate-600">Dibuat untuk memudahkan pengguna dari tahap pengecekan masalah sampai pesanan selesai.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{websiteServices.map(({ icon: Icon, title, desc }) => <div key={title} className="rounded-[28px] bg-white p-6 shadow-sm"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50"><Icon color={ORANGE} size={26} /></div><h3 className="mt-5 text-lg font-black text-[#08275A]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-500">{desc}</p></div>)}</div></section>
      <section id="layanan" className="grid gap-8 px-8 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><h2 className="text-4xl font-black text-[#08275A]">Layanan untuk berbagai kebutuhan rumah.</h2><p className="mt-4 text-slate-600">Mulai dari kerusakan ringan sampai perbaikan yang membutuhkan bantuan teknisi profesional.</p></div><div className="grid gap-4 md:grid-cols-2">{services.slice(0, 4).map(({ title, price, icon: Icon }) => <div key={title} className="flex items-center gap-4 rounded-3xl border border-slate-100 p-5"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F7FB]"><Icon color={ORANGE} /></div><div><b className="text-[#08275A]">{title}</b><p className="text-sm text-slate-500">Mulai {formatRupiah(price)}</p></div></div>)}</div></section>
      <section id="cara-kerja" className="bg-[#08275A] px-8 py-16 text-white lg:px-12"><h2 className="text-center text-4xl font-black">Cara kerja FixIt</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{["Unggah foto/video kerusakan", "Terima analisis dan rekomendasi", "Pesan teknisi dan pantau progres"].map((step, index) => <div key={step} className="rounded-[28px] bg-white/10 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF7900] text-xl font-black">{index + 1}</div><h3 className="mt-5 text-xl font-black">{step}</h3><p className="mt-3 text-sm leading-relaxed text-white/70">Proses dibuat sederhana agar pengguna bisa mendapatkan bantuan dengan cepat dan jelas.</p></div>)}</div></section>
      <section id="kontak" className="px-8 py-16 text-center lg:px-12"><h2 className="text-4xl font-black text-[#08275A]">Siap memperbaiki properti dengan lebih mudah?</h2><p className="mx-auto mt-4 max-w-2xl text-slate-600">Gunakan FixIt untuk diagnosa awal, estimasi biaya, pemesanan teknisi, dan tracking layanan dalam satu aplikasi.</p><button type="button" onClick={() => go("home")} className="mt-8 rounded-2xl bg-[#FF7900] px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-orange-200">Coba FixIt Sekarang</button></section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("splash");
  const [viewMode, setViewMode] = useState("app");
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(services[1]);
  const [selectedTech, setSelectedTech] = useState(technicians[0]);
  const [favoriteTechs, setFavoriteTechs] = useState(["agus"]);
  const [booking, setBooking] = useState({ day: 15, time: "13:00" });
  const [diagnosis, setDiagnosis] = useState({ fileName: "", room: "Ruang Tamu", type: "Dinding Retak", description: "Dinding lembap di sudut ruang tamu setelah hujan." });
  const [cart, setCart] = useState([]);
  const [messages, setMessages] = useState([
    { from: "tech", text: "Halo, saya sudah di lokasi. Mohon konfirmasi ya.", time: "10:25" },
    { from: "me", text: "Baik, saya segera keluar.", time: "10:26" },
    { from: "tech", text: "Siap, terima kasih.", time: "10:27" },
  ]);

  const go = (nextPage) => {
    setPage(nextPage);
    if (nextPage !== "splash" && viewMode !== "app") setViewMode("app");
  };

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 1800);
  };

  const addToCart = (item) => {
    setCart((current) => {
      const exists = current.find((product) => product.id === item.id);
      if (exists) return current.map((product) => product.id === item.id ? { ...product, qty: product.qty + 1 } : product);
      return [...current, { ...item, qty: 1 }];
    });
    showToast(`${item.name} masuk keranjang.`);
  };

  const removeFromCart = (id) => {
    setCart((current) => current.flatMap((item) => item.id === id ? (item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : []) : [item]));
  };

  const toggleFavorite = (id) => {
    setFavoriteTechs((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  const pages = {
    splash: <Splash go={go} />,
    login: <Login go={go} setToast={showToast} />,
    home: <HomePage go={go} page={page} cartCount={cartCount} search={search} setSearch={setSearch} />,
    diagnose: <Diagnose go={go} page={page} cartCount={cartCount} diagnosis={diagnosis} setDiagnosis={setDiagnosis} setToast={showToast} />,
    analysis: <Analysis go={go} page={page} cartCount={cartCount} diagnosis={diagnosis} />,
    recommendation: <Recommendation go={go} page={page} cartCount={cartCount} addToCart={addToCart} diagnosis={diagnosis} />,
    technician: <Technician go={go} page={page} cartCount={cartCount} selectedService={selectedService} setSelectedService={setSelectedService} favoriteTechs={favoriteTechs} toggleFavorite={toggleFavorite} />,
    techDetail: <TechDetail go={go} page={page} cartCount={cartCount} selectedService={selectedService} selectedTech={selectedTech} setSelectedTech={setSelectedTech} />,
    schedule: <Schedule go={go} page={page} cartCount={cartCount} selectedService={selectedService} selectedTech={selectedTech} booking={booking} setBooking={setBooking} setToast={showToast} />,
    tracking: <Tracking go={go} page={page} cartCount={cartCount} selectedTech={selectedTech} />,
    chat: <Chat go={go} page={page} cartCount={cartCount} messages={messages} setMessages={setMessages} setToast={showToast} />,
    history: <History go={go} page={page} cartCount={cartCount} />,
    shop: <Shop go={go} page={page} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} cartCount={cartCount} />,
    tips: <Tips go={go} page={page} cartCount={cartCount} />,
    profile: <Profile go={go} page={page} cartCount={cartCount} favoriteTechs={favoriteTechs} cart={cart} clearCart={() => { setCart([]); showToast("Keranjang dikosongkan."); }} setToast={showToast} />,
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,121,0,.18),transparent_28%),linear-gradient(135deg,#F8FAFC,#DBEAFE)] p-6">
      <Toast message={toast} />
      <div className="mx-auto mb-6 max-w-4xl text-center">
        <div className="mx-auto mb-3 w-fit rounded-full bg-white/70 px-4 py-2 text-xs font-black text-[#08275A] shadow-sm backdrop-blur">Interactive Prototype</div>
        <h1 className="text-3xl font-black text-[#08275A]">Prototype FixIt</h1>
        <p className="mt-2 text-slate-500">Versi ini sudah punya search, keranjang, upload preview, chat demo, filter teknisi, pilihan jadwal, dan tracking.</p>
        <div className="mx-auto mt-5 flex w-fit rounded-2xl bg-white p-1 shadow-sm">
          <button type="button" onClick={() => setViewMode("app")} className={`rounded-xl px-5 py-3 text-sm font-extrabold ${viewMode === "app" ? "bg-[#08275A] text-white" : "text-slate-500"}`}>Aplikasi</button>
          <button type="button" onClick={() => setViewMode("website")} className={`rounded-xl px-5 py-3 text-sm font-extrabold ${viewMode === "website" ? "bg-[#08275A] text-white" : "text-slate-500"}`}>Website</button>
        </div>
      </div>
      {viewMode === "website" ? (
        <motion.div key="website" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <WebsiteLanding go={go} />
        </motion.div>
      ) : (
        <motion.div key={page} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {pages[page] || pages.home}
        </motion.div>
      )}
    </div>
  );
}
