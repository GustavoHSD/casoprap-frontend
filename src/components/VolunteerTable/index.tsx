import { useEffect, useState } from "react";
import { api_conn } from "../../api";
import { Volunteer } from "../../types/volunteer";
import "./styles.css";
import { IoPersonAddSharp } from "react-icons/io5";

type VolunteerTableProps = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
};
export const VolunteerTable = ({
  isModalOpen,
  handleOpenModal,
}: VolunteerTableProps) => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api_conn.get("/volunteer");
      if (response.status === 200) {
        setVolunteers(response.data);
      }
    };

    fetchData();
  }, [isModalOpen]);

  return (
    <div className="wrapper table-wrapper max-width">
      <div className="row">
        <div className="cell">
          <div className="title title-margin">
            <h1>Tabela de Voluntarios</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="cell">
          <button onClick={handleOpenModal} className="button button-margin">
            <IoPersonAddSharp size={32} />
          </button>
        </div>
        <div className="cell">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Cpf</th>
                <th>Esta ativo</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer: Volunteer) => (
                <tr key={volunteer.id}>
                  <td scope="row">{volunteer.id}</td>
                  <td>{volunteer.name}</td>
                  <td>{volunteer.cpf}</td>
                  <td>{volunteer.is_active ? "Sim" : "Nao"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
