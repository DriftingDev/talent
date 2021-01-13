import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { CompanyContext } from '../../store/company';
import { UsersContext } from '../../store/user';
import Loading from '../layout/Loading';
import ArtistCard from './ArtistCard';

function ArtistList() {
  const history = useHistory();

  let artists;

  const { state: CompanyState, fetchCurrentCompany } = useContext(
    CompanyContext
  );

  useEffect(() => {
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
  }, [CompanyState]);

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
              artists.map((artist) => (
                <Col sm={12} md={6} lg={4} xl={4} key={artist.id}>
                  <ArtistCard artist={artist} />
                </Col>
              ))
            ) : (
              <h2>No artists have been added to this company yet.</h2>
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
