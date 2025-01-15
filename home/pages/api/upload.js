const fs = require('fs/promises');
const path = require('path');

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser
  },
};

// Helper function to parse multipart form data and save the uploaded file
const parseMultipartFormData = async (req) => {
  const data = await req.text();  // Read the raw body text from the request
  const contentType = req.headers.get('content-type');
  
  if (!contentType) {
    throw new Error('Content-Type header missing');
  }
  
  // Extract the boundary from the content-type header
  const boundary = contentType.split('boundary=')[1];
  
  if (!boundary) {
    throw new Error('Boundary missing in Content-Type header');
  }

  // Split the data by the boundary
  const parts = data.split(`--${boundary}`).slice(1, -1); // Remove the first and last empty parts

  let fileData = null;
  let filename = '';

  // Loop through each part of the multipart form data
  for (const part of parts) {
    const [headers, body] = part.split('\r\n\r\n');
    
    // Find Content-Disposition header
    const contentDisposition = headers.split('\r\n').find((line) => line.startsWith('Content-Disposition'));
    
    if (contentDisposition && contentDisposition.includes('filename')) {
      // Extract filename
      const match = contentDisposition.match(/filename="([^"]+)"/);
      filename = match ? match[1] : '';
      
      // Extract file data
      fileData = Buffer.from(body.split('\r\n')[0], 'binary');  // Convert the file content to a Buffer
      break;
    }
  }

  if (!fileData) {
    throw new Error('No file found in the form data');
  }

  return { filename, fileData };
};

async function POST(req) {
  try {
    // Ensure the upload directory exists
    const uploadDir = './public/uploads';
    await fs.mkdir(uploadDir, { recursive: true });

    // Parse the multipart form data to get the file content
    const { filename, fileData } = await parseMultipartFormData(req);

    if (!filename || !fileData) {
      return new Response(JSON.stringify({ error: 'File upload failed' }), {
        status: 400,
      });
    }

    // Define the file path to save the uploaded file
    const filePath = path.join(uploadDir, filename);

    // Save the file to the specified location
    await fs.writeFile(filePath, fileData);

    // Respond with success
    return new Response(JSON.stringify({ message: 'File uploaded successfully', filename }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error processing the upload:', error);
    return new Response(JSON.stringify({ error: 'Error processing the upload.' }), {
      status: 500,
    });
  }
}

module.exports = { POST, config };
