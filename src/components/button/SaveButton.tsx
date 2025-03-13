import { useTranslation } from 'react-i18next'

import Button from './Button'

export default function SaveButton() {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:disk" htmlType="submit">
      {t('common.save')}
    </Button>
  )
}
