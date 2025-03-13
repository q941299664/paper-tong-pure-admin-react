import { useTranslation } from 'react-i18next'

import Button from './Button'

export default function RefreshButton() {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:refresh">
      {t('common.refresh')}
    </Button>
  )
}
