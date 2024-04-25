import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>book_id</th>
            <th className="expand">unique_id</th>
            {/* <th>Status</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            <tr key={idx}>
            <td>{row.book_id}</td>
            <td>{row.uniqueID}</td>
            <td>
              <button onClick={() => editRow(idx)}>Edit</button>
              <button onClick={() => deleteRow(idx)}>Delete</button>
            </td>
          </tr>
        };

            return (
              <tr key={idx}>
                <td>{row.book_id}</td>
                <td className="expand">{row.unique_id}</td>
                {/* <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td> */}
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
