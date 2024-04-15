import axios from "axios";
import fs from "fs";

// Function to download the image
export async function downloadImage(imageUrl, imagePath) {
  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream", // important to specify the response type
    });

    // Pipe the image data to a writable stream
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    // Return a promise to indicate the completion of writing the file
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error; // Rethrow the error to handle it further if needed
  }
}
