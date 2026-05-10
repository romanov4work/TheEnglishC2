# The English C2

Мобильное приложение (Web, Android, iOS) для изучения английского до уровня **C1**. Заменяет полноценного репетитора через системный подход, а не игровые механики.

## Стек

- **React Native** + **Expo** (SDK 55)
- **React Navigation** (native-stack)
- **React** 19

## Запуск

```bash
npm install

# Web (браузер)
npm run web

# Expo Go (QR-код для телефона)
npm start

# Эмуляторы
npm run android
npm run ios
```

В Windsurf/VS Code доступны задачи: **Ctrl+Shift+B** запускает `Expo: Start Web`.

## Структура

```
App.js                      # точка входа + навигация
components/
  PlaceholderScreen.js      # общий экран-заглушка с кнопкой назад
page_home/                  # главный экран с 7 плитками модулей
page_vocabulary/            # модуль «Слова»
page_grammar/               # модуль «Грамматика»
page_pronunciation/         # модуль «Произношение»
page_reading/               # модуль «Читаем»
page_writing/               # модуль «Пишем»
page_listening/             # модуль «Слушаем»
page_speaking/              # модуль «Говорим»
assets/                     # иконки и splash (пусто — ассеты не добавлены)
GrammarBook.md              # справочник грамматики (контент)
CLAUDE.md                   # инструкции и roadmap проекта
```

## 7 модулей

1. **Vocabulary** — Слова
2. **Grammar** — Грамматика
3. **Pronunciation** — Произношение
4. **Reading** — Читаем
5. **Writing** — Пишем
6. **Listening** — Слушаем
7. **Speaking** — Говорим

Пока все модули — заглушки. Следующий шаг: MVP модуля Vocabulary (список слов + карточки + TTS + прогресс).

## Workflow разработки

См. `CLAUDE.md`. Кратко:

1. Задача → одобрение
2. План реализации → одобрение
3. Разработка на отдельной ветке `feature/*`
4. Самопроверка консоли с запущенным проектом
5. Commit + push в ветку
6. Merge после проверки

## Секреты

Локальные ключи/токены держим в `settings.json` или `.env.local` — оба в `.gitignore`. **Никогда не коммитим секреты.**
