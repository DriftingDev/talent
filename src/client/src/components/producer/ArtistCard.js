import React, { useContext, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import { HiLink } from 'react-icons/hi'
import { ShowContext } from '../../store/show';
import Loading from '../layout/Loading';
import moment from 'moment';

const ArtistCard = ({ artist }) => {
  let history = useHistory();

  const { state: ShowState, getShows } = useContext(ShowContext);

  useEffect(() => {}, [ShowState]);

  if (!ShowState.loaded) {
    getShows();
  }

  function handleNameClick() {
    history.push(`/artists/${artist._id}`);
  }

  let artistShows = [];
  let upcomingShows;
  let pastShows;
  let ongoingShows;

  if (ShowState.loaded) {
    ShowState.shows.forEach((show) => {
      let idArray = show.artists.map((showArtist) => showArtist._id);
      if (idArray.includes(artist._id)) {
        artistShows.push(show);
      }
    });
    upcomingShows = artistShows.filter(
      (show) => moment() < moment(show.eventStart)
    );
    pastShows = artistShows.filter((show) => moment() > moment(show.eventEnd));
    ongoingShows =
      artistShows.length - (upcomingShows.length + pastShows.length);
  }

  return (
    <Card className='my-3 p-3 rounded' border='primary'>
      <Card.Body>
        <Row>
          <Col xs={4} className='noPadding '>
            {ShowState.loaded ? (
              <>
                <p>Shows: {artistShows.length}</p>
                <p>Upcoming: {upcomingShows.length}</p>
                <p>Ongoing: {ongoingShows}</p>
                <p>Past: {pastShows.length}</p>
              </>
            ) : (
              <Loading />
            )}
          </Col>
          <Col xs={8} className='noPadding '>
            <Card.Title className='btn-link' onClick={handleNameClick}>
              {artist.accname}
            </Card.Title>
            <Card.Text className='truncate'>
              <BsEnvelope />
              <a href={`mailto:${artist.email}`}> {artist.email}</a>
            </Card.Text>
            <Card.Text>
              <FiPhone />: {artist.contact || "N/A"}
            </Card.Text>
            <Card.Text>
              {console.log(artist)}
              <HiLink />: {artist.link ? <span className='btn-link' onClick={() => {window.open("http://" + artist.link)}}>{artist.link}</span> : "N/A"}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ArtistCard;
