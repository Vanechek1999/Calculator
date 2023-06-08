import classNames from "classnames/dedupe";

import Lottie from "lottie-react";

import preloader from "../../../lottie/preloader.json";

import "./Preloader.scss";

type PreloaderProps = {
  className?: string;
  loading: string;
  inForm: boolean;
  size: string;
};

const Preloader = ({
  className,
  loading,
  inForm = true,
  size = "96px",
}: PreloaderProps) => {
  const classes = classNames(className, "Preloader", {
    [`Preloader_${loading}`]: loading,
    Preloader_form: inForm,
  });

  const stylesSvg = {
    width: size,
    height: size,
    top: `-${size}`,
    right: `-${size}`,
    bottom: `-${size}`,
    left: `-${size}`,
  };

  return (
    <div className={classes}>
      <Lottie
        animationData={preloader}
        className="Preloader-Icon"
        type="preloader"
        style={stylesSvg}
      />
    </div>
  );
};

export default Preloader;
