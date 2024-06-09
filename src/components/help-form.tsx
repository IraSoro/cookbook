import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Grid,
} from "@mui/material";

interface HelpFormProps {
  currentPageUrl: string;
}

const HelpForm = ({ currentPageUrl }: HelpFormProps) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const defaultPriority = "Medium";
  const [priority, setPriority] = useState(defaultPriority);
  const [ticketUrl, setTicketUrl] = useState("");
  const username = localStorage.getItem("username");

  function clear() {
    setSummary("");
    setDescription("");
    setPriority(defaultPriority);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/routes/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summary,
        description,
        priority,
        currentPageUrl,
        username,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTicketUrl(data.ticketUrl);
        clear();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography style={{ textAlign: "center" }} variant="h5">
          Create ticket
        </Typography>
        <TextField
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Priority"
          select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              type="submit"
              style={{
                backgroundColor: "#d3d3d3",
                boxShadow: "none",
                color: "#000000",
                borderRadius: "8px",
              }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
      {ticketUrl && (
        <p>
          Your ticket has been create:{}
          <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
            {ticketUrl}
          </a>
        </p>
      )}
    </Container>
  );
};

export default HelpForm;
