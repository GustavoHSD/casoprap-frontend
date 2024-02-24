import "react";
import Modal from "react-modal";
import { FormEvent, useState } from "react";
import { api_conn } from "../../api";
import styles from "./styles.module.css";
import { IoCloseSharp } from "react-icons/io5";

type RegisterVolunteerModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export const RegisterVolunteerModal = ({
  isOpen,
  onRequestClose,
}: RegisterVolunteerModalProps) => {
  api_conn;
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api_conn.post("/volunteer", { name, cpf });
    if (response.status === 200) {
      alert(`Voluntario ${response.data.name} cadastrado`);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="wrapper"
    >
      <form onSubmit={handleSubmit}>
        <button onClick={onRequestClose} className={styles.closeButton}>
          <IoCloseSharp size={24} />
        </button>
        <div className="row">
          <div className="cell">
            <h1 className="title">Adicionar Voluntario</h1>
          </div>
        </div>

        <div className="row">
          <div className="cell">
            <label className="input-field">
              Nome do voluntario
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <label className="input-field">
              Cpf do voluntario
              <input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <button className={styles.button} type="submit">
          Cadastrar voluntario
        </button>
      </form>
    </Modal>
  );
};
