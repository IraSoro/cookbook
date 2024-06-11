import { useState } from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";

import HelpForm from "./help-form";

interface HelpButtonProps {
  currentPageUrl: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ currentPageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: "#d3d3d3",
          boxShadow: "none",
          color: "#000000",
          borderRadius: "15px",
          marginBottom: "10px",
          marginTop: "20px",
          width: "220px",
        }}
        size="small"
        onClick={toggleDialog}
      >
        Create a support ticket
      </Button>
      <Dialog open={isOpen} onClose={toggleDialog}>
        <DialogContent>
          <HelpForm currentPageUrl={currentPageUrl} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start" }}>
          <Button onClick={toggleDialog} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HelpButton;
