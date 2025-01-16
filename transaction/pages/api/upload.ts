import fs from 'fs/promises';
import path from 'path';
import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FormidableFile {
  originalFilename: string;
  filepath: string;
}


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the form data.' });
    }

    if (!files.file || files.file.length === 0) {
      return res.status(400).json({ error: 'File upload error: No file was uploaded.' });
    }

    try {
      const [file] = files.file;
      const fileName = `${file.originalFilename}`;

      const destinationPath = path.join(process.cwd(), 'public', 'uploads', fileName);

      await fs.rename(file.filepath, destinationPath);

      console.log('File uploaded successfully');
      return res.status(200).json({ ok: true, message: 'File uploaded successfully.', fileName });
    } catch (error) {
      console.error('Error processing the upload:', error);
      return res.status(500).json({ error: 'Error processing the upload.' });
    }
  });
}
