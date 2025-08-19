# 🎨 ArtConnect - Art Marketplace & Social Platform


  
  
ArtConnect is a comprehensive art marketplace and social platform that bridges the gap between artists and art enthusiasts. Built with React Native and powered by a robust MERN stack backend, the app enables artists to showcase their work, organize exhibitions, and connect with a community of art lovers.

## ✨ Key Features

- 🎨 **Artist Portfolio Management** - Artists can upload and manage their artwork collections
- 🎪 **Event Creation & Management** - Organize art exhibitions and events
- 💝 **Favorites System** - Users can save and organize their favorite pieces
- 👥 **Social Following** - Follow favorite artists and stay updated
- 🛒 **Integrated Marketplace** - Secure purchasing with Stripe payment processing
- 📱 **Cross-Platform Mobile App** - Built with React Native and Expo
- 🔐 **Secure Authentication** - JWT-based user authentication
- ☁️ **Cloud Storage** - Cloudinary integration for image management

## 🏗️ Project Structure

```
ArtConnect/
├── client/                 # React Native mobile application
│   ├── app/               # Expo Router navigation
│   ├── components/        # Reusable UI components
│   ├── screens/          # Application screens
│   ├── context/          # React Context for state management
│   ├── assets/           # Images, fonts, and static assets
│   └── ...
├── server/                # Node.js backend API
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API route definitions
│   ├── config/          # Database and service configurations
│   ├── middleware/      # Custom middleware
│   └── ...
└── .github/              # GitHub Actions CI/CD workflows
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB
- Expo CLI
- Android Studio/Xcode (for device testing)

### 🔧 Backend Setup

1. **Navigate to server directory**
   ```bash
   cd ArtConnect/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=6969
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_PUBLISH_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run server
   ```
   
   The backend will be running on `http://localhost:6969`

### 📱 Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd ArtConnect/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Base URL**
   
   Update the base URL in `context/authContext.js`:
   ```javascript
   // For local development
   axios.defaults.baseURL = "http://10.0.0.172:6969/api/g2"
   
   // For production
   axios.defaults.baseURL = "https://your-production-url.com/api/g2"
   ```

4. **Start the Expo development server**
   ```bash
   npx expo start
   ```

5. **Run on device/emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app for physical device

## 🎯 App Features & Screens

### 🔐 Authentication
- **Welcome Screen** - App introduction and navigation
- **Login/Register** - Secure user authentication
- **Profile Management** - User profile customization

### 🎨 Art Management
- **Art Gallery** - Browse all available artwork
- **Art Details** - Detailed view with artist information
- **Upload Art** - Artists can add new pieces to their portfolio

### 🎪 Events & Exhibitions
- **Event Listings** - Discover upcoming art events
- **Event Details** - Complete event information and booking
- **Event Creation** - Artists can organize exhibitions

### 👤 User Experience
- **Explore Feed** - Personalized content discovery
- **Favorites** - Saved artwork and events
- **Following** - Updates from followed artists
- **Order History** - Purchase tracking and history

### 💳 Commerce
- **Order Summary** - Review purchase details
- **Secure Checkout** - Stripe-powered payment processing
- **Order Management** - Track purchases and deliveries

## 🛠️ Technology Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **Expo Router** - File-based navigation
- **React Context** - State management
- **Axios** - HTTP client for API requests
- **React Native Vector Icons** - Icon library
- **Expo Image Picker** - Media selection

### Backend (API)
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage and optimization

### Payment & Services
- **Stripe** - Payment processing
- **Cloudinary** - Image storage and delivery
- **Firebase** - App distribution and hosting
- **MongoDB Atlas** - Cloud database

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Firebase App Distribution** - Beta testing distribution
- **EAS Build** - Expo Application Services for building

## 🔄 API Endpoints

### Authentication Routes (`/api/g2/auth`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /fetch-user/:id` - Get user details
- `PUT /update-user` - Update user profile
- `PUT /update-user-favorites` - Manage favorites
- `PUT /update-user-following` - Manage following

### Art Routes (`/api/g2/art`)
- `POST /upload-img` - Upload new artwork
- `GET /fetch-img/:id` - Get specific artwork
- `GET /fetch-all-img` - Get all artwork
- `POST /fetch-all-img-by-user` - Get artwork by artist
- `PUT /update-img/:id` - Update artwork details

### Event Routes (`/api/g2/event`)
- `POST /post-event` - Create new event
- `GET /fetch-event/:id` - Get specific event
- `GET /fetch-all-event` - Get all events
- `POST /fetch-all-event-by-user` - Get events by artist

### Order Routes (`/api/g2/order`)
- `POST /save-order` - Save new order
- `GET /fetch-orders/:userId` - Get user order history

### Payment Routes (`/api/g2/payment`)
- `POST /purchase-item` - Process payment with Stripe

## 🚀 Deployment

### Backend Deployment
The backend is deployed on Render:
```
Production URL: https://react-ntive-artconnect-server.onrender.com
```

### Mobile App Distribution
The app uses Firebase App Distribution for beta testing and GitHub Actions for automated builds:

#### Automated Build Process
1. Push to main branch triggers build
2. EAS builds Android AAB
3. Firebase App Distribution deploys to testers

#### Manual Deployment
```bash
cd ArtConnect/client
eas build --platform android --profile production
```

## 📄 Environment Variables

### Server Environment Variables
```env
PORT=6969
MONGO_URL=mongodb_connection_string
JWT_SECRET=jwt_secret_key
CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
STRIPE_PUBLISH_KEY=stripe_publishable_key
STRIPE_SECRET_KEY=stripe_secret_key
```

### GitHub Secrets (for CI/CD)
- `EXPO_TOKEN` - Expo authentication token
- `FIREBASE_PROJECT_ID` - Firebase project identifier
- `FIREBASE_APP_ID` - Firebase app identifier
- `CREDENTIAL_FILE_CONTENT` - Firebase service account credentials

## 🎨 UI/UX Features

- **Dark Theme** - Modern dark color scheme throughout
- **Responsive Design** - Optimized for various screen sizes
- **Smooth Animations** - React Native Reanimated for fluid interactions
- **Image Carousel** - Swipeable artwork galleries
- **Pull-to-Refresh** - Intuitive content updates
- **Loading States** - Clear feedback during operations

## 🔧 Development Scripts

### Server Scripts
```bash
npm start          # Start production server
npm run server     # Start development server with nodemon
```

### Client Scripts
```bash
npm start          # Start Expo development server
npx expo start     # Alternative Expo start command
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 🐛 Known Issues & Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build issues**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS build issues**
```bash
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
npx expo run:ios
```

## 📜 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨💻 Author

**Deep Patel**
- GitHub: [@Deeppatel3522](https://github.com/Deeppatel3522)

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for amazing development tools
- MongoDB for reliable database solutions
- Stripe for seamless payment integration
- Cloudinary for image management services

***


  Built with ❤️ using React Native & Node.js
  ⭐ Star this repo if you found it helpful!
