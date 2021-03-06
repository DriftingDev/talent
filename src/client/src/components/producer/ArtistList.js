import React, { useContext, useEffect } from 'react';
import { Col, Row, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { CompanyContext } from '../../store/company';
import Loading from '../layout/Loading';
import ArtistCard from './ArtistCard';

function ArtistList() {
  const history = useHistory();

  let artists;

  const { state: CompanyState, fetchCurrentCompany } = useContext(
    CompanyContext
  );

  useEffect(() => {}, [CompanyState]);

  if (
    CompanyState.currentCompany === null &&
    localStorage.getItem('currentCompany')
  ) {
    fetchCurrentCompany();
  } else if (
    CompanyState.currentCompany === null &&
    !localStorage.getItem('currentCompany')
  ) {
    history.push('/companies');
  }

  if (CompanyState.currentCompany != null) {
    artists = CompanyState.currentCompany.users.filter(
      (user) => user.is_artist
    );
  }

  return (
    <>
      {CompanyState.currentCompany != null ? (
        <Col className='noPadding'>
          <Row>
            {artists.length > 0 ? (
              artists.map((artist, i) => (
                <Col sm={12} md={6} lg={4} xl={4} key={i}>
                  <ArtistCard key={i} artist={artist} />
                </Col>
              ))
            ) : (
              <Col>
                <Alert variant='info'>
                  <h4 className='text-center text-dark'>
                    There are no artists connected to this company.
                  </h4>
                </Alert>
              </Col>
            )}
          </Row>
        </Col>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ArtistList;
