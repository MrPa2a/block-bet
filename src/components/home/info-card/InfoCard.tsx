import './InfoCard.scss'

interface InfoCardProps {
    title: string;
    content: string;
    color?: string;
    outline?: boolean;
    noImage?: boolean
    //   icon?: IconType;
}

const InfoCard: React.FC<InfoCardProps> = ({
    title,
    content,
    color = 'primary',
    outline,
    noImage = false
    //   icon: Icon,
}) => {
    return (
        <div className={`card ${color ?? ''} ${outline ?? ''}`}>
            <div className="title">
                {title}
            </div>
            <div className="content-wrapper">
                {!noImage && <div className="image">
                    <img src="/public/assets/dice.png" />
                </div>}
                <div className="content">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default InfoCard;