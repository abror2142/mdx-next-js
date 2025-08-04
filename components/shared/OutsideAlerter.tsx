import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

interface OutsideAlerterProps {
  children: React.ReactNode;
  func: () => void;
  className?: string;
}

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    function handleFocusIn(event: FocusEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleFocusIn); // <- Added

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusIn);
    }
  }, [ref, callback]);
}

function OutsideAlerter({ children, func, className }: OutsideAlerterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, func);

  return <div className={className} ref={wrapperRef}>{children}</div>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.node.isRequired,
  func: PropTypes.func.isRequired,
};

export default OutsideAlerter;
