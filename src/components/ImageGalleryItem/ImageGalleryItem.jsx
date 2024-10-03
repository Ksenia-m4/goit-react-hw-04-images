import PropTypes from "prop-types";

import { GalleryImage, GalleryItem } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ webformatURL, tags, id, onClick }) => {
  return (
    <GalleryItem id={id} onClick={onClick}>
      <GalleryImage src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
