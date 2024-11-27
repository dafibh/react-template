import React, { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const AnimatedLoadingIconButton = ({ refetch, isRefetching }) => {
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    if (!isRefetching) {
      setCooldown(true);
      const timer = setTimeout(() => {
        setCooldown(false);
      }, 350); // 3-second delay
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isRefetching]);

  return (
    <Tooltip arrow title={isRefetching ? "Refreshing" : "Refresh"}>
      <IconButton onClick={() => !isRefetching && !cooldown ? refetch() : null}
                  sx={{
                    transition: !isRefetching ? "opacity 350ms" : "opacity 250ms",
                    opacity: isRefetching ? 0.25 : 1,
                  }}>
        <RefreshIcon style={{ animation: (isRefetching)?"spin 2s linear infinite":null }} />
      </IconButton>
    </Tooltip>
  );
};

AnimatedLoadingIconButton.propTypes = {
  refetch: PropTypes.func.isRequired,
  isRefetching: PropTypes.bool.isRequired,
};

export default AnimatedLoadingIconButton;
