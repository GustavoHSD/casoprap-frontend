import { useEffect, useState } from "react";
import { api_conn } from "../../api";
import { Animal } from "../../types/animal";
import "./styles.css";
import { IoPersonAddSharp } from "react-icons/io5";
import { Volunteer } from "../../types/volunteer";

type AnimalTableProps = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
};

export const AnimalTable = ({
  isModalOpen,
  handleOpenModal,
}: AnimalTableProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [adopted, setAdopted] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  const setAsAdopted = async (id: number) => {
    await api_conn.get(`/animal/${id}/set_as_adopted`);
    setAdopted(!adopted);
  };

  const setAsNotAdopted = async (id: number) => {
    await api_conn.get(`/animal/${id}/set_as_not_adopted`);
    setAdopted(!adopted);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api_conn.get("/animal");
      if (response.status === 200) {
        setAnimals(response.data);
        const volunteerIds = response.data.map(
          (animal: Animal) => animal.responsible_volunteer
        );
        const volunteerResponses = await Promise.all(
          volunteerIds.map((id: number) => api_conn.get(`/volunteer/${id}`))
        );
        const volunteerData = volunteerResponses.map(
          (response) => response.data
        );
        setVolunteers(volunteerData);
      }
    };
    fetchData();
  }, [isModalOpen, adopted]);

  return (
    <div className="wrapper table-wrapper max-width">
      <div className="row">
        <div className="cell">
          <div className="title title-margin">
            <h1>Tabela de Animais</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="cell button-margin">
          <button onClick={handleOpenModal} className="button">
            <IoPersonAddSharp size={32} />
          </button>
        </div>
        <div className="cell">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>nome</th>
                <th>raça</th>
                <th>tipo</th>
                <th>idade</th>
                <th>local de resgate</th>
                <th>é adotado</th>
                <th>nome do voluntario</th>
                <th>cpf do voluntario</th>
                <th>açoes</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal: Animal) => {
                const associatedVolunteer = volunteers.find(
                  (volunteer: Volunteer) =>
                    volunteer.id === animal.responsible_volunteer
                );
                return (
                  <tr key={animal.id}>
                    <td scope="row">{animal.id}</td>
                    <td>{animal.name}</td>
                    <td>{animal.race}</td>
                    <td>{animal.a_type === "cat" ? "Gato" : "Cachorro"}</td>
                    <td>{animal.age}</td>
                    <td>{animal.rescue_location}</td>
                    <td>{animal.is_adopted ? "Sim" : "Nao"}</td>
                    <td>{associatedVolunteer?.name}</td>
                    <td>{associatedVolunteer?.cpf}</td>
                    <td>
                      {animal.is_adopted ? (
                        <button
                          onClick={() => setAsNotAdopted(animal.id)}
                          className="action-button"
                        >
                          Marcar como nao adotado
                        </button>
                      ) : (
                        <button
                          onClick={() => setAsAdopted(animal.id)}
                          className="action-button"
                        >
                          Marcar como adotado
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
