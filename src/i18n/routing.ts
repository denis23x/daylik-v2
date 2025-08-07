import { defineRouting } from 'next-intl/routing';
import { LOCALES } from '@/lib/constants';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: 'en',
  pathnames: {
    '/': {
      de: '/',
      es: '/',
      en: '/',
      ru: '/',
    },
    '/login': {
      de: '/anmelden',
      es: '/iniciar-sesion',
      en: '/login',
      ru: '/вход',
    },
    '/reset-password': {
      de: '/passwort-zurücksetzen',
      es: '/restablecer-contraseña',
      en: '/reset-password',
      ru: '/сброс-пароля',
    },
    '/signup': {
      de: '/registrieren',
      es: '/registro',
      en: '/signup',
      ru: '/регистрация',
    },
    '/verify-email': {
      de: '/email-bestätigen',
      es: '/verificar-correo',
      en: '/verify-email',
      ru: '/подтвердить-почту',
    },
    '/analytics/[UUID]': {
      de: '/analysen/[UUID]',
      es: '/analiticas/[UUID]',
      en: '/analytics/[UUID]',
      ru: '/аналитика/[UUID]',
    },
    '/settings': {
      de: '/einstellungen',
      es: '/configuracion',
      en: '/settings',
      ru: '/настройки',
    },
    '/sync/[UUID]/live': {
      de: '/sync/[UUID]/live',
      es: '/sync/[UUID]/en-vivo',
      en: '/sync/[UUID]/live',
      ru: '/синк/[UUID]/онлайн',
    },
    '/sync/[UUID]/settings': {
      de: '/sync/[UUID]/einstellungen',
      es: '/sync/[UUID]/configuracion',
      en: '/sync/[UUID]/settings',
      ru: '/синк/[UUID]/настройки',
    },
    '/teammates': {
      de: '/teammitglieder',
      es: '/compañeros',
      en: '/teammates',
      ru: '/тиммейты',
    },
    '/teams': {
      de: '/teams',
      es: '/equipos',
      en: '/teams',
      ru: '/команды',
    },
    '/retros/[UUID]': {
      de: '/retros/[UUID]',
      es: '/retros/[UUID]',
      en: '/retros/[UUID]',
      ru: '/ретро/[UUID]',
    },
    '/legal/cookies-policy': {
      de: '/rechtliches/cookie-richtlinie',
      es: '/legal/política-de-cookies',
      en: '/legal/cookies-policy',
      ru: '/политики/политика-использования-файлов-cookie',
    },
    '/legal/privacy-policy': {
      de: '/rechtliches/datenschutzrichtlinie',
      es: '/legal/política-de-privacidad',
      en: '/legal/privacy-policy',
      ru: '/политики/политика-конфиденциальности',
    },
    '/legal/terms-and-conditions': {
      de: '/rechtliches/nutzungsbedingungen',
      es: '/legal/términos-y-condiciones',
      en: '/legal/terms-and-conditions',
      ru: '/политики/условия-использования',
    },
  },
});
