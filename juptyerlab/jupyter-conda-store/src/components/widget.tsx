import { ReactWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import React, { useState } from 'react';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../../style/widget.css';
import BackendSelector from './backendSelector';
import CardGroupComponent from './CardGroup';
import EnvironmentEditorPanel from './EnvironmentEditorPanel';

/**
 * The main widget. Server Data will be queried from some settings, maybe?
 */
const HomeArea = () => {
  const [serverAddress, setServerAddress] = useState(null); // Server Address String.
  const [toggleEnvironment, setToggleEnvironment] = useState(false); // Show/Hide the Env Edit Panel
  const [toggleInfo, setToggleInfo] = useState(false); 
  const [toggleCondaCards, setToggleCondaCards] = useState(true);
  const [toggleImage, setToggleImage] = useState(false);

  const servers = [
    {
      display_name: 'Localhost',
      url: 'http://localhost:5001/api/v1/environment/',
    },
    {},
  ];

  /*
   * Handles the connection to a server being submitted.
   */
  function handleServerSelect(e: any) {
    e.preventDefault(); //Prevent a reload
    //TODO: Find a way to figure out which index was selected
    //TODO: Write script to check connections - for now, assuming connection
    setServerAddress(servers[0].url);
  }

  /*
   * Handles the edit environment button click
   */
   function handleEditEnv(e: any) {
    e.preventDefault(); //Prevent a reload
    setToggleEnvironment(true);//
    setToggleCondaCards(false); 
   }

  /*
   * Handles a click on "Build Specification"
   */
   function handleInfoClick(e: any) {
    e.preventDefault(); //Prevent a reload
    setToggleInfo(true); //
   }

  /*
   * Handles a click on Image
   */
  function handleImageClick(e: any){
    e.preventDefault(); //Prevent a reload
    setToggleImage(true); 
  }

  /*
   * Handles a "Cancel"
   */
  function handleCancel(e: any){
    e.preventDefault();
    setToggleImage(false);
    setToggleInfo(false);
    setToggleEnvironment(false);
    setToggleCondaCards(true);
      }

  return (
    <div>
      {serverAddress ? (
        <div>
          <NavBar />
          <Container fluid style={{ height: '100vh' }}>
	  {toggleCondaCards ? (
            <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
              <Col xs={6} sm={6} md={6} className="mx-auto">
	      <CardGroupComponent 
			      url={serverAddress}
	      		      handleEditEnvClick={handleEditEnv}
	      		      handleInfoClick={handleInfoClick}
	      		      handleImageClick={handleImageClick}
	      />
              </Col>
            </Row> ) : null}

	  {toggleEnvironment ? (
		    <div>
			    <EnvironmentEditorPanel
		  	      handleCancelClick={handleCancel}
			    />
		        			</div>
		    ) : null}
				{toggleInfo ? (<div></div>) : null}
					{toggleImage ? (<div></div>) : null}
          </Container>
        </div>
      ) : (
        <Container fluid style={{ height: '100vh' }}>
          <Row
            className="justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <Col xs={4} sm={6} md={8} className="my-auto">
              <Jumbotron>
                <h1> Welcome to Conda-Store </h1>
                <h3> The one-stop-shop to manage environments! </h3>
                <BackendSelector
                  handleServerSelect={handleServerSelect}
                  serverConnectionData={servers}
                />
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

const CondaStoreWidget: Widget = ReactWidget.create(
  <div>
    <HomeArea />
  </div>
);

export default CondaStoreWidget;
