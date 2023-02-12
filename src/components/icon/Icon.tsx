import React from "react";

interface Props {
  icon: React.ReactElement;
  classNameIcon?: string;
  classNameTitle?: string;
  className?: string;
  title?: string;
}

const Icon: React.FC<Props> = ({
  icon,
  classNameIcon,
  classNameTitle,
  className,
  title
}) => {
  return (
    <div className={className}>
      <span className={classNameIcon}>{icon}</span>
      <div className={classNameTitle}>{title}</div>
    </div>
  );
};

export default Icon;
