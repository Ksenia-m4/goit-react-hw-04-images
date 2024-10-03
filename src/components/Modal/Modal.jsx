import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { Overlay, ModalImage } from "./Modal.styled.js";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children: { largeImageURL, alt } }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalImage>
        <img src={largeImageURL} alt={alt} />
      </ModalImage>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
