import { Button } from 'app/components/Button';
import { Input } from 'app/components/Form';
import { Formik } from 'formik';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type Form = {
  link: string;
};

export const GoToGame: React.FC = () => {
  const { t } = useTranslation();

  const onSubmit = async ({ link }: Form) => {
    window.location.assign(link);
  };
  return (
    <Formik
      initialValues={{
        link: '',
      }}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <form
          onSubmit={formikProps.handleSubmit}
          className="flex flex-col items-center"
        >
          <h2 className="text-brilliance-secondary-main">
            {t(translations.game.joinAGame)}
          </h2>
          <Input
            name="link"
            placeholder={t(translations.game.gameLink)}
            label={t(translations.game.gameLink)}
          />
          <Button
            type="submit"
            disabled={formikProps.isSubmitting || !formikProps.values.link}
            className="mt-4"
            gameName="brilliance"
          >
            {t(translations.game.goToGame)}
          </Button>
        </form>
      )}
    </Formik>
  );
};
