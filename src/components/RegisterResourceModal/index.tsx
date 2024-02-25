import Modal from "react-modal";
import { FormEvent, useState } from "react";
import { api_conn } from "../../api";
import { IoCloseSharp } from "react-icons/io5";

type RegisterResourceModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export const RegisterResourceModal = ({
  isOpen,
  onRequestClose,
}: RegisterResourceModalProps) => {
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
      <form onSubmit={handleSubmit} className="form">
        <button onClick={onRequestClose} className="close-button">
          <IoCloseSharp size={24} />
        </button>
        <div className="row">
          <div className="cell">
            <h1 className="title">Adicionar Recurso</h1>
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
          Cadastrar recurso
        </button>
      </form>
    </Modal>
  );
};
