'use client'

import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'

/**
 * Initialise les fonctionnalités natives (Capacitor) :
 * - StatusBar sombre
 * - SplashScreen masqué après hydratation
 * - AdMob (bannière bas d'écran) — remplace AdSense dans l'app
 * - Push notifications (enregistrement du device)
 * - Réseau (classe `is-offline` sur <html> pour styliser le hors-ligne)
 * - Haptique légère sur les boutons primaires
 *
 * No-op total sur le web (Capacitor.isNativePlatform() === false).
 */
export default function NativeApp() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    let cleanup: Array<() => void> = []

    ;(async () => {
      // ── StatusBar + Splash ──────────────────────────────
      try {
        const { StatusBar, Style } = await import('@capacitor/status-bar')
        await StatusBar.setStyle({ style: Style.Dark })
        if (Capacitor.getPlatform() === 'android') {
          await StatusBar.setBackgroundColor({ color: '#07070F' })
        }
      } catch {}
      try {
        const { SplashScreen } = await import('@capacitor/splash-screen')
        await SplashScreen.hide()
      } catch {}

      // ── Réseau (offline) ────────────────────────────────
      try {
        const { Network } = await import('@capacitor/network')
        const apply = (connected: boolean) =>
          document.documentElement.classList.toggle('is-offline', !connected)
        const status = await Network.getStatus()
        apply(status.connected)
        const handle = await Network.addListener('networkStatusChange', s => apply(s.connected))
        cleanup.push(() => handle.remove())
      } catch {}

      // ── AdMob — bannière ────────────────────────────────
      try {
        const { AdMob, BannerAdSize, BannerAdPosition } = await import('@capacitor-community/admob')
        await AdMob.initialize({ initializeForTesting: true })
        await AdMob.showBanner({
          // ⚠️ Remplacer par les vrais Ad Unit IDs AdMob avant publication
          adId:
            Capacitor.getPlatform() === 'ios'
              ? 'ca-app-pub-3940256099942544/2934735716' // test iOS
              : 'ca-app-pub-3940256099942544/6300978111', // test Android
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
        })
      } catch {}

      // ── Push notifications ──────────────────────────────
      try {
        const { PushNotifications } = await import('@capacitor/push-notifications')
        const perm = await PushNotifications.checkPermissions()
        let granted = perm.receive === 'granted'
        if (perm.receive === 'prompt') {
          const req = await PushNotifications.requestPermissions()
          granted = req.receive === 'granted'
        }
        if (granted) await PushNotifications.register()
      } catch {}

      // ── Haptique sur boutons primaires ──────────────────
      try {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics')
        const onTap = (e: Event) => {
          const t = e.target as HTMLElement
          if (t.closest('button, a[role="button"]')) {
            Haptics.impact({ style: ImpactStyle.Light }).catch(() => {})
          }
        }
        document.addEventListener('click', onTap, { passive: true })
        cleanup.push(() => document.removeEventListener('click', onTap))
      } catch {}
    })()

    return () => cleanup.forEach(fn => fn())
  }, [])

  return null
}
