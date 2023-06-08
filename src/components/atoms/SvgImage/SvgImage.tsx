import { HandySvg } from "handy-svg";

import menu from "./svgs/menu.svg";

type SvgImageProps = {
  type: string;
  size?: number;
  className?: string;
};

function SvgImage({ type, size = 24 }: SvgImageProps) {
  const svgTypes = { menu: menu };

  return (
    <HandySvg
      src={svgTypes[type as keyof typeof svgTypes]}
      width={size}
      height={size}
    />
  );
}

export default SvgImage;
