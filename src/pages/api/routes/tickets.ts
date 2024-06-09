import type { NextApiRequest, NextApiResponse } from "next";

export interface Ticket {
  id: number;
  summary: string;
  description: string;
  username: string;
  currentPageUrl: string;
  priority: string;
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        const { summary, description, priority, currentPageUrl, username } =
          req.body;
        let headersList = {
          Authorization: `Basic ${process.env.JIRA_AUTH_BASE64}`,
          "Content-Type": "application/json",
        };
        let bodyContent = JSON.stringify({
          fields: {
            project: {
              key: process.env.JIRA_KEY,
            },
            summary: summary,
            description: description,
            issuetype: {
              name: "Task",
            },
            customfield_10033: username,
            customfield_10034: currentPageUrl,
            priority: {
              name: priority,
            }
          },
        });
        let response = await fetch(
          `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/2/issue`,
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let data = await response.json();
        res.status(200).json({ ticketUrl: data.self });
      }
      case "GET": {
        const { searchUsername } = req.query;
        let jql = encodeURIComponent(`Username ~ "${searchUsername}"`);

        let headersList = {
          Authorization: `Basic ${process.env.JIRA_AUTH_BASE64}`,
        };

        let response = await fetch(
          `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/2/search?jql=${jql}`,
          {
            method: "GET",
            headers: headersList,
          }
        );

        let data = await response.json();
        const tickets: Ticket[] = data.issues.map((issue: any) => ({
          id: issue.id,
          summary: issue.fields.summary,
          description: issue.fields.description,
          username: issue.fields.customfield_10033,
          currentPageUrl: issue.fields.customfield_10034,
          priority: issue.fields.priority.name,
          status: issue.fields.status.name,
        }));
        res.status(200).json({ data: tickets });
      }
      default: {
        throw "Unknown method";
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
