# Пошаговая инструкция запуска ФотоЭстейт в продакшн

---

## Шаг 1. Создание проекта в Supabase

1. Перейди на https://supabase.com и создай аккаунт (или войди)
2. Нажми **"New Project"**
3. Заполни:
   - **Name:** `fotoestate`
   - **Database Password:** придумай пароль (сохрани его!)
   - **Region:** выбери ближайший (например `eu-central-1` для Европы/России)
4. Дождись создания проекта (~2 минуты)

### 1.1 Получи ключи Supabase

После создания проекта:
1. Перейди в **Settings → API** (левое меню → шестерёнка → API)
2. Скопируй:
   - **Project URL** — это `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** — это `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** — это `SUPABASE_SERVICE_ROLE_KEY` (⚠️ секретный, не показывай на клиенте!)

### 1.2 Выполни SQL-схему базы данных

1. Перейди в **SQL Editor** (левое меню → иконка с молнией)
2. Нажми **"New Query"**
3. Скопируй содержимое файла `supabase-schema.sql` из проекта
4. Нажми **"Run"** (Ctrl+Enter)
5. Должно появиться "Success. No rows returned" — это нормально

Что создаётся:
- Таблица `users` (id, email, credits, plan)
- Таблица `generations` (история генераций)
- Таблица `payments` (история платежей)
- Триггер автосоздания пользователя при регистрации (2 бесплатных кредита)
- RLS-политики безопасности
- Storage bucket `images` для хранения фото

### 1.3 Настрой авторизацию

1. Перейди в **Authentication → Providers** (левое меню)
2. Убедись, что **Email** включён
3. В **Authentication → URL Configuration**:
   - **Site URL:** `https://твой-домен.ru` (или `http://localhost:3005` для разработки)
   - **Redirect URLs:** добавь `https://твой-домен.ru/api/auth/callback`

---

## Шаг 2. Получение ключа Replicate

1. Перейди на https://replicate.com и создай аккаунт
2. Перейди в **Account → API Tokens** (https://replicate.com/account/api-tokens)
3. Нажми **"Create Token"**
4. Скопируй токен — это `REPLICATE_API_TOKEN`

**Стоимость:** ~$0.002-0.01 за одну генерацию (зависит от модели). На $10 можно сделать ~1000-5000 генераций.

**Важно:** на бесплатном тарифе Replicate есть лимит. Для продакшна рекомендуется пополнить баланс ($10-50 для старта).

---

## Шаг 3. Создание .env.local

В корне проекта создай файл `.env.local`:

```bash
cp .env.local.example .env.local
```

Открой `.env.local` и заполни реальными значениями:

```env
# Supabase (из Шага 1.1)
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# Replicate (из Шага 2)
REPLICATE_API_TOKEN=r8_abc123def456...

# YooKassa (из Шага 5, можно заполнить позже)
YOKASSA_SHOP_ID=
YOKASSA_SECRET_KEY=

# URL приложения
NEXT_PUBLIC_APP_URL=http://localhost:3005
```

---

## Шаг 4. Проверка локально

```bash
# Установи зависимости (если не установлены)
npm install

# Запусти dev-сервер
npm run dev

# Открой http://localhost:3000
```

Проверь:
- [ ] Главная страница загружается
- [ ] Страница /auth — можно ввести email и получить магическую ссылку
- [ ] Страница /generate — загрузка фото работает
- [ ] После авторизации — генерация работает (изображение уходит в Replicate и возвращается результат)

---

## Шаг 5. Настройка ЮKassa (когда будешь готов к платежам)

### 5.1 Регистрация

1. Перейди на https://yookassa.ru
2. Зарегистрируйся как ИП или ООО (нужен ИНН)
3. Пройди модерацию (~1-3 рабочих дня)
4. В личном кабинете получи:
   - **shopId** — это `YOKASSA_SHOP_ID`
   - **Секретный ключ** — это `YOKASSA_SECRET_KEY`

### 5.2 Настройка вебхука

1. В личном кабинете ЮKassa → **Настройки → Уведомления**
2. Добавь URL: `https://твой-домен.ru/api/webhooks/yokassa`
3. Выбери события: `payment.succeeded`, `payment.canceled`
4. Сохрани

### 5.3 Тестовый режим

ЮKassa предоставляет тестовый режим — можно проверить платежи без реальных денег. Используй тестовые shopId и ключ из раздела "Тестовый магазин" в ЛК.

---

## Шаг 6. Деплой на Vercel

### 6.1 Подготовка

```bash
# Проверь, что проект собирается без ошибок
npm run build
```

### 6.2 Деплой

1. Перейди на https://vercel.com и войди через GitHub
2. Нажми **"Add New → Project"**
3. Импортируй репозиторий (если проект на GitHub) или используй CLI:

```bash
# Установи Vercel CLI
npm i -g vercel

# Деплой
vercel
```

4. При первом деплое Vercel спросит настройки — оставь по умолчанию

### 6.3 Переменные окружения

В Vercel Dashboard → твой проект → **Settings → Environment Variables**:

Добавь все переменные из `.env.local`:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` |
| `REPLICATE_API_TOKEN` | `r8_...` |
| `YOKASSA_SHOP_ID` | `123456` |
| `YOKASSA_SECRET_KEY` | `test_...` |
| `NEXT_PUBLIC_APP_URL` | `https://твой-домен.ru` |

После добавления нажми **"Redeploy"** чтобы переменные подхватились.

### 6.4 Свой домен

1. В Vercel → твой проект → **Settings → Domains**
2. Добавь свой домен (например `fotoestate.ru`)
3. Vercel покажет DNS-записи — добавь их у регистратора домена:
   - **A запись:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com`
4. SSL-сертификат выпустится автоматически (~5 минут)

---

## Шаг 7. Обновление URL в Supabase

После деплоя обнови URL в Supabase:

1. **Authentication → URL Configuration → Site URL:** `https://fotoestate.ru`
2. **Redirect URLs:** добавь `https://fotoestate.ru/api/auth/callback`

---

## Шаг 8. Мониторинг

### Vercel
- **Analytics:** Vercel Dashboard → Analytics (трафик, время загрузки)
- **Logs:** Vercel Dashboard → Deployments → выбрать деплой → Functions (серверные логи)

### Supabase
- **Database:** Supabase Dashboard → Table Editor (просмотр данных)
- **Auth:** Supabase Dashboard → Authentication → Users (зарегистрированные пользователи)
- **Storage:** Supabase Dashboard → Storage (загруженные изображения)

---

## Итоговый чеклист

- [ ] Supabase проект создан
- [ ] SQL-схема выполнена
- [ ] Авторизация настроена в Supabase
- [ ] Replicate токен получен
- [ ] `.env.local` заполнен
- [ ] Локально всё работает
- [ ] Проект задеплоен на Vercel
- [ ] Переменные окружения добавлены в Vercel
- [ ] Домен привязан
- [ ] URL обновлён в Supabase
- [ ] ЮKassa настроена (когда нужны платежи)
- [ ] Webhook ЮKassa указывает на продакшн URL

---

## Бюджет на старт

| Сервис | Стоимость |
|--------|-----------|
| Vercel (Hobby) | Бесплатно |
| Supabase (Free) | Бесплатно (до 500 МБ БД, 1 ГБ Storage) |
| Replicate | ~$10-50/мес (зависит от количества генераций) |
| Домен .ru | ~200-500 ₽/год |
| **Итого старт** | **~$10 + домен** |

При росте:
- Vercel Pro: $20/мес
- Supabase Pro: $25/мес
- Replicate: по потреблению
