// import { IconType } from "react-icons";
import './Button.scss';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    secondary?: boolean
    //   icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    secondary,
    //   icon: Icon,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                ${secondary ? 'secondary' : 'primary'}
                ${outline && 'outline'}
                ${small && 'small'}
            `}
        >
            {label.toUpperCase()}
        </button>
    );
}

export default Button;