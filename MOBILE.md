# 📱 App mobile — Muscle Training (iOS & Android)

L'app native est générée avec **Capacitor 8** : elle embarque le site statique (`out/`)
dans un conteneur natif iOS + Android, publiable sur l'App Store et Google Play.

- **appId** : `uk.muscletraining.app`
- **appName** : Muscle Training
- **webDir** : `out/` (export Next.js statique)

## Workflow de mise à jour

À chaque changement du site, resynchroniser le contenu dans les apps :

```bash
npm run mobile:sync        # next build + cap sync (iOS + Android)
npm run mobile:icons       # régénère icônes/splash depuis assets/ (si logo changé)
```

## Android (Google Play)

Prérequis : **Java JDK 21** + Android Studio (déjà installé).

```bash
# Installer Java si absent :
brew install openjdk@21

npm run mobile:android     # build + ouvre Android Studio
```

Dans Android Studio :
1. Laisser Gradle se synchroniser.
2. **Build > Generate Signed Bundle / APK** → AAB (Android App Bundle).
3. Créer/charger un keystore de signature (à conserver précieusement).
4. Uploader l'`.aab` sur [Google Play Console](https://play.google.com/console) (compte développeur 25 $ unique).

## iOS (App Store)

Prérequis : **Xcode complet** (App Store, pas seulement Command Line Tools) + **CocoaPods**.

```bash
# Installer CocoaPods si absent :
sudo gem install cocoapods

npm run mobile:ios         # build + ouvre Xcode
```

Dans Xcode :
1. Target **App** > **Signing & Capabilities** → sélectionner ton Apple Developer Team.
2. **Product > Archive** → **Distribute App** → App Store Connect.
3. Soumettre via [App Store Connect](https://appstoreconnect.apple.com) (compte Apple Developer 99 $/an).

## ⚠️ Publicités dans l'app

Google **AdSense est interdit dans les apps natives** (politique Google). Le script AdSense
chargé dans le webview ne servira pas d'annonces et peut être refusé par les stores.
Pour monétiser l'app, migrer vers **AdMob** (`@capacitor-community/admob`) avec des unités
dédiées. AdSense reste valide pour le site web.

## Notes techniques

- `ios/` et `android/` sont versionnés ; les artefacts de build (`Pods/`, `build/`, `.gradle/`)
  sont ignorés par les `.gitignore` Capacitor.
- Couleur de fond / splash : `#07070F` (cf. `capacitor.config.ts`).
- Les assets sources (icône 1024, splash 2732) sont dans `assets/`.
