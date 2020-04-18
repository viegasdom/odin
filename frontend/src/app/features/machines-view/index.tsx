/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/loading';
import { requestMachines, createMachine } from './machines-view-slice';
import { RootState } from '../../root-reducer';
import { RouteComponentProps, Link } from '@reach/router';
import { Button } from '../../components/buttons';

const Overlay = ({ children, active }) => {
  if (active) {
    return (
      <div
        css={css`
          display: block;
          filter: blur(5px);
        `}
      >
        {children}
      </div>
    );
  }

  return children;
};

const MachineModal = ({ showModal }) => {
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [accessKey, setAccessKey] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log(name, host, accessKey);
    dispatch(createMachine({ name, host, accessKey }));
    showModal(false);
  };

  return (
    <form
      css={css`
        display: block;
      `}
    >
      <div
        css={css`
          width: 20%;
          position: absolute;
          left: 40%;
          top: 40%;
          margin: auto;
          background: #f0f0f0;
          padding: 2rem;
          border-radius: 8px;

          input[type='text'] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            box-sizing: border-box;
            border: 1px solid #d0d0d0;
            border-radius: 8px;
          }
        `}
      >
        <label>Machine name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Machine host</label>
        <input type="text" onChange={(e) => setHost(e.target.value)} />
        <label>Machine access key</label>
        <input type="text" onChange={(e) => setAccessKey(e.target.value)} />
        <div
          css={css`
            display: flex;
            margin-top: 1rem;
          `}
        >
          <Button onClick={(e) => onSubmit(e)} type="submit">
            Add
          </Button>
          <Button onClick={() => showModal(false)} type="button">
            Close
          </Button>
        </div>
      </div>
    </form>
  );
};

const MachineView = (_: RouteComponentProps) => {
  const [showMachineModal, setShowMachineModal] = useState(false);

  const dispatch = useDispatch();

  const selectMachines = (state: RootState) => state.machineView;
  const { data, loading, error } = useSelector(selectMachines);

  useEffect(() => {
    dispatch(requestMachines());
  }, []);

  console.log(data);

  // Guard against possible websocket errors and return a error component
  // TODO: Create an error page that should get the error and render that instead
  if (error) return <h1>{error.detail}</h1>;

  // Guard when the data is loading and render a loading component
  // TODO: Create a proper loading component that should be rendered instead
  if (loading) return <Loading />;

  const addMachine = () => {};

  console.log(showMachineModal);

  return (
    <Fragment>
      <Overlay active={showMachineModal}>
        <div
          css={css`
            border-bottom: 1px solid #d0d0d0;
            background: #fafafa;
            padding: 2rem;
          `}
        >
          <div className="container">
            <Button
              type="submit"
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
                  grid-template-rows: repeat(1, auto);
                  grid-row-gap: 10px;
                  grid-column-gap: 15px;
                  list-style-type: none;
                  width: 100%;
                  background: #fafafa;
                `}
              >
                {data.map((machine) => {
                  return (
                    <li
                      key={machine.id}
                      css={css`
                        text-decoration: None;
                        color: black;

                        border: 1px solid #d0d0d0;
                        border-radius: 8px;
                        padding: 1rem;
                        transition: 0.3s;
                        background: white;
                      `}
                    >
                      <Link
                        to={`${machine.id}/overview`}
                        onClick={(e) =>
                          showMachineModal ? e.preventDefault() : null
                        }
                      >
                        <h1>{machine.name}</h1>
                      </Link>
                      <h1>{machine.host}</h1>
                      <h1>{machine.acess_key}</h1>
                      <h1>{machine.created_at}</h1>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h1>No machines</h1>
            )}
          </div>
        </div>
      </Overlay>
      {showMachineModal ? (
        <MachineModal showModal={setShowMachineModal} />
      ) : null}
    </Fragment>
  );
};

export default MachineView;
