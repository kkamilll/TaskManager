# 📋 TaskManager - System Zarządzania Zadaniami

Nowoczesna, pełnowymiarowa aplikacja webowa do zarządzania zadaniami, zespołem oraz raportowaniem, wybudowana w architekturze **REST API** (Node.js/Express) z reaktywnym interfejsem użytkownika (React + Vite + Tailwind CSS).

---

## 🚀 Technologie (Tech Stack)

### **Backend**
* **Node.js** & **Express.js** – Podstawa serwera REST API
* **MongoDB** & **Mongoose** – Baza danych NoSQL i modelowanie danych
* **JSON Web Token (JWT)** & **bcryptjs** – Bezpieczna autoryzacja oraz haszowanie haseł
* **Multer** – Bezpieczny przesył plików i załączników (avatary, pliki zadań)
* **ExcelJS** – Generowanie raportów i eksport zadań/użytkowników do plików Excel

### **Frontend**
* **React.js** (Vite) – Szybki i wydajny interfejs użytkownika
* **Tailwind CSS** – Nowoczesne i responsywne stylizowanie UI
* **Axios** – Komunikacja z backendowym API z automatycznymi interceptorami
* **Recharts** – Interaktywne wykresy i analityka zadań na dashboardzie

---

## 🛡️ Bezpieczeństwo i Dobra Praktyka (Security Features)

1. **Role-Based Access Control (RBAC)**: Podział na rolę `admin` oraz `user` z weryfikacją uprawnień na poziomie middleware.
2. **Ochrona plików i przesyłu**: Ścisła walidacja typów MIME (JPEG, PNG, WebP) oraz limit rozmiaru przesyłanych plików (max 5 MB).
3. **Sanityzacja CORS**: Ochrona przed nieautoryzowanym dostępem z obcych domen oraz bezpieczna obsługa adresów produkcyjnych.
4. **Odporne połączenie z bazą**: Automatyczna pętla ponownych prób (retry loop) w przypadku opóźnień DNS oraz ukrywanie danych uwierzytelniających w logach serwera (`***:***`).
5. **Ochrona sekretów**: Zmienne środowiskowe odseparowane w plikach `.env` (zabezpieczone przed trafiem do systemu kontroli wersji Git).

---

## 📁 Struktura Projektu

```text
TASKMANAGER/
├── backend/
│   ├── config/            # Konfiguracja bazy danych (db.js)
│   ├── controllers/       # Logika biznesowa (auth, tasks, users, reports)
│   ├── middlewares/       # Middleware autoryzacji (authMiddleware) i plików (uploadMiddleware)
│   ├── models/            # Modele Mongoose (User, Task)
│   ├── routes/            # Ścieżki API (/api/auth, /api/tasks, /api/users, /api/reports)
│   ├── uploads/           # Statyczne pliki załączników i avatarów
│   ├── .env.example       # Wzorzec zmiennych środowiskowych
│   ├── package.json
│   └── server.js          # Główny plik startowy serwera
├── frontend/
│   └── Task-manager/
│       ├── src/
│       │   ├── components/  # Komponenty UI (karty, tabele, wykesy, modale)
│       │   ├── context/     # Kontekst użytkownika (UserContext)
│       │   ├── pages/       # Widoki (Dashboard Admina/Użytkownika, Zadania, Auth)
│       │   └── utils/       # Instancja Axiosa i ścieżki API (apiPaths.js)
│       ├── .env.example     # Wzorzec zmiennych środowiskowych frontendu
│       └── package.json
├── docker-compose.yml
└── README.md
```

---

## 💻 Uruchomienie Lokalnie (Local Setup)

### **1. Wymagania wstępne**
* Zainstalowany **Node.js** (v18 lub nowszy)
* Działająca instancja **MongoDB** (lokalna lub MongoDB Atlas)

---

### **2. Konfiguracja Backendu**
```bash
cd backend
npm install
```

Utwórz plik `.env` w katalogu `backend` na podstawie `.env.example`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=super_secret_jwt_key_123!
PORT=8000
CLIENT_URL=http://localhost:5173
```

Uruchomienie serwera backendowego:
```bash
npm run dev
# lub dla wersji produkcyjnej:
npm start
```

---

### **3. Konfiguracja Frontend**
```bash
cd frontend/Task-manager
npm install
```

Utwórz plik `.env` w katalogu `frontend/Task-manager` na podstawie `.env.example`:
```env
VITE_API_URL=http://localhost:8000
```

Uruchomienie serwera deweloperskiego frontendu:
```bash
npm run dev
```
Aplikacja będzie dostępna pod adresem: `http://localhost:5173`

---

## 🌐 Wdrożenie Produkcyjne (Deployment)

### **Backend (np. Render.com)**
1. Utwórz usługę **Web Service** i połącz repozytorium z GitHub.
2. Ustawienia:
   * **Root Directory**: `backend`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
3. Dodaj Zmienne Środowiskowe (Environment Variables):
   * `MONGO_URI`: Adres połączenia z MongoDB Atlas
   * `JWT_SECRET`: Bezpieczny sekretny klucz JWT
   * `CLIENT_URL`: URL wdrożonego frontendu

---

## 📜 Licencja
Projekt stworzony na potrzeby celów edukacyjnych i akademickich.
