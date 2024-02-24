import { useState } from "react";
import { RegisterVolunteerModal } from "../RegisterVolunteerModal";

export const NavBar = () => {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const handleClickRegisterVolunteerModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
     <nav className="row">
        <a href="#" onClick={handleClickRegisterVolunteerModal}>Voluntario</a>
     </nav>
      <RegisterVolunteerModal
        isOpen={isModalOpen}
        onRequestClose={handleClickRegisterVolunteerModal}
      />
    </>
  );
};

