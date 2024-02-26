import { useEffect, useState } from "react";
import { api_conn } from "../../api";
import { Resource } from "../../types/resource";
import "./styles.css";
import { IoPersonAddSharp } from "react-icons/io5";
import { Volunteer } from "../../types/volunteer";

type ResourceTableProps = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
};
export const ResourceTable = ({
  isModalOpen,
  handleOpenModal,
}: ResourceTableProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api_conn.get("/resource");
      if (response.status === 200) {
        setResources(response.data);
        const volunteerIds = response.data.map(
          (resource: Resource) => resource.volunteer_id
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
  }, [isModalOpen]);

  return (
    <div className="wrapper table-wrapper max-width">
      <div className="row">
        <div className="cell">
          <div className="title title-margin">
            <h1>Tabela de Recursos</h1>
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
                <th>Descricao</th>
                <th>Preco</th>
                <th>Nome do voluntario associado</th>
                <th>Cpf do voluntario associado</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource: Resource) => {
                const associatedVolunteer = volunteers.find(
                  (volunteer: Volunteer) =>
                    volunteer.id === resource.volunteer_id
                );

                return (
                  <tr key={resource.id}>
                    <td scope="row">{resource.id}</td>
                    <td>{resource.description}</td>
                    <td>{resource.price}</td>
                    <td>{associatedVolunteer?.name}</td>
                    <td>{associatedVolunteer?.cpf}</td>
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
