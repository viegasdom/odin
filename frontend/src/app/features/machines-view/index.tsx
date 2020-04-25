/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import {
  useEffect,
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Card, Form, Modal, Anchor } from 'antd';
import {
  requestMachines,
  createMachine,
  deleteMachine,
  resetMachineState,
} from './machines-view-slice';
import { RootState } from '../../root-reducer';
import { RouteComponentProps, Link } from '@reach/router';

type MachineModalProps = {
  setName: Dispatch<SetStateAction<string>>;
  setHost: Dispatch<SetStateAction<string>>;
  setAccessKey: Dispatch<SetStateAction<string>>;
};

const MachineForm = ({ setName, setHost, setAccessKey }: MachineModalProps) => {
  return (
    <Form layout="vertical">
      <Form.Item label="Name">
        <Input type="text" onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Host">
        <Input
          type="text"
          onChange={(e) => setHost(e.target.value)}
          placeholder="192.0.0.1:3000, example.com"
        />
      </Form.Item>
      <Form.Item label="Access Key">
        <Input type="text" onChange={(e) => setAccessKey(e.target.value)} />
      </Form.Item>
    </Form>
  );
};

const createMachines = () => {
  const machineArray = [];
  for (let i = 0; i < 2; i++) {
    machineArray.push({
      id: i,
      name: 'dummy',
      access_key: 'dummy',
      host: 'dummy',
      created_at: 'dummy',
    });
  }
  return machineArray;
};

const MachineView = (_: RouteComponentProps) => {
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [accessKey, setAccessKey] = useState('');

  const dispatch = useDispatch();

  const selectMachines = (state: RootState) => state.machineView;
  const { data, loading, error } = useSelector(selectMachines);

  useEffect(() => {
    dispatch(requestMachines());

    return () => {
      dispatch(resetMachineState());
    };
  }, []);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <h1>{error.detail}</h1>;

  const handleAdd = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    dispatch(createMachine({ name, host, accessKey }));
    setShowMachineModal(false);
  };

  const handleCancel = () => {
    setShowMachineModal(false);
  };

  return (
    <Fragment>
      <div
        css={css`
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
          padding: 2rem;

          ${showMachineModal
            ? `
          filter: blur(5px);
          transition: 0.07s ease-in-out;
          margin: 0;
          height: 100%;
          overflow-y: hidden;
          `
            : ''}
        `}
      >
        <div className="container">
          <Button
            type="primary"
            onClick={() => setShowMachineModal(true)}
            disabled={showMachineModal}
          >
            Add machine
          </Button>
          {data ? (
            <ul
              css={css`
                display: grid;
                margin-top: 1rem;
                grid-template-columns: repeat(2, auto);
                grid-template-rows: repeat(2, auto);
                grid-row-gap: 10px;
                grid-column-gap: 15px;
                list-style-type: none;
                width: 100%;
                background: #fafafa;
              `}
            >
              {[...(loading ? createMachines() : data)].map((machine) => {
                return (
                  <li
                    key={machine.id}
                    css={css`
                      text-decoration: None;
                      color: black;

                      transition: 0.3s;
                      background: white;
                    `}
                  >
                    <Card
                      loading={loading}
                      css={css`
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
                      `}
                    >
                      <p>
                        <strong>Name: </strong>
                        <Link
                          to={`${machine.id}/overview`}
                          onClick={(e) =>
                            showMachineModal ? e.preventDefault() : null
                          }
                        >
                          {machine.name}
                        </Link>
                      </p>
                      <p>
                        <strong>Host: </strong>
                        {machine.host}
                      </p>
                      <p>
                        <strong>Access Key: </strong>
                        {machine.access_key}
                      </p>
                      <p>
                        <strong>Created At: </strong>
                        {machine.created_at}
                      </p>
                      <div
                        css={css`
                          display: flex;
                          justify-content: flex-end;
                        `}
                      >
                        <Button
                          onClick={() => dispatch(deleteMachine(machine.id))}
                        >
                          Delete
                        </Button>
                        <Button type="primary">Edit</Button>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1>No machines</h1>
          )}
        </div>
      </div>
      <Modal
        onOk={handleAdd}
        onCancel={handleCancel}
        visible={showMachineModal}
        title="Add Machine"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAdd}>
            Add
          </Button>,
        ]}
      >
        <MachineForm
          setAccessKey={setAccessKey}
          setHost={setHost}
          setName={setName}
        />
      </Modal>
    </Fragment>
  );
};

export default MachineView;
