const Modal = ({ children, modalShown, handleToggleClick }) => {
  return (
    <div
      className={`w-26 absolute top-20 right-10 flex h-16 items-center justify-center opacity-80 ${
        modalShown ? `scale-100` : `scale-0`
      } `}
      // className="modal-backdrop"
      onClick={handleToggleClick}
    >
      <div
        className="flex h-auto w-auto rounded-lg border-2 border-orange-300 bg-white p-4 text-black"
        // className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export { Modal };
