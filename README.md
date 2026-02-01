# RN Showcase

A production-ready React Native demo app showcasing modern mobile development with MVVM + Clean Architecture, TypeScript, and native platform integrations.

[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB.svg?logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
![Android](https://img.shields.io/badge/Android-API_24+-3DDC84.svg?logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-15+-000000.svg?logo=apple&logoColor=white)

**100% shared code** across Android & iOS

---

<table>
<tr>
<td style="width:50%">

### UI & Navigation
- React Navigation 6+
- Material Design 3 (react-native-paper)
- Dark Mode Support
- 20+ Custom Components

</td>
<td style="width:50%">

### Platform APIs
- Biometrics (Face ID / Fingerprint)
- Camera & Gallery
- QR/Barcode Scanner
- Permissions

</td>
</tr>
<tr>
<td style="width:50%">

### Data & Network
- Axios HTTP Client
- MMKV Storage
- SQLite Database
- Clean Architecture

</td>
<td style="width:50%">

### Notifications
- Push (FCM / APNs)
- Local Notifications
- Permission Handling

</td>
</tr>
</table>

---

## Tech Stack

![React Native](https://img.shields.io/badge/React_Native-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![tsyringe](https://img.shields.io/badge/tsyringe-DI-blue)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
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
yarn install

# iOS (first time)
cd ios && pod install && cd ..

# Run Android
yarn android

# Run iOS
yarn ios
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
│   └── foundation/         # Theme, colors, dimensions
├── domain/                 # Business Logic
│   ├── models/             # Domain models
│   ├── repositories/       # Repository interfaces
│   ├── useCases/           # UseCase classes
│   └── exceptions/         # Custom exceptions
└── data/                   # Data Layer
    ├── repositories/       # Repository implementations
    ├── network/            # API clients (Axios)
    ├── dto/                # Data Transfer Objects
    └── mappers/            # DTO → Domain mappers
```

---

## Roadmap

### Done
- [x] UI Components (20+ components)
- [x] Theme system (Light/Dark mode)
- [x] Navigation (Bottom tabs + Stack)
- [x] Networking (Axios + REST API)
- [x] Clean Architecture (UseCase pattern)
- [x] Dependency Injection (tsyringe)
- [x] Custom components (LoadingView, ErrorView, Spacers)
- [x] Type-safe Routes (KMP-style Route config)
- [x] Localization (EN/SK with StringsProvider)
- [x] Deep Links (Android)

### In Progress
- [ ] Storage feature (MMKV)

### Planned
- [ ] Database feature (SQLite/WatermelonDB)
- [ ] Platform APIs (biometrics, camera, gallery)
- [ ] QR/Barcode Scanner
- [ ] Calendar integration
- [ ] Push Notifications (FCM/APNs)
- [ ] Local Notifications
- [ ] Login/Auth flow
- [ ] Form validation (react-hook-form + zod)
- [ ] Pagination
- [ ] Offline-first support
- [ ] Unit tests setup
- [ ] E2E tests (Detox)
- [ ] Screenshot tests


---

## Author

Miroslav Kusnir

## License

MIT
