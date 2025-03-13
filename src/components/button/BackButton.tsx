import { useTranslation } from 'react-i18next'

import Button from './Button'

export default function BackButton() {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:left">
      {t('common.back')}
    </Button>
  )
}
