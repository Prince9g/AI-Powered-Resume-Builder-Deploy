import React, { useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Prevent accessibility issues

const Template = ({ name, image }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/dashboard/t1/build");
  }
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Image container with hover effect */}
      <div
        className="w-80 h-80 bg-gray-200 rounded-3xl cursor-pointer"
        onClick={() => setModalIsOpen(true)}
      >
        <img
          src={image}
          className="w-full h-80 object-stretch transition-all duration-500 brightness-100 hover:brightness-95 rounded-lg hover:scale-105"
          alt="template"
        />
      </div>

      {/* Try it button */}
      <button
        className="p-2 pr-4 pl-4 border rounded-lg bg-emerald-300 hover:bg-emerald-500"
        onClick={handleButtonClick}
      >
        Try it
      </button>

      {/* Animated Modal */}
      <AnimatePresence>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="bg-transparent flex justify-center items-center"
            overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
            >
              <div className="w-96 h-96 bg-gray-200 rounded-3xl cursor-pointer">
                <img src={image} className="w-full h-full object-stretch" alt="template" />
              </div>
              <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mt-4">{name}</h2>
              <button
                onClick={() => setModalIsOpen(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Template;
