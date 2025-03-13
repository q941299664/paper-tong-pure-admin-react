import { useTranslation } from 'react-i18next'

import Button from './Button'

export default function ResetButton() {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:undo">
      {t('common.reset')}
    </Button>
  )
}
