import {
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CardHeader,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { Ticket } from "@/pages/api/routes/tickets";

interface TicketProps {
  tickets: Ticket[];
}

const Tickets = ({ tickets }: TicketProps) => {
  return (
    <Grid container spacing={3}>
      {tickets.map((ticket) => (
        <Grid item xs={12} sm={6} md={4} key={ticket.id}>
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <PersonIcon />
                </Avatar>
              }
              title={`Ticket ID: ${ticket.id}`}
              subheader={ticket.username}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {ticket.summary}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {ticket.description}
              </Typography>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Status:
                </Typography>
                <Chip label={ticket.status} style={{ marginRight: "10px" }} />
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Priority:
                </Typography>
                <Chip label={ticket.priority} style={{ marginRight: "10px" }} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Tickets;
