# PiggyBank

В проекте две основных фолдера client и hardhat. Client отвечает за весь фронт на next.js. В hardhat лежат контракты и скрипт для деплоя.

Client.
Чтобы у вас всё заработало вам нужно скачать проект. Открыть его в терминале. Перейти в папку client командой `cd client`. Прописать всего две команды `npm install` а потом `npx next dev`

Hardhat.
Так же качаем проект, только переходим уже в папку hardhat командой `cd hardhat`. Дальше `npm install` чтобы всё установить. Внутри стандартная труктура hardhat. В папке contracts лежат все контракты. В папке scritps скприпт деплоя. Там же в комменте указана команда, чтобы его запустить. Конфиг трогать не надо, я туда уже всё вписал. В том числе и приватник для деплоя.