import React, { useState } from 'react';
import { IconButton, Popover, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Slider from '@mui/material/Slider';
import './styles.css';

const FilterButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="filter-button">
      <IconButton color="inherit" onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0}}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        <div className="filter-options-container">
          <MenuItem>
            Age
            <Slider valueLabelDisplay="auto" min={0} max={20} />
          </MenuItem>
          <MenuItem>
            Price
            <Slider valueLabelDisplay="auto" min={0} max={1000} />
          </MenuItem>
          <MenuItem>
            Proximity
            <Slider valueLabelDisplay="auto" min={0} max={100} />
          </MenuItem>
        </div>
      </Popover>
    </div>
  );
};

export default FilterButton;
