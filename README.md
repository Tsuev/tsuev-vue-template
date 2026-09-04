# Tsuev Vue Template

[![npm version](https://img.shields.io/npm/v/tsuev-vue-template.svg)](https://www.npmjs.com/package/tsuev-vue-template)
[![npm downloads](https://img.shields.io/npm/dm/tsuev-vue-template.svg)](https://www.npmjs.com/package/tsuev-vue-template)


Стартовый бойлерплейт для приложений на Vue 3. В проекте заранее настроены Vite, TypeScript, Tailwind CSS, PrimeVue, Pinia, Vue Router, Supabase, Axios и VueUse.

Шаблон подходит как основа для SPA: можно сразу добавлять страницы, бизнес-логику, авторизацию, API-интеграции и переиспользуемые UI-компоненты.

## Возможности

- Vue 3 с `<script setup>` и TypeScript.
- Vite для разработки и production-сборки.
- Tailwind CSS v4 через официальный Vite-плагин.
- PrimeVue v4 с темой Aura.
- `tailwind-variants` для вариантов и слотов компонентов.
- `tailwind-merge` для безопасного объединения Tailwind-классов.
- Pinia для глобального состояния.
- Vue Router с history API.
- Supabase-клиент и заготовка регистрации пользователя.
- Axios-инстанс с базовым URL и Bearer-токеном.
- VueUse и composable для адаптивных брейкпоинтов.
- ESLint, Prettier и проверка типов через `vue-tsc`.
- Vue DevTools в режиме разработки.

## Быстрый старт

### Установка из исходников

```bash
git clone <URL_РЕПОЗИТОРИЯ>
cd tsuev-vue-template
npm install
```

### Установка через npx

Если пакет опубликован в npm, проект можно создать командой:

```bash
npx tsuev-vue-template
```

После выполнения перейдите в созданную директорию:

```bash
cd <имя-проекта>
npm install
npm run dev
```

### Переменные окружения

Создайте локальный `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните значения:

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_KEY=<supabase-anon-key>
VITE_API_BASE_URL=https://api.example.com
```

| Переменная | Обязательность | Назначение |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Для Supabase | URL проекта Supabase. |
| `VITE_SUPABASE_KEY` | Для Supabase | Публичный `anon` key Supabase. |
| `VITE_API_BASE_URL` | Для REST API | Базовый URL, который используется Axios. |

Все переменные с префиксом `VITE_` попадают в клиентский bundle. Не размещайте в `.env` секретные ключи, service-role key и другие credentials, которые нельзя показывать браузеру. Файл `.env` игнорируется Git.

Для локального запуска Supabase-переменные могут оставаться пустыми, если Supabase не используется. Но `createClient` ожидает корректные значения в момент вызова `useSupabase()`.

## Команды

```bash
# Запустить dev-сервер с доступом по локальной сети
npm run dev

# Проверить типы и собрать production-версию
npm run build

# Только production-сборка без проверки типов
npm run build-only

# Предпросмотр собранного приложения
npm run preview

# Проверить ESLint и автоматически исправить доступные проблемы
npm run lint

# Отформатировать исходники Prettier
npm run format

# Только проверка типов
npm run type-check
```

После `npm run build` готовые файлы находятся в `dist/`. Команда `npm run build` сначала запускает проверку типов, затем Vite-сборку.

В текущем бойлерплейте не настроены unit- и e2e-тесты: скриптов `test:unit` и `test:e2e` в `package.json` нет. При необходимости их можно добавить отдельно, например с Vitest и Playwright.

## Архитектура проекта

```text
.
├── index.html                 # HTML-точка входа
├── vite.config.ts             # Vite, Vue, Tailwind и alias @
├── tsconfig*.json             # Конфигурация TypeScript
├── eslint.config.ts           # ESLint flat config
├── .env.example               # Пример переменных окружения
└── src/
    ├── main.ts                # Создание и настройка Vue-приложения
    ├── App.vue                # Корневой компонент; отображает RouterView
    ├── assets/main.css        # Подключение Tailwind CSS
    ├── router/index.ts        # Маршруты приложения
    ├── layouts/default.vue    # Базовый layout со slot
    ├── views/HomeView.vue     # Главная страница-пример
    ├── components/            # UI-компоненты (создаётся по мере роста)
    ├── composables/           # Переиспользуемая Composition API-логика
    ├── services/              # Внешние API и интеграции
    ├── stores/                # Pinia stores
    ├── constants/             # Константы приложения
    ├── enums/                 # TypeScript enum
    └── types/                 # Общие TypeScript-типы
```

Папки `components/` пока нет в репозитории — её можно создать при добавлении компонентов. Пустые `useExample.ts` и `constants.ts`, а также примерные `counter.ts`, `enum.ts`, `types.ts` предназначены для адаптации под конкретный продукт.

## Точка входа и плагины

`src/main.ts` создаёт приложение и подключает Pinia, Router и PrimeVue с пресетом Aura. Глобальные стили подключаются из `src/assets/main.css`.

Tailwind v4 подключён через `@import "tailwindcss";` и `@tailwindcss/vite`, поэтому отдельный `tailwind.config.js` для текущей конфигурации не нужен.

Alias `@` указывает на `src`:

```ts
import { useSupabase } from '@/composables/useSupabase'
```

## Tailwind CSS

Tailwind-классы можно использовать непосредственно в шаблонах Vue:

```vue
<template>
  <button class="rounded-lg px-4 py-2 text-white">
    Сохранить
  </button>
</template>
```

Для классов с вариантами используется `tailwind-variants`:

```ts
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'rounded-lg px-4 py-2',
  variants: {
    color: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-slate-200 text-slate-900',
    },
  },
})

button({ color: 'primary' })
```

`tailwind-merge` полезен, когда пользовательские классы должны переопределять базовые.

PrimeVue и Tailwind отвечают за разные уровни UI: PrimeVue предоставляет готовые интерактивные компоненты, Tailwind — layout, spacing, responsive-стили и кастомное оформление.

## PrimeVue

PrimeVue подключён глобально с пресетом Aura. Компоненты можно импортировать локально:

```vue
<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <Button label="Продолжить" />
</template>
```

Пакет `@primevue/forms` также установлен для построения форм и валидации.

## Маршрутизация и layouts

Маршруты находятся в `src/router/index.ts`. Сейчас `/` ведёт на `HomeView.vue`.

Новый маршрут добавляется так:

```ts
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
]
```

`src/layouts/default.vue` содержит базовый layout со слотом. Его можно расширить общими header/sidebar/footer и использовать вокруг содержимого страниц.

## Supabase и авторизация

`src/composables/useSupabase.ts` создаёт Supabase-клиент из `VITE_SUPABASE_URL` и `VITE_SUPABASE_KEY`:

```ts
import { useSupabase } from '@/composables/useSupabase'

const { supabase } = useSupabase()
const { data, error } = await supabase.from('profiles').select('*')
```

В `src/services/authServices.ts` есть пример регистрации:

```ts
import { signUp } from '@/services/authServices'

const user = await signUp('user@example.com', 'strong-password')
```

Сервис передаёт в metadata пустое поле `nickname`. В production добавьте обработку ошибок, состояния загрузки, подтверждения email и сессии пользователя. `VITE_SUPABASE_KEY` должен быть только публичным anon key; политики RLS в Supabase обязательны для защиты данных.

## REST API и Axios

`src/services/index.ts` экспортирует общий Axios-инстанс:

- `baseURL` берётся из `VITE_API_BASE_URL`;
- перед каждым запросом из `localStorage` читается `token`;
- при наличии токена добавляется `Authorization: Bearer <token>`;
- ответ со статусом `401` логируется и пробрасывается дальше.

Новый сервис создаётся в `src/services/`:

```ts
import axiosInstance from './index'

export async function getUsers() {
  const { data } = await axiosInstance.get('/users')
  return data
}
```

Текущий `src/services/example.ts` содержит демонстрационный запрос на `/Any`; замените его на реальные endpoint'ы проекта.

## Pinia

Store создаются в `src/stores/`. В репозитории есть демонстрационный `counter` store:

```ts
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
counter.increment()
```

Для каждого домена рекомендуется отдельный store: например, `useAuthStore`, `useCartStore` или `useProfileStore`.

## Composables и адаптивность

`src/composables/useBreakpoints.ts` построен на VueUse и считает экран мобильным при ширине меньше `1024px`:

```ts
import { useBreakpoints } from '@/composables/useBreakpoints'

const { mobile } = useBreakpoints()
```

Composables предназначены для переиспользуемой логики: запросов, browser API, breakpoint-логики, Supabase и т. д.

## Рекомендованный рабочий процесс

1. Скопируйте `.env.example` в `.env` и заполните нужные значения.
2. Добавьте страницу в `src/views/` и маршрут в `src/router/index.ts`.
3. Вынесите повторяющийся UI в `src/components/`.
4. Вынесите API-вызовы в `src/services/`, состояние — в `src/stores/`, повторяемую Composition API-логику — в `src/composables/`.
5. Перед коммитом запустите `npm run lint`, `npm run type-check` и `npm run build`.

## Совместимость и требования

- Node.js 22 рекомендуется конфигурацией `@tsconfig/node22`.
- npm используется для установки зависимостей и запуска скриптов.
- Браузер должен поддерживать современные возможности Vue 3, ES-модулей и Web APIs.

## IDE

Для VS Code рекомендуются расширения из `.vscode/extensions.json`: Vue - Official (Volar), ESLint, Prettier и EditorConfig. Vitest Explorer и Playwright пригодятся после добавления соответствующих тестов.

Vetur использовать не нужно, если установлен Volar.

## Лицензия

Проект распространяется под лицензией MIT. Полный текст лицензии находится в файле [LICENSE](./LICENSE).
