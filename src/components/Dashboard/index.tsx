import { useState } from "react";
import { RegisterVolunteerModal } from "../RegisterVolunteerModal";
import { RegisterAnimalModal } from "../RegisterAnimalModal";
import { RegisterResourceModal } from "../RegisterResourceModal";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaDog } from "react-icons/fa";
import { MdMedicationLiquid } from "react-icons/md";
import "./styles.css";
import { ResourceTable } from "../ResourceTable";

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
      <nav className="wrapper navbar border-1px">
        <div className="row">
          <div className="cell">
            <div className="title">
              <h1>CASOPRAP - Cadastro SOPRAP</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <button onClick={handleOpenVolunteerModal}><IoPersonCircleOutline size={24} className="icon"/>Voluntario</button>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <button onClick={handleOpenAnimalModal}><FaDog size={24} className="icon"/>Animal</button>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <button onClick={handleOpenResourceModal}><MdMedicationLiquid size={24} className="icon"/>Recursos</button>
          </div>
        </div>
      </nav>
      <ResourceTable />
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
