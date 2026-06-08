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

### AAB release signé (en ligne de commande)

Un keystore de release a déjà été généré dans `android/keystore/muscletraining-release.jks`
et la config de signature est lue depuis `android/key.properties`.

> 🔐 **`key.properties` et le `.jks` ne sont PAS versionnés (secrets).**
> Les identifiants ont été affichés lors de la génération — garde-les hors du repo
> (gestionnaire de mots de passe). Sans eux, impossible de publier une mise à jour.

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"
export PATH="$JAVA_HOME/bin:$PATH"
export ANDROID_HOME="$HOME/Library/Android/sdk"

cd android && ./gradlew :app:bundleRelease --no-daemon
# → app/build/outputs/bundle/release/app-release.aab  (signé, prêt pour Play)
```

Le dernier AAB signé est copié dans `dist/muscletraining-v1.0-release.aab`.

Pour incrémenter une version : éditer `versionCode` (+1) et `versionName` dans
`android/app/build.gradle`, puis re-builder.

### Publication
1. [Google Play Console](https://play.google.com/console) (compte développeur 25 $ unique).
2. Créer l'app → activer **Play App Signing** (recommandé).
3. Uploader l'`.aab` dans un track (test interne → production).

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
