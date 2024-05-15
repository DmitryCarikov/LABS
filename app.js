// Определяем массив объектов
const items = [
    {
        name: "Брошюра",
        description: "Полноцветная брошюра в мягкой обложке",
        price: "500 руб.",
        imageUrl: "https://icolorit.ru/wp-content/uploads/image-7.png"
    },
    {
        name: "Визитки",
        description: "Комплект из 100 штук",
        price: "300 руб.",
        imageUrl: "https://ottisk.com/wp-content/uploads/2020/09/Pechat-vizitok.png"
    },
    {
        name: "Плакаты",
        description: "Плакаты формата A1",
        price: "200 руб.",
        imageUrl: "https://im.kommersant.ru/CorpImages/Projects/posters9may/posters/1600w/3ce3a013.jpg"
    }
];

// Создаем компонент для отображения таблицы
const ItemsTable = (props) => {
    const { companyName, items } = props;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            `Компания: ${companyName}`
        ),
        React.createElement(
            'table',
            { border: '1' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement('th', null, 'Наименование'),
                    React.createElement('th', null, 'Описание'),
                    React.createElement('th', null, 'Цена'),
                    React.createElement('th', null, 'Изображение')
                )
            ),
            React.createElement(
                'tbody',
                null,
                items.map((item, index) =>
                    React.createElement(
                        'tr',
                        { key: index },
                        React.createElement('td', null, item.name),
                        React.createElement('td', null, item.description),
                        React.createElement('td', null, item.price),
                        React.createElement(
                            'td',
                            null,
                            React.createElement('img', { src: item.imageUrl, alt: item.name, width: 100 })
                        )
                    )
                )
            )
        )
    );
};

// Определяем типы для props
ItemsTable.propTypes = {
    companyName: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired
        })
    ).isRequired
};

// Вставляем компонент в DOM
const rootElement = document.getElementById('root');
ReactDOM.render(React.createElement(ItemsTable, { companyName: "Полиграфия Агарина", items: items }), rootElement);