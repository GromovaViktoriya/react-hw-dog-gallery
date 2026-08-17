import {Picture} from "./Picture.jsx";

export const Gallery = ({images}) => {

    return (
        <div className="gallery">
            {images.map(image => {
                return <Picture image={image} />
            })}
        </div>
    )
}