# RN Showcase

A production-ready React Native demo app showcasing modern mobile development with MVVM + Clean Architecture, TypeScript, and native platform integrations.

[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB.svg?logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
![Android](https://img.shields.io/badge/Android-26-3DDC84.svg?logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-15+-000000.svg?logo=apple&logoColor=white)

**100% shared code** across Android & iOS

---

<table>
<tr>
<td style="width:50%">

### UI & Navigation
- React Navigation 6+
- Material Design 3
- Dark Mode + System Theme
- 40+ Components

</td>
<td style="width:50%">

### Platform APIs
- Biometrics (Face ID / Fingerprint)
- Camera & QR/Barcode Scanner
- Location & Permissions
- Flashlight

</td>
</tr>
<tr>
<td style="width:50%">

### Data & Network
- Axios HTTP Client
- MMKV Storage
- SQLite Database (op-sqlite)
- Clean Architecture

</td>
<td style="width:50%">

### Notifications
- Local Notifications
- Notification Channels
- Permission Handling

</td>
</tr>
</table>

---

## Screenshots

<table>
<tr>
<td><img src="screenshots/login.png" width="180" alt="Login"/></td>
<td><img src="screenshots/home.png" width="180" alt="Home"/></td>
<td><img src="screenshots/ui_components.png" width="180" alt="UI Components"/></td>
<td><img src="screenshots/storage.png" width="180" alt="Storage"/></td>
</tr>
<tr>
<td style="text-align:center">Login</td>
<td style="text-align:center">Home</td>
<td style="text-align:center">UI Components</td>
<td style="text-align:center">Storage</td>
</tr>
<tr>
<td><img src="screenshots/platform_apis_1.png" width="180" alt="Platform APIs"/></td>
<td><img src="screenshots/platform_apis_2.png" width="180" alt="Platform APIs"/></td>
<td><img src="screenshots/notifications.png" width="180" alt="Notifications"/></td>
<td><img src="screenshots/settings.png" width="180" alt="Settings"/></td>
</tr>
<tr>
<td style="text-align:center">Platform APIs</td>
<td style="text-align:center">Platform APIs</td>
<td style="text-align:center">Notifications</td>
<td style="text-align:center">Settings</td>
</tr>
</table>

---

## Tech Stack

![React Native](https://img.shields.io/badge/React_Native-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![tsyringe](https://img.shields.io/badge/tsyringe-DI-blue)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![MMKV](https://img.shields.io/badge/MMKV-Storage-orange)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)

---

## Architecture

```
Presentation  →  Domain  →  Data
  (Screen/VM)    (UseCase)   (Repository)
```

---

## Quick Start

```bash
# Install dependencies
npm install

# iOS (first time)
cd ios && pod install && cd ..

# Run Android
npx react-native run-android

# Run iOS
npx react-native run-ios

# Run tests
npx jest
```

---

## Project Structure

```
src/
├── app/                    # App entry, DI setup
│   └── di/                 # Dependency injection (tsyringe)
├── presentation/           # UI Layer
│   ├── screens/            # Feature screens
│   │   └── xxx/
│   │       ├── XxxScreen.tsx
│   │       ├── useXxxViewModel.ts
│   │       └── XxxUiState.ts
│   ├── components/         # Reusable components
│   ├── navigation/         # React Navigation
│   └── foundation/         # Theme, colors, strings
├── domain/                 # Business Logic
│   ├── models/             # Domain models
│   ├── repositories/       # Repository interfaces
│   ├── useCases/           # UseCase classes
│   └── exceptions/         # Custom exceptions
└── data/                   # Data Layer
    ├── repositories/       # Repository implementations
    ├── network/            # API clients (Axios)
    ├── analytics/          # Firebase Analytics & Crashlytics
    ├── dto/                # Data Transfer Objects
    └── local/              # MMKV, SQLite
```


---

## Author

Miroslav Kusnir

## License

MIT
