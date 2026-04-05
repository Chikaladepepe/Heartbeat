export default async function handler(req, res) {
  const token = process.env.NOTION_SECRET;
  const dbId = process.env.NOTION_DB_ID;

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        page_size: 1,
        sorts: [
          {
            property: "Date",
            direction: "descending"
          }
        ]
      }) 
    });

    const data = await response.json();
    const latestLetter = data.results[0]?.properties.Letter.title[0]?.plain_text || "I'm thinking of what to say...";
    
    res.status(200).json({ letter: latestLetter });
  } catch (error) {
    res.status(500).json({ letter: "Error connecting to my heart." });
  }
}
