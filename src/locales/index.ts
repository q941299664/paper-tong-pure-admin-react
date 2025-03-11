// import messages from '@intlify/unplugin-vue-i18n/messages'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_LOCALE } from '@/constants/app'
import enUS from '@/locales/langs/en-US.json'
import zhCN from '@/locales/langs/zh-CN.json'
import { useAppStore } from '@/stores'

const { currentLocale } = useAppStore.getState()

const locales = {
  'en-US': {
    translation: enUS,
  },
  'zh-CN': {
    translation: zhCN,
  },
}

export const reactI18nextInstance = i18n.use(initReactI18next)

export async function setupI18n() {
  await reactI18nextInstance.init({
    interpolation: {
      escapeValue: false,
    },
    lng: currentLocale || DEFAULT_LOCALE,
    resources: locales,
  })
}
