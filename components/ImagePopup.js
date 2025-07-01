function ImagePopup({ image, title, isVisible, onClose }) {
  try {
    if (!isVisible || !image) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" data-name="image-popup" data-file="components/ImagePopup.js">
        <div className="relative max-w-4xl max-h-full">
          <button 
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:bg-white/20 p-2 rounded"
          >
            <div className="icon-x text-2xl"></div>
          </button>
          
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 rounded-b-lg">
              <h3 className="text-lg font-bold">{title}</h3>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ImagePopup component error:', error);
    return null;
  }
}