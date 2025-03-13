import { useTranslation } from 'react-i18next'

import Button from './Button'

interface CreateButtonProps {
  noText?: boolean
}

export default function CreateButton({ noText = false }: CreateButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:add-one">
      {noText ? '' : t('common.create')}
    </Button>
  )
}
