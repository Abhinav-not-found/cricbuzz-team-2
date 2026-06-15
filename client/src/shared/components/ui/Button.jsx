import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const variants = {
  default: "bg-neutral-900 text-white hover:bg-neutral-700",
  ghost: "text-black hover:bg-neutral-100",
  outline: "text-black border border-neutral-400 hover:bg-neutral-100",
  disabled: "bg-neutral-400 text-white",
}
const sizes = {
  default: "py-2 px-3 text-sm",
  sm: "py-2 px-3 text-xs",
  icon: "size-10 flex items-center justify-center",
}

const Button = ({
  children,
  disabled,
  className,
  onClick,
  type = "button",
  variant = "default",
  size = "default",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        clsx(
          "rounded-lg cursor-pointer active:scale-97 font-normal tracking-normal select-none",
          variants[variant],
          sizes[size],
          className,
        ),
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
