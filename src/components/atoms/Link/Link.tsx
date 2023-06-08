import classNames from "classnames/dedupe";

import './Link.scss'

type LinkProps = {
  children: React.ReactNode;
  className: string;
  to: string;
  color: string;
};

const Link = ({ children, className, to, color, ...rest }: LinkProps) => {
  const classes = classNames(className, "Link", {
    [`Link_color_${color}`]: color,
  })

  return (
    <a className={classes} href={to}>{children}</a>
  )
};

export default Link;
