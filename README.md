# 🔐 NexLOCK - Password Manager

A secure and modern password manager built with **Next.js** frontend and **Express.js** backend, using **MongoDB** for data storage.

![NexLOCK](https://img.shields.io/badge/NexLOCK-Password%20Manager-purple)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Express](https://img.shields.io/badge/Express.js-4.18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Local-brightgreen)

## ✨ Features

- 🔒 **Secure Password Storage** - Store passwords safely in MongoDB
- 🎨 **Modern UI** - Beautiful dark theme with responsive design
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔗 **Clickable URLs** - Smart URL formatting and new tab opening
- 📋 **Copy to Clipboard** - Quick copy functionality for passwords
- ✏️ **CRUD Operations** - Create, Read, Update, Delete passwords
- ⚡ **Real-time Updates** - Instant sync with database
- 🌟 **Custom Toasts** - Beautiful notification system

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications
- **UUID** - Unique ID generation

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **CORS** - Cross-origin requests
- **Body Parser** - Request parsing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally)

### 1. Clone the Repository
```bash
git clone https://github.com/Flare3416/password-manager.git
cd password-manager
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017`

### 5. Start Backend Server
```bash
cd backend
node server.js
```
Backend runs on: `http://localhost:3000`

### 6. Start Frontend
```bash
npm run dev
```
Frontend runs on: `http://localhost:3001`

## 🏗️ Project Structure

```
password-manager/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── Manager.js         # Main password manager
│   └── Navbar.js          # Navigation component
├── backend/               # Express.js backend
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
├── public/               # Static assets
└── README.md
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all passwords |
| `POST` | `/` | Create new password |
| `PUT` | `/` | Update existing password |
| `DELETE` | `/` | Delete password |

## 💻 Usage

1. **Add Password**: Fill in website URL, username, and password
2. **View Passwords**: All passwords displayed in a responsive table
3. **Edit Password**: Click edit icon to modify existing entries
4. **Delete Password**: Click delete icon with confirmation dialog
5. **Copy Data**: Click copy icons to copy site URL, username, or password
6. **Open Sites**: Click on site names to open in new tab

## 🎨 Features in Detail

### Smart URL Formatting
- Automatically adds `https://` to URLs
- Handles `www.` prefixes
- Supports various domains (.com, .org, .net, etc.)

### Responsive Design
- Desktop: Full table view with all columns
- Mobile: Expandable card view with tap interactions
- Viewport-based spacing using vh/vw units

### Security Features
- Passwords hidden with dots (••••••••)
- Secure MongoDB storage
- No localStorage dependency

## 🚧 Development

### Backend Development
```bash
cd backend
npm install
node server.js
```

### Frontend Development
```bash
npm run dev
```

### Database
- Database: `NEXLOCK`
- Collection: `passwords`
- Schema: `{ id, site, username, password }`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Flare3416**
- GitHub: [@Flare3416](https://github.com/Flare3416)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for reliable database solution
- Tailwind CSS for beautiful styling
- React Toastify for smooth notifications

---

⭐ **Star this repository if you found it helpful!**
