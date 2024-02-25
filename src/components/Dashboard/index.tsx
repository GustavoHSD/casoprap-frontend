import { useState } from "react";
import { RegisterVolunteerModal } from "../RegisterVolunteerModal";
import { RegisterAnimalModal } from "../RegisterAnimalModal";
import { RegisterResourceModal } from "../RegisterResourceModal";
import "./styles.css"

export const Dashboard = () => {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);

  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const handleOpenVolunteerModal = () => {
    setIsVolunteerModalOpen(true);
  };
  const handleOpenAnimalModal = () => {
    setIsAnimalModalOpen(true);
  };
  const handleOpenResourceModal = () => {
    setIsResourceModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsVolunteerModalOpen(false);
    setIsAnimalModalOpen(false);
    setIsResourceModalOpen(false);
  };

  return ( 
    <>
      <nav className="wrapper navbar">
        <div className="row">
          <div className="cell">
            <a onClick={handleOpenVolunteerModal}>Voluntario</a>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <a onClick={handleOpenAnimalModal}>Animal</a>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <a onClick={handleOpenResourceModal}>Recursos</a>
          </div>
        </div>
      </nav>
      <RegisterVolunteerModal
        isOpen={isVolunteerModalOpen}
        onRequestClose={handleCloseModal}
      />
      <RegisterAnimalModal
        isOpen={isAnimalModalOpen}
        onRequestClose={handleCloseModal}
      />
      <RegisterResourceModal
        isOpen={isResourceModalOpen}
        onRequestClose={handleCloseModal}
      />
    </>
  );
};
