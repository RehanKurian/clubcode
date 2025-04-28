import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, ImageList, ImageListItem } from '@mui/material';

const ClubPage = () => {
  const { clubId } = useParams();
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/clubinfos/${clubId}`);
        setClubData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch club data:', err);
        setError(true);
        setLoading(false);
      }
    };
    fetchClubData();
  }, [clubId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !clubData) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" color="error">Club not found or an error occurred.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 880, margin: '0 auto', p: 3, boxShadow: 5 }}>
        <CardContent>

          {/* Club Logo */}
          {clubData.logoUrl && (
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img src={clubData.logoUrl} alt="Club Logo" style={{ maxWidth: '200px', borderRadius: '8px' }} />
            </Box>
          )}

          {/* Club Name */}
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 3 }}>
            {clubData.name}
          </Typography>

          {/* Description */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Description:
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {clubData.description || "No description available."}
          </Typography>

          {/* Mission */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Mission:
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {clubData.mission || "No mission statement available."}
          </Typography>

          {/* Vision */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Vision:
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {clubData.vision || "No vision statement available."}
          </Typography>

          {/* Leaders Section */}
          {clubData.leaders && clubData.leaders.length > 0 && (
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Leaders:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                {clubData.leaders.map((leader, idx) => (
                  <Card key={idx} sx={{ width: 250, p: 2, boxShadow: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {leader.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {leader.position}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </>
          )}

          {/* Events Section */}
          {clubData.events && clubData.events.length > 0 && (
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Upcoming Events:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                {clubData.events.map((event, idx) => (
                  <Card key={idx} sx={{ width: 250, p: 2, boxShadow: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </>
          )}

          {/* Gallery Section */}
          {clubData.gallery && clubData.gallery.length > 0 && (
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Gallery:
              </Typography>
              <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                {clubData.gallery.map((imgUrl, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${imgUrl}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${imgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}

        </CardContent>
      </Card>
    </Box>
  );
};

export default ClubPage;
