import { icons } from "../../icons/icons";
import { ButtonPropsType } from "../../interfaces/SpaceFlightInterface";

function Button({
  onClick,
  disabled,
  icon,
  className,
  children,
}: ButtonPropsType) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={icons[icon]}></i>} {children && children}
    </button>
  );
}

export default Button;
