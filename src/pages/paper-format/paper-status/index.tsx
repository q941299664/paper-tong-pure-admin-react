import { useTranslation } from 'react-i18next'

import { FormContainer } from '@/components/container'

export default function PaperStatusPaperFormat() {
  const { t } = useTranslation()

  return (
    <FormContainer title={t("page.paperStatus.title")}>

    </FormContainer>
  )
}
