import { ALL_PRODUCT_IMAGES } from "../lib/imageUtils";

export function ImagePreloader() {
  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {ALL_PRODUCT_IMAGES.map((src) => (
        <img key={src} src={src} alt="" />
      ))}
    </div>
  );
}
