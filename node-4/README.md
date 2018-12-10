# Домашнее задание node-4  
## Требования  
Работа с потоками в NodeJS
Написать приложение, демонстрирующее работу с потоками в `NodeJS`: 
- Readable, генерирующий случайные числа, 
- Transformable, добавляющий случайное число к первому и 
- Writable, выводящий данные в консоль.

Данные должны “течь” readable -> transformable -> writable
Используйте highWaterMark для ограничения внутреннего буффера.  

## Реализация
Скрипт streams.js создает и перенаправляет потоки readable -> transform -> writable.  
Поток readable генерирует случайные числа и возвращает их в виде объекта Number.   
Поток transform добавляет к входным данным случайные числа и возвращает их в формате String.  
Поток writable выводит входные параметры в консоль c заданным периодом времени.
  
Скрипт принимает на вход следующие параметры:   
*   timeout - время задержки вывода в консоль в потоке writable
*   readablewm - параметр highWaterMark для readable-потока
*   transformwm - параметр highWaterMark для transform-потока  
*   writablewm - параметр highWaterMark для writable-потока  

Если параметры не указаны, берутся значения по умолчанию.  

## Примеры запуска  
```bash
node streams.js

node streams.js timeout=100 

node streams.js timeout=100 readablewm=3 transformwm=5 writablewm=20

node streams.js timeout=1000 readablewm=100 transformwm=14 writablewm=100
```
