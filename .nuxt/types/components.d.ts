
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'CVDownloadModal': typeof import("../../components/CVDownloadModal.vue")['default']
  'NavBar': typeof import("../../components/NavBar.vue")['default']
  'UiAvailabilityBadge': typeof import("../../components/ui/AvailabilityBadge.vue")['default']
  'UiBackToTop': typeof import("../../components/ui/BackToTop.vue")['default']
  'UiScrollProgress': typeof import("../../components/ui/ScrollProgress.vue")['default']
  'UiSkillBar': typeof import("../../components/ui/SkillBar.vue")['default']
  'UiSocialLinks': typeof import("../../components/ui/SocialLinks.vue")['default']
  'UiToast': typeof import("../../components/ui/Toast.vue")['default']
  'NuxtWelcome': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  'NuxtPicture': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  'NuxtPage': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyCVDownloadModal': LazyComponent<typeof import("../../components/CVDownloadModal.vue")['default']>
  'LazyNavBar': LazyComponent<typeof import("../../components/NavBar.vue")['default']>
  'LazyUiAvailabilityBadge': LazyComponent<typeof import("../../components/ui/AvailabilityBadge.vue")['default']>
  'LazyUiBackToTop': LazyComponent<typeof import("../../components/ui/BackToTop.vue")['default']>
  'LazyUiScrollProgress': LazyComponent<typeof import("../../components/ui/ScrollProgress.vue")['default']>
  'LazyUiSkillBar': LazyComponent<typeof import("../../components/ui/SkillBar.vue")['default']>
  'LazyUiSocialLinks': LazyComponent<typeof import("../../components/ui/SocialLinks.vue")['default']>
  'LazyUiToast': LazyComponent<typeof import("../../components/ui/Toast.vue")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.20.1_@parcel+watcher@2.5.1_@types+node@22.19.1_@vue+compiler-sfc@3.5.24_db0@0.3._0915d026cab7872c68554e8791b35c4a/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
