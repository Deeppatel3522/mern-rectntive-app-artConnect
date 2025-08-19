# ArtConnect - MERN Stack Art Marketplace & Social Platform


  
  
  **A comprehensive art marketplace and social platform built with React Native and Node.js**
  
ArtConnect is a full-stack MERN application that serves as both an art marketplace and social platform. Artists can showcase and sell their artwork, create events, and connect with art enthusiasts. Users can discover art, purchase pieces, follow artists, and participate in art events.

## ✨ Key Features

### 🎨 For Artists
- **Art Portfolio**: Upload and showcase artwork with multiple images
- **Event Creation**: Organize art exhibitions and workshops
- **Sales Management**: Track sales and manage inventory
- **Profile Management**: Build artist profiles with followers

### 🛒 For Art Enthusiasts  
- **Art Discovery**: Browse and search through diverse artwork
- **Purchase System**: Secure payment processing with Stripe
- **Social Features**: Follow favorite artists and save favorites
- **Event Booking**: Register for art events and exhibitions
- **Order Tracking**: View purchase history and order status

### 🔧 Technical Features
- **Real-time Updates**: Live data synchronization
- **Image Management**: Cloudinary integration for optimized media
- **Secure Authentication**: JWT-based user authentication
- **Payment Processing**: Stripe integration for secure transactions
- **Push Notifications**: Firebase for app distribution
- **Responsive Design**: Optimized for various screen sizes

## 🏗️ Architecture

### Frontend (React Native + Expo)
- **Navigation**: React Navigation with stack and tab navigators
- **State Management**: React Context API
- **UI Components**: Custom components with consistent theming
- **Image Handling**: Expo ImagePicker with Cloudinary upload
- **Payment**: Stripe React Native SDK

### Backend (Node.js + Express)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with express-jwt middleware
- **File Upload**: Multer with Cloudinary storage
- **Payment**: Stripe server-side integration
- **Cron Jobs**: Automated cleanup of expired events
- **API Structure**: RESTful API design

## 📁 Project Structure

```
ArtConnect/
├── 📱 client/                           # React Native Frontend
│   ├── 🎨 assets/                       # Images, icons, fonts
│   ├── 🧩 components/                   # Reusable UI components
│   │   ├── Cards/                       # Art, Event, and UI cards
│   │   ├── Forms/                       # Input forms
│   │   └── Menus/                       # Navigation components
│   ├── 📱 screens/                      # Application screens
│   │   ├── Auth/                        # Authentication screens
│   │   ├── Art/                         # Art-related screens
│   │   ├── Event/                       # Event management
│   │   ├── Purchase/                    # Shopping and checkout
│   │   └── User/                        # User profile screens
│   ├── 🎛️ context/                      # React Context providers
│   ├── ⚡ HelperFunc/                   # Utility functions
│   └── 📦 Configuration files           # package.json, app.json, etc.
├── 🖥️ server/                           # Node.js Backend
│   ├── 🎮 controllers/                  # Business logic
│   ├── 📊 models/                       # MongoDB schemas
│   ├── 🛣️ routes/                       # API endpoints
│   ├── ⚙️ config/                       # Database and service configs
│   ├── 🔧 helper/                       # Utility functions
│   ├── ⏰ cronJobs/                     # Scheduled tasks
│   └── 🔥 functions/                    # Firebase functions
├── 🔄 .github/workflows/                # CI/CD pipelines
└── 📚 Documentation files
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **MongoDB** (local or cloud instance)
- **Expo CLI**: `npm install -g @expo/cli`
- **EAS CLI**: `npm install -g eas-cli` (for building)

### Environment Variables

Create `.env` files in both client and server directories:

#### Server `.env`:
```env
PORT=6969
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISH_KEY=your_stripe_publishable_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/artconnect.git
   cd artconnect
   ```

2. **Install server dependencies**
   ```bash
   cd ArtConnect/server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the development servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd ArtConnect/server
   npm run server
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd ArtConnect/client
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🛠️ Technologies Used

### Frontend Stack
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library
- **React Context** - State management
- **Expo ImagePicker** - Image selection
- **Stripe React Native** - Payment processing

