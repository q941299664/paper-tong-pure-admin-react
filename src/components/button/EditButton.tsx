import { useTranslation } from 'react-i18next'

import Button from './Button'

interface EditButtonProps {
  noText?: boolean
}

export default function EditButton({ noText = false }: EditButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:edit">
      {noText ? '' : t('common.edit')}
    </Button>
  )
}
