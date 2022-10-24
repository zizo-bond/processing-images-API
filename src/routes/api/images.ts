import express from 'express';
import File from './../../file';

// segment Query
interface ImageQuery {
  filename?: string;
 height?: string;
   width?: string;
}

/**
 * Query validation

 */
const validate = async (query: ImageQuery): Promise<null | string> => {
  // Check availability of requested file
  if (!(await File.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(', ');
    return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`;
  }

  if (!query.width && !query.height) {
    return null; // No size values
  }

  // Check for validity through value
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numeric value for the 'width' query segment.";
  }

  // Check for valid height value
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numeric value for the 'height' query segment.";
  }

  return null;
};

const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    // Check which request can be worked with
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    //  if not available creat a thumb
    if (!(await File.isThumbAvailable(request.query))) {
      error = await File.createThumb(request.query);
    }

    // handling errors of processing imgs
    if (error) {
      response.send(error);
      return;
    }

    // Determine appropriate image path and display image
    const path: null | string = await File.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened :-D What did you do?');
    }
  }
);

export default images;