### Backend Stack
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization
- **Stripe** - Payment processing

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Firebase App Distribution** - App deployment
- **EAS Build** - Expo build service

## 📜 Available Scripts

### Client Scripts
```bash
npm start              # Start Expo development server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run web           # Run in web browser
npm test              # Run test suite
npm run lint          # Lint code
```

### Server Scripts
```bash
npm start             # Start production server
npm run server        # Start development server with nodemon
npm test              # Run server tests
```

### Build & Deploy
```bash
# Build for production
eas build --platform ios
eas build --platform android

# Deploy to Firebase App Distribution (via GitHub Actions)
git push origin main
```

## 🔐 Authentication & Security

- **JWT-based authentication** with secure token storage
- **Password hashing** using bcrypt
- **Route protection** with middleware
- **Input validation** and sanitization
- **CORS configuration** for API security

## 💳 Payment Integration

- **Stripe integration** for secure payments
- **Multiple payment methods** support
- **Order management** with transaction history
- **Automatic receipt generation**

## 📊 API Endpoints

### Authentication
- `POST /api/g2/auth/register` - User registration
- `POST /api/g2/auth/login` - User login
- `GET /api/g2/auth/fetch-user/:id` - Get user profile

### Art Management
- `POST /api/g2/art/upload-img` - Upload artwork
- `GET /api/g2/art/fetch-all-img` - Get all artworks
- `GET /api/g2/art/fetch-img/:id` - Get specific artwork

### Event Management
- `POST /api/g2/event/post-event` - Create event
- `GET /api/g2/event/fetch-all-event` - Get all events
- `GET /api/g2/event/fetch-event/:id` - Get specific event

### Orders & Payments
- `POST /api/g2/payment/purchase-item` - Process payment
- `POST /api/g2/order/save-order` - Save order
- `GET /api/g2/order/fetch-orders/:userId` - Get user orders

## 🧪 Testing

```bash
# Run client tests
cd ArtConnect/client
npm test

# Run server tests
cd ArtConnect/server
npm test
```

## 📱 Platform Support

| Platform | Status | Version |
|----------|---------|---------|
| iOS | ✅ Supported | iOS 13+ |
| Android | ✅ Supported | API 21+ |
| Web | ✅ Supported | Modern browsers |

## 🚀 Deployment

### Automated Deployment (GitHub Actions)
The project includes automated CI/CD pipeline that:
1. Builds the React Native app using EAS
2. Deploys to Firebase App Distribution
3. Notifies beta testers

### Manual Deployment
```bash
# Build for production
eas build --platform all --profile production

# Deploy server to your hosting provider
# Configure MongoDB connection
# Set up environment variables
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write comprehensive tests
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Known Issues & Limitations

- Image upload size limits (handled by Cloudinary)
- Offline functionality limited to cached data
- Push notifications require Firebase setup

## 🔮 Future Enhancements

- [ ] Real-time chat between artists and buyers
- [ ] Advanced search and filtering
- [ ] AR visualization for artwork
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Social media integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** for the excellent development platform
- **React Native Community** for continuous improvements
- **MongoDB** for reliable database services
- **Stripe** for secure payment processing
- **Cloudinary** for image optimization services

## 📞 Support

If you encounter any issues or have questions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/artconnect/issues)
- **Documentation**: Check the project wiki
- **Community**: Join our discussions

## 📈 Project Status

**Current Version**: 1.0.0  
**Status**: Active Development  
**Last Updated**: August 2025


  Built with ❤️ by the ArtConnect Team
  © 2025 ArtConnect. All rights reserved.
  
  **Ready to revolutionize the art world? Join ArtConnect today! 🎨**


***

## 🚀 Quick Start Commands

```bash
# Full setup
git clone https://github.com/Deeppatel3522/artconnect.git
cd artconnect

# Install dependencies
cd ArtConnect/server && npm install
cd ../client && npm install

# Start development
cd ../server && npm run server  # Terminal 1
cd ../client && npm start       # Terminal 2

# Run on device
npm run ios     # iOS
npm run android # Android
```

[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/54228082/6b728111-8fed-4aed-9638-0a10eaeb7e4b/paste.txt
