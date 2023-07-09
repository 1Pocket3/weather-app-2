import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface LocationFormProps {
  handleClosePopup: () => void;
  handleAddLocation: (location: LocationData) => void;
}

export interface LocationData {
  country: string;
  city: string;
  longitude: string;
  latitude: string;
}

const LocationForm: React.FC<LocationFormProps> = ({ handleClosePopup, handleAddLocation }) => {
  const [location, setLocation] = useState<LocationData>({
    country: '',
    city: '',
    longitude: '',
    latitude: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({ ...prevLocation, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddLocation(location);
    setLocation({ country: '', city: '', longitude: '', latitude: '' });
    handleClosePopup();
  };

  return (
    <Dialog open onClose={handleClosePopup}>
      <DialogTitle>Add Location</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="country"
            label="Country"
            value={location.country}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            name="city"
            label="City"
            value={location.city}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            name="longitude"
            label="Longitude"
            value={location.longitude}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            name="latitude"
            label="Latitude"
            value={location.latitude}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <DialogActions>
            <Button onClick={handleClosePopup} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LocationForm;
