# React Native MVVM Showcase

Production-ready React Native template with MVVM + Clean Architecture, inspired by KMP Showcase.

## Architecture

```
src/
├── presentation/          # UI Layer
│   ├── screens/          # Screen components (MVVM pattern)
│   │   └── home/
│   │       ├── HomeScreen.tsx
│   │       ├── useHomeViewModel.ts    # Hook = ViewModel
│   │       ├── HomeUiState.ts
│   │       ├── Feature.ts
│   │       └── FeatureCard.tsx
│   ├── components/       # Reusable UI components
│   ├── foundation/       # Theme, colors, dimensions
│   └── navigation/       # React Navigation setup (TODO)
│
├── domain/               # Business Logic Layer (TODO)
│   ├── model/           # Domain models
│   ├── repository/      # Repository interfaces
│   └── usecase/         # UseCase classes
│
├── data/                # Data Layer (TODO)
│   ├── repository/      # Repository implementations
│   ├── api/             # API clients
│   └── local/           # AsyncStorage, MMKV
│
└── di/                  # Dependency Injection (TODO)
```

## Tech Stack

- **React Native**: 0.76.5
- **React Native Paper**: 5.14.5 (Material Design 3)
- **TypeScript**: 5.0.4
- **Icons**: react-native-vector-icons

## Getting Started

### Install dependencies

```bash
npm install
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

## Components

### Text Components
- TextHeadlineMedium / TextHeadlineMediumPrimary
- TextTitleLarge / TextTitleLargeNeutral80 / TextTitleLargePrimary
- TextBodyLarge / TextBodyMedium / TextBodySmall (+ color variants)
- TextLabelLarge / TextLabelMedium / TextLabelSmall (+ color variants)

### Buttons
- ContainedButton
- OutlinedButton
- AppTextButton / AppTextButtonError
- AppFloatingActionButton

### Form Components
- AppTextField
- AppCheckbox
- AppSwitch

### UI Components
- AppCard (elevated / outlined)
- CircularProgress (default / small)
- AppDivider
- ErrorView
- LoadingView

### Layout
- ColumnSpacer2/4/6/12
- RowSpacer (TODO)

## Architecture Pattern

Following KMP Showcase MVVM pattern:

**Screen** → **ViewModel Hook** → **UiState** → **UseCase** → **Repository** → **API/Storage**

Example:
```typescript
// useHomeViewModel.ts
export const useHomeViewModel = () => {
  const [uiState] = useState<HomeUiState>(initialHomeUiState);

  const onFeatureClick = (featureId: FeatureId) => {
    // TODO: Navigation
  };

  return { uiState, onFeatureClick };
};

// HomeScreen.tsx
export const HomeScreen = () => {
  const { uiState, onFeatureClick } = useHomeViewModel();
  // ...
};
```

## TODO

- [ ] Implement safe areas (status bar, notch)
- [ ] Handle soft keyboard (lift views)
- [ ] Add navigation (React Navigation)
- [ ] Implement domain layer
- [ ] Implement data layer
- [ ] Add dependency injection

## Author

Miroslav Kusnir

## License

MIT
