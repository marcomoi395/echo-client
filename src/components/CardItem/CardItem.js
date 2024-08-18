import './CardItem.scss'

const CardItem = ({title, children}) => {
    return (<>
            <div className="card__item">
                <div className="card_title">
                    <p>{title}</p>
                </div>
                <div className="card__content">
                    {children}
                </div>
            </div>

        </>)
}

export default CardItem;