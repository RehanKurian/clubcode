import * as React from 'react';
import './ClubStyle.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // NEW import for API calls

const Club1 = () => {
  const [clubData, setClubData] = React.useState(null); // NEW State for club info
  const navigate = useNavigate();

  // Fetching club data from backend
  React.useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clubinfo/club1'); 
        setClubData(response.data);
      } catch (error) {
        console.error('Failed to fetch club data:', error);
      }
    };
    fetchClubData();
  }, []);

  const handleEnroll = () => {
    navigate('/enrollment', { state: { clubName: clubData?.name || 'Club 1' } });
  };

  if (!clubData) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <>
      <div className="body">

        {/* Logo */}
        <div className="logo">
          <img src={clubData.logoUrl} height={250} width={200} alt="Club Logo" /> {/* Dynamic logo */}
          <h1 className='name'>{clubData.name}</h1> {/* Dynamic club name */}
        </div>

        {/* Enroll Button */}
        <div className='button'>
          <Button 
            type="submit"
            size="medium"
            variant='outlined'
            sx={{ backgroundColor: 'powderblue', color: 'black' }}
            onClick={handleEnroll}
          >
            Enroll / Register
          </Button>
        </div>
        <br />

        {/* About Us */}
        <Box sx={{ maxWidth: "1000px", margin: "auto", marginTop: 1, padding: 4, borderRadius: 5, boxShadow: 3, border: "1px solid #ddd" }}>
          <section className='au'>
            <div className="b">
              <h2 className='heading'>About Us</h2>
            </div>

            <div className='c'>
              <p>{clubData.description}</p><br />
              <h3>Mission: {clubData.mission}</h3><br />
              <h3>Vision: {clubData.vision}</h3>
            </div>
          </section>

          {/* Leaders */}
          <section>
            <h2 className='heading'>Leaders</h2>
            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center" }}>
              {clubData.leaders.map((leader, index) => (
                <Card key={index} sx={{ height: 140, width: 250, boxShadow: 3, borderRadius: 2 }}>
                  <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%'  }}>
                    <h3>{leader.name}</h3>
                    <p>{leader.position}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Events */}
          <section>
            <h2 className='heading'>Events</h2>
            <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
              {clubData.events.map((event, index) => (
                <Card key={index} sx={{ height: 140, width: 250, boxShadow: 3, borderRadius: 2 }}>
                  <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
                    <h3>{event.title}</h3>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section>
            <h2 className='heading'>Gallery</h2>
            <div>
              <ImageList sx={{ width: 1000, height: 550 }} variant="quilted" cols={3} rowHeight={160}>
                {clubData.gallery.map((imgUrl, index) => (
                  <ImageListItem key={index} cols={1} rows={2}>
                    <img
                      src={`${imgUrl}?w=121&fit=crop&auto=format`}
                      srcSet={`${imgUrl}?w=121&fit=crop&auto=format&dpr=2 2x`}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </section>

        </Box>
      </div>
    </>
  );
};

export default Club1;
