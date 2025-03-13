import { useTranslation } from 'react-i18next'

import Button from './Button'

export default function SearchButton() {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:search" htmlType="submit">
      {t('common.search')}
    </Button>
  )
}
