import "react";
import Modal from "react-modal";
import { FormEvent, useState } from "react";
import { api_conn } from "../../api";
import { IoCloseSharp } from "react-icons/io5";
import "./styles.css";
import { CustomModalStyles } from "../../ModalStyles";

type RegisterVolunteerModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export const RegisterVolunteerModal = ({
  isOpen,
  onRequestClose,
}: RegisterVolunteerModalProps) => {
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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={CustomModalStyles}>
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="form">
          <button onClick={onRequestClose} className="button">
            <IoCloseSharp size={24} />
          </button>
          <div className="row">
            <div className="cell">
              <div className="title">
                <h1>Adicionar Voluntario</h1>
              </div>
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
          <button className="submit-button" type="submit">
            Cadastrar voluntario
          </button>
        </form>
      </div>
    </Modal>
  );
};
