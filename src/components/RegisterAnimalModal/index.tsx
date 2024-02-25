import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { api_conn } from "../../api";
import { IoCloseSharp } from "react-icons/io5";
import { CustomModalStyles } from "../../ModalStyles";
import Select from "react-select";
import "./styles.css";
import { Volunteer } from "../../types/volunteer";

type VolunteerOption = {
  value: string;
  label: string;
};

type RegisterAnimalModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export const RegisterAnimalModal = ({
  isOpen,
  onRequestClose,
}: RegisterAnimalModalProps) => {
  const [name, setName] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [rescueLocation, setRescueLocation] = useState<string>("");
  const [volunteerId, setVolunteerId] = useState<string>("");
  const [volunteerOptions, setVolunteerOptions] = useState<VolunteerOption[]>(
    []
  );

  useEffect(() => {
    const fetchVolunteers = async () => {
      const response = await api_conn.get("/volunteer");
      if (response.status === 200) {
        setVolunteerOptions(
          response.data.map((volunteer: Volunteer) => ({
            value: volunteer.id,
            label: volunteer.name + "/" + volunteer.cpf,
          }))
        );
      }
    };
    fetchVolunteers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api_conn.post("/animal", {
      name,
      race,
      a_type: type,
      age: Number(age),
      rescue_location: rescueLocation,
      responsible_volunteer: volunteerId,
    });
    if (response.status === 200) {
      alert(`Animal ${response.data.name} cadastrado`);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={CustomModalStyles}
      shouldCloseOnEsc={false}
    >
      <div className="wrapper">
        <form className="form">
          <div className="row">
            <div className="cell">
              <button onClick={onRequestClose} className="close-button">
                <IoCloseSharp size={24} />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <h1 className="title">Cadastrar Animal</h1>
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <div className="input-field">
                Nome do animal
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <div className="input-field">
                Raca do animal
                <input
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="cell">Tipo do animal</div>
          </div>
          <div className="row">
            <div className="cell">
              <div className="input-field align-center">
                Gato
                <input
                  type="radio"
                  value="cat"
                  checked={type === "cat"}
                  onChange={() => setType("cat")}
                />
              </div>
            </div>
            <div className="cell">
              <div className="input-field align-center">
                Cachorro
                <input
                  type="radio"
                  value="dog"
                  checked={type === "dog"}
                  onChange={() => setType("dog")}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <div className="input-field">
                Idade do animal
                <input
                  value={age}
                  type="text"
                  inputMode="numeric"
                  onChange={(e) => setAge(e.target.value)}
                  required
                  pattern="[0-9]{2}"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <div className="input-field">
                Local de resgate do animal
                <input
                  value={rescueLocation}
                  onChange={(e) => setRescueLocation(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="cell">
              <div className="input-field">
                Voluntario Responsavel
                <Select
                  required
                  options={volunteerOptions}
                  onChange={(selected) => setVolunteerId(selected?.value ?? "")}
                />
              </div>
            </div>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Cadastrar animal
          </button>
        </form>
      </div>
    </Modal>
  );
};
