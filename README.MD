Before starting the project, you need to upload the database dump to your server. The t-shirts database file is located in the database folder at the root of the project.
#

Please add your database login and password in .env (DB_PASS and DB_PASS).
#

To start in production mode, you need to start the server and client with the npm start command from the root of the project. The project will be launched at the address http: // localhost: 4000 /
#
To run in development mode, replace NODE_ENV = production with NODE_ENV = development in the .env file. The launch is performed using the npm run dev command

#
# Task:
Выполняется в связке Node.js + (React.js или Angular.js на Ваш выбор)
Разработка магазина футболок:

Внешний вид можно взять за основу этого магазина:
https://megafutbolka.com.ua/hits/avokado-y-sport?basisurl=uni

Категории товаров - одноуровневые, без вложений.
Одна футболка может быть в разных категоряих.
Пример категорий:
- Авто, мото
- Айтишникам
- Интернет приколы
- Музыка
- Праздники
- Юмор

Опции 1ой футболки:
У каждой футболки есть название, у каждой есть любой тип:
- Мужская
- Унисекс
- Женская
- Детская
- Длинный рукав
- Ringer

Основной цвет футболки:
до 7 цветов (красный, черный, белый и т.д.)

Размер:
S,M,L,XL

Состав материала только один на футболку с одним названием:
- хлопок 100%
- хлопок 90%, полиэстер 10%
- хлопок 95%, вискоза 5%

------------


- Обязательный атрибут цена, скидок нет.
- У клиента есть своя учетная запись (регистрируется) (обязательные поля - имя, номер телефона, емэйл и пароль)
- Только залогиненный клиент может положить товар в корзину и купить, просмотреть свои заказы и их статусы.
- Клиент может работать с корзиной товаров на разных устройствах и браузерах.
- Может просматривать свои заказы таблицей/списком и детально любой из них.
- Доставка - Новая почта - стоимость 0
- Оплата - наложенным платежом, при получении.

Система управления сайтом/покупками/товарами/клиентами (Админка) не обязательна.
