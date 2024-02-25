import { useEffect, useState } from "react";
import { api_conn } from "../../api";
import { Resource } from "../../types/resource";
import "./styles.css";

export const ResourceTable = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api_conn.get("/resource");
      if (response.status === 200) {
        setResources(response.data);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="wrapper table-wrapper max-width">
      <div className="row">
        <div className="cell">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descricao</th>
                <th>Preco</th>
                <th>Voluntario associado</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource: Resource) => (
                <tr key={resource.id}>
                  <td scope="row">{resource.id}</td>
                  <td>{resource.description}</td>
                  <td>{resource.price}</td>
                  <td>{resource.volunteer_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
