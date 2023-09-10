import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Box,
  Divider,
  IconButton,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

// Define your custom theme with the primary color #3bb19b
const theme = createTheme({
  palette: {
    primary: {
      main: '#3bb19b',
    },
  },
});

export function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({ name: '', author: '', username : '' });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState('');
  const [contributorInfo, setContributorInfo] = useState({ name: '', contributor_code: '' });

  const API_URL = 'http://localhost:8080/api/doc'; // Replace with your backend API endpoint

  const fetchDocuments = async () => {
    try {
      const response = await axios.post(`${API_URL}/getAll`);
      if (response.status === 200) {
        setDocuments(response.data.ls);
      } else {
        console.error('Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleInputChange = (e) => {
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value });
  };

  const handleCreateDocument = async () => {
    try {
      const response = await axios.post(`${API_URL}/createDoc`, newDocument, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        fetchDocuments();
        setNewDocument({ name: '', author: '' , username : ''});
      } else {
        console.error('Failed to create a document');
      }
    } catch (error) {
      console.error('Error creating a document:', error);
    }
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setDocumentContent(document.content || '');
  };

  const handleUpdateDocument = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/updateDoc`,
        {
          ...selectedDocument,
          content: documentContent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        fetchDocuments();
        setSelectedDocument(null);
      } else {
        console.error('Failed to update the document');
      }
    } catch (error) {
      console.error('Error updating the document:', error);
    }
  };

  const handleDeleteDocument = async () => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/deleteDoc`, {
        params: {
          name: selectedDocument.name,
        },
      });

      if (response.status === 200) {
        fetchDocuments();
        setSelectedDocument(null);
        setDocumentContent('');
      } else {
        console.error('Failed to delete the document');
      }
    } catch (error) {
      console.error('Error deleting the document:', error);
    }
  };

  const handleContributorInputChange = (e) => {
    setContributorInfo({ ...contributorInfo, [e.target.name]: e.target.value });
  };

  const handleAddContributor = async () => {
    try {
      const response = await axios.post(`${API_URL}/addContributor`, {
        params: {
          name: contributorInfo.name,
          contributor_code: contributorInfo.contributor_code,
        },
      });

      if (response.status === 200) {
        fetchDocuments();
        setContributorInfo({ name: '', contributor_code: '' });
      } else {
        console.error('Failed to add a contributor');
      }
    } catch (error) {
      console.error('Error adding a contributor:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Document Dashboard</Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
          </Toolbar>
        </AppBar>
        <Container>
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
              Documents
            </Typography>
            <Grid container spacing={3}>
              {documents.map((document, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{document.name}</Typography>
                      <Typography variant="subtitle1">Author: {document.author}</Typography>
                      <Typography variant="subtitle1">
                        Contributors: {document.contributor.join(', ')}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <IconButton onClick={() => handleDocumentClick(document)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteDocument(document)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
          <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Add New Document
            </Typography>
            <form>
              <TextField
                label="Name"
                name="name"
                value={newDocument.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="Author"
                name="author"
                value={newDocument.author}
                onChange={handleInputChange}
                fullWidth
                required
				
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCreateDocument}
                style={{ marginTop: '10px' }}
              >
                Create Document
              </Button>
            </form>
          </Paper>
          {selectedDocument && (
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
              <Typography variant="h5" style={{ marginBottom: '20px' }}>
                Selected Document
              </Typography>
              <Typography variant="h6">Name: {selectedDocument.name}</Typography>
              <Typography variant="h6">Author: {selectedDocument.author}</Typography>
              <TextField
                label="Content"
                multiline
                rows={6}
                fullWidth
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleUpdateDocument}
                style={{ marginTop: '10px' }}
              >
                Update Document
              </Button>
            </Paper>
          )}
          <Divider style={{ marginTop: '20px' }} />
          <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Add Contributor
            </Typography>
            <form>
              <TextField
                label="Document Name"
                name="name"
                value={contributorInfo.name}
                onChange={handleContributorInputChange}
                fullWidth
                required
              />
              <TextField
                label="Contributor Code"
                name="contributor_code"
                value={contributorInfo.contributor_code}
                onChange={handleContributorInputChange}
                fullWidth
                required
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={handleAddContributor}
                style={{ marginTop: '10px' }}
              >
                Add Contributor
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
