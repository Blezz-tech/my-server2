# my-server


# Техническая документация

## Введение

REST API (Representational State Transfer Application Programming Interface) – это архитектурный стиль для разработки веб-сервисов, который основан на принципах REST. REST API позволяет взаимодействовать с удаленным сервером и обмениваться данными между клиентом и сервером посредством HTTP-протокола.

REST API предоставляет набор эндпоинтов (URL-адресов), по которым можно отправлять запросы и получать ответы. Каждый эндпоинт соответствует определенному ресурсу (например, пользователю, товару, заказу и т.д.), и с помощью различных HTTP-методов (GET, POST, PUT, DELETE) можно выполнять операции с этими ресурсами (получение, создание, обновление, удаление).

REST API обычно использует формат данных JSON или XML для представления информации, которая передается между клиентом и сервером. Он также может поддерживать аутентификацию и авторизацию для обеспечения безопасности при работе с данными.

REST API широко применяется в различных областях, включая веб-разработку, мобильные приложения, социальные сети, интернет-магазины и другие системы, где требуется взаимодействие с удаленными серверами и обмен данными.

Если вы хотите более подробно узнать что такое REST API, можете прочитать статью на хабре [ССЫЛКА](https://habr.com/ru/articles/590679/)

## Установка

Для работы проекта необходимы следующие программы: `nodejs`, `nix`, `git`

Создайте папку `projects` где хотите

Откройте её в консоли

В консоли запустите

```bash
git clone https://github.com/Blezz-tech/my-server.git
```

Установка необходимых пакетов для nodejs

```bash
npm i
```

Установка Базы данных

```bash
direnv allow
```

Запуск базы данных

```bash
devenv up
```

Запуск проекта

```bash
npm run dev
```

## Структура проекта

```
.
├── db-connect.sh
├── tasks
│   └── 3_Модуль.pdf
├── flake.lock
├── flake.nix
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── config.ts
│   ├── controllers
│   │   ├── adminController.ts
│   │   ├── clientController.ts
│   │   ├── hotelController.ts
│   │   ├── roomController.ts
│   │   └── tokenController.ts
│   ├── entity
│   │   ├── Admins.ts
│   │   ├── Clients.ts
│   │   ├── Hotels.ts
│   │   ├── Rooms.ts
│   │   └── Tokens.ts
│   ├── index.ts
│   ├── routes
│   │   ├── hotelRouter.ts
│   │   ├── index.ts
│   │   ├── loginRouter.ts
│   │   ├── registerRouter.ts
│   │   ├── roomRouter.ts
│   │   ├── roomsRouter.ts
│   │   ├── signupRouter.ts
│   │   ├── userdataRouter.ts
│   │   └── usersinroomRouter.ts
│   └── utils
│       ├── auth.ts
│       ├── helper.ts
│       └── jwt.ts
└── tsconfig.json
```

- `.env` Файл с 
- `.envrc` `flake.lock` `flake.nix` Файлы для установки базы данных
- `package.json` `package-lock.json` содержит информацию о проекте и его зависимостях
- `db-connect.sh` Скрипт подключения к базе данных
- `tsconfig.json` Содержит конфигурацию для TypeScript
- `README.md` Проектная документация
- `tasks/3_Модуль.pdf` Задание
- `src/` Папка с непосредственны кодом

Всё что внутри `src/`

- `controllers/` Контроллеры, обрабатывающие HTTP-запросы и взаимодействующие с моделями данных
- `entity/` Модели данных, представляющие таблицы в базе данных
- `routes/` Маршруты, определяющие URL-адреса, по которым будет доступно приложение
- `utils/` Вспомогательные программы используемые по всему приложению
- `config.ts` Конфигурация для использования приложением
- `index.ts` Главный файл приложения

## Работа с базой данных

Запуск БД описывается в [Установка](#Установка)


### Установка Базы данных

```bash
direnv allow
```

### Запуск базы данных

```bash
devenv up
```

### Создание моделей

Создаётся файл в папке `/src/entity/`

Пример `/src/entity/Rooms`

```js
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Rooms {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    name: String

    @Column()
    desc_data: String
}
```

и необходимо добавить его в массив моделей в файл `/src/config.ts`, там где создаётся база данных

```js
entities: [Admins, Tokens, Rooms, Clients, Hotels],
```

## Маршруты и контроллеры

### Маршруты

Маршруты в Express.js определяют, как приложение отвечает на клиентский запрос к конкретному адресу (URI). Они связывают HTTP действия (GET, POST, PUT, DELETE, etc.)

Все маршруты храняться в `/src/routes/`

Главный роутер находится в файле `/src/routes/index.ts`

Его мы используем в файле `/src/index.ts`

### Контроллеры

Контроллеры в Express.js - это функции, которые обрабатывают входящие HTTP-запросы.

Храняться в папке `/src/controllers/`


## Тестирование

Postman - это инструмент для создания, тестирования, документирования, публикации и обслуживания API. Он позволяет создавать коллекции запросов к любому API, применять к ним разные окружения, настраивать мок-серверы, писать автотесты на JavaScript, анализировать и визуализировать результаты запросов 2.

Начало работы с Postman

Скачайте и установите Postman с официального сайта 2.
После установки откройте приложение и создайте новое рабочее пространство. В левой боковой панели вы можете организовывать свое пространство 5.
Создайте новую коллекцию. Коллекция - это группа связанных запросов. Обычно API описывается в одной коллекции, но если вы хотите, то нет никаких ограничений сделать по-другому 5.

Внутри коллекции вы можете создать папки для группировки запросов по смыслу выполняемых действий. Например, вы можете создать папку для первой версии своего API — "v1", а внутри сгруппировать запросы по смыслу выполняемых действий — "Order & Checkout", "User profile" и т. п 5.

Создайте новый запрос внутри папки. Запрос создается в конструкторе, где вы можете выбрать метод (GET, POST, PUT, DELETE и т.д.), указать URL и отправить запрос 5.
Работа с переменными в Postman

В Postman можно создавать переменные разных уровней: глобальные, коллекции, окружения и локальные. Глобальные переменные применяются ко всему рабочему пространству, переменные коллекции создаются внутри конкретной коллекции и работают только внутри нее, переменные окружения задаются на уровне окружения, а локальные переменные существуют на уровне скриптов, которые выполняются при отправке запросов 2.

Тестирование API с помощью Postman

Postman позволяет создавать тесты для проверки ответов от сервера. Тестировщик может определить ожидаемые значения и условия, чтобы автоматически проверить, что API возвращает правильные результаты. Вы можете прописывать свои тесты во вкладке «Tests» для запроса, где можно создавать скрипты, делать проверки и многое другое 5.

Запуск всей коллекции Postman

Если вы хотите запустить не один запрос, а пройтись сразу по нескольким, либо же запустить даже всю коллекцию - перейдите в опции коллекции/папки и выберите «Run». Далее, выберите, какие запросы вы хотите прогнать и можете поменять порядок их запуска 5.

1. [Как пользоваться программой Postman](https://timeweb.com/ru/community/articles/kak-polzovatsya-postman)
2. [Postman для REST API запросов. Быстрый старт и переменные](https://www.youtube.com/watch?v=A_jGdrGRLd0)

## Развертывание

В разработке

## Поддержка и обслуживание

В разработке

## Пакеты используемые в проекте, но не допущенные по тз

- jsonwebtoken
- express-validator

## Курсы для изучения

1. [Node.js and Express.js - Full Course](https://www.youtube.com/watch?v=Oe421EPjeBE)
  - [github repo node-express-course](https://github.com/john-smilga/node-express-course)
2. [Node.js, Express, TypeORM, PostgreSQL: CRUD Rest API](https://codevoweb.com/node-express-typeorm-postgresql-rest-api/)